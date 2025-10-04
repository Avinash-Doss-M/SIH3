import { User, Briefcase, GraduationCap, LayoutDashboard, Menu, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import type { SidebarLink } from './types';
import type { UserRole } from '../../types/auth';

const links: SidebarLink[] = [
  { label: 'Overview', icon: LayoutDashboard, to: '/dashboard/student', roles: ['student', 'mentor', 'employer', 'placement', 'admin'] },
  { label: 'Applications', icon: Briefcase, to: '/dashboard/student', roles: ['student', 'placement'] },
  { label: 'Mentorship', icon: Users, to: '/dashboard/mentor', roles: ['mentor', 'placement'] },
  { label: 'Students', icon: GraduationCap, to: '/dashboard/placement', roles: ['mentor', 'placement', 'admin'] },
  { label: 'Company Insights', icon: Briefcase, to: '/dashboard/employer', roles: ['employer', 'placement'] },
  { label: 'Profile', icon: User, to: '/dashboard/student', roles: ['student', 'mentor', 'employer', 'placement', 'admin'] },
];

export function Sidebar({ collapsed, onToggle, role }: { collapsed: boolean; onToggle: () => void; role: UserRole | null }) {
  const effectiveRole: UserRole = role ?? 'student';
  const filteredLinks = links.filter(link => link.roles.includes(effectiveRole));

  return (
    <aside className={`relative group transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} hidden md:flex flex-col border-r border-white/10 bg-gradient-to-b from-slate-950/80 to-slate-900/60 backdrop-blur-xl`}>
      <div className="flex items-center h-16 px-4 border-b border-white/5">
        <button onClick={onToggle} className="btn-outline h-8 w-8 p-0 flex items-center justify-center text-slate-300">
          <Menu size={18} />
        </button>
        {!collapsed && <span className="ml-3 font-semibold tracking-wide gradient-text">Campus Portal</span>}
      </div>
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="px-2 space-y-1">
          {filteredLinks.map(item => (
            <li key={item.label}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors group/item ${
                    isActive ? 'bg-white/10 text-white' : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <item.icon size={18} className="opacity-80 group-hover/item:opacity-100" />
                {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-white/5 text-xs text-slate-500">
        {!collapsed && (
          <>Role: <span className="text-slate-300 capitalize">{effectiveRole}</span></>
        )}
      </div>
    </aside>
  );
}
