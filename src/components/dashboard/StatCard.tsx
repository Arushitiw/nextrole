import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  suffix?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  variant?: "default" | "success" | "warning" | "primary";
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  suffix,
  variant = "default",
}: StatCardProps) => {
  const variantStyles = {
    default: "text-foreground",
    success: "text-success",
    warning: "text-warning",
    primary: "text-primary",
  };

  const iconBgStyles = {
    default: "bg-secondary",
    success: "bg-success/20",
    warning: "bg-warning/20",
    primary: "bg-primary/20",
  };

  return (
    <div className="stat-card">
      <div className="flex items-start justify-between mb-4">
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", iconBgStyles[variant])}>
          <Icon className={cn("w-6 h-6", variantStyles[variant])} />
        </div>
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-1">{title}</p>
        <p className={cn("text-3xl font-bold", variantStyles[variant])}>
          {value}
          {suffix && <span className="text-lg ml-1">{suffix}</span>}
        </p>
      </div>
    </div>
  );
};

export default StatCard;
