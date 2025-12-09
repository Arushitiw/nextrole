import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Mail, Lock, User } from "lucide-react";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock registration - navigate to analyze page
    navigate("/analyze");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-violet-600 via-indigo-600 to-violet-700 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-8 shadow-2xl">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Start Your Journey Today
          </h2>
          <p className="text-white/80 text-center max-w-md">
            Join thousands of job seekers who are landing their dream jobs with AI-powered insights.
          </p>

          <div className="mt-12 grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-3xl font-bold text-white">85%</p>
              <p className="text-sm text-white/70">Match Accuracy</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">2x</p>
              <p className="text-sm text-white/70">Faster Applications</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">Free</p>
              <p className="text-sm text-white/70">To Get Started</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md animate-fade-in">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">NextRole</span>
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-2">Create your account</h1>
          <p className="text-muted-foreground mb-8">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>

          {/* Google Sign Up */}
          <Button
            variant="outline"
            className="w-full mb-6 h-12 bg-white text-slate-900 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
            onClick={() => navigate("/analyze")}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-background text-muted-foreground">or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="input-field pl-11"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input-field pl-11"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field pl-11"
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Must be at least 8 characters</p>
            </div>

            <Button type="submit" variant="default" className="w-full h-12">
              Create Account
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              By creating an account, you agree to our{" "}
              <a href="#" className="text-primary hover:underline">Terms of Service</a>
              {" "}and{" "}
              <a href="#" className="text-primary hover:underline">Privacy Policy</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
