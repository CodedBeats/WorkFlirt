import axios from "axios";

export const scrapeJobs = async (req, res) => {
    try {
        const { job_title, job_location } = req.query;
        // console.log(job_title, job_location);

        if (!job_title) {
            return res.status(400).json({ error: "job_title required" });
        }

        console.log(`forwarding to scraper: [${job_title}]job in [${job_location || 'any location'}]location`);

        // call Flask scraper API
        const response = await axios.get("http://localhost:5002/scrape", {
            params: {
                job_title: job_title,
                job_location: job_location || '',
            },
            timeout: 60000 // 1 min timeout
        });

        // (process data later)
        const result = {
            ...response.data,
            processedAt: new Date().toISOString()
        };

        res.json(result);
        console.log("returning data to frontend from scraper");

    } catch (error) {
        console.error('flask scraper api endpoint failed:', error.message);
    
        if (error.code === 'ECONNABORTED') {
            res.status(504).json({ error: "scraper service timeout" });
        } else if (error.response) {
            // forward Flask error message
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ error: "internal server error" });
        }
    }
};

