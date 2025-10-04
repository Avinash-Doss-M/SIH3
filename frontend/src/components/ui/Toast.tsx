import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface Toast {
  id: string;
  title?: string;
  message: string;
  variant?: 'default' | 'success' | 'error' | 'warning';
  duration?: number; // ms
}

interface ToastContextValue {
  push: (toast: Omit<Toast, 'id'>) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = crypto.randomUUID();
    setToasts(prev => [...prev, { id, duration: 4000, variant: 'default', ...toast }]);
  }, []);

  useEffect(() => {
    const timers = toasts.map(t => setTimeout(() => setToasts(prev => prev.filter(p => p.id !== t.id)), t.duration));
    return () => { timers.forEach(clearTimeout); };
  }, [toasts]);

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <ToastViewport toasts={toasts} onClose={id => setToasts(t => t.filter(x => x.id !== id))} />
    </ToastContext.Provider>
  );
}

export function ToastViewport({ toasts, onClose }: { toasts?: Toast[]; onClose?: (id: string) => void }) {
  if (!toasts) return <div id="toast-root" />; // mounted by provider root version
  return (
    <div id="toast-root">
      <AnimatePresence initial={false}>
        {toasts.map(t => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className={`relative overflow-hidden rounded-lg border border-white/10 backdrop-blur-xl p-4 pr-10 shadow-glass text-sm bg-slate-900/70 ${variantClass(t.variant)}`}
          >
            {t.title && <div className="font-semibold mb-1 tracking-wide">{t.title}</div>}
            <div className="leading-snug text-slate-300">{t.message}</div>
            <button
              onClick={() => onClose?.(t.id)}
              className="absolute top-2 right-2 text-slate-400 hover:text-slate-200 transition-colors"
              aria-label="Close toast"
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function variantClass(variant?: Toast['variant']) {
  switch (variant) {
    case 'success': return 'border-emerald-500/30';
    case 'error': return 'border-rose-500/40';
    case 'warning': return 'border-amber-400/40';
    default: return 'border-white/10';
  }
}
