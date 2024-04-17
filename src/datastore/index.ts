import { AttendeeDao } from "./dao/attendee-dao";
import { AutonomousSubmissionDao } from "./dao/autonomous-score-dao";
import { CompetitionTeamDao } from "./dao/competition-team-dao";
import { SqlDataStore } from "./postgres";

export interface Datastore
  extends AttendeeDao,
    CompetitionTeamDao,
    AutonomousSubmissionDao {}

export let db: Datastore;

export async function initDb(dbConnectionString?: string) {
  db = await new SqlDataStore().connectToDB(dbConnectionString);
}
