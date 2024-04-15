import { Datastore, db } from "../datastore";
import { RequestHandler } from "express";

export class AutonomousCompetitionController {
  private db: Datastore;

  constructor(db: Datastore) {
    this.db = db;
  }

  public insertSubmission: RequestHandler = (req, res) => {
    // insert into database
    const insertQuery =
      "INSERT INTO machathon.autonomous_submissions (team_code, first_laptime, second_laptime, zip_file, created_at) VALUES ($1, $2, $3, $4, NOW());";
    const { team_code, first_laptime, second_laptime, solution_file } =
      req.body;
    // TODO: implement
    //this.db.createSubmission();
    return res.sendStatus(200);
  };

  public getTopScores: RequestHandler = (req, res) => {
    this.db;
    /*.dbPool.query(
      `SELECT mat.team_name, best_laptime FROM machathon.autonomous_teams mat JOIN 
          (SELECT team_code, MIN(total_laptime) AS best_laptime FROM machathon.autonomous_submissions
          GROUP BY team_code) AS best_laptimes ON mat.team_code = best_laptimes.team_code;`,
      (error: any, results: any) => {
        if (error) {
          res.status(500).json({
            success: false,
            message: "internal server error",
          });
          console.log(error);
          //throw error;
        } else {
          res.status(200).json(results.rows);
        }
      }
    );
  };*/
  };
  public getAllSubmissions: RequestHandler = (req, res) => {
    // TODO: query database to get results
  };

  public getAllAutonomousTeams: RequestHandler = (req, res) => {
    // TODO
  };

  public insertTeam: RequestHandler = (req, res) => {
    // TODO
  };
}
