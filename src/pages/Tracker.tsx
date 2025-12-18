import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import JobCard from "@/components/tracker/JobCard";
import AddApplicationModal from "@/components/tracker/AddApplicationModal";
import { Button } from "@/components/ui/button";
import { Plus, Filter, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  getJobApplications,
  createJobApplication,
  updateJobStatus,
  deleteJobApplication,
} from "@/services/jobApplications";
import type { JobApplication, JobStatus, JobApplicationInsert } from "@/types/database";

type FilterType = "all" | "applied" | "interviewing" | "offered" | "rejected";

const Tracker = () => {
  const [jobs, setJobs] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load jobs on mount
  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const applications = await getJobApplications();
      setJobs(applications);
    } catch (error) {
      console.error("Failed to load applications:", error);
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  const filters: { value: FilterType; label: string }[] = [
    { value: "all", label: "All" },
    { value: "applied", label: "Applied" },
    { value: "interviewing", label: "Interviewing" },
    { value: "offered", label: "Offered" },
    { value: "rejected", label: "Closed" },
  ];

  const filteredJobs = jobs.filter((job) => {
    if (activeFilter === "all") return true;
    return job.status === activeFilter;
  });

  // Group jobs by status for Kanban-like visualization
  const appliedJobs = jobs.filter((j) => j.status === "applied");
  const interviewingJobs = jobs.filter((j) => j.status === "interviewing");
  const offeredJobs = jobs.filter((j) => j.status === "offered");
  const closedJobs = jobs.filter((j) => j.status === "rejected");

  const handleAddJob = async (newJob: JobApplicationInsert) => {
    try {
      const created = await createJobApplication(newJob);
      setJobs((prev) => [created, ...prev]);
      toast.success("Application added successfully!");
    } catch (error) {
      console.error("Failed to add application:", error);
      toast.error("Failed to add application");
    }
  };

  const handleUpdateStatus = async (id: string, status: JobStatus) => {
    try {
      const updated = await updateJobStatus(id, status);
      setJobs((prev) => prev.map((job) => (job.id === id ? updated : job)));
      toast.success("Status updated!");
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Failed to update status");
    }
  };

  const handleDeleteJob = async (id: string) => {
    try {
      await deleteJobApplication(id);
      setJobs((prev) => prev.filter((job) => job.id !== id));
      toast.success("Application deleted");
    } catch (error) {
      console.error("Failed to delete application:", error);
      toast.error("Failed to delete application");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 animate-fade-in">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Application <span className="gradient-text">Tracker</span>
              </h1>
              <p className="text-muted-foreground">
                {jobs.length} applications tracked
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="default" onClick={() => setIsModalOpen(true)}>
                <Plus className="w-4 h-4" />
                Add Application
              </Button>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="ml-3 text-muted-foreground">Loading applications...</span>
            </div>
          )}

          {/* Filter Tabs */}
          {!loading && (
            <div className="flex items-center gap-2 mb-8 animate-fade-in" style={{ animationDelay: "100ms" }}>
              <Filter className="w-4 h-4 text-muted-foreground" />
              <div className="flex rounded-lg bg-secondary p-1 flex-wrap">
                {filters.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setActiveFilter(filter.value)}
                    className={cn(
                      "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
                      activeFilter === filter.value
                        ? "bg-card text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Kanban Board View */}
          {!loading && activeFilter === "all" && (
            <div className="grid md:grid-cols-4 gap-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
              {/* Applied Column */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <h2 className="font-semibold text-foreground">Applied</h2>
                  <span className="text-sm text-muted-foreground">({appliedJobs.length})</span>
                </div>
                <div className="space-y-4">
                  {appliedJobs.map((job, index) => (
                    <div key={job.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                      <JobCard job={job} onDelete={handleDeleteJob} onStatusChange={handleUpdateStatus} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Interviewing Column */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-success" />
                  <h2 className="font-semibold text-foreground">Interviewing</h2>
                  <span className="text-sm text-muted-foreground">({interviewingJobs.length})</span>
                </div>
                <div className="space-y-4">
                  {interviewingJobs.map((job, index) => (
                    <div key={job.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                      <JobCard job={job} onDelete={handleDeleteJob} onStatusChange={handleUpdateStatus} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Offered Column */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-violet-500" />
                  <h2 className="font-semibold text-foreground">Offered</h2>
                  <span className="text-sm text-muted-foreground">({offeredJobs.length})</span>
                </div>
                <div className="space-y-4">
                  {offeredJobs.map((job, index) => (
                    <div key={job.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                      <JobCard job={job} onDelete={handleDeleteJob} onStatusChange={handleUpdateStatus} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Closed Column */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-muted-foreground" />
                  <h2 className="font-semibold text-foreground">Closed</h2>
                  <span className="text-sm text-muted-foreground">({closedJobs.length})</span>
                </div>
                <div className="space-y-4">
                  {closedJobs.map((job, index) => (
                    <div key={job.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                      <JobCard job={job} onDelete={handleDeleteJob} onStatusChange={handleUpdateStatus} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Grid View for Filtered Results */}
          {!loading && activeFilter !== "all" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job, index) => (
                <div
                  key={job.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <JobCard job={job} onDelete={handleDeleteJob} onStatusChange={handleUpdateStatus} />
                </div>
              ))}
              {filteredJobs.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">No applications found in this category.</p>
                </div>
              )}
            </div>
          )}

          {/* Empty State */}
          {!loading && jobs.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-primary/30 flex items-center justify-center">
                <Plus className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No applications yet</h3>
              <p className="text-muted-foreground mb-6">Start tracking your job applications by adding your first one.</p>
              <Button onClick={() => setIsModalOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Application
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Add Application Modal */}
      <AddApplicationModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSave={handleAddJob}
      />
    </div>
  );
};

export default Tracker;
