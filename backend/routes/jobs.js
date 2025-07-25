import { Router } from 'express';
import { scrapeJobs } from '../controllers/jobs.js';

const jobRoutes = Router();

// GET /api/jobs/scrape?title=xxx&location=yyy
jobRoutes.get('/scrape', scrapeJobs);

export default jobRoutes;
