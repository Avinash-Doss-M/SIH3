import type { LucideIcon } from 'lucide-react';
import type { UserRole } from '../../types/auth';

export type SidebarLinkTo = string | ((role: UserRole) => string);

export interface SidebarLink {
  label: string;
  to: SidebarLinkTo;
  icon: LucideIcon;
  roles: UserRole[];
  exact?: boolean;
}

