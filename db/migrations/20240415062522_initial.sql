-- migrate:up

CREATE SCHEMA machathon;

CREATE TABLE machathon.summit (
  name VARCHAR (50) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR (255) PRIMARY KEY,
  national_id NUMERIC(14) UNIQUE,
  university VARCHAR(255) NOT NULL,
  faculty VARCHAR(255) NOT NULL,
  grad_year NUMERIC(4) NOT NULL,
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE machathon.autonomous_submissions (
team_code VARCHAR (50),
first_laptime NUMERIC(10, 5) NOT NULL,
second_laptime NUMERIC(10, 5) NOT NULL,
total_laptime NUMERIC(10, 5) GENERATED ALWAYS AS (first_laptime + second_laptime) STORED,
zip_file BYTEA,
created_at TIMESTAMP NOT NULL,
PRIMARY KEY (team_code, created_at)
);

CREATE TABLE machathon.autonomous_teams (
team_name VARCHAR(50) NOT NULL,
team_code VARCHAR(50) PRIMARY KEY
);


-- migrate:down
DROP TABLE machathon.summit;
DROP TABLE machathon.autonomous_submissions;
DROP TABLE machathon.autonomous_teams;

DROP SCHEMA IF EXISTS machathon;