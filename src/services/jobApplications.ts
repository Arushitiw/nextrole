import type { JobApplication, JobApplicationInsert, JobApplicationUpdate, JobStatus } from '@/types/database';

// Backend API URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Fetch all job applications
 */
export async function getJobApplications(): Promise<JobApplication[]> {
  try {
    const response = await fetch(`${API_URL}/api/applications`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch applications');
    }
    
    const data = await response.json();
    
    // Map MongoDB _id to id for frontend compatibility
    return data.map((app: any) => ({
      ...app,
      id: app._id || app.id,
    }));
  } catch (error) {
    console.error('Error fetching applications:', error);
    throw error;
  }
}

/**
 * Get a single job application by ID
 */
export async function getJobApplication(id: string): Promise<JobApplication | null> {
  try {
    const response = await fetch(`${API_URL}/api/applications/${id}`);
    
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error('Failed to fetch application');
    }
    
    const data = await response.json();
    return {
      ...data,
      id: data._id || data.id,
    };
  } catch (error) {
    console.error('Error fetching application:', error);
    return null;
  }
}

/**
 * Create a new job application
 */
export async function createJobApplication(application: JobApplicationInsert): Promise<JobApplication> {
  try {
    const response = await fetch(`${API_URL}/api/applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...application,
        logo: application.logo || application.company.charAt(0).toUpperCase(),
        status: application.status || 'applied',
        date_applied: application.date_applied || new Date().toISOString().split('T')[0],
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create application');
    }
    
    const data = await response.json();
    return {
      ...data,
      id: data._id || data.id,
    };
  } catch (error) {
    console.error('Error creating application:', error);
    throw error;
  }
}

/**
 * Update an existing job application
 */
export async function updateJobApplication(id: string, updates: JobApplicationUpdate): Promise<JobApplication> {
  try {
    const response = await fetch(`${API_URL}/api/applications/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update application');
    }
    
    const data = await response.json();
    return {
      ...data,
      id: data._id || data.id,
    };
  } catch (error) {
    console.error('Error updating application:', error);
    throw error;
  }
}

/**
 * Update job application status
 */
export async function updateJobStatus(id: string, status: JobStatus): Promise<JobApplication> {
  try {
    const response = await fetch(`${API_URL}/api/applications/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update status');
    }
    
    const data = await response.json();
    return {
      ...data,
      id: data._id || data.id,
    };
  } catch (error) {
    console.error('Error updating status:', error);
    throw error;
  }
}

/**
 * Delete a job application
 */
export async function deleteJobApplication(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/api/applications/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete application');
    }
  } catch (error) {
    console.error('Error deleting application:', error);
    throw error;
  }
}

/**
 * Get application statistics
 */
export async function getApplicationStats(): Promise<{
  total: number;
  applied: number;
  interviewing: number;
  offered: number;
  rejected: number;
}> {
  try {
    const response = await fetch(`${API_URL}/api/applications/stats/summary`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch stats');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching stats:', error);
    // Return default stats on error
    return {
      total: 0,
      applied: 0,
      interviewing: 0,
      offered: 0,
      rejected: 0,
    };
  }
}
