export interface Job {
  id: string;
  company: string;
  role: string;
  logo: string;
  dateApplied: string;
  status: "applied" | "interviewing" | "offered" | "rejected";
  matchScore?: number;
}

export interface AnalysisResult {
  score: number;
  matchedSkills: string[];
  missingSkills: string[];
  suggestions: string[];
}

export const mockJobs: Job[] = [
  {
    id: "1",
    company: "Vercel",
    role: "Senior Frontend Engineer",
    logo: "V",
    dateApplied: "Dec 5, 2024",
    status: "interviewing",
    matchScore: 92,
  },
  {
    id: "2",
    company: "Linear",
    role: "Product Designer",
    logo: "L",
    dateApplied: "Dec 3, 2024",
    status: "applied",
    matchScore: 85,
  },
  {
    id: "3",
    company: "Raycast",
    role: "Full Stack Developer",
    logo: "R",
    dateApplied: "Nov 28, 2024",
    status: "offered",
    matchScore: 88,
  },
  {
    id: "4",
    company: "Stripe",
    role: "Software Engineer",
    logo: "S",
    dateApplied: "Nov 25, 2024",
    status: "rejected",
    matchScore: 72,
  },
  {
    id: "5",
    company: "Figma",
    role: "Design Engineer",
    logo: "F",
    dateApplied: "Nov 20, 2024",
    status: "applied",
    matchScore: 90,
  },
];

export const mockAnalysisResult: AnalysisResult = {
  score: 85,
  matchedSkills: [
    "React",
    "TypeScript",
    "Node.js",
    "GraphQL",
    "REST APIs",
    "Git",
    "Agile",
    "Problem Solving",
  ],
  missingSkills: [
    "Kubernetes",
    "AWS Lambda",
    "Python",
    "Machine Learning",
  ],
  suggestions: [
    "Consider adding cloud certifications to strengthen your profile",
    "Highlight any DevOps experience in your resume",
    "Add specific metrics to your project achievements",
  ],
};

export const dashboardStats = {
  totalApplications: 24,
  responseRate: 42,
  currentStreak: 7,
  avgMatchScore: 81,
};

export const applicationHistory: Job[] = [
  ...mockJobs.filter((job) => job.status === "rejected" || job.status === "offered"),
];
