import express, { json } from 'express';
import cors from 'cors';
const app = express();

// middleware
app.use(cors());
app.use(json());

// routes
import jobRoutes from './routes/jobs.js';
app.use('/api/jobs', jobRoutes);

const PORT = 5001; // fifferent from Flask's 5002

app.listen(PORT, () => console.log(`Node server running on port ${PORT}`));
