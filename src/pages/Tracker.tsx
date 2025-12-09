import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import JobCard from "@/components/tracker/JobCard";
import { Button } from "@/components/ui/button";
import { mockJobs } from "@/data/mockData";
import { Plus, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

type FilterType = "all" | "applied" | "interviewing";

const Tracker = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filters: { value: FilterType; label: string }[] = [
    { value: "all", label: "All" },
    { value: "applied", label: "Applied" },
    { value: "interviewing", label: "Interviewing" },
  ];

  const filteredJobs = mockJobs.filter((job) => {
    if (activeFilter === "all") return true;
    return job.status === activeFilter;
  });

  // Group jobs by status for Kanban-like visualization
  const appliedJobs = mockJobs.filter((j) => j.status === "applied");
  const interviewingJobs = mockJobs.filter((j) => j.status === "interviewing");
  const closedJobs = mockJobs.filter((j) => j.status === "rejected" || j.status === "offered");

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
                {mockJobs.length} applications tracked
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="default">
                <Plus className="w-4 h-4" />
                Add Application
              </Button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 mb-8 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <Filter className="w-4 h-4 text-muted-foreground" />
            <div className="flex rounded-lg bg-secondary p-1">
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
          {activeFilter === "all" && (
            <div className="grid md:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
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
                      <JobCard job={job} />
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
                      <JobCard job={job} />
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
                      <JobCard job={job} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Grid View for Filtered Results */}
          {activeFilter !== "all" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job, index) => (
                <div
                  key={job.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <JobCard job={job} />
                </div>
              ))}
              {filteredJobs.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">No applications found in this category.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Tracker;
