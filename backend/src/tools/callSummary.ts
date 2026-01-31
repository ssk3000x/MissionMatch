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
      const dbPayload = {
        call_id: callId,
        summary: payload.summary,
        contact_name: payload.contactName,
        interested: payload.interested,
        next_steps: payload.nextSteps,
        availability: payload.availability,
        vapi_analysis: payload.vapiAnalysis,
        updated_at: new Date().toISOString()
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


export function getCallSummary(key: string) {
  try {
    const raw = fs.existsSync(DB_FILE) ? fs.readFileSync(DB_FILE, 'utf8') : '{}';
    const db = JSON.parse(raw || '{}');
    return db[key] || null;
  } catch (e) {
    return null;
  }
}

export default {
  saveCallSummary,
  getCallSummary,
};
