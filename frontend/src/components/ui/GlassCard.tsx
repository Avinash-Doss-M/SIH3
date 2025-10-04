import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}

export function GlassCard({ children, className = '', interactive }: GlassCardProps) {
  return (
    <motion.div
      whileHover={interactive ? { y: -3 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`relative overflow-hidden rounded-xl card-gradient-border bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-glass ${interactive ? 'cursor-pointer' : ''} ${className}`}
    >
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.08),transparent_60%)]" />
      <div className="relative p-5">{children}</div>
    </motion.div>
  );
}
