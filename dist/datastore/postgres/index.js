"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlDataStore = void 0;
const pg_1 = require("pg");
require("dotenv").config();
class SqlDataStore {
    // setup Database connection
    connectToDB(dbString) {
        this.dbPool = new pg_1.Pool({
            connectionString: dbString || process.env.TEST_DATABASE_URL,
        });
        return this;
    }
    // Summit
    createAttendee(attendee) {
        return __awaiter(this, void 0, void 0, function* () {
            const insertQuery = "INSERT INTO machathon.summit VALUES ($1, $2, $3, $4, $5, $6, $7, $8);";
            const results = yield this.dbPool.query(insertQuery, [
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
        });
    }
    getAllAttendees() {
        return __awaiter(this, void 0, void 0, function* () {
            const attendees = [];
            // query the database and return an rray of attendees
            const selectQuery = "SELECT * FROM machathon.summit;";
            const results = yield this.dbPool.query(selectQuery);
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
        });
    }
    getAttendeeByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const selectQuery = "SELECT * FROM machathon.summit WHERE email=$1;";
            const results = yield this.dbPool.query(selectQuery, [email]);
            if (results.rows.length === 0) {
                return undefined;
            }
            const row = results.rows[0];
            const attendee = {
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
        });
    }
    // Teams
    createTeam(team) {
        return __awaiter(this, void 0, void 0, function* () {
            const insertQuery = "INSERT INTO machathon.autonomous_teams VALUES ($1, $2, $3);";
            yield this.dbPool.query(insertQuery, [
                team.teamCode,
                team.teamName,
                team.registeredAt,
            ]);
            return;
        });
    }
    getAllTeams() {
        return __awaiter(this, void 0, void 0, function* () {
            const teams = [];
            const selectQuery = "SELECT * from machathon.autonomous_teams;";
            const results = yield this.dbPool.query(selectQuery);
            results.rows.forEach((row) => {
                teams.push({
                    teamCode: row.team_code,
                    teamName: row.team_name,
                    registeredAt: row.registered_at,
                });
            });
            return teams;
        });
    }
    // Submissions
    getAllSubmissions() {
        return __awaiter(this, void 0, void 0, function* () {
            const submissions = [];
            const selectQuery = "SELECT * FROM machathon.autonomous_submissions;";
            const results = yield this.dbPool.query(selectQuery);
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
        });
    }
    createSubmission(teamSubmission) {
        return __awaiter(this, void 0, void 0, function* () {
            // insert into database
            const insertQuery = `INSERT INTO machathon.autonomous_submissions 
    (team_code, first_laptime, second_laptime, submitted_at) 
    VALUES ($1, $2, $3, $4);`;
            yield this.dbPool.query(insertQuery, [
                teamSubmission.teamCode,
                teamSubmission.firstLaptime,
                teamSubmission.secondLaptime,
                teamSubmission.submissionTime,
            ]);
        });
    }
    getTeamSubmissions(teamCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const submissions = [];
            const selectQuery = "SELECT * FROM machathon.autonomous_submission WHERE team_code = $1;";
            const results = yield this.dbPool.query(selectQuery, [teamCode]);
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
        });
    }
    getTopScores() {
        return __awaiter(this, void 0, void 0, function* () {
            const scores = [];
            const query = `SELECT mat.team_name, best_laptime FROM machathon.autonomous_teams mat JOIN 
    (SELECT team_code, MIN(total_laptime) AS best_laptime FROM machathon.autonomous_submissions
    GROUP BY team_code) AS best_laptimes ON mat.team_code = best_laptimes.team_code;`;
            const results = yield this.dbPool.query(query);
            results.rows.forEach((row) => {
                scores.push({
                    teamName: row.team_name,
                    totalLaptime: Number(row.best_laptime),
                });
            });
            return scores;
        });
    }
}
exports.SqlDataStore = SqlDataStore;
