import { useState } from 'react';
import type { ReactNode } from 'react';
import { Sidebar } from '../components/navigation/Sidebar';
import { TopBar } from '../components/navigation/TopBar';
import { useAuth } from '../context/AuthContext';

export function DashboardLayout({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const { role } = useAuth();
  return (
    <div className="flex min-h-screen">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} role={role} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar onToggleSidebar={() => setCollapsed(c => !c)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-8 relative">
          <div className="absolute inset-0 animated-gradient opacity-5 pointer-events-none"></div>
          <div className="relative z-10 fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
