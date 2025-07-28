
// get job listings from scraper -> backend -> frontend
export const getJobListings = async (jobTitle: string, jobLocation: string) => {
    const response = await fetch(`http://localhost:5001/api/jobs/scrape?job_title=${jobTitle}&job_location=${jobLocation}`);
    const data = await response.json();
    return data;
}
