import { Datastore, db } from "../datastore";
import { AutonomousSubmission, AutonomousScore } from "../types";
import { RequestHandler } from "express";

export class AutonomousCompetitionController {
  private db: Datastore;

  constructor(db: Datastore) {
    this.db = db;
  }

  public getAllAutonomousTeams: RequestHandler = async (req, res) => {
    const teams = await this.db.getAllTeams();
    res.status(200).json({ teams });
  };

  public insertTeam: RequestHandler = async (req, res) => {
    const { team_name, team_code } = req.body.team;
    const team = {
      teamName: team_name,
      teamCode: team_code,
      registeredAt: Date.now(),
    };
    await this.db.createTeam(team);
    return res.sendStatus(200);
  };

  public getAllSubmissions: RequestHandler = async (req, res) => {
    const submissions = await this.db.getAllSubmissions();
    res.status(200).json({ submissions });
  };

  public getTeamSubmissions: RequestHandler = async (req, res) => {
    const { team_code } = req.params;
    const submissions = await this.db.getTeamSubmissions(team_code);
    res.status(200).json({ submissions });
  };

  public insertSubmission: RequestHandler = async (req, res) => {
    const { team_code, first_laptime, second_laptime } = req.body;
    const submission: AutonomousSubmission = {
      teamCode: team_code,
      firstLaptime: first_laptime,
      secondLaptime: second_laptime,
      totalLaptime: first_laptime + second_laptime,
      submissionTime: Date.now(),
    };
    await this.db.createSubmission(submission);
    return res.sendStatus(200);
  };

  public getTopScores: RequestHandler = async (req, res) => {
    const scores = await this.db.getTopScores();
    const scoresObject: { team_name: string; best_laptime: number }[] = [];
    scores.forEach((score) => {
      scoresObject.push({
        team_name: score.teamName,
        best_laptime: score.totalLaptime,
      });
    });
    res.status(200).json({ scores: scoresObject });
  };
}
