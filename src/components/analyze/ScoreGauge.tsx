import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ScoreGaugeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

const ScoreGauge = ({ score, size = "lg", animated = true }: ScoreGaugeProps) => {
  const [displayScore, setDisplayScore] = useState(animated ? 0 : score);
  
  const sizeClasses = {
    sm: "w-24 h-24",
    md: "w-32 h-32",
    lg: "w-44 h-44",
  };

  const textSizes = {
    sm: "text-2xl",
    md: "text-3xl",
    lg: "text-5xl",
  };

  // Calculate stroke dasharray based on score (circumference = 2 * π * r = 2 * 3.14 * 45 ≈ 283)
  const circumference = 283;
  const strokeDasharray = `${(score / 100) * circumference} ${circumference}`;

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getGradientId = (score: number) => {
    if (score >= 80) return "successGradient";
    if (score >= 60) return "warningGradient";
    return "dangerGradient";
  };

  useEffect(() => {
    if (animated) {
      const duration = 1500;
      const steps = 60;
      const stepValue = score / steps;
      let current = 0;

      const interval = setInterval(() => {
        current += stepValue;
        if (current >= score) {
          setDisplayScore(score);
          clearInterval(interval);
        } else {
          setDisplayScore(Math.round(current));
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }
  }, [score, animated]);

  return (
    <div className="flex flex-col items-center">
      <div className={cn("relative", sizeClasses[size])}>
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="hsl(217 33% 17%)"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={`url(#${getGradientId(score)})`}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={animated ? strokeDasharray : `${(displayScore / 100) * circumference} ${circumference}`}
            className={cn(animated && "transition-all duration-1000 ease-out")}
            style={{
              filter: score >= 80 ? "drop-shadow(0 0 8px hsl(168 76% 40% / 0.5))" : undefined,
            }}
          />
          <defs>
            <linearGradient id="successGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#14b8a6" />
              <stop offset="100%" stopColor="#2dd4bf" />
            </linearGradient>
            <linearGradient id="warningGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
            <linearGradient id="dangerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e11d48" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("font-bold", textSizes[size], getScoreColor(score))}>
            {displayScore}%
          </span>
          <span className="text-xs text-muted-foreground mt-1">Match Score</span>
        </div>
      </div>
    </div>
  );
};

export default ScoreGauge;
