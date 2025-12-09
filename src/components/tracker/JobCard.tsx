import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import type { Job } from "@/data/mockData";

interface JobCardProps {
  job: Job;
  onDelete?: (id: string) => void;
}

const JobCard = ({ job, onDelete }: JobCardProps) => {
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

  const status = statusConfig[job.status];

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete the application for "${job.role}" at ${job.company}?`)) {
      onDelete?.(job.id);
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
        <span className="font-semibold text-foreground">{job.company}</span>
      </div>

      {/* Role */}
      <h3 className="text-lg font-bold text-foreground mb-3">{job.role}</h3>

      {/* Match Score (if available) */}
      {job.matchScore && (
        <div className="mb-3">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-muted-foreground">Match</span>
            <span className={cn(
              "font-medium",
              job.matchScore >= 80 ? "text-success" : job.matchScore >= 60 ? "text-warning" : "text-destructive"
            )}>
              {job.matchScore}%
            </span>
          </div>
          <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500",
                job.matchScore >= 80 ? "bg-success" : job.matchScore >= 60 ? "bg-warning" : "bg-destructive"
              )}
              style={{ width: `${job.matchScore}%` }}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <span className="text-xs text-muted-foreground">{job.dateApplied}</span>
        <span className={cn("inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium", status.className)}>
          {status.label}
        </span>
      </div>
    </div>
  );
};

export default JobCard;
