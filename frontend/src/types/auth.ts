export type UserRole = 'student' | 'mentor' | 'employer' | 'placement' | 'admin';

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  student: 'Student',
  mentor: 'Mentor',
  employer: 'Employer',
  placement: 'Placement Cell',
  admin: 'Admin',
};

export function isUserRole(value: unknown): value is UserRole {
  return typeof value === 'string' && ['student', 'mentor', 'employer', 'placement', 'admin'].includes(value);
}

export function getDashboardRoute(role: UserRole) {
  switch (role) {
    case 'student':
      return '/dashboard/student';
    case 'mentor':
      return '/dashboard/mentor';
    case 'employer':
      return '/dashboard/employer';
    case 'placement':
      return '/dashboard/placement';
    case 'admin':
      return '/dashboard/admin';
    default:
      return '/';
  }
}
