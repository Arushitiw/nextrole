import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, Loader2, Sparkles, X } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { analyzeResumeWithGemini, type AnalysisResult } from "@/services/geminiService";
import AnalysisResults from "@/components/analyze/AnalysisResults";
import Navbar from "@/components/layout/Navbar";
import { useToast } from "@/hooks/use-toast";

const Analyze = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setResumeFile(file);
      
      try {
        // For text files, we can read directly
        if (file.type === 'text/plain') {
          const text = await file.text();
          setResumeText(text);
          toast({
            title: "Resume uploaded",
            description: `Successfully loaded ${file.name}`,
          });
        } else {
          // For PDF/DOCX, show message to paste text manually
          toast({
            title: "File selected",
            description: `${file.name} selected. Please also paste your resume text below for analysis.`,
          });
        }
      } catch (error) {
        toast({
          title: "Error reading file",
          description: "Please paste your resume text manually",
          variant: "destructive",
        });
      }
    }
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
    },
    maxFiles: 1,
  });

  const clearFile = () => {
    setResumeFile(null);
    setResumeText("");
  };

  const handleAnalyze = async () => {
    if (!resumeText.trim() || !jobDescription.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both your resume text and the job description",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setResult(null);

    try {
      const analysisResult = await analyzeResumeWithGemini(resumeText, jobDescription);
      setResult(analysisResult);
      
      toast({
        title: "Analysis complete!",
        description: `Your match score is ${analysisResult.matchScore}%`,
      });
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 pt-24 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            AI Resume <span className="gradient-text">Analyzer</span>
          </h1>
          <p className="text-muted-foreground">
            Powered by Google Gemini AI - Get instant insights on your resume match
          </p>
        </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Resume Upload */}
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Your Resume
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              {...getRootProps()}
              className={cn(
                "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors relative",
                isDragActive 
                  ? "border-primary bg-primary/10" 
                  : "border-border hover:border-primary/50",
                resumeFile && "border-green-500 bg-green-500/10"
              )}
            >
              <input {...getInputProps()} />
              {resumeFile && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    clearFile();
                  }}
                  className="absolute top-2 right-2 p-1 rounded-full bg-background/80 hover:bg-background"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <Upload className={cn(
                "w-8 h-8 mx-auto mb-3",
                resumeFile ? "text-green-500" : "text-muted-foreground"
              )} />
              {resumeFile ? (
                <p className="text-green-500 font-medium">{resumeFile.name}</p>
              ) : isDragActive ? (
                <p>Drop your resume here...</p>
              ) : (
                <div>
                  <p className="font-medium">Drag & drop your resume</p>
                  <p className="text-sm text-muted-foreground">PDF, DOCX, or TXT</p>
                </div>
              )}
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Paste resume text</span>
              </div>
            </div>

            <Textarea
              placeholder="Paste your complete resume text here...

Example:
John Doe
Software Engineer

Experience:
- 3 years of experience with React and TypeScript
- Built REST APIs using Node.js
- Deployed applications on AWS..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              className="min-h-[250px] resize-none"
            />
          </CardContent>
        </Card>

        {/* Job Description */}
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Job Description
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Paste the complete job description here...

Example:
Senior Software Engineer

Requirements:
- 5+ years of experience in software development
- Proficiency in React, TypeScript, and Node.js
- Experience with AWS or GCP
- Strong problem-solving skills..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="min-h-[380px] resize-none"
            />
          </CardContent>
        </Card>
      </div>

      {/* Analyze Button */}
      <div className="flex justify-center mb-8">
        <Button
          size="lg"
          onClick={handleAnalyze}
          disabled={isAnalyzing || !resumeText.trim() || !jobDescription.trim()}
          className="px-8 py-6 text-lg"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Analyze Match
            </>
          )}
        </Button>
      </div>

        {/* Results */}
        {result && <AnalysisResults result={result} />}
      </main>
    </div>
  );
};

export default Analyze;