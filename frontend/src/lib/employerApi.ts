import { dataService } from './dataService';

export async function fetchEmployerDashboard() {
  return await dataService.getEmployerDashboard();
}

export async function fetchEmployerCandidates() {
  // Mock data for now - replace with actual Supabase queries
  return {
    candidates: [
      { name: "John Doe", skills: "React, Node.js", experience: "2 years", status: "Shortlisted" },
      { name: "Jane Smith", skills: "Python, ML", experience: "1 year", status: "Interview" },
    ]
  };
}
