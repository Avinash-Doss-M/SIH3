
import { useEffect, useState } from 'react';
import { fetchAdminDashboard, fetchAdminReports } from '../../lib/adminApi';
import { Users, Briefcase, TrendingUp, ShieldCheck } from 'lucide-react';
import { StatCard } from '../../components/ui/StatCard';
import { GlassCard } from '../../components/ui/GlassCard';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const statsData = await fetchAdminDashboard();
        setStats(statsData.stats || []);
        const reportsData = await fetchAdminReports();
        setReports(reportsData.reports || []);
      } catch (e: any) {
        setError(e.message || 'Failed to load dashboard data');
      }
      setLoading(false);
    }
    load();
  }, []);

  const iconMap: Record<string, React.ReactNode> = {
    'Total Users': <Users size={18} />,
    'Active Employers': <Briefcase size={18} />,
    'System Health': <ShieldCheck size={18} />,
    'Reports': <TrendingUp size={18} />,
  };

  return (
    <div className="space-y-8">
      {error && <div className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/30 rounded-md px-3 py-2">{error}</div>}
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(s => <StatCard key={s.label} {...s} icon={iconMap[s.label] || <Users size={18} />} />)}
      </section>
      <section className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4"><h2 className="text-sm font-semibold tracking-wide text-slate-300">System Overview</h2></div>
          <div className="h-56 flex items-center justify-center text-slate-500 text-sm">Admin analytics and controls will appear here.</div>
          <div className="mt-4 text-[10px] text-slate-500">{loading ? 'Loading...' : ''}</div>
        </GlassCard>
        <GlassCard>
          <h2 className="text-sm font-semibold tracking-wide text-slate-300 mb-4">Recent Reports</h2>
          <ul className="space-y-3 text-xs text-slate-300/90">
            {reports.map((r, i) => (
              <li key={i} className="border-b border-white/5 pb-2">{r.title} – {r.date}</li>
            ))}
          </ul>
          <div className="mt-4 text-[10px] text-slate-500">{loading ? 'Loading...' : reports.length === 0 ? 'No reports.' : ''}</div>
        </GlassCard>
      </section>
    </div>
  );
}
