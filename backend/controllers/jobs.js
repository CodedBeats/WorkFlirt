// dependencies
import axios from "axios";


// init map to remember recent requests
const recentRequests = new Map();

export const scrapeJobs = async (req, res) => {
    try {
        // get job title and location from request (in url)
        const { job_title, job_location } = req.query;
        // guard
        if (!job_title) {
            return res.status(400).json({ error: "job_title required" });
        }

        console.log(`forwarding to scraper: [${job_title}] job in [${job_location || 'any location'}] location`);

        // create key for recent requests
        const key = `${job_title}|${job_location}`.toLowerCase();
        // check if request has been made recently (within 30s)
        const now = Date.now();
        const existing = recentRequests.get(key);
        if (existing && now - existing.timestamp < 30000) {
            console.log(`duplicate request detected, ignoring: ${key}, (probably just dupe frontend request)`); 
            return res.status(429).json({ error: "duplicate request too soon" });
        }

        // atore timestamp before forwarding
        recentRequests.set(key, { timestamp: now });

        // call Flask scraper API
        const response = await axios.get("http://localhost:5002/scrape", {
            params: {
                job_title: job_title,
                job_location: job_location || '',
            },
            timeout: 120000 // 2 min timeout for scraper to fetch and return jobs
        });


        // TODO > process data better
        const result = {
            ...response.data,
            processedAt: new Date().toISOString()
        };

        res.json(result);
        console.log("returning data to frontend from scraper");


    } catch (error) {
        console.error('scraper api failed:', error.message);
    
        if (error.code === 'ECONNABORTED') {
            // didn't recieve a timely response from the scraper
            res.status(504).json({ error: "scraper service timeout" });
        } else if (error.response) {
            // other error status
            res.status(error.response.status).json(error.response.data);
        } else {
            // web server encountered an unexpected condition that prevented it from fulfilling a client's request
            res.status(500).json({ error: "internal server error" });
        }
    }
};

