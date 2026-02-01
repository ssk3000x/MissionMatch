import { VapiClient } from '@vapi-ai/server-sdk';
import dotenv from 'dotenv';
import { saveCallSummary } from './callSummary';

dotenv.config();

const VAPI_API_KEY = process.env.VAPI_API_KEY;
const VAPI_PHONE_NUMBER_ID = process.env.VAPI_PHONE_NUMBER_ID;
const ELEVEN_LABS_VOICE_ID = "pVnrL6sighQX7hVz89cp"; // Professional
const ELEVEN_LABS_API_KEY = process.env.ELEVEN_LABS_API_KEY;

if (!VAPI_API_KEY) {
  console.warn('VAPI_API_KEY not configured');
}

if (!ELEVEN_LABS_API_KEY) {
  console.warn('ELEVEN_LABS_API_KEY not configured; ElevenLabs voice may not work');
}

let vapiClient: VapiClient | null = null;

function getVapiClient(): VapiClient {
  if (!vapiClient && VAPI_API_KEY) {
    vapiClient = new VapiClient({ token: VAPI_API_KEY });
  }
  if (!vapiClient) {
    throw new Error('VAPI client not initialized - check VAPI_API_KEY');
  }
  return vapiClient;
}

export interface MakeCallOptions {
  to: string;
  organizationName: string;
  mission: string;
}

export interface CallStatusResponse {
  status: string;
  analysis?: { summary: string };
  transcript?: string;
}

/**
 * Initiates an AI phone call to a volunteer organization using VAPI
 */
export async function makeAICall(options: MakeCallOptions): Promise<string> {
  const { to, organizationName, mission } = options;

  if (!VAPI_API_KEY) {
    throw new Error('VAPI_API_KEY not configured in environment');
  }

  if (!VAPI_PHONE_NUMBER_ID) {
    throw new Error('VAPI_PHONE_NUMBER_ID not configured in environment');
  }

  const systemPrompt = `You are a professional and polite outreach coordinator calling on behalf of MissionMatch, a platform that helps community organizers find resources and support for their service projects.

Important constraints:
- DO NOT repeat or rephrase the scripted initial message provided in the call's "firstMessage" field. That message will be spoken first; your role is to follow up only after it is delivered.
- After the initial scripted intro, ask only concise, targeted follow-up questions to clarify availability, contact person, resources, and next steps. Keep each question short and wait for the respondent's answer before asking another.
- Do not introduce additional long-form narration or restate the intro; focus on eliciting the specific information needed (can you help, who to contact, what resources, next steps, any requirements).

Your goal:
1. After the scripted intro has been spoken, briefly confirm the organization's ability to help with: ${mission}
2. If they can help, ask who the best contact is and what the next steps are.
3. If they cannot help, politely thank them and end the call.

Be professional, friendly, and respectful of their time.`;

  try {
    console.log(`Making VAPI call to ${organizationName} (${to})...`);

    // Use REST API directly (SDK has UUID parsing issues)
    const response = await fetch('https://api.vapi.ai/call/phone', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${VAPI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phoneNumberId: VAPI_PHONE_NUMBER_ID,
        customer: { number: to },
          assistant: {
            name: "MissionMatch Assistant",
            firstMessage: `Hi, this is MissionMatch calling on behalf of a volunteer project. We're reaching out because someone needs help with: ${mission}. Would ${organizationName} be able to assist? If so, who should we contact and what are the next steps?`,
          model: {
            provider: 'openai',
            model: 'gpt-4o',
            messages: [{ role: 'system', content: systemPrompt }]
          },
          // Use ElevenLabs as the TTS provider while VAPI still orchestrates the phone call
          voice: {
            voiceId: ELEVEN_LABS_VOICE_ID,
            provider: "elevenlabs",
            // include API key so VAPI (or any proxy) can use ElevenLabs on our behalf
            apiKey: ELEVEN_LABS_API_KEY || undefined
          },
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`VAPI API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const callId = data?.id || 'unknown';
    console.log(`✓ VAPI call initiated to ${organizationName} (${to}), Call ID: ${callId}`);
    return callId;
  } catch (error: any) {
    console.error('Error initiating VAPI call:', error.message);
    throw error;
  }
}

/**
 * Polls VAPI to wait for call completion and retrieve results
 */
export async function waitForCallEnd(callId: string): Promise<CallStatusResponse> {
  if (!VAPI_API_KEY) {
    throw new Error('VAPI_API_KEY not configured in environment');
  }

  const maxAttempts = 60; // 5 minutes max
  let attempts = 0;

  while (attempts < maxAttempts) {
    try {
      // Use REST API directly (SDK has UUID parsing issues)
      const response = await fetch(`https://api.vapi.ai/call/${callId}`, {
        headers: { 'Authorization': `Bearer ${VAPI_API_KEY}` }
      });
      if (!response.ok) throw new Error(`VAPI API error: ${response.status}`);
      const call: any = await response.json();
      
      const status = call?.status || 'unknown';
      console.log(`[Poll ${attempts + 1}/${maxAttempts}] Call ${callId} status: ${status}`);
      
      // Check if call has ended (VAPI statuses: queued, ringing, in-progress, forwarding, ended, busy, no-answer, canceled)
      if (status === 'ended' || status === 'completed' || status === 'failed' || status === 'no-answer' || status === 'busy' || status === 'canceled') {
        console.log(`✓ Call ${callId} completed with status: ${status}`);
        
        // Extract and log VAPI call summary from structuredData
        const callSummary = call?.analysis?.structuredData?.summary || call?.analysis?.summary || 'No summary available';
        const callTranscript = call?.transcript || 'No transcript available';
        
        console.log('\n=== VAPI CALL SUMMARY ===');
        console.log('Summary:', callSummary);
        console.log('\n=== VAPI STRUCTURED DATA ===');
        console.log(JSON.stringify(call?.analysis?.structuredData, null, 2));
        console.log('\n=== VAPI CALL ANALYSIS ===');
        console.log(JSON.stringify(call?.analysis, null, 2));
        console.log('\n=== VAPI CALL TRANSCRIPT ===');
        console.log(callTranscript);
        console.log('========================\n');

        const result: CallStatusResponse = {
          status: status,
          analysis: call?.analysis,
          transcript: call?.transcript
        };

        // Use VAPI's auto-generated analysis summary and persist it
        try {
          const vapiSummary = {
            summary: callSummary,
            contactName: null,
            interested: null,
            nextSteps: [],
            availability: null,
            callbackDate: null,
            vapiAnalysis: call?.analysis,
          };
          
          const key = call?.customer?.number || callId;
          await saveCallSummary(key, { callId, vapiSummary: vapiSummary, vapiRaw: call, status });
          console.log(`✓ Saved VAPI analysis for ${key}: ${vapiSummary.summary}`);
        } catch (err: any) {
          console.error('Error persisting call summary:', err?.message || err);
        }

        return result;
      }

      // Wait 3 seconds before next check (faster detection)
      await new Promise(resolve => setTimeout(resolve, 3000));
      attempts++;
    } catch (error: any) {
      console.error(`Error checking call status (attempt ${attempts + 1}):`, error.message);
      
      if (attempts >= maxAttempts - 1) {
        throw new Error(`Call monitoring timeout after ${maxAttempts * 3} seconds`);
      }
      
      await new Promise(resolve => setTimeout(resolve, 3000));
      attempts++;
    }
  }

  throw new Error(`Call monitoring timeout for call ${callId}`);
}
