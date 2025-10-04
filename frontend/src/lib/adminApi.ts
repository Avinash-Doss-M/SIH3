import { dataService } from './dataService';

export async function fetchAdminDashboard() {
  return await dataService.getAdminDashboard();
}

export async function fetchAdminReports() {
  // Mock data for now - replace with actual Supabase queries
  return {
    reports: [
      { title: "Monthly Placement Report", date: "2025-01-01", type: "placement", status: "Ready" },
      { title: "User Activity Report", date: "2025-01-15", type: "activity", status: "Generating" },
    ]
  };
}
