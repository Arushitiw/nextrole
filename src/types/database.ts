export type JobStatus = 'applied' | 'interviewing' | 'offered' | 'rejected';

export interface JobApplication {
  id: string;
  company: string;
  role: string;
  logo: string;
  status: JobStatus;
  date_applied: string;
  job_url?: string;
  salary_min?: number;
  salary_max?: number;
  location?: string;
  notes?: string;
  match_score?: number;
  created_at: string;
  updated_at: string;
}

export interface JobApplicationInsert {
  company: string;
  role: string;
  logo?: string;
  status?: JobStatus;
  date_applied?: string;
  job_url?: string;
  salary_min?: number;
  salary_max?: number;
  location?: string;
  notes?: string;
  match_score?: number;
}

export interface JobApplicationUpdate {
  company?: string;
  role?: string;
  logo?: string;
  status?: JobStatus;
  date_applied?: string;
  job_url?: string;
  salary_min?: number;
  salary_max?: number;
  location?: string;
  notes?: string;
  match_score?: number;
}

export interface Database {
  public: {
    Tables: {
      job_applications: {
        Row: JobApplication;
        Insert: JobApplicationInsert;
        Update: JobApplicationUpdate;
      };
    };
  };
}
