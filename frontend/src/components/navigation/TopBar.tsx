import { Menu, Bell, Moon, SunMedium, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../context/AuthContext';
import { USER_ROLE_LABELS } from '../../types/auth';

export function TopBar({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  const { theme, toggleTheme } = useTheme();
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();

  const initials = useMemo(() => {
    const name = `${user?.user_metadata?.firstName ?? ''} ${user?.user_metadata?.lastName ?? ''}`.trim() || user?.email || 'U';
    return name
      .split(' ')
      .filter(Boolean)
      .map(part => part[0]?.toUpperCase())
      .slice(0, 2)
      .join('');
  }, [user]);

  async function handleLogout() {
    await logout();
    navigate('/login', { replace: true });
  }

  return (
    <header className="h-16 backdrop-blur-xl bg-slate-950/60 border-b border-white/10 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-3">
        <button onClick={onToggleSidebar} className="md:hidden btn-outline h-9 w-9 p-0"><Menu size={18} /></button>
        <h1 className="text-sm font-semibold tracking-wide gradient-text">Dashboard</h1>
      </div>
      <div className="flex items-center gap-2">
        <button className="btn-outline h-9 w-9 p-0" aria-label="Notifications">
          <Bell size={18} />
        </button>
        <button onClick={toggleTheme} className="btn-outline h-9 w-9 p-0" aria-label="Toggle theme">
          {theme === 'dark' ? <SunMedium size={18} /> : <Moon size={18} />}
        </button>
        <div className="h-8 w-px bg-white/10" />
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold">
            {initials || 'U'}
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-xs font-medium text-slate-200 truncate max-w-[120px]">{user?.email ?? 'Signed out'}</div>
            {role && <div className="text-[10px] text-slate-500">{USER_ROLE_LABELS[role]}</div>}
          </div>
        </div>
        <button onClick={handleLogout} className="btn-outline h-9 px-3 text-xs font-semibold flex items-center gap-1" aria-label="Logout">
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
