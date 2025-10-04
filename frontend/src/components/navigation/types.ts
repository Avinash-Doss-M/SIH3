import type { LucideIcon } from 'lucide-react';
import type { UserRole } from '../../types/auth';

export interface SidebarLink {
  label: string;
  to: string;
  icon: LucideIcon;
  roles: UserRole[];
}

