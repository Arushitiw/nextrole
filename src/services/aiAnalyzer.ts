export interface AnalysisResult {
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  experienceMatch: {
    required: string;
    yours: string;
    match: boolean;
  };
  recommendations: Recommendation[];
  keywordOptimization: KeywordSuggestion[];
  summary: string;
}

export interface Recommendation {
  id: string;
  category: 'critical' | 'important' | 'nice-to-have';
  title: string;
  description: string;
  action: string;
}

export interface KeywordSuggestion {
  keyword: string;
  context: string;
  importance: 'high' | 'medium' | 'low';
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export async function analyzeResumeWithAI(
  resumeText: string,
  jobDescription: string
): Promise<AnalysisResult> {
  try {
    const response = await fetch(`${API_URL}/api/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        resumeText,
        jobDescription,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Analysis failed');
    }

    const result: AnalysisResult = await response.json();
    return result;
    
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}