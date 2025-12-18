import dotenv from 'dotenv';
import path from 'path';

// Load environment variables FIRST before any other imports
dotenv.config({ path: path.join(__dirname, '.env') });

import express from 'express';
import cors from 'cors';
import { analyzeResume } from './services/aiAnalyzer';
import connectDB from './config/database';
import applicationsRouter from './routes/applications';

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Middleware
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'NextRole API is running' });
});

// Job applications routes
app.use('/api/applications', applicationsRouter);

// Resume analysis endpoint
app.post('/api/analyze', async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText || !jobDescription) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Both resumeText and jobDescription are required',
      });
    }

    if (resumeText.length < 50) {
      return res.status(400).json({
        error: 'Resume too short',
        message: 'Please provide a more detailed resume',
      });
    }

    if (jobDescription.length < 50) {
      return res.status(400).json({
        error: 'Job description too short',
        message: 'Please provide a more detailed job description',
      });
    }

    console.log('Analyzing resume...');
    const result = await analyzeResume(resumeText, jobDescription);
    
    res.json(result);
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({
      error: 'Analysis failed',
      message: 'An error occurred while analyzing your resume. Please try again.',
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port: ${PORT}`);
  console.log(`🌐 Allowing CORS from: ${FRONTEND_URL}`);
  console.log(`📝 Health check: http://localhost:${PORT}/api/health`);
});