# dependencies
from flask import Flask, request, jsonify

# scrapers
from scrape.indeed_scraper import scrapeIndeed

# scrapeIndeed()


# app
app = Flask(__name__)

@app.route('/scrape', methods=['GET'])
def handle_scrape():
    # get search args
    job_title = request.args.get('job_title')
    job_location = request.args.get('location')

    # scrape
    jobs = scrapeIndeed(job_title, job_location)

    # return jobs as json
    return jsonify(jobs)

if __name__ == '__main__':
    # run app on port 5002 (different from frontend and backend)
    app.run(port=5002)
