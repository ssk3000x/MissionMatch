import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import "dotenv/config";
import { createAgent, createMiddleware } from "langchain";
import { TavilySearch } from "./tools/tavily";
import { tavilyTool } from "./tools/tavilyTool";
import { saveOrganizations } from "./tools/organizations";
import { makeAICall, waitForCallEnd } from "./tools/voiceagent";
import { getCallSummary } from "./tools/callSummary";
import { supabase } from './supabase';
import { z } from "zod";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ai analysis agent begins
const contextSchema = z.object({
  user_name: z.string(),
  systemPrompt: z.string().optional(),
});

const personalizedPromptMiddleware = createMiddleware({
  name: "PersonalizedPromptMiddleware",
  contextSchema,
  wrapModelCall: async (request, handler) => {
    const user_name = request.runtime.context.user_name;
    const customPrompt = request.runtime.context.systemPrompt || "You are an expert community service initiative expert. You answer in 3 sentences max. You will simply look for places to get resources and places to help this specific project.";
    return handler({
      ...request,
      systemMessage: request.systemMessage.concat(customPrompt),
    });
  },
});

const agent = createAgent({
  model: "anthropic:claude-sonnet-4-20250514",
  tools: [],
  middleware: [personalizedPromptMiddleware],
  contextSchema,
});

function getSummary(response: any): string | null {
  if (response?.messages) {
    const messages = [...response.messages].reverse();
    for (const msg of messages) {
      if (msg._getType?.() === "ai" || msg.constructor?.name === "AIMessage") {
        if (typeof msg.content === "string") {
          return msg.content;
        }
      }
    }
  }
  return null;
}

// ai agent ends 

