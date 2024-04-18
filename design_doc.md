# Machathon 5.00 API

This document contains the design of the machathon5 API. The API for the Machathon 5.00 Tech Summit.

## Storage

We will use a relational database (PostgreSQL) to store data.

- we will use [neon](https://neon.tech/) to provide a serverless Postgres database.

### Schema

- The following entities are needed:

  **Summit Attendees**

| Column            | Type      |
| ----------------- | --------- |
| Full Name         | String    |
| Phone Number      | Int       |
| Email             | String    |
| National ID       | Int       |
| University        | String    |
| Faculty           | String    |
| Graduation Year   | Int       |
| Registration Time | Timestamp |

**Teams**

| Column            | Type      |
| ----------------- | --------- |
| team Name         | String    |
| team Code         | String    |
| Registration Time | Timestamp |

**Teams Submissions**

| Column         | Type   |
| -------------- | ------ |
| team Code      | String |
| First Laptime  | Float  |
| Second Laptime | Float  |
| Total Laptime  | Float  |

## Server

A simple HTTP server is responsible for storing and serving data in and from the database

- The server is implemented using Node.js
- Express.js is the web framework used

### API Endpoints

#### Summit

```bash
/summit/attendees [GET]
/summit/attendees/:email [GET]
/summit/attendees [POST]
```

#### Competition scores

```bash
/autonomous-race/teams [GET]
/autonomous-race/teams [POST]
/autonomous-race/submissions [GET]
/autonomous-race/submissions/:team_code [GET]
/autonomous-race/submissions [POST]
/autonomous-race/top-scores [GET]
```

#### Other

```bash
/cron [GET] # health check
```

## Testing

- Jest and supertest will be used for unit testing

## Hosting

The code will be hosted on GitHub, PRs and issues are welcome.

The web server will be hosted on [cyclic](https://www.cyclic.sh/), using their generous free tier.
