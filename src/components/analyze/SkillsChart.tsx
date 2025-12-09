import { CheckCircle, AlertTriangle } from "lucide-react";

interface SkillsChartProps {
  matchedSkills: string[];
  missingSkills: string[];
}

const SkillsChart = ({ matchedSkills, missingSkills }: SkillsChartProps) => {
  return (
    <div className="glass-card overflow-hidden">
      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
        {/* Matched Skills */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-success" />
            <h3 className="text-lg font-semibold text-foreground">Matched Skills</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {matchedSkills.map((skill, index) => (
              <span
                key={index}
                className="badge-success animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Missing Skills */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-warning" />
            <h3 className="text-lg font-semibold text-foreground">Missing Skills</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {missingSkills.map((skill, index) => (
              <span
                key={index}
                className="badge-warning animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsChart;
