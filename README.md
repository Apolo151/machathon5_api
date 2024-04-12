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