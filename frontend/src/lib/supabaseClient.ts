import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config';

export const SUPABASE_CONFIG_ERROR = 'Supabase environment variables are not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.';

let supabaseClient: SupabaseClient | null = null;

if (SUPABASE_URL && SUPABASE_ANON_KEY) {
  supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: true,
      storageKey: 'campus-portal-auth',
    },
  });
} else {
  // eslint-disable-next-line no-console
  console.warn(SUPABASE_CONFIG_ERROR);
}

export function getSupabaseClient(): SupabaseClient | null {
  return supabaseClient;
}

export function assertSupabaseClient(): SupabaseClient {
  if (!supabaseClient) {
    throw new Error(SUPABASE_CONFIG_ERROR);
  }
  return supabaseClient;
}

export function isSupabaseConfigured(): boolean {
  return supabaseClient !== null;
}

export type { SupabaseClient };
