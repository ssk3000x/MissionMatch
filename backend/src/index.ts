import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { searchOrganizations } from "./places";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import "dotenv/config";
import { createAgent, createMiddleware } from "langchain";
import { TavilySearch } from "./tools/tavily";
import { tavilyTool } from "./tools/tavilyTool";
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
  tools: [tavilyTool],
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
    const systemPrompt = `You are a strategic volunteer placement analyst.

Location: ${location || "Not specified"}
Mission: ${mission}

Your task: Identify the best types of institutions/organizations for this mission. Be specific.

Examples:
- Food assistance → food banks, homeless shelters, soup kitchens, Meals on Wheels
- Animal care → animal shelters, rescue organizations, wildlife centers
- Education → schools, tutoring centers, libraries, literacy programs

OUTPUT FORMAT (3 lines max):
Best institution types (max of 5): [comma-separated list]
Search keywords (max of 5): [specific terms for finding these]`;

    // Call Claude agent with the operation data as system prompt
    const agentResponse = await agent.invoke(
      { 
        messages: [{ 
          role: "user", 
          content: `For mission "${mission}" in "${location || "unspecified"}", what are the 3-5 best types of institutions to search for? List them with specific keywords.` 
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
      
      searchResults.forEach((result, index) => {
        console.log(`--- Resource ${index + 1} ---`);
        console.log("• Name:", result.title);
        console.log("• Phone:", result.phone);
        console.log("• Address:", result.address || "Not found");
        console.log("• URL:", result.url);
        console.log("• Score:", result.score);
        console.log("");
      });

      return res.json({
        ok: true,
        received: { mission, location, timestamp },
        agentResponse: agentSummary,
        searchResults,
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

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
