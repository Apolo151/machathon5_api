# machathon5_api

A REST API for the [Machathon 5.00 Tech Summit](https://www.linkedin.com/posts/stpegypt_stpabr24-teleportabrgate-machathon5abr00-activity-7181986298155454464-BLiN?utm_source=share&utm_medium=member_desktop) and its competitions.

This api will interact with various services as needed, such as:

- summit registration form - [link](https://summit-form-frontend.vercel.app/)
- competition leaderboard - [link](https://stp-frontend-leaderboard.onrender.com/)
- Submission requests coming from the competition's simulator - [Simulator link](https://github.com/Apolo151/machathon5.00-judge?tab=readme-ov-file)

> Note: The event has successfully ended, so the official data has been removed and the current data is just dummy data for presentation.

> This repo can be used as a template for anyone wanting to hold a similar event or summit.

## Functionality

### Event Registration

Event attendees will be able to register for the event through a web form.

### Competition Registration (TBD)

Teams will be able to register for any competition in the event through a web form.

### Competition Submission

Competitors solutions get submitted by sending a request to the API to store the submission in the database.

### Leaderboard

Competitors will be able to see their scores and rankings through the competition leaderboard.

## Local Setup

- make sure you have [NodeJS](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs) and [PostgreSQL](https://www.postgresqltutorial.com/postgresql-getting-started/) (or a serverless postgres database on [neon](https://neon.tech/)) installed

> using [nvm](https://nodejs.org/en/download/package-manager) is recommended for installing node.

- Clone repo

```bash
git clone https://github.com/Apolo151/machathon5_api.git
cd machathon5_api
```

- install node modules

```bash
npm install
```

- create a .env file and add needed environment variables

```bash
touch .env
```

---

```bash
# example .env file
DATABASE_URL='YOUR DATABASE CONNECTION STRING'
TEST_DATABASE_URL='YOUR TEST DATABASE CONNECTION STRING'
SERVER_PORT=3000 # the port on which the servers listens to connections on
```

### running app

- in development mode

```bash
npm run start-dev
```

- build and run

```bash
npm start
```

### Testing

- run unit tests

```bash
npm run test:unit; npm run dropdb
```

- run unit tests with code coverage

```bash
npm run test:unit:coverage; npm run dropdb
```

> check [jest docs](https://jestjs.io/docs/getting-started).

## Future Plan/Improvements

- Implement Auth
- Add Dockerfile

> check [issues](https://github.com/Apolo151/machathon5_api/issues) for a comprehensive list.
