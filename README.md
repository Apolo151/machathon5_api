# machathon5_api
A REST API that handles the submissions of the Machathon 5.00 Autonomous Car Racing Competition.


## Endpoints
#### /scores POST
- Insert a submission into the database
#### /scores GET
- Get all machathon submissions in the database

### Data Object

```json
{
"team_code": "",
"first_laptime": "",
"second_laptime": "",
"zip_file": ""
}
```

## Database Schema
- A table to store teams submissions:

| Column | Type |
|----|----|
| team_code | String |
| first_laptime | Float |
| second_laptime | Float |
| total_laptime| Float |
| zip_file | String |


- A table to store team names and codes

| Column | Type |
|-----|-----|
|team_name | String |
|team_code | String |

**Example Create Table Command**
```bash
CREATE TABLE machathon_scores (
team_code VARCHAR (50),
first_laptime NUMERIC(10, 5) NOT NULL,
second_laptime NUMERIC(10, 5) NOT NULL,
total_laptime NUMERIC(10, 5) GENERATED ALWAYS AS (first_laptime + second_laptime) STORED,
zip_file BYTEA,
created_at TIMESTAMP NOT NULL,
PRIMARY KEY (team_code, created_at)
);

CREATE TABLE machathon_teams (
team_name VARCHAR(50) NOT NULL,
team_code VARCHAR(50) PRIMARY KEY
);
```
