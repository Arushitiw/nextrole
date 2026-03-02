import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import JobCard from "@/components/tracker/JobCard";
import AddApplicationModal from "@/components/tracker/AddApplicationModal";
import { Button } from "@/components/ui/button";
import { Plus, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { JobApplication, JobStatus, JobApplicationInsert } from "@/types/database";

type FilterType = "all" | "applied" | "interviewing" | "offered" | "rejected";

const Tracker = () => {
  const [jobs, setJobs] = useState<JobApplication[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const appliedJobs = jobs.filter((j) => j.status === "applied");
  const interviewingJobs = jobs.filter((j) => j.status === "interviewing");
  const offeredJobs = jobs.filter((j) => j.status === "offered");
  const closedJobs = jobs.filter((j) => j.status === "rejected");

  const handleAddJob = (newJob: JobApplicationInsert) => {
    const created: JobApplication = {
      ...newJob,
      id: crypto.randomUUID(),
      logo: newJob.logo || newJob.company.charAt(0).toUpperCase(),
      status: newJob.status || "applied",
      date_applied: newJob.date_applied || new Date().toISOString().split("T")[0],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setJobs((prev) => [created, ...prev]);
    toast.success("Application added successfully!");
  };

  const handleUpdateStatus = (id: string, status: JobStatus) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === id ? { ...job, status, updated_at: new Date().toISOString() } : job
      )
    );
    toast.success("Status updated!");
  };

  const handleDeleteJob = (id: string) => {
    setJobs((prev) => prev.filter((job) => job.id !== id));
    toast.success("Application deleted");
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

          {/* Filter Tabs */}
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

          {/* Kanban Board View */}
          {activeFilter === "all" && jobs.length > 0 && (
            <div className="grid md:grid-cols-4 gap-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
              {[
                { label: "Applied", color: "bg-primary", items: appliedJobs },
                { label: "Interviewing", color: "bg-success", items: interviewingJobs },
                { label: "Offered", color: "bg-violet-500", items: offeredJobs },
                { label: "Closed", color: "bg-muted-foreground", items: closedJobs },
              ].map((col) => (
                <div key={col.label}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className={cn("w-3 h-3 rounded-full", col.color)} />
                    <h2 className="font-semibold text-foreground">{col.label}</h2>
                    <span className="text-sm text-muted-foreground">({col.items.length})</span>
                  </div>
                  <div className="space-y-4">
                    {col.items.map((job, index) => (
                      <div key={job.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                        <JobCard job={job} onDelete={handleDeleteJob} onStatusChange={handleUpdateStatus} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Grid View for Filtered Results */}
          {activeFilter !== "all" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job, index) => (
                <div key={job.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
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
          {jobs.length === 0 && (
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

      <AddApplicationModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSave={handleAddJob}
      />
    </div>
  );
};

export default Tracker;
