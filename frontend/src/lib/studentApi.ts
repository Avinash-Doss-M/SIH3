import { dataService } from './dataService';

export async function fetchStudentDashboard() {
  return await dataService.getStudentDashboard();
}

export async function fetchStudentApplications() {
  // Mock data for now - replace with actual Supabase queries
  return {
    applications: [
      { company: "TechCorp", position: "Software Engineer", status: "Pending", date: "2025-01-15" },
      { company: "DataWorks", position: "Data Analyst", status: "Shortlisted", date: "2025-01-10" },
    ]
  };
}

export async function fetchStudentReminders() {
  // Mock data for now - replace with actual Supabase queries
  return {
    reminders: [
      { title: "Interview with TechCorp", date: "2025-01-20", type: "interview" },
      { title: "Submit documents to DataWorks", date: "2025-01-18", type: "document" },
    ]
  };
}
