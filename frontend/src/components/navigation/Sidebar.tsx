import { User, Briefcase, GraduationCap, LayoutDashboard, Menu, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import type { SidebarLink } from './types';
import type { UserRole } from '../../types/auth';
import { getDashboardRoute } from '../../types/auth';

const links: SidebarLink[] = [
  {
    label: 'Overview',
    icon: LayoutDashboard,
    to: (role: UserRole) => getDashboardRoute(role),
    roles: ['student', 'mentor', 'employer', 'placement', 'admin'],
    exact: true,
  },
  {
    label: 'Applications',
    icon: Briefcase,
    to: (role: UserRole) => (role === 'student' ? '/dashboard/student/applications' : '/dashboard/placement/applications'),
    roles: ['student', 'placement'],
  },
  {
    label: 'Mentorship',
    icon: Users,
    to: (role: UserRole) => (role === 'mentor' ? '/dashboard/mentor/mentorship' : '/dashboard/placement/mentorship'),
    roles: ['mentor', 'placement'],
  },
  {
    label: 'Students',
    icon: GraduationCap,
    to: (role: UserRole) => {
      if (role === 'mentor') return '/dashboard/mentor/students';
      if (role === 'placement') return '/dashboard/placement/students';
      return '/dashboard/admin/students';
    },
    roles: ['mentor', 'placement', 'admin'],
  },
  {
    label: 'Company Insights',
    icon: Briefcase,
    to: (role: UserRole) => (role === 'employer' ? '/dashboard/employer/insights' : '/dashboard/placement/insights'),
    roles: ['employer', 'placement'],
  },
  {
    label: 'Profile',
    icon: User,
    to: '/dashboard/profile',
    roles: ['student', 'mentor', 'employer', 'placement', 'admin'],
  },
];

export function Sidebar({ collapsed, onToggle, role }: { collapsed: boolean; onToggle: () => void; role: UserRole | null }) {
  const effectiveRole: UserRole = role ?? 'student';
  const filteredLinks = links.filter(link => link.roles.includes(effectiveRole));

  return (
    <aside className={`relative group transition-all duration-500 ${collapsed ? 'w-16' : 'w-72'} hidden md:flex flex-col glass-card border-r-0 rounded-r-3xl rounded-l-none m-4 mr-0`}>
      <div className="flex items-center h-16 px-6 border-b border-white/10">
        <button 
          onClick={onToggle} 
          className="glass p-2 rounded-xl hover:scale-110 transition-all duration-300"
        >
          <Menu size={18} />
        </button>
        {!collapsed && (
          <span className="ml-4 font-bold text-lg gradient-text-animated">
            Campus Portal
          </span>
        )}
      </div>
      
      <nav className="flex-1 py-6 overflow-y-auto">
        <ul className="px-4 space-y-2">
          {filteredLinks.map((item, index) => {
            const path = typeof item.to === 'function' ? item.to(effectiveRole) : item.to;
            return (
            <li key={item.label} className="fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <NavLink
                to={path}
                end={item.exact ?? false}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group/item relative overflow-hidden ${
                    isActive 
                      ? 'glass-card text-white shadow-lg' 
                      : 'hover:glass-card hover:scale-105 hover:shadow-md'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <div className="absolute inset-0 animated-gradient opacity-20"></div>
                    )}
                    <div className="relative z-10 flex items-center gap-4">
                      <div className={`p-2 rounded-lg transition-all duration-300 ${
                        isActive ? 'glass text-white' : 'opacity-70 group-hover/item:opacity-100'
                      }`}>
                        <item.icon size={20} />
                      </div>
                      {!collapsed && (
                        <span className="font-medium">{item.label}</span>
                      )}
                    </div>
                  </>
                )}
              </NavLink>
            </li>
          );})}
        </ul>
      </nav>
      
      <div className="p-6 border-t border-white/10">
        {!collapsed ? (
          <div className="glass p-4 rounded-xl text-center">
            <div className="text-xs opacity-60 mb-1">Current Role</div>
            <div className="text-sm font-medium gradient-text capitalize">{effectiveRole}</div>
          </div>
        ) : (
          <div className="w-8 h-8 mx-auto glass rounded-lg flex items-center justify-center">
            <User size={16} />
          </div>
        )}
      </div>
    </aside>
  );
}
