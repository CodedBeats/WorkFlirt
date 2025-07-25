import axios from "axios";

export const scrapeJobs = async (req, res) => {
    try {
        const { title, location } = req.query;

        if (!title) {
            return res.status(400).json({ error: "title required" });
        }

        console.log(`forwarding to scraper: [${title}]job in [${location || 'any location'}]location`);

        // call Flask scraper API
        const response = await axios.get("http://localhost:5002/scrape", {
            params: {
                job_title: title,
                job_location: location || '',
            },
            timeout: 60000 // 1 min timeout
        });

        // (process data later)
        const result = {
            ...response.data,
            processedAt: new Date().toISOString()
        };

        res.json(result);

    } catch (error) {
        console.error('scraper flask api endpoint failed:', error.message);
    
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

