import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from '../../components/ui/Toast';
import { useAuth, getDashboardRoute } from '../../context/AuthContext';
import type { UserRole } from '../../types/auth';

export function RegisterPage() {
  const { push } = useToast();
  const { signup, session, role } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultRole = (searchParams.get('role') ?? 'student') as UserRole;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>(defaultRole);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    if (session && role) {
      navigate(getDashboardRoute(role), { replace: true });
    }
  }, [session, role, navigate]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setInfo(null);

    if (password !== confirmPassword) {
      const message = 'Passwords do not match. Please try again.';
      setError(message);
      push({ title: 'Registration failed', message, variant: 'error' });
      return;
    }

    setLoading(true);
    const result = await signup({
      email,
      password,
      firstName,
      lastName,
      role: selectedRole,
    });
    setLoading(false);

    if (!result.success) {
      const message = result.message ?? 'Unable to create your account. Please try again later.';
      setError(message);
      push({ title: 'Registration failed', message, variant: 'error' });
      return;
    }

    if (result.requiresEmailConfirmation) {
      const message = result.message ?? 'Check your email to confirm your account before signing in.';
      setInfo(message);
      push({ title: 'Confirm your email', message, variant: 'warning' });
      return;
    }

    const nextRole = result.role ?? selectedRole;
    push({ title: 'Account created', message: 'Welcome aboard! Redirecting you to your dashboard...', variant: 'success' });
    navigate(getDashboardRoute(nextRole), { replace: true });
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 md:py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-xl mx-auto">
        <div className="mb-8 text-center space-y-2">
          <h1 className="text-3xl font-bold gradient-text">Create Account</h1>
          <p className="text-sm text-slate-400">Choose your role and begin exploring opportunities.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5 glass-panel p-6 card-gradient-border">
          {error && <div className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/30 rounded-md px-3 py-2">{error}</div>}
          {info && <div className="text-xs text-blue-300 bg-blue-500/10 border border-blue-500/30 rounded-md px-3 py-2">{info}</div>}
          <div className="grid md:grid-cols-2 gap-5">
            <div className="form-field">
              <label className="form-label">First Name</label>
              <input required className="form-input" value={firstName} onChange={event => setFirstName(event.target.value)} />
            </div>
            <div className="form-field">
              <label className="form-label">Last Name</label>
              <input required className="form-input" value={lastName} onChange={event => setLastName(event.target.value)} />
            </div>
          </div>
          <div className="form-field">
            <label className="form-label">Email</label>
            <input type="email" required className="form-input" value={email} onChange={event => setEmail(event.target.value)} />
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="form-field">
              <label className="form-label">Password</label>
              <input type="password" required className="form-input" value={password} onChange={event => setPassword(event.target.value)} />
            </div>
            <div className="form-field">
              <label className="form-label">Confirm Password</label>
              <input type="password" required className="form-input" value={confirmPassword} onChange={event => setConfirmPassword(event.target.value)} />
            </div>
          </div>
          <div className="form-field">
            <label className="form-label">Role</label>
            <select className="form-input" value={selectedRole} onChange={event => setSelectedRole(event.target.value as UserRole)}>
              <option value="student">Student</option>
              <option value="mentor">Mentor</option>
              <option value="employer">Employer</option>
              <option value="placement">Placement Cell</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button disabled={loading} className="btn-primary w-full h-11 text-sm tracking-wide">
            {loading ? 'Creating account...' : 'Register'}
          </button>
          <div className="text-center text-xs text-slate-500 pt-2">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium">
              Sign In
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
