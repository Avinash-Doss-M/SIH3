import { apiFetch } from './apiClient';

export async function fetchAdminDashboard() {
  // Replace with your actual backend endpoint
  const res = await apiFetch('/admin/dashboard/');
  return await res.json();
}

export async function fetchAdminReports() {
  // Replace with your actual backend endpoint
  const res = await apiFetch('/admin/reports/');
  return await res.json();
}
