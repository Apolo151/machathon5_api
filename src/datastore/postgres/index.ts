import { Datastore } from "..";
import { Pool, QueryResult } from "pg";
import {
  Attendee,
  CompetitionTeam,
  AutonomousSubmission,
  AutonomousScore,
} from "../../types";

require("dotenv").config();

export class SqlDataStore implements Datastore {
  private dbPool!: Pool;
  // setup Database connection
  connectToDB() {
    this.dbPool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    return this;
  }

  // Summit
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

  // Teams
  async createTeam(team: CompetitionTeam): Promise<void> {
    const insertQuery =
      "INSERT INTO machathon.autonomous_teams VALUES ($1, $2, $3);";
    await this.dbPool.query(insertQuery, [
      team.teamCode,
      team.teamName,
      Date.now(),
    ]);
    return;
  }

  async getAllTeams(): Promise<CompetitionTeam[]> {
    const teams: CompetitionTeam[] = [];
    const selectQuery = "SELECT * from machathon.autonomous_teams;";
    const results = await this.dbPool.query(selectQuery);
    results.rows.forEach((row) => {
      teams.push({
        teamCode: row.team_code,
        teamName: row.team_name,
        registeredAt: row.registered_at,
      });
    });
    return teams;
  }

  // Submissions
  async getAllSubmissions(): Promise<AutonomousSubmission[]> {
    const submissions: AutonomousSubmission[] = [];
    const selectQuery = "SELECT * FROM machathon.autonomous_submissions;";
    const results = await this.dbPool.query(selectQuery);
    results.rows.forEach((row) => {
      submissions.push({
        teamCode: row.team_code,
        firstLaptime: row.first_laptime,
        secondLaptime: row.second_laptime,
        totalLaptime: row.total_laptime,
        submissionTime: row.submmitted_at,
      });
    });
    return submissions;
  }

  async createSubmission(teamSubmission: AutonomousSubmission): Promise<void> {
    // insert into database
    const insertQuery = `INSERT INTO machathon.autonomous_submissions 
    (team_code, first_laptime, second_laptime, submitted_at) 
    VALUES ($1, $2, $3, $4);`;
    await this.dbPool.query(insertQuery, [
      teamSubmission.teamCode,
      teamSubmission.firstLaptime,
      teamSubmission.secondLaptime,
      teamSubmission.submissionTime,
    ]);
  }

  async getTeamSubmissions(teamCode: string): Promise<AutonomousSubmission[]> {
    const submissions: AutonomousSubmission[] = [];
    const selectQuery =
      "SELECT * FROM machathon.autonomous_submission WHERE team_code = $1;";
    const results = await this.dbPool.query(selectQuery, [teamCode]);
    results.rows.forEach((row) => {
      submissions.push({
        teamCode: row.team_code,
        firstLaptime: row.first_laptime,
        secondLaptime: row.second_laptime,
        totalLaptime: row.total_laptime,
        submissionTime: row.submmitted_at,
      });
    });
    return submissions;
  }

  async getTopScores(): Promise<AutonomousScore[]> {
    const scores: AutonomousScore[] = [];
    const query = `SELECT mat.team_name, best_laptime FROM machathon.autonomous_teams mat JOIN 
    (SELECT team_code, MIN(total_laptime) AS best_laptime FROM machathon.autonomous_submissions
    GROUP BY team_code) AS best_laptimes ON mat.team_code = best_laptimes.team_code;`;
    const results = await this.dbPool.query(query);
    results.rows.forEach((row) => {
      scores.push({
        teamName: row.team_name,
        totalLaptime: Number(row.best_laptime),
      });
    });
    return scores;
  }
}
