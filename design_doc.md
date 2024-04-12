

## API Endpoints
### Summit
```bash
/summit/attendees [GET]
/summit/attendees [POST]
```
### Competition scores
```bash
/autonomous-race/teams [GET]
/autonomous-race/teams [POST]
/autonomous-race/submissions [GET]
/autonomous-race/submissions [POST]
/autonomous-race/top-scores [GET]
```

## Schema
- A table to store teams submissions:

| Column | Type |
|----|----|
| team_code | String |
| first_laptime | Float |
| second_laptime | Float |
| total_laptime| Float |


- A table to store team names and codes

| Column | Type |
|-----|-----|
|team_name | String |
|team_code | String |