
import { useEffect, useState } from 'react';
import { fetchPlacementDashboard, fetchPlacementDrives } from '../../lib/placementApi';
import { Users, CheckCircle2, TrendingUp, CalendarClock, Building2, Sparkles } from 'lucide-react';

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
    'Active Students': <Users className="text-blue-400" size={24} />,
    'Placed': <CheckCircle2 className="text-green-400" size={24} />,
    'Avg Package': <TrendingUp className="text-purple-400" size={24} />,
    'Upcoming Drives': <CalendarClock className="text-orange-400" size={24} />,
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="stat-card loading-shimmer h-32 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 fade-in">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl animated-gradient">
            <Building2 className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold gradient-text-animated">Placement Cell Dashboard</h1>
            <p className="text-sm opacity-70">Manage student placements and company relationships</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="glass-card border-red-500/30 bg-red-500/10 p-4">
          <div className="flex items-center gap-2 text-red-400">
            <Sparkles size={16} />
            <span className="font-medium">Error</span>
          </div>
          <p className="text-sm mt-1 text-red-300">{error}</p>
        </div>
      )}

      {/* Stats Grid */}
      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s, index) => (
          <div 
            key={s.label} 
            className="stat-card group hover:scale-105"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl glass">
                {iconMap[s.label] || <Users className="text-gray-400" size={24} />}
              </div>
              <div className={`text-xs px-2 py-1 rounded-full glass ${
                s.trend === 'up' ? 'text-green-400' : 
                s.trend === 'down' ? 'text-red-400' : 'text-gray-400'
              }`}>
                {s.delta}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-1">{s.value}</div>
              <div className="text-sm opacity-70">{s.label}</div>
            </div>
          </div>
        ))}
      </section>

      {/* Main Content */}
      <section className="grid gap-8 lg:grid-cols-3">
        {/* Placement Trend Chart */}
        <div className="lg:col-span-2 glass-card chart-container fade-in-delayed">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold gradient-text">Placement Analytics</h2>
            <button className="btn-modern text-xs py-2 px-4">
              View Details
            </button>
          </div>
          <div className="h-64 glass rounded-xl flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 animated-gradient opacity-10"></div>
            <div className="relative z-10 text-center">
              <TrendingUp className="mx-auto mb-3 text-4xl opacity-50" size={48} />
              <p className="text-lg font-medium mb-2">Interactive Chart Coming Soon</p>
              <p className="text-sm opacity-60">Advanced placement analytics and trends</p>
            </div>
          </div>
        </div>

        {/* Drive Schedule */}
        <div className="glass-card fade-in-delayed">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold gradient-text">Upcoming Drives</h2>
            <CalendarClock className="text-orange-400" size={20} />
          </div>
          <div className="space-y-4">
            {drives.length === 0 ? (
              <div className="text-center py-8">
                <Building2 className="mx-auto mb-3 opacity-30" size={32} />
                <p className="text-sm opacity-60">No upcoming drives scheduled</p>
              </div>
            ) : (
              drives.map((drive, index) => (
                <div key={index} className="glass p-4 rounded-xl hover:scale-105 transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{drive.company}</span>
                    <span className="text-xs glass px-2 py-1 rounded-full">{drive.stage}</span>
                  </div>
                  <div className="text-xs opacity-60">{drive.date}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
