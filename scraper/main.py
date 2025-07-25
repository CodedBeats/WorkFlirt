# dependencies
from flask import Flask, request, jsonify
# better stealthy selenium
import undetected_chromedriver as stealthyBrowser

# scrapers
from scrape.indeed_scraper import scrapeIndeed

# scrapeIndeed()


# app
app = Flask(__name__)
_driver = None


def get_driver():
    global _driver
    if _driver is None:
        print("init browser...")
        _driver = stealthyBrowser.Chrome(version_main=138)

        # cleanup on exit
        import atexit
        atexit.register(_driver.quit)

    return _driver


@app.route('/scrape', methods=['GET'])
def handle_scrape():
    try:
        # init driver only when first used
        driver = get_driver()
        
        # get search args
        job_title = request.args.get('job_title', '')
        job_location = request.args.get('job_location', '')

        print(f"scraping Indeed for: [{job_title}]job in [{job_location}]location")

        # scrape
        jobs = scrapeIndeed(driver, job_title, job_location)

        # return jobs as json
        return jsonify({
            "success": True,
            "count": len(jobs),
            "jobs": jobs,
            "source": "indeed"
        })
    
    except Exception as e:
        print(f"scraping err: {str(e)}")
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

if __name__ == '__main__':
    # run app on port 5002 (different from frontend and backend)
    app.run(port=5002, debug=True)
