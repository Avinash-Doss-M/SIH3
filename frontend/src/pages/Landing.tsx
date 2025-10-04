import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { ArrowRight, GraduationCap, Users, Briefcase, MonitorCheck } from 'lucide-react';
import { useAuth, getDashboardRoute } from '../context/AuthContext';

export function Landing() {
  const navigate = useNavigate();
  const { session, role } = useAuth();

  useEffect(() => {
    if (session && role) {
      navigate(getDashboardRoute(role), { replace: true });
    }
  }, [session, role, navigate]);

  const roles = [
    { title: 'Students', color: 'from-blue-500/30 to-indigo-500/30', icon: GraduationCap, path: '/login?role=student', desc: 'Discover internships, jobs & build your career footprint.' },
    { title: 'Employers', color: 'from-emerald-500/30 to-teal-500/30', icon: Briefcase, path: '/login?role=employer', desc: 'Post openings & engage with qualified candidates.' },
    { title: 'Mentors', color: 'from-purple-500/30 to-fuchsia-500/30', icon: Users, path: '/login?role=mentor', desc: 'Guide students and track mentoring outcomes.' },
    { title: 'Placement Cell', color: 'from-amber-500/30 to-orange-500/30', icon: MonitorCheck, path: '/login?role=placement', desc: 'Coordinate drives & monitor placement analytics.' },
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(56,189,248,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.12),transparent_60%)]" />
      </div>
      <div className="max-w-5xl mx-auto text-center space-y-10">
        <div className="space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold tracking-tight gradient-text"
          >
            Campus Internship & Placement Portal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base md:text-lg text-slate-300/90 max-w-2xl mx-auto leading-relaxed"
          >
            A unified, data-driven platform enabling students, mentors, employers and placement teams to collaborate efficiently and accelerate hiring outcomes.
          </motion.p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {roles.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.05 }}
            >
              <Link to={r.path} className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 rounded-xl">
                <GlassCard interactive className="h-full">
                  <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${r.color} flex items-center justify-center mb-4 shadow-inner shadow-black/30`}> <r.icon className="text-slate-100" size={20} /> </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold tracking-wide text-slate-100 group-hover:gradient-text transition-colors">{r.title}</h3>
                    <p className="text-sm text-slate-400 leading-snug">{r.desc}</p>
                    <div className="flex items-center text-xs font-medium text-blue-400/80 group-hover:text-blue-300 pt-1">Enter Portal <ArrowRight size={14} className="ml-1" /></div>
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
