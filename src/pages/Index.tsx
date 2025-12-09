import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import HeroMockup from "@/components/landing/HeroMockup";
import { ArrowRight, Sparkles, Target, Zap, BarChart3 } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Analysis",
      description: "Get instant feedback on how well your resume matches any job description.",
    },
    {
      icon: Target,
      title: "Skill Gap Detection",
      description: "Identify missing skills and get actionable suggestions to improve your chances.",
    },
    {
      icon: BarChart3,
      title: "Application Tracking",
      description: "Keep all your job applications organized in one beautiful dashboard.",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get results in seconds, not minutes. Analyze multiple jobs effortlessly.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 overflow-hidden">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary mb-6">
                <Sparkles className="w-4 h-4" />
                AI-Powered Job Matching
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                Stop Tracking.
                <br />
                <span className="gradient-text">Start Progressing.</span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                NextRole uses AI to analyze your resume against job descriptions, 
                giving you instant insights on your match score and skill gaps.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button variant="hero" size="xl" className="w-full sm:w-auto">
                    Get Started Free
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="glass" size="xl" className="w-full sm:w-auto">
                    Sign In
                  </Button>
                </Link>
              </div>

              {/* Social Proof */}
              <div className="mt-12 pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground mb-4">Trusted by job seekers worldwide</p>
                <div className="flex items-center gap-8">
                  <div>
                    <p className="text-2xl font-bold text-foreground">50K+</p>
                    <p className="text-xs text-muted-foreground">Resumes Analyzed</p>
                  </div>
                  <div className="h-8 w-px bg-border" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">85%</p>
                    <p className="text-xs text-muted-foreground">Avg Match Improvement</p>
                  </div>
                  <div className="h-8 w-px bg-border" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">4.9★</p>
                    <p className="text-xs text-muted-foreground">User Rating</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Floating Mockup */}
            <div className="hidden lg:flex justify-center lg:justify-end animate-fade-in" style={{ animationDelay: "200ms" }}>
              <HeroMockup />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Land Your{" "}
              <span className="gradient-text">Dream Job</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to streamline your job search and maximize your success rate.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="glass-card p-6 group hover:border-primary/50 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="glass-card p-12 text-center relative overflow-hidden">
            {/* Gradient Orbs */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-violet-500/20 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to Transform Your Job Search?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Join thousands of job seekers who are using NextRole to land their dream positions.
              </p>
              <Link to="/register">
                <Button variant="hero" size="xl">
                  Start For Free
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 NextRole. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
