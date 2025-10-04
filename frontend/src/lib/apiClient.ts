import { API_BASE_URL } from './config';
import { getSupabaseClient, SUPABASE_CONFIG_ERROR } from './supabaseClient';

export async function apiFetch(path: string, init: RequestInit = {}) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    throw new Error(SUPABASE_CONFIG_ERROR);
  }

  const { data } = await supabase.auth.getSession();
  const accessToken = data.session?.access_token;

  const headers = new Headers(init.headers);
  if (!headers.has('Content-Type') && init.body && !(init.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }
  if (!headers.has('Accept')) {
    headers.set('Accept', 'application/json');
  }
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
    // Debug log for Authorization header
    // eslint-disable-next-line no-console
    console.log('[apiFetch] Authorization:', `Bearer ${accessToken}`);
  } else {
    // eslint-disable-next-line no-console
    console.warn('[apiFetch] No access token found, Authorization header not set.');
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `API request failed with status ${response.status}`);
  }

  return response;
}
