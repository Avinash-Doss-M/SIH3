// Mock Data Service - Simulates backend API calls with local storage
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'mentor' | 'employer' | 'placement' | 'admin';
  createdAt: string;
}

export interface DashboardStats {
  label: string;
  value: string;
  delta: string;
  trend: 'up' | 'down' | 'neutral';
}

export interface PlacementDrive {
  company: string;
  date: string;
  stage: string;
}

// Local Storage Keys
const USERS_KEY = 'campus_portal_users';
const CURRENT_USER_KEY = 'campus_portal_current_user';

// Initialize default data
const initializeDefaultData = () => {
  if (!localStorage.getItem(USERS_KEY)) {
    const defaultUsers: User[] = [
      {
        id: '1',
        email: 'student@example.com',
        firstName: 'John',
        lastName: 'Doe',
        role: 'student',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        email: 'mentor@example.com',
        firstName: 'Jane',
        lastName: 'Smith',
        role: 'mentor',
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        email: 'employer@example.com',
        firstName: 'Mike',
        lastName: 'Johnson',
        role: 'employer',
        createdAt: new Date().toISOString()
      },
      {
        id: '4',
        email: 'placement@example.com',
        firstName: 'Sarah',
        lastName: 'Wilson',
        role: 'placement',
        createdAt: new Date().toISOString()
      },
      {
        id: '5',
        email: 'admin@example.com',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        createdAt: new Date().toISOString()
      }
    ];
    localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
  }
};

// Mock API delay to simulate real API calls
const mockDelay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Authentication API
export const authApi = {
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    await mockDelay();
    
    const users: User[] = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const user = users.find(u => u.email === email);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // In a real app, you'd verify the password here
    // For demo purposes, we'll accept any non-empty password
    if (!password) {
      throw new Error('Password is required');
    }

    const token = btoa(JSON.stringify({ userId: user.id, email: user.email }));
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify({ user, token }));
    
    return { user, token };
  },

  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: User['role'];
  }): Promise<{ user: User; token: string }> {
    await mockDelay();
    
    const users: User[] = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    
    if (users.find(u => u.email === userData.email)) {
      throw new Error('User with this email already exists');
    }

    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role: userData.role,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    const token = btoa(JSON.stringify({ userId: newUser.id, email: newUser.email }));
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify({ user: newUser, token }));

    return { user: newUser, token };
  },

  async logout(): Promise<void> {
    await mockDelay(200);
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  getCurrentUser(): { user: User; token: string } | null {
    const stored = localStorage.getItem(CURRENT_USER_KEY);
    return stored ? JSON.parse(stored) : null;
  }
};

// Dashboard Data API
export const dashboardApi = {
  async getStudentStats(): Promise<{ stats: DashboardStats[] }> {
    await mockDelay();
    return {
      stats: [
        { label: 'Applications Sent', value: '12', delta: '+3', trend: 'up' },
        { label: 'Interviews Scheduled', value: '4', delta: '+2', trend: 'up' },
        { label: 'Profile Views', value: '89', delta: '+15', trend: 'up' },
        { label: 'Skills Completed', value: '7', delta: '+1', trend: 'neutral' }
      ]
    };
  },

  async getMentorStats(): Promise<{ stats: DashboardStats[] }> {
    await mockDelay();
    return {
      stats: [
        { label: 'Assigned Students', value: '18', delta: '+3', trend: 'up' },
        { label: 'Active Sessions', value: '5', delta: '2 today', trend: 'neutral' },
        { label: 'Reviews Completed', value: '42', delta: '+6', trend: 'up' },
        { label: 'Avg Progress', value: '74%', delta: '+2%', trend: 'up' }
      ]
    };
  },

  async getEmployerStats(): Promise<{ stats: DashboardStats[] }> {
    await mockDelay();
    return {
      stats: [
        { label: 'Active Job Posts', value: '8', delta: '+2', trend: 'up' },
        { label: 'Applications Received', value: '156', delta: '+23', trend: 'up' },
        { label: 'Interviews Scheduled', value: '12', delta: '+4', trend: 'up' },
        { label: 'Successful Hires', value: '3', delta: '+1', trend: 'up' }
      ]
    };
  },

  async getPlacementStats(): Promise<{ stats: DashboardStats[] }> {
    await mockDelay();
    return {
      stats: [
        { label: 'Active Students', value: '320', delta: '+12', trend: 'up' },
        { label: 'Placed', value: '142', delta: '+9', trend: 'up' },
        { label: 'Avg Package', value: '6.2 LPA', delta: '+0.4', trend: 'up' },
        { label: 'Upcoming Drives', value: '5', delta: '2 this week', trend: 'neutral' }
      ]
    };
  },

  async getAdminStats(): Promise<{ stats: DashboardStats[] }> {
    await mockDelay();
    return {
      stats: [
        { label: 'Total Users', value: '1,247', delta: '+89', trend: 'up' },
        { label: 'Active Sessions', value: '234', delta: '+12', trend: 'up' },
        { label: 'System Health', value: '99.9%', delta: 'Excellent', trend: 'up' },
        { label: 'Data Processed', value: '2.4TB', delta: '+0.3TB', trend: 'up' }
      ]
    };
  },

  async getPlacementDrives(): Promise<{ drives: PlacementDrive[] }> {
    await mockDelay();
    return {
      drives: [
        { company: 'TechCorp', date: '14 Feb', stage: 'Round 1' },
        { company: 'DataWorks', date: '17 Feb', stage: 'Aptitude' },
        { company: 'CloudNova', date: '21 Feb', stage: 'Registration' },
        { company: 'InnovateLabs', date: '25 Feb', stage: 'Interview' },
        { company: 'FutureTech', date: '28 Feb', stage: 'Final Round' }
      ]
    };
  }
};

// Initialize data when module loads
initializeDefaultData();