import { Datastore } from "..";
import { Pool } from "pg";
import { Attendee, CompetitionTeam, AutonomousSubmission } from "../../types";

require("dotenv").config();

export class SqlDataStore implements Datastore {
  private dbPool: Pool;

  connectToDB() {
    this.dbPool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    return this;
  }
  createAttendee(attendee: Attendee): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getAllAttendees(): Promise<Attendee[]> {
    throw new Error("Method not implemented.");
  }
  getAttendeeByEmail(email: string): Promise<Attendee | undefined> {
    throw new Error("Method not implemented.");
  }
  getTeamByNid(nationalID: number): Promise<Attendee | undefined> {
    throw new Error("Method not implemented.");
  }
  createTeam(team: CompetitionTeam): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getAllTeams(): Promise<CompetitionTeam[]> {
    throw new Error("Method not implemented.");
  }
  createSubmission(teamSubmission: AutonomousSubmission): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getTeamSubmissions(teamCode: string): Promise<AutonomousSubmission[]> {
    throw new Error("Method not implemented.");
  }
  getTopScores(): Promise<AutonomousSubmission[]> {
    throw new Error("Method not implemented.");
  }
}