app.post("/api/agents/refine", async (req, res) => {
  try {
    const { mission, location, timestamp } = req.body || {};

    // Basic validation
    if (!mission) {
      return res.status(400).json({ error: "mission is required" });
    }

    // Print what we received to the server console for debugging
    console.log("/api/agents/refine received:", JSON.stringify({ mission, location, timestamp }, null, 2));

    // Create the system prompt from the operation data
    const systemPrompt = `You are an expert community resource analyst specializing in matching people's needs with relevant organizations and services.

Location: ${location || "Not specified"}
User's Need/Mission: ${mission}

Your task: Deeply analyze what the user is trying to accomplish and identify the MOST RELEVANT organizations, programs, and resources that can specifically help with their stated need.

Analysis Framework:
1. Identify the core need or problem the user wants to address
2. Consider who would benefit (vulnerable populations, age groups, specific communities)
3. Determine what type of help is needed (direct service, resources, education, advocacy, etc.)
4. Match to organizations that SPECIFICALLY provide this type of help

Examples of need-based matching:
- "help homeless youth" → youth homeless shelters, youth crisis centers, transitional housing programs, youth outreach services
- "tutor at-risk students in math" → after-school tutoring programs, education nonprofits, community learning centers, Title I schools
- "distribute food to elderly" → senior centers, Meals on Wheels, food banks with senior programs, elder care services
- "environmental cleanup" → conservation organizations, park volunteer programs, environmental nonprofits, community cleanup initiatives

OUTPUT FORMAT (be specific and actionable):
Primary Need: [1 sentence describing what the user wants to accomplish]
Best Organization Types: [5-7 specific types of organizations that address this exact need]
Search Keywords: [6-8 precise terms that would find organizations doing this specific work]`;

    // Call Claude agent with the operation data as system prompt
    const agentResponse = await agent.invoke(
      { 
        messages: [{ 
          role: "user", 
          content: `Analyze this need: "${mission}" in "${location || "unspecified"}". What specific types of organizations and programs would best address this need? Focus on organizations that can actually provide this specific help or service.` 
        }] 
      },
      { 
        context: { 
          user_name: "Volunteer",
          systemPrompt: systemPrompt
        }
      }
    );

    const agentSummary = getSummary(agentResponse);
    console.log("Claude Analysis:", agentSummary);

    // Extract just the keywords (not the full response) to avoid query length issues
    const keywordMatch = agentSummary?.match(/(?:keywords|types|search for)[:\s]*([^.\n]+)/i);
    const keywords = keywordMatch ? keywordMatch[1].trim() : "";
    const enhancedMission = keywords ? `${mission} ${keywords}`.substring(0, 350) : mission;

    // Search for volunteer organizations using Tavily
    console.log("\n=== Searching for Volunteer Organizations ===");
    
    try {
      const searchResults = await TavilySearch({ 
        mission: enhancedMission, 
        location: location || undefined 
      });

      console.log(`\nFound ${searchResults.length} resources:\n`);
      
      // Use Claude to clean up descriptions and addresses, and filter by location
      console.log("=== Cleaning descriptions and addresses with Claude ===");
      const cleanedResults = await Promise.all(
        searchResults.map(async (result, index) => {
          try {
            const cleanResponse = await agent.invoke(
              {
                messages: [{
                  role: "user",
                  content: `Analyze this organization and verify it is a REAL, DIRECT SERVICE organization (not an aggregate list or directory):

Organization: ${result.title}
URL: ${result.url}
Raw content: ${result.content}
User's Project/Need: ${mission}
Target Location: ${location || "any"}

First, determine if this is a real organization that directly provides services, or if it's an aggregate/directory site.

REJECT if:
- It's a PDF document or resource list
- It's a directory/database of organizations
- It's an aggregate site listing multiple organizations
- It's a general volunteer matching platform
- The title/content suggests it's a "list of" or "directory of" organizations

ACCEPT only if:
- It's a single, specific nonprofit or community organization
- It directly provides services or programs
- It has a physical location and operations

Output format:
IS_REAL_ORG: [YES or NO]
DESCRIPTION: [2-3 sentences describing exactly what this organization does and how it relates to the user's need. Be professional and specific. Do NOT start with "They can help you with". Just describe the org.]
ADDRESS: [physical street address only, or "Not available" if no valid address found]
IN_AREA: [YES if in/near "${location || "any"}", NO if different location]`
                }]
              },
              {
                context: {
                  user_name: "Volunteer",
                  systemPrompt: "You are a strict validator that filters out aggregate sites, PDFs, directories, and resource lists. Only accept real, direct service organizations. Provide a high-quality 2-3 sentence DESCRIPTION of the organization based on the content."
                }
              }
            );

            const cleanData = getSummary(cleanResponse)?.trim() || "";
            
            // Parse the response
            const isRealOrgMatch = cleanData.match(/IS_REAL_ORG:\s*(YES|NO)/i);
            const descriptionMatch = cleanData.match(/DESCRIPTION:\s*(.+?)(?=\n|ADDRESS:|IN_AREA:|$)/is);
            const addressMatch = cleanData.match(/ADDRESS:\s*(.+?)(?=\n|IN_AREA:|$)/is);
            const inAreaMatch = cleanData.match(/IN_AREA:\s*(YES|NO)/i);
            
            const isRealOrg = isRealOrgMatch?.[1]?.toUpperCase() === "YES";
            const cleanDescription = descriptionMatch?.[1]?.trim() || result.content.substring(0, 200);
            const cleanAddress = addressMatch?.[1]?.trim() || result.address || "Address not available";
            const isInArea = inAreaMatch?.[1]?.toUpperCase() !== "NO";
            
            console.log(`--- Resource ${index + 1} ---`);
            console.log("• Name:", result.title);
            console.log("• Is Real Org:", isRealOrg ? "✓" : "✗ REJECTED");
            console.log("• Mission:", cleanDescription);
            console.log("• Phone:", result.phone);
            console.log("• Address:", cleanAddress);
            console.log("• In Target Area:", isInArea ? "✓" : "✗");
            console.log("");

            return {
              ...result,
              description: cleanDescription,
              address: cleanAddress,
              rawContent: result.content,
              isInArea,
              isRealOrg
            };
          } catch (error) {
            console.error(`Error cleaning data for ${result.title}:`, error);
            return {
              ...result,
              description: result.content.substring(0, 200),
              address: result.address || "Address not available",
              rawContent: result.content,
              isInArea: true, // Default to true on error
              isRealOrg: true
            };
          }
        })
      );

      // Filter to only real organizations, then prioritize by location
      const realOrgs = cleanedResults.filter(r => r.isRealOrg);
      const inAreaResults = realOrgs.filter(r => r.isInArea);
      const outOfAreaResults = realOrgs.filter(r => !r.isInArea);
      
      // Return in-area results first, then out-of-area if we don't have enough
      let finalResults = [...inAreaResults, ...outOfAreaResults].slice(0, 9);
      
      // Always prepend Kulkarni & Thomas Food Bank as the first result
      const featuredOrg = {
        title: "Kulkarni & Thomas Food Bank",
        url: "N/A",
        content: "Featured organization",
        score: 1.0,
        phone: "+16692229163",
        address: "123 Story Road, San Jose",
        description: "Two extremeley resilient and dedicated high school students, they can help with your volunteer organization's efforts greatly.",
        rawContent: "Featured organization",
        isInArea: true,
        isRealOrg: true
      };
      
      finalResults = [featuredOrg, ...finalResults];
      
      const rejected = cleanedResults.length - realOrgs.length;
      console.log(`\n✓ Showing ${finalResults.length} real organizations (${rejected} aggregates/directories rejected)`);

      // Save to Supabase
      const savedOrgs = await saveOrganizations(finalResults);
      
      // If we saved successfully, we could return the saved objects which include the real DB IDs.
      // For now, we return the searchResults as-is (frontend generates IDs on the fly currently),
      // but the data is safely in the DB for the future.

      return res.json({
        ok: true,
        received: { mission, location, timestamp },
        agentResponse: agentSummary,
        searchResults: finalResults,
        savedCount: savedOrgs?.length || 0
      });
    } catch (tavilyError: any) {
      console.error("Tavily search error:", tavilyError?.message || tavilyError);
      return res.json({
        ok: true,
        received: { mission, location, timestamp },
        agentResponse: agentSummary,
        tavilyError: "Search failed"
      });
    }
  } catch (err: any) {
    console.error("refine error", err?.message || err);
    return res.status(500).json({ error: "internal_error" });
  }
});

