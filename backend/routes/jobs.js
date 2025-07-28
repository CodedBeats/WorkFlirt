import { Router } from 'express';
import { scrapeJobs } from '../controllers/jobs.js';

const jobRoutes = Router();

jobRoutes.get('/scrape', scrapeJobs);

export default jobRoutes;
