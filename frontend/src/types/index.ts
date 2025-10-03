export type Role = "student" | "mentor" | "employer" | "placement_cell" | "admin";

export interface Profile {
  id: string;
  role: Role;
  full_name: string;
  department?: string;
  skills?: string[];
  resume_url?: string;
  cover_letter_url?: string;
  badges?: string[];
}

export interface InternshipPosting {
  id: string;
  title: string;
  department: string;
  stipend: number;
  conversion_chance: number;
  tags: string[];
  mentor_id: string;
  employer_id: string;
}

export interface ApplicationStats {
  applied: number;
  interviews: number;
  offers: number;
  conversions: number;
}
