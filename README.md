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
"team_name": "",
"team_code": "",
"first_lap_time": "",
"second_lap_time": "",
"zip_file": ""
}
```

## Database Schema
A single table to store teams submissions:

| Column | Type |
|----|----|
| team_name  | String |
| team_code | String |
| first_laptime | Float |
| second_laptime | Float |
| total_laptime| Float |
| zip_file | String |


**Example Create Table Command**
```bash
CREATE TABLE machathon_scores (
team_name VARCHAR (50) NOT NULL,
team_code VARCHAR (50) PRIMARY KEY,
first_laptime NUMERIC(10, 5) NOT NULL,
second_laptime NUMERIC(10, 5) NOT NULL,
total_laptime NUMERIC(10, 5) GENERATED ALWAYS AS (first_laptime + second_laptime) STORED,
zip_file bytea NOT NULL,
created_at TIMESTAMP NOT NULL
);
```
