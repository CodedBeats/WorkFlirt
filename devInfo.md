## Running each component
Create a seperate bash window for each component<br />
Open the VSCode project in the component folder<br />
Make sure bash directory path is in component folder

### Frontend
Run `npm start`

### Backend
Run `nodemon server.js`

### Scraper
Run `source virtualEnv/Scripts/activate` to activate the virtual environment<br />
Run `where python` to check if it's running<br />
Run `python main.py` to run the scraper



## Commit Message Style Examples
feat(frontend): added swipe animation<br />
refactor(frontend): added sub component for info blocks<br />
fix(backend): handle scraper timeout<br />
docs: update README



## Data Flow between components
Frontend -> Backend `GET http://localhost:5001/api/jobs/scrape?job_title=${jobTitle}&job_location=${jobLocation}`<br />
Backend -> Flask Scraper `GET http://localhost:5002/scrape?job_title=${jobTitle}&job_location=${jobLocation}`<br />
<br />
Scraper gets and combines data from  job boards<br />
Scraper returns jobs as json to Backend<br />
<br />
Backend process and formats data<br />
Backend returns jobs as json to Frontend
