import request from "supertest";
import { AutonomousScore, CompetitionTeam } from "../src/types";
import { createServer } from "../src/index";

require("dotenv").config();

export const app = createServer(process.env.TEST_DATABASE_URL);

describe("Autonomous competition teams", () => {
  describe("get all teams registered for the competition", () => {
    it("should return the list of all teams registered for the competition", async () => {
      return request(await app)
        .get("/autonomous-race/teams")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          expect(res.statusCode).toBe(200);
        });
    });
  });
  describe("register a new team for the competition", () => {
    const team: CompetitionTeam = {
      teamName: "team1",
      teamCode: "55LKJ",
      registeredAt: Date.now(),
    };
    const payload = {
      team: {
        team_name: team.teamName,
        team_code: team.teamCode,
      },
    };

    it("should add a new team and return 200", async () => {
      return request(await app)
        .post("/autonomous-race/teams")
        .send(payload)
        .expect(200)
        .then((res) => {
          expect(res.statusCode).toBe(200);
        });
    });
  });
});

describe("Autonomous competition submissions", () => {
  describe("get all competition submissions", () => {
    it("should return the list of all submissions to the competition", async () => {
      return request(await app)
        .get("/autonomous-race/submissions")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          expect(res.statusCode).toBe(200);
        });
    });
  });
});

describe("Autonomous competition top-scores", () => {
  describe("get the competition top scores (sorted) for the leaderboard", () => {
    const scores: AutonomousScore[] = [];
    it("should the list of top scores", async () => {
      return request(await app)
        .get("/autonomous-race/top-scores")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          res.body.scores.forEach((score: AutonomousScore) => {
            scores.push(score);
          });
          expect(res.statusCode).toBe(200);
        });
    });
    it("the list should contains one score for each team", () => {
      const teamNames: string[] = [];
      scores.forEach((score: AutonomousScore) => {
        expect(teamNames).not.toContain(score.teamName);
        teamNames.push(score.teamName);
      });
    });
    it("should return the list of scores sorted by total laptime (from smaller to larger)", async () => {
      let previousLaptime: number = -1;
      scores.forEach((score: AutonomousScore) => {
        expect(score.totalLaptime).toBeGreaterThanOrEqual(previousLaptime);
        previousLaptime = score.totalLaptime;
      });
    });
  });
});
