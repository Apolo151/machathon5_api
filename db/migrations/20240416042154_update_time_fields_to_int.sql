-- migrate:up

ALTER TABLE machathon.autonomous_submissions
ALTER COLUMN submitted_at TYPE BIGINT USING submitted_at::BIGINT;

ALTER TABLE machathon.autonomous_teams
ALTER COLUMN registered_at TYPE BIGINT USING registered_at::BIGINT;

ALTER TABLE machathon.summit
ALTER COLUMN registered_at TYPE BIGINT USING registered_at::BIGINT;

-- migrate:down

ALTER TABLE machathon.autonomous_submissions
ALTER COLUMN submitted_at TYPE NUMERIC USING submitted_at::NUMERIC;

ALTER TABLE machathon.autonomous_teams
ALTER COLUMN registered_at TYPE NUMERIC USING registered_at::NUMERIC;

ALTER TABLE machathon.summit
ALTER COLUMN registered_at TYPE NUMERIC USING registered_at::NUMERIC;