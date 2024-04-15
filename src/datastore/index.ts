import { AttendeeDao } from "./dao/attendee-dao";
import { AutonomousSubmissionDao } from "./dao/autonomous-score-dao";
import { CompetitionTeamDao } from "./dao/competition-team-dao";

export interface Datastore extends AttendeeDao, CompetitionTeamDao, AutonomousSubmissionDao {};

export let db: Datastore;

export async function initDb(dbString: string){
    // TODO: implement connection logic to DB
}