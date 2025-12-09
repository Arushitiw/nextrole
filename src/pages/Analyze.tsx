import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import ScoreGauge from "@/components/analyze/ScoreGauge";
import SkillsChart from "@/components/analyze/SkillsChart";
import { FileText, Upload, Sparkles, Lightbulb } from "lucide-react";
import { mockAnalysisResult } from "@/data/mockData";
import { cn } from "@/lib/utils";

const Analyze = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");

  const handleAnalyze = () => {
    if (!resumeFile || !jobDescription) return;
    
    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              AI Resume <span className="gradient-text">Matcher</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Upload your resume and paste a job description to see how well you match.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Column */}
            <div className="space-y-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
              {/* Resume Upload */}
              <div className="glass-card p-6">
                <label className="block text-sm font-medium text-foreground mb-3">
                  Your Resume
                </label>
                <label className={cn(
                  "dropzone flex flex-col items-center justify-center gap-3",
                  resumeFile && "border-success/50 bg-success/5"
                )}>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {resumeFile ? (
                    <>
                      <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center">
                        <FileText className="w-6 h-6 text-success" />
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-foreground">{resumeFile.name}</p>
                        <p className="text-sm text-muted-foreground">Click to replace</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                        <Upload className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-foreground">Drop your resume here</p>
                        <p className="text-sm text-muted-foreground">PDF, DOC, or DOCX up to 10MB</p>
                      </div>
                    </>
                  )}
                </label>
              </div>

              {/* Job Description */}
              <div className="glass-card p-6">
                <label className="block text-sm font-medium text-foreground mb-3">
                  Job Description
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description here..."
                  rows={8}
                  className="input-field resize-none font-mono text-sm"
                />
              </div>

              {/* Analyze Button */}
              <Button
                onClick={handleAnalyze}
                disabled={!resumeFile || !jobDescription || isAnalyzing}
                className={cn(
                  "w-full h-14 text-lg relative overflow-hidden",
                  isAnalyzing && "animate-pulse"
                )}
                variant="hero"
              >
                {isAnalyzing ? (
                  <>
                    <div className="absolute inset-0 animate-shimmer" />
                    <span className="relative">Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Analyze Match
                  </>
                )}
              </Button>
            </div>

            {/* Results Column */}
            <div className={cn(
              "space-y-6 transition-all duration-500",
              showResults ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
            )}>
              {/* Score Card */}
              <div className="glass-card p-8 text-center glow-success">
                <ScoreGauge score={mockAnalysisResult.score} />
              </div>

              {/* Skills T-Chart */}
              <SkillsChart
                matchedSkills={mockAnalysisResult.matchedSkills}
                missingSkills={mockAnalysisResult.missingSkills}
              />

              {/* Suggestions */}
              <div className="glass-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="w-5 h-5 text-warning" />
                  <h3 className="text-lg font-semibold text-foreground">Suggestions</h3>
                </div>
                <ul className="space-y-3">
                  {mockAnalysisResult.suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-sm text-muted-foreground animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <span className="w-6 h-6 rounded-full bg-warning/20 text-warning flex items-center justify-center flex-shrink-0 text-xs font-medium">
                        {index + 1}
                      </span>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analyze;
