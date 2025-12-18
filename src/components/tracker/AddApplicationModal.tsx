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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2, Briefcase, Calendar, Link, MapPin, DollarSign, FileText } from "lucide-react";
import type { JobStatus, JobApplicationInsert } from "@/types/database";

interface AddApplicationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (job: JobApplicationInsert) => void;
}

const AddApplicationModal = ({ open, onOpenChange, onSave }: AddApplicationModalProps) => {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<JobStatus>("applied");
  const [dateApplied, setDateApplied] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [location, setLocation] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const applicationDate = dateApplied || new Date().toISOString().split('T')[0];

    onSave({
      company,
      role,
      logo: company.charAt(0).toUpperCase(),
      date_applied: applicationDate,
      status,
      job_url: jobUrl || undefined,
      location: location || undefined,
      salary_min: salaryMin ? parseInt(salaryMin) : undefined,
      salary_max: salaryMax ? parseInt(salaryMax) : undefined,
      notes: notes || undefined,
    });

    // Reset form
    setCompany("");
    setRole("");
    setStatus("applied");
    setDateApplied("");
    setJobUrl("");
    setLocation("");
    setSalaryMin("");
    setSalaryMax("");
    setNotes("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto bg-slate-900/95 backdrop-blur-xl border-white/10 shadow-2xl shadow-indigo-500/10">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">
            Add New <span className="gradient-text">Application</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Company Name */}
          <div className="space-y-2">
            <Label htmlFor="company" className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Company Name *
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
              Job Role *
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

          {/* Two Column Layout for Status and Date */}
          <div className="grid grid-cols-2 gap-4">
            {/* Status Dropdown */}
            <div className="space-y-2">
              <Label htmlFor="status" className="text-sm font-medium text-muted-foreground">
                Status
              </Label>
              <Select value={status} onValueChange={(value) => setStatus(value as JobStatus)}>
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
          </div>

          {/* Job URL */}
          <div className="space-y-2">
            <Label htmlFor="jobUrl" className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Link className="w-4 h-4" />
              Job URL
            </Label>
            <Input
              id="jobUrl"
              type="url"
              value={jobUrl}
              onChange={(e) => setJobUrl(e.target.value)}
              placeholder="https://company.com/careers/job-123"
              className="bg-slate-800 border-slate-700 focus:border-primary focus:ring-primary/20 placeholder:text-slate-500"
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Location
            </Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. San Francisco, CA / Remote"
              className="bg-slate-800 border-slate-700 focus:border-primary focus:ring-primary/20 placeholder:text-slate-500"
            />
          </div>

          {/* Salary Range */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Salary Range (Annual)
            </Label>
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="number"
                value={salaryMin}
                onChange={(e) => setSalaryMin(e.target.value)}
                placeholder="Min (e.g. 100000)"
                className="bg-slate-800 border-slate-700 focus:border-primary focus:ring-primary/20 placeholder:text-slate-500"
              />
              <Input
                type="number"
                value={salaryMax}
                onChange={(e) => setSalaryMax(e.target.value)}
                placeholder="Max (e.g. 150000)"
                className="bg-slate-800 border-slate-700 focus:border-primary focus:ring-primary/20 placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Notes
            </Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes about this application..."
              rows={3}
              className="bg-slate-800 border-slate-700 focus:border-primary focus:ring-primary/20 placeholder:text-slate-500 resize-none"
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
