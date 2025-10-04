
import { useEffect, useState } from 'react';
import { fetchEmployerDashboard, fetchEmployerCandidates } from '../../lib/employerApi';
import { Briefcase, Users, Clock, Sparkles } from 'lucide-react';
import { StatCard } from '../../components/ui/StatCard';
import { GlassCard } from '../../components/ui/GlassCard';

export default function EmployerDashboard() {
  const [stats, setStats] = useState<any[]>([]);
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const statsData = await fetchEmployerDashboard();
        setStats(statsData.stats || []);
        const candidatesData = await fetchEmployerCandidates();
        setCandidates(candidatesData.candidates || []);
      } catch (e: any) {
        setError(e.message || 'Failed to load dashboard data');
      }
      setLoading(false);
    }
    load();
  }, []);

  const iconMap: Record<string, React.ReactNode> = {
    'Open Roles': <Briefcase size={18} />,
    'Applicants': <Users size={18} />,
    'Avg Time to Fill': <Clock size={18} />,
    'Shortlisted': <Sparkles size={18} />,
  };

  return (
    <div className="space-y-8">
      {error && <div className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/30 rounded-md px-3 py-2">{error}</div>}
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(s => <StatCard key={s.label} {...s} icon={iconMap[s.label] || <Briefcase size={18} />} />)}
      </section>
      <section className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4"><h2 className="text-sm font-semibold tracking-wide text-slate-300">Pipeline Snapshot</h2><button className="text-xs text-blue-400 hover:text-blue-300">Manage</button></div>
          <div className="h-56 flex items-center justify-center text-slate-500 text-sm">Pipeline Chart Placeholder</div>
          <div className="mt-4 text-[10px] text-slate-500">{loading ? 'Loading...' : ''}</div>
        </GlassCard>
        <GlassCard>
          <h2 className="text-sm font-semibold tracking-wide text-slate-300 mb-4">Recent Candidates</h2>
          <ul className="space-y-3 text-xs text-slate-300/90">
            {candidates.map((c, i) => (
              <li key={i} className="border-b border-white/5 pb-2">{c.name} – {c.role} – {c.status}</li>
            ))}
          </ul>
          <div className="mt-4 text-[10px] text-slate-500">{loading ? 'Loading...' : candidates.length === 0 ? 'No candidates.' : ''}</div>
        </GlassCard>
      </section>
    </div>
  );
}
