import { assertSupabaseClient, getSupabaseClient, isSupabaseConfigured } from './supabaseClient';
import type { UserRole } from '../types/auth';

export interface DashboardStats {
  label: string;
  value: string | number;
  delta: string;
  trend: 'up' | 'down' | 'neutral';
}

export interface DashboardStatInput {
  label: string;
  value: string | number;
  delta?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export interface PlacementDrive {
  id?: string;
  company: string;
  date: string;
  stage: string;
  location?: string;
  notes?: string;
}

type Trend = DashboardStats['trend'];
type DashboardRole = UserRole;

type DashboardStatsRow = {
  label: string;
  value_text: string | null;
  value_numeric: number | null;
  delta: string | null;
  trend: Trend | null;
};

type PlacementDriveRow = {
  id: string;
  company: string;
  stage: string;
  drive_date: string | null;
  location: string | null;
  notes: string | null;
};

const DEFAULT_STATS: Record<DashboardRole, DashboardStats[]> = {
  student: [
    { label: 'Applications', value: 12, delta: '+3', trend: 'up' },
    { label: 'Interviews', value: 4, delta: '+1', trend: 'up' },
    { label: 'Offers', value: 2, delta: '+2', trend: 'up' },
    { label: 'Profile Views', value: 89, delta: '+15', trend: 'up' },
  ],
  mentor: [
    { label: 'Assigned Students', value: 18, delta: '+3', trend: 'up' },
    { label: 'Active Sessions', value: 5, delta: '2 today', trend: 'neutral' },
    { label: 'Reviews Completed', value: 42, delta: '+6', trend: 'up' },
    { label: 'Avg Progress', value: '74%', delta: '+2%', trend: 'up' },
  ],
  employer: [
    { label: 'Job Posts', value: 8, delta: '+2', trend: 'up' },
    { label: 'Applications', value: 156, delta: '+24', trend: 'up' },
    { label: 'Shortlisted', value: 32, delta: '+8', trend: 'up' },
    { label: 'Hired', value: 12, delta: '+4', trend: 'up' },
  ],
  placement: [
    { label: 'Active Students', value: 320, delta: '+12', trend: 'up' },
    { label: 'Placed', value: 142, delta: '+9', trend: 'up' },
    { label: 'Avg Package', value: '6.2 LPA', delta: '+0.4', trend: 'up' },
    { label: 'Upcoming Drives', value: 5, delta: '2 this week', trend: 'neutral' },
  ],
  admin: [
    { label: 'Total Users', value: 1250, delta: '+45', trend: 'up' },
    { label: 'Active Sessions', value: 89, delta: '+12', trend: 'up' },
    { label: 'System Health', value: '99.2%', delta: '+0.1%', trend: 'up' },
    { label: 'Data Usage', value: '2.4 GB', delta: '+0.3 GB', trend: 'neutral' },
  ],
};

const DEFAULT_DRIVES: PlacementDrive[] = [
  { company: 'TechCorp', date: '14 Feb', stage: 'Round 1', location: 'Auditorium A' },
  { company: 'DataWorks', date: '17 Feb', stage: 'Aptitude', location: 'Hall B' },
  { company: 'CloudNova', date: '21 Feb', stage: 'Registration', location: 'Online' },
];

const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short' };

function coerceStatValue(record: DashboardStatsRow): string | number {
  if (record.value_numeric !== null && record.value_numeric !== undefined) {
    return Number(record.value_numeric);
  }
  if (record.value_text) {
    return record.value_text;
  }
  return '';
}

function coerceDelta(delta: string | null): string {
  return delta ?? '';
}

function coerceTrend(trend: Trend | null): Trend {
  if (trend === 'up' || trend === 'down' || trend === 'neutral') {
    return trend;
  }
  return 'neutral';
}

function formatDriveDate(value: string | null): string {
  if (!value) {
    return '';
  }
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }
  return parsed.toLocaleDateString('en-IN', DATE_FORMAT_OPTIONS);
}

function normalizeDriveDate(value: string | undefined): string | null {
  if (!value) {
    return null;
  }
  const parsed = new Date(value);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toISOString().slice(0, 10);
  }
  // Try appending current year for shorthand formats like "14 Feb"
  const withYear = `${value} ${new Date().getFullYear()}`;
  const parsedWithYear = new Date(withYear);
  if (!Number.isNaN(parsedWithYear.getTime())) {
    return parsedWithYear.toISOString().slice(0, 10);
  }
  throw new Error(`Invalid drive date: ${value}`);
}

export class SupabaseDataService {
  private readonly fallbackStats = DEFAULT_STATS;
  private readonly fallbackDrives = DEFAULT_DRIVES;

  constructor() {
    // Initialize Supabase client when available
    getSupabaseClient();
  }

  private async fetchRoleStats(role: DashboardRole): Promise<DashboardStats[]> {
    if (!isSupabaseConfigured()) {
      return this.fallbackStats[role];
    }

    try {
      const supabase = assertSupabaseClient();
      const { data, error } = await supabase
        .from('dashboard_stats')
        .select('label, value_text, value_numeric, delta, trend')
        .eq('role', role)
        .order('updated_at', { ascending: false });

      if (error) {
        console.error(`Supabase error fetching ${role} stats:`, error);
        return this.fallbackStats[role];
      }

      if (!data || data.length === 0) {
        return this.fallbackStats[role];
      }

      return data.map((record: DashboardStatsRow) => ({
        label: record.label,
        value: coerceStatValue(record),
        delta: coerceDelta(record.delta),
        trend: coerceTrend(record.trend),
      }));
    } catch (error) {
      console.error(`Failed to fetch ${role} stats from Supabase:`, error);
      return this.fallbackStats[role];
    }
  }

