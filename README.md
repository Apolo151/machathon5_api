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
| first_lap_time | Float |
| second_lap_time | Float |
| zip_file | String |


**Example Create Table Command**
```bash
CREATE TABLE machathon_summit (
  name VARCHAR (50) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR (255) PRIMARY KEY,
  national_id NUMERIC(14) UNIQUE,
  university VARCHAR(255) NOT NULL,
  faculty VARCHAR(255) NOT NULL,
  grad_year NUMERIC(4) NOT NULL,
  created_at TIMESTAMP NOT NULL
);
```
