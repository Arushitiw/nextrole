import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2, Briefcase, Calendar } from "lucide-react";
import type { Job } from "@/data/mockData";

interface AddApplicationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (job: Omit<Job, "id">) => void;
}

const AddApplicationModal = ({ open, onOpenChange, onSave }: AddApplicationModalProps) => {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<Job["status"]>("applied");
  const [dateApplied, setDateApplied] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formattedDate = dateApplied 
      ? new Date(dateApplied).toLocaleDateString("en-US", { 
          month: "short", 
          day: "numeric", 
          year: "numeric" 
        })
      : new Date().toLocaleDateString("en-US", { 
          month: "short", 
          day: "numeric", 
          year: "numeric" 
        });

    onSave({
      company,
      role,
      logo: company.charAt(0).toUpperCase(),
      dateApplied: formattedDate,
      status,
    });

    // Reset form
    setCompany("");
    setRole("");
    setStatus("applied");
    setDateApplied("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-slate-900/95 backdrop-blur-xl border-white/10 shadow-2xl shadow-indigo-500/10">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">
            Add New <span className="gradient-text">Application</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          {/* Company Name */}
          <div className="space-y-2">
            <Label htmlFor="company" className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Company Name
            </Label>
            <Input
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Vercel, Linear, Stripe"
              required
              className="bg-slate-800 border-slate-700 focus:border-primary focus:ring-primary/20 placeholder:text-slate-500"
            />
          </div>

          {/* Job Role */}
          <div className="space-y-2">
            <Label htmlFor="role" className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Job Role
            </Label>
            <Input
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Senior Frontend Engineer"
              required
              className="bg-slate-800 border-slate-700 focus:border-primary focus:ring-primary/20 placeholder:text-slate-500"
            />
          </div>

          {/* Status Dropdown */}
          <div className="space-y-2">
            <Label htmlFor="status" className="text-sm font-medium text-muted-foreground">
              Status
            </Label>
            <Select value={status} onValueChange={(value) => setStatus(value as Job["status"])}>
              <SelectTrigger className="bg-slate-800 border-slate-700 focus:border-success focus:ring-success/20">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="applied" className="focus:bg-slate-700 focus:text-foreground">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    Applied
                  </span>
                </SelectItem>
                <SelectItem value="interviewing" className="focus:bg-slate-700 focus:text-foreground">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-success" />
                    Interviewing
                  </span>
                </SelectItem>
                <SelectItem value="offered" className="focus:bg-slate-700 focus:text-foreground">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-violet-500" />
                    Offered
                  </span>
                </SelectItem>
                <SelectItem value="rejected" className="focus:bg-slate-700 focus:text-foreground">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-muted-foreground" />
                    Closed
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Applied */}
          <div className="space-y-2">
            <Label htmlFor="dateApplied" className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Date Applied
            </Label>
            <Input
              id="dateApplied"
              type="date"
              value={dateApplied}
              onChange={(e) => setDateApplied(e.target.value)}
              className="bg-slate-800 border-slate-700 focus:border-primary focus:ring-primary/20 [color-scheme:dark]"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full mt-6 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white font-semibold py-5 shadow-lg shadow-indigo-500/25 transition-all duration-200"
          >
            Save Application
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddApplicationModal;
