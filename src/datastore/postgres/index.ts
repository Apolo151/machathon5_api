import { Datastore } from "..";
import { Pool, QueryResult } from "pg";
import { Attendee, CompetitionTeam, AutonomousSubmission } from "../../types";

require("dotenv").config();

export class SqlDataStore implements Datastore {
  private dbPool!: Pool;

  connectToDB() {
    this.dbPool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    return this;
  }
  async createAttendee(attendee: Attendee): Promise<QueryResult<any>> {
    const insertQuery =
      "INSERT INTO machathon.summit VALUES ($1, $2, $3, $4, $5, $6, $7, $8);";

    const results = await this.dbPool.query(insertQuery, [
      attendee.fullName,
      attendee.phoneNumber,
      attendee.email,
      attendee.nationalID,
      attendee.university,
      attendee.facutly,
      attendee.graduationYear,
      attendee.registeredAt,
    ]);

    return results;
  }

  async getAllAttendees(): Promise<Attendee[]> {
    const attendees: Attendee[] = [];
    // query the database and return an rray of attendees
    const selectQuery = "SELECT * FROM machathon.summit;";
    const results = await this.dbPool.query(selectQuery);
    results.rows.forEach((row) => {
      attendees.push({
        fullName: row.full_name,
        phoneNumber: row.phone_number,
        email: row.email,
        nationalID: row.national_id,
        university: row.university,
        facutly: row.faculty,
        graduationYear: row.graduation_year,
        registeredAt: row.registered_at,
      });
    });
    return attendees;
  }

  async getAttendeeByEmail(email: string): Promise<Attendee | undefined> {
    const selectQuery = "SELECT * FROM machathon.summit WHERE email=$1;";
    const results = await this.dbPool.query(selectQuery, [email]);
    if (results.rows.length === 0) {
      return undefined;
    }
    const row = results.rows[0];
    const attendee: Attendee = {
      fullName: row.full_name,
      phoneNumber: row.phone_number,
      email: row.email,
      nationalID: row.national_id,
      university: row.university,
      facutly: row.faculty,
      graduationYear: row.graduation_year,
      registeredAt: row.registered_at,
    };
    return attendee;
  }
  getTeamByNid(_nationalID: number): Promise<Attendee | undefined> {
    throw new Error("Method not implemented.");
  }
  createTeam(_team: CompetitionTeam): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getAllTeams(): Promise<CompetitionTeam[]> {
    throw new Error("Method not implemented.");
  }
  createSubmission(_teamSubmission: AutonomousSubmission): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getTeamSubmissions(_teamCode: string): Promise<AutonomousSubmission[]> {
    throw new Error("Method not implemented.");
  }
  getTopScores(): Promise<AutonomousSubmission[]> {
    throw new Error("Method not implemented.");
  }
}
