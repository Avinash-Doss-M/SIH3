import { apiFetch } from './apiClient';

export async function fetchMentorDashboard() {
  // Replace with your actual backend endpoint
  const res = await apiFetch('/mentor/dashboard/');
  return await res.json();
}

export async function fetchMentorFeedback() {
  // Replace with your actual backend endpoint
  const res = await apiFetch('/mentor/feedback/');
  return await res.json();
}
