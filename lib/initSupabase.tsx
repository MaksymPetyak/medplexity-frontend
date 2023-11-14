import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (supabaseUrl === undefined) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL must be defined');
}
if (supabaseAnonKey === undefined) {
  throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY must be defined');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
