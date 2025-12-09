import Navbar from "@/components/layout/Navbar";
import StatCard from "@/components/dashboard/StatCard";
import { dashboardStats, applicationHistory } from "@/data/mockData";
import { Layers, Activity, Flame, TrendingUp, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Applications",
      value: dashboardStats.totalApplications,
      icon: Layers,
      variant: "default" as const,
    },
    {
      title: "Response Rate",
      value: dashboardStats.responseRate,
      suffix: "%",
      icon: Activity,
      variant: "success" as const,
    },
    {
      title: "Current Streak",
      value: dashboardStats.currentStreak,
      suffix: " days",
      icon: Flame,
      variant: "warning" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Your <span className="gradient-text">Dashboard</span>
            </h1>
            <p className="text-muted-foreground">
              Track your job search progress at a glance.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 animate-fade-in" style={{ animationDelay: "100ms" }}>
            {stats.map((stat, index) => (
              <div key={stat.title} style={{ animationDelay: `${index * 100}ms` }}>
                <StatCard {...stat} />
              </div>
            ))}
          </div>

          {/* Average Match Score */}
          <div className="glass-card p-6 mb-8 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Average Match Score</p>
                  <p className="text-2xl font-bold text-foreground">{dashboardStats.avgMatchScore}%</p>
                </div>
              </div>
              <div className="hidden md:block w-1/2">
                <div className="h-3 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full gradient-primary rounded-full transition-all duration-1000"
                    style={{ width: `${dashboardStats.avgMatchScore}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Application History */}
          <div className="glass-card overflow-hidden animate-fade-in" style={{ animationDelay: "300ms" }}>
            <div className="p-6 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Closed Applications</h2>
              <p className="text-sm text-muted-foreground">Your completed job applications</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Company</th>
                    <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Role</th>
                    <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Date Applied</th>
                    <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Match Score</th>
                    <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {applicationHistory.map((job, index) => (
                    <tr
                      key={job.id}
                      className={cn(
                        "border-b border-border last:border-0 hover:bg-accent/50 transition-colors cursor-pointer animate-fade-in",
                        job.status === "rejected" && "opacity-60"
                      )}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-primary/30 flex items-center justify-center">
                            <span className="text-xs font-bold text-primary">{job.logo}</span>
                          </div>
                          <span className="font-medium text-foreground">{job.company}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-foreground">{job.role}</td>
                      <td className="px-6 py-4 text-muted-foreground">{job.dateApplied}</td>
                      <td className="px-6 py-4">
                        {job.matchScore && (
                          <span className={cn(
                            "font-medium",
                            job.matchScore >= 80 ? "text-success" : job.matchScore >= 60 ? "text-warning" : "text-destructive"
                          )}>
                            {job.matchScore}%
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium",
                          job.status === "offered" 
                            ? "bg-gradient-to-r from-indigo-500/20 to-violet-500/20 text-indigo-400 border border-primary/30"
                            : "bg-muted text-muted-foreground"
                        )}>
                          {job.status === "offered" ? "Offered" : "Closed"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {applicationHistory.length === 0 && (
              <div className="p-12 text-center">
                <p className="text-muted-foreground">No closed applications yet.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
