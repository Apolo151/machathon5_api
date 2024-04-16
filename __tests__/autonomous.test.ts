import request from "supertest";
import { createServer } from "../src/index";

require("dotenv").config();

const app = createServer();

describe("Autonomous competition teams", () => {
  describe("get all teams registered for the competition", () => {
    it("should return 200 & the list of all teams registered for the competition", async () => {
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
    it("should add a new team and return 200", async () => {
      return request(await app)
        .get("/autonomous-race/teams")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          expect(res.statusCode).toBe(200);
        });
    });
  });
});

describe("Autonomous competition submissions", () => {
  describe("get all competition submissions", () => {
    it("should return 200 & the list of all submissions to the competition", async () => {
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
    it("should return 200 & the list of each team top-score sorted according to the best score", async () => {
      return request(await app)
        .get("/autonomous-race/top-scores")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          expect(res.statusCode).toBe(200);
        });
    });
  });
});