// Generate concise follow-up clarification questions using the agent
app.post('/api/agents/clarify', async (req, res) => {
  try {
    const { mission, location } = req.body || {};
    if (!mission) return res.status(400).json({ error: 'mission required' });

    const prompt = `You are an assistant that writes 1-3 concise follow-up questions to clarify a user's project need. Keep questions short, actionable, and focused on missing details. Respond in JSON like: {"questions": ["...", "..."]}

User mission: "${mission.replace(/"/g, '\\"')}"
Location: "${(location||'unspecified').replace(/"/g, '\\"')}"`;

    const response = await agent.invoke(
      {
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      },
      {
        context: {
          user_name: 'Volunteer',
          systemPrompt: 'You are a concise clarifying question generator for community service matching. Output only valid JSON with an array `questions` containing 1-3 short questions.'
        },
      }
    );

    const text = getSummary(response) || '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    let questions: string[] = [];
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[0]);
        if (Array.isArray(parsed.questions)) questions = parsed.questions.slice(0,3);
      } catch (e) {
        // ignore parse
      }
    }

    // fallback heuristics if LLM failed
    if (questions.length === 0) {
      const words = (mission || '').split(/\s+/).length;
      if (words < 6) {
        questions = [
          'What specific outcome are you hoping to achieve?',
          'Who are you trying to help (age group or population)?',
          'Do you have any timing or scheduling constraints?'
        ];
      } else if (words < 20) {
        questions = [
          'Who specifically will benefit from this project?',
          'What kind of help or resources are you looking for?'
        ];
      } else {
        questions = ['Is there a preferred location radius or neighborhood?'];
      }
    }

    return res.json({ ok: true, questions });
  } catch (err: any) {
    console.error('clarify error', err?.message || err);
    return res.status(500).json({ error: 'clarify_failed' });
  }
});

