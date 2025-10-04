import { apiFetch } from './apiClient';

export async function fetchStudentDashboard() {
  // Replace with your actual backend endpoint
  const res = await apiFetch('/student/dashboard/');
  return await res.json();
}

export async function fetchStudentApplications() {
  // Replace with your actual backend endpoint
  const res = await apiFetch('/student/applications/');
  return await res.json();
}

export async function fetchStudentReminders() {
  // Replace with your actual backend endpoint
  const res = await apiFetch('/student/reminders/');
  return await res.json();
}
