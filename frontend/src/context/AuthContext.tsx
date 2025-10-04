import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Session, User, AuthChangeEvent } from '@supabase/supabase-js';
import { getSupabaseClient, SUPABASE_CONFIG_ERROR, type SupabaseClient } from '../lib/supabaseClient';

import { getDashboardRoute, isUserRole, type UserRole } from '../types/auth';

interface AuthContextValue {
  user: User | null;
  role: UserRole | null;
  session: Session | null;
  initializing: boolean;
  login: (input: LoginParams) => Promise<AuthResult>;
  signup: (input: SignupParams) => Promise<AuthResult>;
  logout: () => Promise<void>;
  refreshRole: () => Promise<UserRole | null>;
}

interface LoginParams {
  email: string;
  password: string;
}

interface SignupParams {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

interface AuthResult {
  success: boolean;
  role: UserRole | null;
  message?: string;
  requiresEmailConfirmation?: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [initializing, setInitializing] = useState(true);
  const supabase = getSupabaseClient();

  useEffect(() => {
    const client = supabase;
    if (!client) {
      setInitializing(false);
      return;
    }

    const typedClient: SupabaseClient = client;

    let active = true;

    async function init() {
      const { data } = await typedClient.auth.getSession();
      if (!active) return;
      setSession(data.session);
      setUser(data.session?.user ?? null);
      if (data.session?.user) {
        const resolvedRole = await resolveRole(data.session.user, data.session);
        if (!active) return;
        setRole(resolvedRole);
      }
      setInitializing(false);
    }

    init();

  const { data: authListener } = typedClient.auth.onAuthStateChange(async (_event: AuthChangeEvent, nextSession: Session | null) => {
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
      if (nextSession?.user) {
        const resolvedRole = await resolveRole(nextSession.user, nextSession);
        setRole(resolvedRole);
      } else {
        setRole(null);
      }
      setInitializing(false);
    });

    return () => {
      active = false;
      authListener?.subscription.unsubscribe();
    };
  }, [supabase]);

  const refreshRole = useCallback(async () => {
    if (!supabase || !user || !session) return null;
    const resolved = await resolveRole(user, session, { forceBackend: true });
    setRole(resolved);
    return resolved;
  }, [supabase, session, user]);

  const login = useCallback(async ({ email, password }: LoginParams): Promise<AuthResult> => {
    if (!supabase) {
      return { success: false, role: null, message: SUPABASE_CONFIG_ERROR };
    }
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return { success: false, role: null, message: error.message };
    }

    const activeUser = data.user ?? null;
    const activeSession = data.session ?? null;
    setUser(activeUser);
    setSession(activeSession);

    if (!activeUser || !activeSession) {
      return {
        success: true,
        role: null,
        requiresEmailConfirmation: true,
        message: 'Check your email to confirm sign-in.',
      };
    }

    let resolvedRole = await resolveRole(activeUser, activeSession, { forceBackend: true });
    if (!resolvedRole) {
      resolvedRole = await resolveRole(activeUser, activeSession);
    }
    setRole(resolvedRole);

    return { success: true, role: resolvedRole };
  }, [supabase]);

  const signup = useCallback(async (params: SignupParams): Promise<AuthResult> => {
    if (!supabase) {
      return { success: false, role: null, message: SUPABASE_CONFIG_ERROR };
    }
    const { email, password, firstName, lastName, role: desiredRole } = params;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          firstName,
          lastName,
          role: desiredRole,
        },
      },
    });

    if (error) {
      return { success: false, role: null, message: error.message };
    }

    const createdUser = data.user ?? null;
    const newSession = data.session ?? null;

    if (createdUser && newSession) {
      setUser(createdUser);
      setSession(newSession);
      setRole(desiredRole);

      // Profile creation is handled by Supabase triggers/functions
      console.log('User profile created with role:', desiredRole);
    }

    return {
      success: true,
      role: desiredRole,
      requiresEmailConfirmation: !newSession,
      message: !newSession ? 'Check your email to confirm your account before signing in.' : undefined,
    };
  }, [supabase]);

  const logout = useCallback(async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setRole(null);
  }, [supabase]);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    role,
    session,
    initializing,
    login,
    signup,
    logout,
    refreshRole,
  }), [user, role, session, initializing, login, signup, logout, refreshRole]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}

async function resolveRole(user: User, session: Session, options?: { forceBackend?: boolean }): Promise<UserRole | null> {
  const metadataRole = (user.user_metadata?.role ?? user.app_metadata?.role) as unknown;
  const jwtRole = extractRoleFromJWT(session.access_token);
  const fallbackRole = [metadataRole, jwtRole].find(isUserRole) ?? null;

  if (!options?.forceBackend && fallbackRole) {
    return fallbackRole;
  }

  // Role is determined from Supabase user metadata only
  console.log('Using fallback role from Supabase metadata:', fallbackRole);

  return fallbackRole;
}

function extractRoleFromJWT(accessToken: string | undefined) {
  if (!accessToken) return null;
  try {
    const [, payloadBase64] = accessToken.split('.');
    if (!payloadBase64) return null;
    const payloadJson = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'));
    const payload = JSON.parse(payloadJson);
    return payload?.user_role ?? payload?.role ?? null;
  } catch (error) {
    console.warn('Failed to parse JWT for role:', error);
    return null;
  }
}

export { getDashboardRoute };
