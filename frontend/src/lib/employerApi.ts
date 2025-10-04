import { apiFetch } from './apiClient';

export async function fetchEmployerDashboard() {
  // Replace with your actual backend endpoint
  const res = await apiFetch('/employer/dashboard/');
  return await res.json();
}

export async function fetchEmployerCandidates() {
  // Replace with your actual backend endpoint
  const res = await apiFetch('/employer/candidates/');
  return await res.json();
}
