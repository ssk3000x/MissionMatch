import { VapiClient } from '@vapi-ai/server-sdk';
import dotenv from 'dotenv';

dotenv.config();

const VAPI_API_KEY = process.env.VAPI_API_KEY;
const VAPI_PHONE_NUMBER_ID = process.env.VAPI_PHONE_NUMBER_ID;
const ELEVEN_LABS_VOICE_ID = "pVnrL6sighQX7hVz89cp"; // Professional

if (!VAPI_API_KEY) {
  console.warn('VAPI_API_KEY not configured');
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

  const systemPrompt = `You are a professional and polite outreach coordinator calling on behalf of VolunteerConnect, a platform that helps community organizers find resources and support for their service projects.

Your goal:
1. Introduce yourself: "Hi, this is calling from VolunteerConnect. We help community organizers connect with local organizations for support."
2. Explain the purpose: "I'm reaching out on behalf of someone who is running a community service project and needs support from organizations like ${organizationName}."
3. Describe their specific need: "They need help with: ${mission}"
4. Ask if they can provide support: "Would your organization be able to assist with this need? This could be through resources, partnerships, volunteers from your organization, or other forms of support."
5. Gather information:
   - Can they provide the specific help needed?
   - What resources or support can they offer?
   - Who should the project organizer contact?
   - What's the next step to get this support?
   - Are there any requirements or processes they need to follow?
6. Be professional, friendly, and respectful of their time.
7. Thank them for their time regardless of the outcome.

If they cannot help or are not available, politely thank them and end the call.
If they can help, gather detailed information about how the project organizer should proceed to get their support.`;

  try {
    console.log(`Making VAPI call to ${organizationName} (${to})...`);

    const vapi = getVapiClient();
    const response = await vapi.calls.create({
      phoneNumberId: VAPI_PHONE_NUMBER_ID,
      customer: { number: to },
      assistant: {
        name: "VolunteerConnect Assistant",
        firstMessage: `Hi, this is calling from VolunteerConnect. We help community organizers connect with local organizations for support. I'm reaching out on behalf of someone who needs help with: ${mission}. Would ${organizationName} be able to assist with this?`,
        model: {
          provider: 'openai',
          model: 'gpt-4o',
          messages: [
            { 
              role: 'system', 
              content: systemPrompt
            }
          ]
        },
    voice: {
         voiceId: "Elliot",
         provider: "vapi"
    },
      }
    }) as any;

    // Extract call ID from response (handle different response formats)
    const callId = response?.id || response?.data?.id || 'unknown';
    console.log(`✓ VAPI call initiated to ${organizationName} (${to}), Call ID: ${callId}`);
    return callId;
  } catch (error: any) {
    console.error('Error initiating VAPI call:', error.message);
    if (error.response) {
      console.error('VAPI error details:', JSON.stringify(error.response.data, null, 2));
    }
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
      const vapi = getVapiClient();
      const call: any = await vapi.calls.get(callId as any);
      
      const status = call?.status || 'unknown';
      
      // Check if call has ended (VAPI statuses: queued, ringing, in-progress, forwarding, ended)
      if (status === 'ended' || status === 'completed' || status === 'failed' || status === 'no-answer') {
        console.log(`✓ Call ${callId} completed with status: ${status}`);
        
        return {
          status: status,
          analysis: call?.analysis,
          transcript: call?.transcript
        };
      }

      // Wait 5 seconds before next check
      await new Promise(resolve => setTimeout(resolve, 5000));
      attempts++;
    } catch (error: any) {
      console.error(`Error checking call status (attempt ${attempts + 1}):`, error.message);
      
      if (attempts >= maxAttempts - 1) {
        throw new Error(`Call monitoring timeout after ${maxAttempts * 5} seconds`);
      }
      
      await new Promise(resolve => setTimeout(resolve, 5000));
      attempts++;
    }
  }

  throw new Error(`Call monitoring timeout for call ${callId}`);
}
