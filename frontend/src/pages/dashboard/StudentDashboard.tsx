
import { useEffect, useState } from 'react';
import { fetchStudentDashboard, fetchStudentApplications, fetchStudentReminders } from '../../lib/studentApi';
import { Briefcase, TrendingUp, CheckCircle2, Clock } from 'lucide-react';
import { StatCard } from '../../components/ui/StatCard';
import { GlassCard } from '../../components/ui/GlassCard';

export default function StudentDashboard() {
  const [stats, setStats] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [reminders, setReminders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const statsData = await fetchStudentDashboard();
        setStats(statsData.stats || []);
        const appsData = await fetchStudentApplications();
        setApplications(appsData.applications || []);
        const remindersData = await fetchStudentReminders();
        setReminders(remindersData.reminders || []);
      } catch (e: any) {
        setError(e.message || 'Failed to load dashboard data');
      }
      setLoading(false);
    }
    load();
  }, []);

  // fallback icons for stats
  const iconMap: Record<string, React.ReactNode> = {
    Applications: <Briefcase size={18} />,
    Interviews: <Clock size={18} />,
    Offers: <CheckCircle2 size={18} />,
    'Profile Score': <TrendingUp size={18} />,
  };

  return (
    <div className="space-y-8">
      {error && <div className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/30 rounded-md px-3 py-2">{error}</div>}
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(s => (
          <StatCard key={s.label} {...s} icon={iconMap[s.label] || <Briefcase size={18} />} />
        ))}
      </section>
      <section className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold tracking-wide text-slate-300">Recent Applications</h2>
            <button className="text-xs text-blue-400 hover:text-blue-300">View all</button>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table min-w-full">
              <thead><tr><th>Role</th><th>Status</th><th className="hidden md:table-cell">Company</th><th className="hidden md:table-cell">Updated</th></tr></thead>
              <tbody className="align-top">
                {applications.map(app => (
                  <tr key={app.id}>
                    <td>{app.role}</td>
                    <td><span className="text-xs font-medium" style={{ color: app.statusColor }}>{app.status}</span></td>
                    <td className="hidden md:table-cell">{app.company}</td>
                    <td className="hidden md:table-cell">{app.updated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-[10px] text-slate-500">{loading ? 'Loading...' : applications.length === 0 ? 'No applications found.' : ''}</div>
        </GlassCard>
        <GlassCard>
          <h2 className="text-sm font-semibold tracking-wide text-slate-300 mb-4">Upcoming Deadlines</h2>
          <ul className="space-y-3 text-sm">
            {reminders.map((r, i) => (
              <li key={i} className="flex items-center justify-between"><span className="text-slate-300">{r.title}</span><span className="text-xs text-slate-500">{r.date}</span></li>
            ))}
          </ul>
          <div className="mt-4 text-[10px] text-slate-500">{loading ? 'Loading...' : reminders.length === 0 ? 'No reminders.' : ''}</div>
        </GlassCard>
      </section>
    </div>
  );
}
