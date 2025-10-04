import { Menu, Bell, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { USER_ROLE_LABELS } from '../../types/auth';
import { ThemeToggle } from '../ThemeToggle';

export function TopBar({ onToggleSidebar }: { onToggleSidebar: () => void }) {
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
    <header className="h-16 glass-card border-0 border-b border-white/10 dark:border-white/5 flex items-center justify-between px-4 md:px-6 m-4 mb-0 rounded-b-none">
      <div className="flex items-center gap-3">
        <button 
          onClick={onToggleSidebar} 
          className="md:hidden glass p-2 rounded-xl hover:scale-110 transition-all duration-300"
        >
          <Menu size={18} />
        </button>
        <h1 className="text-lg font-bold tracking-wide gradient-text-animated">Campus Portal</h1>
      </div>
      
      <div className="flex items-center gap-3">
        <button 
          className="glass p-2 rounded-xl hover:scale-110 transition-all duration-300 relative" 
          aria-label="Notifications"
        >
          <Bell size={18} />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse"></div>
        </button>
        
        <ThemeToggle />
        
        <div className="h-6 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        
        <button
          type="button"
          onClick={() => navigate('/dashboard/profile')}
          className="flex items-center gap-3 glass px-3 py-1 rounded-xl hover:scale-105 transition-all duration-300"
          aria-label="Open profile"
        >
          <div className="h-8 w-8 rounded-full animated-gradient flex items-center justify-center text-xs font-bold text-white shadow-lg">
            {initials || 'U'}
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-xs font-medium truncate max-w-[120px]">{user?.email ?? 'Signed out'}</div>
            {role && <div className="text-[10px] opacity-60">{USER_ROLE_LABELS[role]}</div>}
          </div>
        </button>
        
        <button 
          onClick={handleLogout} 
          className="btn-modern text-xs py-2 px-4 flex items-center gap-2 hover:shadow-lg" 
          aria-label="Logout"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
