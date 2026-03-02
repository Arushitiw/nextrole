import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Briefcase, FileText, Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const navLinks = [
    { path: "/analyze", label: "AI Matcher", icon: Sparkles },
    { path: "/tracker", label: "Tracker", icon: Briefcase },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const initials = user?.user_metadata?.display_name
    ? user.user_metadata.display_name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
    : user?.email?.charAt(0).toUpperCase() ?? "U";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-navbar">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center shadow-lg shadow-primary/25 group-hover:shadow-xl group-hover:shadow-primary/30 transition-all duration-300">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-foreground">NextRole</span>
          </Link>

          {user && (
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "gap-2",
                      location.pathname === link.path && "bg-accent text-foreground"
                    )}
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </Button>
                </Link>
              ))}
            </div>
          )}

          <div className="hidden md:flex items-center gap-3">
            {!user ? (
              <>
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="default">Get Started</Button>
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-sm font-semibold text-primary-foreground">
                  {initials}
                </div>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {user ? (
              <>
                {navLinks.map((link) => (
                  <Link key={link.path} to={link.path} onClick={() => setMobileMenuOpen(false)}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start gap-2",
                        location.pathname === link.path && "bg-accent text-foreground"
                      )}
                    >
                      <link.icon className="w-4 h-4" />
                      {link.label}
                    </Button>
                  </Link>
                ))}
                <Button variant="ghost" className="w-full justify-start gap-2" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full">Login</Button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="default" className="w-full">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
