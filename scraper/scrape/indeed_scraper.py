# imports
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import time
import random
# better stealthy selenium
import undetected_chromedriver as uc


# util
def human_like_delay(min_sec=1, max_sec=3):
    time.sleep(random.uniform(min_sec, max_sec))


# startup maluable browser
driver = uc.Chrome(version_main=138)





def get_job_listings(malubleBrowser, url):
    try:
        # navigate to Indeed
        print("navigating to indeed (with search params)")
        malubleBrowser.get(url)
        human_like_delay(3, 5)
        
        # check for verification
        verification_attempts = 0
        max_attempts = 3
        
        # VERIFICATION
        while verification_attempts < max_attempts:
            # check if on verification page
            if "verify" in malubleBrowser.current_url.lower() or "challenge" in malubleBrowser.current_url.lower():
                print(f"verification required (attempt {verification_attempts + 1}/{max_attempts})")
                print("Manual verify in browser window REQUIRED")
                
                # wait manual verification
                time.sleep(30)
                
                # wait for redirect
                human_like_delay(5, 10)
                verification_attempts += 1
            else:
                break
        
        if verification_attempts >= max_attempts:
            print("failed verification after multiple attempts")
            exit()
        

        # JOB LISTINGS
        print("looking for job listings")
        try:
            WebDriverWait(malubleBrowser, 20).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, "div.job_seen_beacon, div.jobsearch-SerpJobCard"))
            )
            # im a fancy real boy!
            human_like_delay()
        except:
            print("timed out :(")
        
        # parse page to beautiful soup
        soup = BeautifulSoup(malubleBrowser.page_source, 'html.parser')
        
        # try multiple selectors for job listings
        job_listings = soup.find_all('div', class_='job_seen_beacon') or \
                    soup.find_all('div', class_='jobsearch-SerpJobCard') or \
                    soup.find_all('div', class_='job-listing')
        
        # job listings found
        if job_listings:
            print(f"found {len(job_listings)} job listings")
            
            # extract data from listings (limit 5 for now)
            for i, job in enumerate(job_listings[:5]):
                # check html data
                # print(job_listings[i])

                # get job: title, company, location, link
                title = job.find('h2', class_='jobTitle').get_text(strip=True) if job.find('h2', class_='jobTitle') else "N/A"
                company = job.find('span', {'data-testid': 'company-name'}).get_text(strip=True) if job.find('span', {'data-testid': 'company-name'}) else "N/A"
                location = job.find('div', {'data-testid': 'text-location'}).get_text(strip=True) if job.find('div', {'data-testid': 'text-location'}) else "N/A"
                job_link = "https://www.indeed.com" + job.find('h2', class_='jobTitle').find('a')['href'] if job.find('h2', class_='jobTitle') and job.find('h2', class_='jobTitle').find('a') else "N/A"
                
                # log job
                print(f"\nListing {i+1}:")
                print(f"Title: {title}")
                print(f"Company: {company}")
                print(f"Location: {location}")
                print(f"Job Link: {job_link}")
                print("-" * 50)
        
        # no job listings found
        else:
            print("no job listings found")
            
    # error
    except Exception as e:
        print(f"error occurred: {str(e)}")
    
    # after error or success
    finally:
        input("Press Enter to close the browser...")
        malubleBrowser.quit()


# handler function to be called by main
def scrapeIndeed(job_ttile: str = "Website Developer", job_location: str = "Remote"):
    # customise search
    url = f"https://www.indeed.com/jobs?q={job_ttile.replace(' ', '+')}&l={job_location.replace(' ', '+')}"

    try:
        get_job_listings(driver, url)
    except Exception as e:
        print(f"An error occurred: {str(e)}")
    finally:
        input("Press Enter to stop program...")


# scrapeIndeed()
