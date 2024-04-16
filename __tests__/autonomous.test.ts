import request from "supertest";
import { createServer } from "../src/index";
import { App } from "supertest/types";

require("dotenv").config();

const app = createServer();

describe("Autonomous competition teams", () => {
  describe("GET /autonomous-race/teams", () => {
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
});
describe("GET /autonomous-race/top-scores", () => {
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

// TODO implement other autonomous competition unit tests
describe("GET /autonomous-race/submissions", () => {
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