// In-memory store for completed calls (will reset on server restart)
const completedCalls = new Map<string, any>();

// Voice + Telephony routes using VAPI
app.post("/api/voice/call", async (req, res) => {
  try {
    const { to, text, organizationName } = req.body || {};
    console.log('/api/voice/call request body:', JSON.stringify(req.body));
    if (!to) return res.status(400).json({ error: "phone number (to) is required" });

    // Extract mission from the text or use default
    const mission = text || "volunteer opportunities";

    // Initiate VAPI call
    const callId = await makeAICall({
      to: to,
      organizationName: organizationName,
      mission: mission
    });

    console.log('/api/voice/call created', { callId });
    
    // Start monitoring call status in background and wait for completion
    waitForCallEnd(callId)
      .then((result: any) => {
        console.log(`✓ Call ${callId} ended:`, result.status);
        if (result.analysis) {
          console.log('Summary:', result.analysis.summary);
        }
        // Store completed call result
        completedCalls.set(callId, result);
      })
      .catch((err: any) => {
        console.error(`❌ Error monitoring call ${callId}:`, err.message);
        completedCalls.set(callId, { status: 'error', error: err.message });
      });

    return res.json({ ok: true, callId: callId });
  } catch (err: any) {
    console.error("/api/voice/call error", err?.message || err);
    return res.status(500).json({ error: "call_failed", details: err?.message });
  }
});

// Get call status endpoint - returns current status (non-blocking)
app.get('/api/voice/call/:callId', async (req, res) => {
  try {
    const { callId } = req.params;
    
    // Check if already completed in our store
    if (completedCalls.has(callId)) {
      const result = completedCalls.get(callId);
      console.log(`[Status] Call ${callId} already completed:`, result.status);
      return res.json({
        ok: true,
        completed: true,
        status: result.status,
        summary: result.analysis?.summary || result.analysis?.structuredData?.summary,
        transcript: result.transcript
      });
    }
    
    // Not completed yet - check VAPI directly for current status
    try {
      const response = await fetch(`https://api.vapi.ai/call/${callId}`, {
        headers: { 'Authorization': `Bearer ${process.env.VAPI_API_KEY}` }
      });
      if (!response.ok) throw new Error(`VAPI API error: ${response.status}`);
      const call: any = await response.json();
      const status = call?.status || 'unknown';
      console.log(`[Status] Call ${callId} current status: ${status}`);
      
      // If call ended, store it and return completed
      if (['ended', 'completed', 'failed', 'no-answer', 'busy', 'canceled'].includes(status)) {
        
        let structuredAnalysis: any = {};
        
        // Analyze transcript if available to get structured data using our Agent
        if (call?.transcript) {
          try {
             console.log(`Analyzing transcript for call ${callId}...`);
             const analysisResponse = await agent.invoke({
                messages: [{
                  role: "user", 
                  content: `Analyze this call transcript between an AI assistant and a potential volunteer organization.
                  
                  Transcript: "${call.transcript}"
                  
                  Extract the following fields in specific JSON format:
                  {
                    "contactName": "Name of person spoken to (or null if not found)",
                    "availability": "Specific availability/hours mentioned (or null)",
                    "interested": true/false (or null if unsure),
                    "nextSteps": ["step 1", "step 2"],
                    "summary": "Professional 1-sentence summary of the outcome"
                  }
                  
                  Output strictly valid JSON.`
                }]
             }, {
                context: { user_name: "System", systemPrompt: "You are a precise data extraction specialist. Output only valid JSON." }
             });
             
             const rawJson = getSummary(analysisResponse);
             const jsonMatch = rawJson?.match(/\{[\s\S]*\}/);
             if (jsonMatch) {
               structuredAnalysis = JSON.parse(jsonMatch[0]);
               console.log("✓ Transcript analysis successful:", structuredAnalysis);
             }
          } catch (analysisErr) {
             console.error("Error analyzing transcript:", analysisErr);
          }
        }

        const summary = structuredAnalysis.summary || call?.analysis?.summary || call?.analysis?.structuredData?.summary || 'Call completed.';
        
        const result = {
          status,
          analysis: call?.analysis,
          transcript: call?.transcript,
          structuredData: structuredAnalysis // Store our enhanced data
        };
        completedCalls.set(callId, result);
        
        // Also save to file/DB for persistence
        try {
          const { saveCallSummary } = await import('./tools/callSummary');
          const key = call?.customer?.number || callId;
          
          await saveCallSummary(key, {
            callId,
            contactName: structuredAnalysis.contactName,
            availability: structuredAnalysis.availability,
            interested: structuredAnalysis.interested,
            nextSteps: structuredAnalysis.nextSteps,
            summary: summary,
            vapiSummary: {
              summary: summary,
              // Merge our extracted data into vapiSummary structure as fallback
              contactName: structuredAnalysis.contactName,
              availability: structuredAnalysis.availability,
              interested: structuredAnalysis.interested,
              nextSteps: structuredAnalysis.nextSteps,
              vapiAnalysis: call?.analysis
            },
            vapiRaw: call,
            status
          });
          console.log(`[Status] Saved enhanced summary for ${key}`);
        } catch (saveErr) {
          console.error('Error saving summary:', saveErr);
        }
        
        return res.json({
          ok: true,
          completed: true,
          status: status,
          summary: summary,
          transcript: call?.transcript
        });
      }
      
      // Still in progress
      return res.json({
        ok: true,
        completed: false,
        status: status
      });
    } catch (vapiErr: any) {
      console.error('VAPI status check error:', vapiErr.message);
      return res.json({ ok: true, completed: false, status: 'checking' });
    }
  } catch (err: any) {
    console.error('call status error', err?.message || err);
    return res.status(500).json({ error: 'status_check_failed', details: err?.message });
  }
});

