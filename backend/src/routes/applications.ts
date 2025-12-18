import { Router, Request, Response } from 'express';
import JobApplication, { JobStatus } from '../models/JobApplication';

const router = Router();

// Get all job applications
router.get('/', async (req: Request, res: Response) => {
  try {
    const applications = await JobApplication.find().sort({ created_at: -1 });
    res.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

// Get a single job application
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const application = await JobApplication.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    res.json(application);
  } catch (error) {
    console.error('Error fetching application:', error);
    res.status(500).json({ error: 'Failed to fetch application' });
  }
});

// Create a new job application
router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      company,
      role,
      logo,
      status,
      date_applied,
      job_url,
      salary_min,
      salary_max,
      location,
      notes,
      match_score,
    } = req.body;

    if (!company || !role) {
      return res.status(400).json({ error: 'Company and role are required' });
    }

    const application = new JobApplication({
      company,
      role,
      logo: logo || company.charAt(0).toUpperCase(),
      status: status || 'applied',
      date_applied: date_applied || new Date().toISOString().split('T')[0],
      job_url,
      salary_min,
      salary_max,
      location,
      notes,
      match_score,
    });

    const saved = await application.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error('Error creating application:', error);
    res.status(500).json({ error: 'Failed to create application' });
  }
});

// Update a job application
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updates = req.body;
    
    const application = await JobApplication.findByIdAndUpdate(
      req.params.id,
      { ...updates, updated_at: new Date() },
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.json(application);
  } catch (error) {
    console.error('Error updating application:', error);
    res.status(500).json({ error: 'Failed to update application' });
  }
});

// Update job application status
router.patch('/:id/status', async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    
    if (!status || !['applied', 'interviewing', 'offered', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const application = await JobApplication.findByIdAndUpdate(
      req.params.id,
      { status, updated_at: new Date() },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.json(application);
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ error: 'Failed to update status' });
  }
});

// Delete a job application
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const application = await JobApplication.findByIdAndDelete(req.params.id);

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    console.error('Error deleting application:', error);
    res.status(500).json({ error: 'Failed to delete application' });
  }
});

// Get application statistics
router.get('/stats/summary', async (req: Request, res: Response) => {
  try {
    const [total, applied, interviewing, offered, rejected] = await Promise.all([
      JobApplication.countDocuments(),
      JobApplication.countDocuments({ status: 'applied' }),
      JobApplication.countDocuments({ status: 'interviewing' }),
      JobApplication.countDocuments({ status: 'offered' }),
      JobApplication.countDocuments({ status: 'rejected' }),
    ]);

    res.json({
      total,
      applied,
      interviewing,
      offered,
      rejected,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

export default router;