  async getStudentDashboard() {
    const stats = await this.fetchRoleStats('student');
    return { stats };
  }

  async getMentorDashboard() {
    const stats = await this.fetchRoleStats('mentor');
    return { stats };
  }

  async getEmployerDashboard() {
    const stats = await this.fetchRoleStats('employer');
    return { stats };
  }

  async getPlacementDashboard() {
    const stats = await this.fetchRoleStats('placement');
    return { stats };
  }

  async getAdminDashboard() {
    const stats = await this.fetchRoleStats('admin');
    return { stats };
  }

  async upsertDashboardStats(role: DashboardRole, stats: DashboardStatInput[]) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to manage dashboard stats.');
    }

    const supabase = assertSupabaseClient();

    const rows = stats.map((stat) => {
      const isNumber = typeof stat.value === 'number';
      return {
        role,
        label: stat.label,
        value_numeric: isNumber ? Number(stat.value) : null,
        value_text: isNumber ? null : String(stat.value),
        delta: stat.delta ?? null,
        trend: stat.trend ?? 'neutral',
      };
    });

    const { data, error } = await supabase
      .from('dashboard_stats')
      .upsert(rows, { onConflict: 'role,label' })
      .select('label, value_text, value_numeric, delta, trend');

    if (error) {
      console.error('Failed to upsert dashboard stats:', error);
      throw new Error(error.message || 'Unable to save dashboard stats');
    }

    return data?.map((record: DashboardStatsRow) => ({
      label: record.label,
      value: coerceStatValue(record),
      delta: coerceDelta(record.delta),
      trend: coerceTrend(record.trend),
    })) ?? [];
  }

  async deleteDashboardStat(role: DashboardRole, label: string) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not configured. Unable to delete dashboard stats.');
    }

    const supabase = assertSupabaseClient();
    const { error } = await supabase
      .from('dashboard_stats')
      .delete()
      .eq('role', role)
      .eq('label', label);

    if (error) {
      console.error('Failed to delete dashboard stat:', error);
      throw new Error(error.message || 'Unable to delete dashboard stat');
    }

    return { success: true };
  }

  async getPlacementDrives() {
    if (!isSupabaseConfigured()) {
      return { drives: this.fallbackDrives };
    }

    try {
      const supabase = assertSupabaseClient();
      const { data, error } = await supabase
        .from('placement_drives')
        .select('id, company, stage, drive_date, location, notes')
        .order('drive_date', { ascending: true });

      if (error) {
        console.error('Supabase error fetching placement drives:', error);
        return { drives: this.fallbackDrives };
      }

      if (!data || data.length === 0) {
        return { drives: this.fallbackDrives };
      }

      const drives = data.map((record: PlacementDriveRow) => ({
        id: record.id,
        company: record.company,
        stage: record.stage,
        date: formatDriveDate(record.drive_date),
        location: record.location ?? undefined,
        notes: record.notes ?? undefined,
      }));

      return { drives };
    } catch (error) {
      console.error('Failed to fetch placement drives from Supabase:', error);
      return { drives: this.fallbackDrives };
    }
  }

  async createPlacementDrive(drive: Omit<PlacementDrive, 'id'>) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not configured. Unable to create placement drive.');
    }

    const supabase = assertSupabaseClient();
    const driveDate = normalizeDriveDate(drive.date);

    const { data, error } = await supabase
      .from('placement_drives')
      .insert({
        company: drive.company,
        stage: drive.stage,
        drive_date: driveDate,
        location: drive.location ?? null,
        notes: drive.notes ?? null,
      })
      .select('id, company, stage, drive_date, location, notes')
      .single();

    if (error) {
      console.error('Failed to create placement drive:', error);
      throw new Error(error.message || 'Unable to create placement drive');
    }

    return {
      id: data.id,
      company: data.company,
      stage: data.stage,
      date: formatDriveDate(data.drive_date),
      location: data.location ?? undefined,
      notes: data.notes ?? undefined,
    };
  }

  async updatePlacementDrive(id: string, updates: Partial<PlacementDrive>) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not configured. Unable to update placement drive.');
    }

    const supabase = assertSupabaseClient();

    const payload: Record<string, any> = {};
    if (updates.company) payload.company = updates.company;
    if (updates.stage) payload.stage = updates.stage;
    if (updates.date) payload.drive_date = normalizeDriveDate(updates.date);
    if (updates.location !== undefined) payload.location = updates.location ?? null;
    if (updates.notes !== undefined) payload.notes = updates.notes ?? null;

    const { data, error } = await supabase
      .from('placement_drives')
      .update(payload)
      .eq('id', id)
      .select('id, company, stage, drive_date, location, notes')
      .single();

    if (error) {
      console.error('Failed to update placement drive:', error);
      throw new Error(error.message || 'Unable to update placement drive');
    }

    return {
      id: data.id,
      company: data.company,
      stage: data.stage,
      date: formatDriveDate(data.drive_date),
      location: data.location ?? undefined,
      notes: data.notes ?? undefined,
    };
  }

  async deletePlacementDrive(id: string) {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not configured. Unable to delete placement drive.');
    }

    const supabase = assertSupabaseClient();
    const { error } = await supabase
      .from('placement_drives')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Failed to delete placement drive:', error);
      throw new Error(error.message || 'Unable to delete placement drive');
    }

    return { success: true };
  }
}

export const dataService = new SupabaseDataService();