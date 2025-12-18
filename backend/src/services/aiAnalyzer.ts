import { GoogleGenerativeAI } from '@google/generative-ai';

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

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function analyzeResume(
  resumeText: string,
  jobDescription: string
): Promise<AnalysisResult> {
  // Check if API key exists
  if (!process.env.GEMINI_API_KEY) {
    console.warn('Gemini API key not found, using fallback analysis');
    return fallbackAnalysis(resumeText, jobDescription);
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are an expert HR consultant and ATS (Applicant Tracking System) specialist with 15+ years of experience in recruitment. Analyze the following resume against the job description and provide a comprehensive, detailed analysis.

## RESUME:
${resumeText}

## JOB DESCRIPTION:
${jobDescription}

## ANALYSIS INSTRUCTIONS:
Perform a thorough analysis considering:
1. **Technical Skills Match** - Programming languages, frameworks, tools, technologies
2. **Soft Skills Match** - Communication, leadership, teamwork, problem-solving
3. **Experience Level** - Years of experience, seniority alignment
4. **Industry/Domain Relevance** - Relevant industry experience
5. **Education & Certifications** - Degree requirements, professional certifications
6. **ATS Optimization** - Keywords that will help pass automated screening
7. **Cultural Fit Indicators** - Values, work style, company culture alignment

Return a JSON object with EXACTLY this structure (no markdown, pure JSON only):

{
  "matchScore": <number 0-100, be realistic and critical>,
  "matchedSkills": [<array of specific skills from JD found in resume>],
  "missingSkills": [<array of required skills from JD NOT in resume>],
  "experienceMatch": {
    "required": "<exact years mentioned in JD, e.g., '5+ years'>",
    "yours": "<years detected from resume, e.g., '3 years'>",
    "match": <boolean - true only if resume meets or exceeds requirement>
  },
  "recommendations": [
    {
      "id": "1",
      "category": "critical",
      "title": "<concise title>",
      "description": "<why this matters for this specific role>",
      "action": "<specific, actionable step to fix this>"
    },
    {
      "id": "2", 
      "category": "important",
      "title": "<title>",
      "description": "<description>",
      "action": "<action>"
    },
    {
      "id": "3",
      "category": "nice-to-have",
      "title": "<title>",
      "description": "<description>",
      "action": "<action>"
    }
  ],
  "keywordOptimization": [
    {
      "keyword": "<important keyword from JD>",
      "context": "<where and how to add this keyword>",
      "importance": "high"
    }
  ],
  "summary": "<3-4 sentence executive summary: overall match assessment, biggest strength, biggest gap, and one key action item>"
}

IMPORTANT GUIDELINES:
- Be honest and critical, don't inflate scores
- Score 80+ only for excellent matches
- Score 60-79 for good matches with some gaps
- Score 40-59 for partial matches
- Score below 40 for poor matches
- Provide at least 3-5 recommendations
- Provide at least 3-5 keyword suggestions
- Make all advice specific to THIS job, not generic

Return ONLY valid JSON.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const content = response.text();

    if (!content) {
      throw new Error('No response from AI');
    }

    // Clean and parse the JSON response
    const cleanedContent = content
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();
    
    const analysisResult: AnalysisResult = JSON.parse(cleanedContent);
    
    return validateResult(analysisResult);
    
  } catch (error) {
    console.error('AI Analysis error:', error);
    return fallbackAnalysis(resumeText, jobDescription);
  }
}

function validateResult(result: Partial<AnalysisResult>): AnalysisResult {
  return {
    matchScore: Math.min(100, Math.max(0, result.matchScore || 0)),
    matchedSkills: Array.isArray(result.matchedSkills) ? result.matchedSkills : [],
    missingSkills: Array.isArray(result.missingSkills) ? result.missingSkills : [],
    experienceMatch: result.experienceMatch || {
      required: 'Not specified',
      yours: 'Not detected',
      match: false,
    },
    recommendations: Array.isArray(result.recommendations) ? result.recommendations : [],
    keywordOptimization: Array.isArray(result.keywordOptimization) ? result.keywordOptimization : [],
    summary: result.summary || 'Analysis completed.',
  };
}

