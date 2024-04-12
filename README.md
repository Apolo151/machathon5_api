# machathon5_api
A REST API that handles the submissions of the Machathon 5.00 Autonomous Car Racing Competition.

## Experience

### Event Registration
Event attendees will be able to register for the event through a web form.

### Competition Submission
Competitors solutions get submitted by sending a request to the API to store the submission in the database.

### Leaderboard
Competitors will be able to see their scores and ranking through the competitions leaderboard [here]()(addlink).
## Endpoints
#### /scores POST
- Insert a submission into the database
#### /scores GET
- Get all machathon submissions in the database


## Local Setup

- make sure you have [NodeJS](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs) and [PostgreSQL](https://www.postgresqltutorial.com/postgresql-getting-started/) installed

> using [nvm](https://nodejs.org/en/download/package-manager) is recommended for installing node

- Clone repo
```bash
git clone https://github.com/Apolo151/machathon5_api.git
```

- install node modules
```bash
npm install
```

- create a .env file and add needed environment variables

```bash
touch .env
```
```bash
# example .env file
DB_CONNECTION_STRING='YOUR DATABASE CONNECTION STRING'
SERVER_PORT=3000 # the port on which the servers listens to connections
```
- run server in development mode

```bash
npm run start-dev
```
