import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase URL or Service Role Key NOT set. Persistence features will be disabled or fail.');
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl || '', supabaseKey || '');
