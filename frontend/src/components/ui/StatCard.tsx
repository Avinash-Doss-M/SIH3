import type { ReactNode } from 'react';
import { GlassCard } from './GlassCard';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  delta?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export function StatCard({ label, value, icon, delta, trend = 'neutral' }: StatCardProps) {
  const trendColor = trend === 'up' ? 'text-emerald-400' : trend === 'down' ? 'text-rose-400' : 'text-slate-400';
  return (
    <GlassCard interactive className="h-full">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium tracking-wide text-slate-400 uppercase">{label}</span>
        <div className="text-slate-300 opacity-80">{icon}</div>
      </div>
      <div className="text-2xl font-semibold text-slate-100 leading-tight">{value}</div>
      {delta && <div className={`mt-2 text-xs font-medium ${trendColor}`}>{delta}</div>}
    </GlassCard>
  );
}
