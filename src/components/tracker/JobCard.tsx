import { cn } from "@/lib/utils";
import { Trash2, ExternalLink, ChevronDown } from "lucide-react";
import type { JobApplication, JobStatus } from "@/types/database";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface JobCardProps {
  job: JobApplication;
  onDelete?: (id: string) => void;
  onStatusChange?: (id: string, status: JobStatus) => void;
}

const JobCard = ({ job, onDelete, onStatusChange }: JobCardProps) => {
  const statusConfig = {
    applied: {
      label: "Applied",
      className: "badge-primary",
    },
    interviewing: {
      label: "Interviewing",
      className: "badge-success",
    },
    offered: {
      label: "Offered",
      className: "bg-gradient-to-r from-indigo-500/20 to-violet-500/20 text-indigo-400 border border-primary/30",
    },
    rejected: {
      label: "Closed",
      className: "badge-muted opacity-60",
    },
  };

  const allStatuses: { value: JobStatus; label: string; color: string }[] = [
    { value: "applied", label: "Applied", color: "bg-primary" },
    { value: "interviewing", label: "Interviewing", color: "bg-success" },
    { value: "offered", label: "Offered", color: "bg-violet-500" },
    { value: "rejected", label: "Closed", color: "bg-muted-foreground" },
  ];

  const status = statusConfig[job.status];

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete the application for "${job.role}" at ${job.company}?`)) {
      onDelete?.(job.id);
    }
  };

  const handleStatusChange = (newStatus: JobStatus) => {
    if (newStatus !== job.status) {
      onStatusChange?.(job.id, newStatus);
    }
  };

  // Format date for display
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className={cn("job-card group relative", job.status === "rejected" && "opacity-60")}>
      {/* Delete Button */}
      {onDelete && (
        <button
          onClick={handleDelete}
          className="absolute top-3 right-3 p-1.5 rounded-md text-rose-500 opacity-0 group-hover:opacity-100 hover:bg-rose-500/10 transition-all duration-200 z-10"
          aria-label="Delete application"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}

      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-primary/30 flex items-center justify-center">
          <span className="text-sm font-bold text-primary">{job.logo}</span>
        </div>
        <div className="flex-1">
          <span className="font-semibold text-foreground">{job.company}</span>
          {job.location && (
            <p className="text-xs text-muted-foreground">{job.location}</p>
          )}
        </div>
      </div>

      {/* Role */}
      <h3 className="text-lg font-bold text-foreground mb-2">{job.role}</h3>

      {/* Salary (if available) */}
      {(job.salary_min || job.salary_max) && (
        <p className="text-sm text-muted-foreground mb-3">
          {job.salary_min && job.salary_max
            ? `$${job.salary_min.toLocaleString()} - $${job.salary_max.toLocaleString()}`
            : job.salary_min
            ? `From $${job.salary_min.toLocaleString()}`
            : `Up to $${job.salary_max?.toLocaleString()}`}
        </p>
      )}

      {/* Job URL */}
      {job.job_url && (
        <a
          href={job.job_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-primary hover:underline mb-3"
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink className="w-3 h-3" />
          View Job Posting
        </a>
      )}

      {/* Match Score (if available) */}
      {job.match_score && (
        <div className="mb-3">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-muted-foreground">Match</span>
            <span className={cn(
              "font-medium",
              job.match_score >= 80 ? "text-success" : job.match_score >= 60 ? "text-warning" : "text-destructive"
            )}>
              {job.match_score}%
            </span>
          </div>
          <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500",
                job.match_score >= 80 ? "bg-success" : job.match_score >= 60 ? "bg-warning" : "bg-destructive"
              )}
              style={{ width: `${job.match_score}%` }}
            />
          </div>
        </div>
      )}

      {/* Notes (if available) */}
      {job.notes && (
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{job.notes}</p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <span className="text-xs text-muted-foreground">{formatDate(job.date_applied)}</span>
        
        {onStatusChange ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className={cn(
                "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium cursor-pointer hover:opacity-80 transition-opacity",
                status.className
              )}>
                {status.label}
                <ChevronDown className="w-3 h-3" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
              {allStatuses.map((s) => (
                <DropdownMenuItem
                  key={s.value}
                  onClick={() => handleStatusChange(s.value)}
                  className={cn(
                    "cursor-pointer focus:bg-slate-700",
                    job.status === s.value && "bg-slate-700"
                  )}
                >
                  <span className={cn("w-2 h-2 rounded-full mr-2", s.color)} />
                  {s.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <span className={cn("inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium", status.className)}>
            {status.label}
          </span>
        )}
      </div>
    </div>
  );
};

export default JobCard;
