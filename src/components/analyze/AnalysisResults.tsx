import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, AlertTriangle, Lightbulb, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import ScoreGauge from "./ScoreGauge";
import type { AnalysisResult } from "@/services/geminiService";

interface AnalysisResultsProps {
  result: AnalysisResult;
}

const AnalysisResults = ({ result }: AnalysisResultsProps) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'critical':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'important':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Lightbulb className="w-5 h-5 text-blue-500" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'critical':
        return 'border-red-500/50 bg-red-500/10';
      case 'important':
        return 'border-yellow-500/50 bg-yellow-500/10';
      default:
        return 'border-blue-500/50 bg-blue-500/10';
    }
  };

  return (
    <div className="space-y-6">
      {/* Score Overview */}
      <Card className="bg-card/50 backdrop-blur border-border/50">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <ScoreGauge score={result.matchScore} size="lg" animated />
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-semibold mb-2">Analysis Summary</h3>
              <p className="text-muted-foreground">{result.summary}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills Comparison */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              Matched Skills ({result.matchedSkills.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {result.matchedSkills.length > 0 ? (
                result.matchedSkills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                    {skill}
                  </Badge>
                ))
              ) : (
                <p className="text-muted-foreground text-sm">No direct skill matches found</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-500" />
              Missing Skills ({result.missingSkills.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {result.missingSkills.length > 0 ? (
                result.missingSkills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="bg-red-500/20 text-red-400 border-red-500/30">
                    {skill}
                  </Badge>
                ))
              ) : (
                <p className="text-green-400 text-sm">You have all required skills! 🎉</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Experience Match */}
      <Card className="bg-card/50 backdrop-blur border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-500" />
            Experience Match
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Required</p>
              <p className="font-medium">{result.experienceMatch.required}</p>
            </div>
            <div className={cn(
              "px-3 py-1 rounded-full text-sm font-medium",
              result.experienceMatch.match 
                ? "bg-green-500/20 text-green-400" 
                : "bg-yellow-500/20 text-yellow-400"
            )}>
              {result.experienceMatch.match ? "✓ Match" : "⚠ Gap"}
            </div>
            <div className="flex-1 text-right">
              <p className="text-sm text-muted-foreground">Your Experience</p>
              <p className="font-medium">{result.experienceMatch.yours}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="bg-card/50 backdrop-blur border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {result.recommendations.map((rec) => (
            <div
              key={rec.id}
              className={cn(
                "p-4 rounded-lg border",
                getCategoryColor(rec.category)
              )}
            >
              <div className="flex items-start gap-3">
                {getCategoryIcon(rec.category)}
                <div className="flex-1">
                  <h4 className="font-medium mb-1">{rec.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
                  <div className="bg-background/50 p-2 rounded text-sm">
                    <span className="font-medium text-blue-400">Action: </span>
                    {rec.action}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Keyword Optimization */}
      {result.keywordOptimization.length > 0 && (
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Keyword Optimization</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Consider adding these keywords from the job description to your resume:
            </p>
            <div className="flex flex-wrap gap-2">
              {result.keywordOptimization.map((kw, index) => (
                <Badge key={index} variant="outline" className="bg-blue-500/10 border-blue-500/30">
                  + {kw.keyword}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AnalysisResults;