function fallbackAnalysis(resumeText: string, jobDescription: string): AnalysisResult {
  const skillPatterns = [
    'react', 'typescript', 'javascript', 'python', 'java', 'node.js', 'nodejs',
    'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'sql', 'nosql', 'mongodb',
    'git', 'agile', 'scrum', 'ci/cd', 'rest', 'graphql', 'html', 'css',
    'tailwind', 'redux', 'vue', 'angular', 'express', 'django', 'flask',
    'machine learning', 'ai', 'data analysis', 'tableau', 'power bi',
    'figma', 'ui/ux', 'sass', 'webpack', 'vite', 'next.js',
    'postgresql', 'mysql', 'redis', 'elasticsearch',
    'jenkins', 'github actions', 'terraform', 'linux', 'nginx',
    'spring', '.net', 'c#', 'c++', 'go', 'rust', 'kotlin',
    'swift', 'flutter', 'react native', 'android', 'ios',
    'tensorflow', 'pytorch', 'pandas', 'numpy',
    'excel', 'powerpoint', 'communication', 'leadership', 'teamwork',
    'problem solving', 'analytical', 'project management'
  ];

  const jdLower = jobDescription.toLowerCase();
  const resumeLower = resumeText.toLowerCase();

  const jdSkills = skillPatterns.filter(skill => jdLower.includes(skill));
  const matchedSkills = jdSkills.filter(skill => resumeLower.includes(skill));
  const missingSkills = jdSkills.filter(skill => !resumeLower.includes(skill));

  const skillMatchRatio = jdSkills.length > 0 
    ? (matchedSkills.length / jdSkills.length) * 100 
    : 50;

  const expPattern = /(\d+)\+?\s*years?/gi;
  const jdExp = jobDescription.match(expPattern);
  const resumeExp = resumeText.match(expPattern);
  
  const requiredYears = jdExp ? parseInt(jdExp[0]) : 0;
  const yourYears = resumeExp ? Math.max(...resumeExp.map(e => parseInt(e))) : 0;

  const expMatch = {
    required: jdExp ? jdExp[0] : 'Not specified',
    yours: resumeExp ? `${yourYears} years` : 'Not clearly mentioned',
    match: yourYears >= requiredYears,
  };

  const matchScore = Math.round(
    skillMatchRatio * 0.6 + 
    (expMatch.match ? 30 : 10) + 
    Math.min(10, matchedSkills.length)
  );

  const recommendations: Recommendation[] = [];
  
  if (missingSkills.length > 3) {
    recommendations.push({
      id: '1',
      category: 'critical',
      title: 'Add Missing Technical Skills',
      description: `Your resume is missing ${missingSkills.length} key skills from the job description.`,
      action: `Add experience with: ${missingSkills.slice(0, 5).join(', ')}`,
    });
  } else if (missingSkills.length > 0) {
    recommendations.push({
      id: '1',
      category: 'important',
      title: 'Consider Adding These Skills',
      description: 'A few skills from the JD are not in your resume.',
      action: `Mention if you have experience with: ${missingSkills.join(', ')}`,
    });
  }
  
  if (!expMatch.match) {
    recommendations.push({
      id: '2',
      category: 'important',
      title: 'Highlight Relevant Experience',
      description: `The role requires ${expMatch.required} of experience.`,
      action: 'Emphasize projects, internships, or freelance work.',
    });
  }
  
  recommendations.push({
    id: '3',
    category: 'nice-to-have',
    title: 'Quantify Your Achievements',
    description: 'Adding metrics makes accomplishments more impactful.',
    action: 'Include numbers like "Improved performance by 40%".',
  });

  let summary: string;
  if (matchScore >= 80) {
    summary = `Excellent match! You have ${matchedSkills.length} matching skills.`;
  } else if (matchScore >= 60) {
    summary = `Good match. You have ${matchedSkills.length} skills but missing ${missingSkills.length}.`;
  } else {
    summary = `Partial match. Focus on gaining: ${missingSkills.slice(0, 3).join(', ')}.`;
  }

  return {
    matchScore: Math.min(matchScore, 100),
    matchedSkills,
    missingSkills,
    experienceMatch: expMatch,
    recommendations,
    keywordOptimization: [],
    summary,
  };
}