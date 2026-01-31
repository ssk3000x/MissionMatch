import { supabase } from '../supabase';

export interface CallSummary {
  summary: string;
  contactName?: string | null;
  interested?: boolean;
  nextSteps?: string[];
  availability?: string | null;
  callbackDate?: string | null;
  vapiAnalysis?: any;
}

export async function saveCallSummary(callId: string, payload: any) {
  try {
    // Check if we are using Supabase (keys exist)
    if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      // Support either flat payload or nested { vapiSummary: { summary, contactName, ... } }
      const vapi = payload.vapiSummary || payload.vapi_summary || {};
      const summary = payload.summary ?? vapi.summary ?? vapi?.vapiSummary?.summary ?? null;
      const contactName = payload.contactName ?? vapi.contactName ?? vapi.contact_name ?? null;
      const interested = payload.interested ?? vapi.interested ?? null;
      const nextSteps = payload.nextSteps ?? vapi.nextSteps ?? vapi.next_steps ?? null;
      const availability = payload.availability ?? vapi.availability ?? null;
      const vapiAnalysis = payload.vapiAnalysis ?? vapi.vapiAnalysis ?? vapi.vapi_analysis ?? payload.vapiRaw ?? null;

      const dbPayload = {
        call_id: callId,
        summary,
        contact_name: contactName,
        interested,
        next_steps: nextSteps,
        availability,
        vapi_analysis: vapiAnalysis,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('call_summaries')
        .upsert(dbPayload, { onConflict: 'call_id' })
        .select()
        .single();
      
      if (error) {
        console.error('Error saving call summary to Supabase:', error);
        throw error;
      }
      return data;
    } else {
      console.warn("Supabase not configured, skipping persistence");
      return null;
    }
  } catch (e) {
    console.error("Failed to save call summary:", e);
    return null;
  }
}


export async function getCallSummary(key: string) {
  try {
    if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const { data, error } = await supabase
        .from('call_summaries')
        .select('*')
        .eq('call_id', key)
        .single();
      if (error) {
        console.error('Error fetching call summary from Supabase:', error);
        return null;
      }
      return data || null;
    }
    return null;
  } catch (e) {
    console.error('getCallSummary failed:', e);
    return null;
  }
}

export default {
  saveCallSummary,
  getCallSummary,
};