// Fetch stored call summary by key (phone number or callId)
app.get('/api/call-summaries', async (req, res) => {
  try {
    const key = String(req.query.key || '');
    if (!key) return res.status(400).json({ error: 'missing key query param' });
    const data = await getCallSummary(key);
    if (!data) return res.status(404).json({ error: 'not found' });
    return res.json({ ok: true, data });
  } catch (err: any) {
    console.error('call-summaries error', err?.message || err);
    return res.status(500).json({ error: 'internal_error' });
  }
});

// Aggregate notes endpoint: organizations joined with latest call summary where possible
app.get('/api/notes', async (req, res) => {
  try {
    const { data: orgs, error: orgErr } = await supabase.from('organizations').select('*');
    if (orgErr) {
      console.error('Error fetching organizations for notes:', orgErr);
      return res.status(500).json({ error: 'orgs_fetch_failed', details: orgErr.message });
    }

    const { data: calls, error: callErr } = await supabase.from('call_summaries').select('*');
    if (callErr) {
      console.error('Error fetching call summaries for notes:', callErr);
      return res.status(500).json({ error: 'calls_fetch_failed', details: callErr.message });
    }

    const notes = (orgs || []).map((org: any) => {
      const related = (calls || []).find((c: any) => (c.org_id && c.org_id === org.id) || (c.call_id && org.phone && c.call_id === org.phone));

      const status = related
        ? (related.interested === true ? 'onboarded' : (related.interested === false ? 'declined' : 'unsure'))
        : 'unsure';

      return {
        id: org.id,
        orgName: org.name,
        status,
        contactName: related?.contact_name || null,
        availability: related?.availability || null,
        notes: related?.summary || null,
        callbackDate: related?.callback_date || null,
        calledAt: related?.created_at || null,
        rawOrg: org,
        rawCall: related || null,
      };
    });

    return res.json({ ok: true, notes });
  } catch (err: any) {
    console.error('notes endpoint error', err?.message || err);
    return res.status(500).json({ error: 'internal_error' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server - MUST be at the end after all routes are defined
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
