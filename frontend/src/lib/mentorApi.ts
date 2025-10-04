import { dataService } from './dataService';

export async function fetchMentorDashboard() {
  return await dataService.getMentorDashboard();
}

export async function fetchMentorFeedback() {
  // Mock data for now - replace with actual Supabase queries
  return {
    feedback: [
      { student: "John Doe", session: "Career Planning", rating: 4.5, date: "2025-01-15" },
      { student: "Jane Smith", session: "Interview Prep", rating: 5.0, date: "2025-01-12" },
    ]
  };
}
