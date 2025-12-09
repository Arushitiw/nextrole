import { CheckCircle, TrendingUp } from "lucide-react";

const HeroMockup = () => {
  return (
    <div className="perspective-1000">
      <div className="animate-float transform-3d">
        <div className="glass-card p-6 w-72 glow-indigo">
          {/* Score Header */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-muted-foreground">Match Score</span>
            <TrendingUp className="w-4 h-4 text-success" />
          </div>

          {/* Score Display */}
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-32 h-32">
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
                  stroke="url(#scoreGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="240 283"
                  className="animate-score-fill"
                />
                <defs>
                  <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold gradient-text">85%</span>
              </div>
            </div>
          </div>

          {/* Skills Preview */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-success" />
              <span className="text-sm text-foreground">React & TypeScript</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-success" />
              <span className="text-sm text-foreground">3+ years experience</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-success" />
              <span className="text-sm text-foreground">Team Leadership</span>
            </div>
          </div>

          {/* Company Tag */}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-primary/30 flex items-center justify-center">
                <span className="text-xs font-bold text-primary">V</span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Vercel</p>
                <p className="text-xs text-muted-foreground">Senior Engineer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroMockup;
