import mongoose, { Document, Schema } from 'mongoose';

export type JobStatus = 'applied' | 'interviewing' | 'offered' | 'rejected';

export interface IJobApplication extends Document {
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
  created_at: Date;
  updated_at: Date;
}

const JobApplicationSchema = new Schema<IJobApplication>(
  {
    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
      maxlength: [100, 'Company name cannot exceed 100 characters'],
    },
    role: {
      type: String,
      required: [true, 'Job role is required'],
      trim: true,
      maxlength: [150, 'Job role cannot exceed 150 characters'],
    },
    logo: {
      type: String,
      default: function(this: IJobApplication) {
        return this.company ? this.company.charAt(0).toUpperCase() : 'J';
      },
    },
    status: {
      type: String,
      enum: ['applied', 'interviewing', 'offered', 'rejected'],
      default: 'applied',
    },
    date_applied: {
      type: String,
      required: [true, 'Application date is required'],
    },
    job_url: {
      type: String,
      trim: true,
    },
    salary_min: {
      type: Number,
      min: [0, 'Salary cannot be negative'],
    },
    salary_max: {
      type: Number,
      min: [0, 'Salary cannot be negative'],
    },
    location: {
      type: String,
      trim: true,
      maxlength: [100, 'Location cannot exceed 100 characters'],
    },
    notes: {
      type: String,
      maxlength: [1000, 'Notes cannot exceed 1000 characters'],
    },
    match_score: {
      type: Number,
      min: [0, 'Match score cannot be negative'],
      max: [100, 'Match score cannot exceed 100'],
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

// Index for better query performance
JobApplicationSchema.index({ status: 1 });
JobApplicationSchema.index({ created_at: -1 });

const JobApplication = mongoose.model<IJobApplication>('JobApplication', JobApplicationSchema);

export default JobApplication;
