import { apiFetch } from './apiClient';

export async function fetchPlacementDashboard() {
  // Replace with your actual backend endpoint
  const res = await apiFetch('/placement/dashboard/');
  return await res.json();
}

export async function fetchPlacementDrives() {
  // Replace with your actual backend endpoint
  const res = await apiFetch('/placement/drives/');
  return await res.json();
}
