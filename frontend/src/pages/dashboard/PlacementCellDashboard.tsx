
import { useEffect, useState } from 'react';
import { fetchPlacementDashboard, fetchPlacementDrives } from '../../lib/placementApi';
import { Users, CheckCircle2, TrendingUp, CalendarClock } from 'lucide-react';
import { StatCard } from '../../components/ui/StatCard';
import { GlassCard } from '../../components/ui/GlassCard';

export default function PlacementCellDashboard() {
  const [stats, setStats] = useState<any[]>([]);
  const [drives, setDrives] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const statsData = await fetchPlacementDashboard();
        setStats(statsData.stats || []);
        const drivesData = await fetchPlacementDrives();
        setDrives(drivesData.drives || []);
      } catch (e: any) {
        setError(e.message || 'Failed to load dashboard data');
      }
      setLoading(false);
    }
    load();
  }, []);

  const iconMap: Record<string, React.ReactNode> = {
    'Active Students': <Users size={18} />,
    'Placed': <CheckCircle2 size={18} />,
    'Avg Package': <TrendingUp size={18} />,
    'Upcoming Drives': <CalendarClock size={18} />,
  };

  return (
    <div className="space-y-8">
      {error && <div className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/30 rounded-md px-3 py-2">{error}</div>}
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(s => <StatCard key={s.label} {...s} icon={iconMap[s.label] || <Users size={18} />} />)}
      </section>
      <section className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4"><h2 className="text-sm font-semibold tracking-wide text-slate-300">Placement Trend</h2><button className="text-xs text-blue-400 hover:text-blue-300">Details</button></div>
          <div className="h-56 flex items-center justify-center text-slate-500 text-sm">Trend Chart Placeholder</div>
          <div className="mt-4 text-[10px] text-slate-500">{loading ? 'Loading...' : ''}</div>
        </GlassCard>
        <GlassCard>
          <h2 className="text-sm font-semibold tracking-wide text-slate-300 mb-4">Drive Schedule</h2>
          <ul className="space-y-3 text-xs text-slate-300/90">
            {drives.map((d, i) => (
              <li key={i} className="border-b border-white/5 pb-2">{d.company} – {d.date} – {d.stage}</li>
            ))}
          </ul>
          <div className="mt-4 text-[10px] text-slate-500">{loading ? 'Loading...' : drives.length === 0 ? 'No drives.' : ''}</div>
        </GlassCard>
      </section>
    </div>
  );
}
