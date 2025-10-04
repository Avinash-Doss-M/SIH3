import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import type { Location } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from '../../components/ui/Toast';
import { useAuth, getDashboardRoute } from '../../context/AuthContext';
import type { UserRole } from '../../types/auth';

export function LoginPage() {
  const { push } = useToast();
  const { login, session, role, initializing } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const roleHint = (searchParams.get('role') ?? undefined) as UserRole | undefined;
  const redirectFrom = (location.state as { from?: Location } | undefined)?.from;

  useEffect(() => {
    if (session && role) {
      navigate(getDashboardRoute(role), { replace: true });
    }
  }, [session, role, navigate]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const result = await login({ email, password });
    setLoading(false);

    if (!result.success) {
      const message = result.message ?? 'Unable to sign in. Please check your credentials.';
      setError(message);
      push({ title: 'Login failed', message, variant: 'error' });
      return;
    }

    if (result.requiresEmailConfirmation) {
      push({ title: 'Verify email', message: result.message ?? 'Please confirm your email before continuing.', variant: 'warning' });
      return;
    }

    const nextRole = result.role ?? role ?? roleHint ?? 'student';
    const target = (redirectFrom as unknown as { pathname?: string })?.pathname ?? getDashboardRoute(nextRole);
    push({ title: 'Welcome back', message: 'Redirecting to your dashboard...', variant: 'success' });
    navigate(target, { replace: true });
  }

  const disabled = loading || initializing;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md mx-auto">
        <div className="mb-8 text-center space-y-2">
          <h1 className="text-3xl font-bold gradient-text">Welcome Back</h1>
          <p className="text-sm text-slate-400">Sign in to access your personalized dashboard.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5 glass-panel p-6 card-gradient-border">
          {error && <div className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/30 rounded-md px-3 py-2">{error}</div>}
          <div className="form-field">
            <label className="form-label">Email</label>
            <input
              type="email"
              required
              className="form-input"
              placeholder="you@example.com"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
          </div>
          <div className="form-field">
            <label className="form-label">Password</label>
            <input
              type="password"
              required
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
          </div>
          <button disabled={disabled} className="btn-primary w-full h-11 text-sm tracking-wide">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
          <div className="text-center text-xs text-slate-500 pt-2">
            Need an account?{' '}
            <Link to="/register" className="text-blue-400 hover:text-blue-300 font-medium">
              Register
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
