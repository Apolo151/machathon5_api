import request from "supertest";
import { createServer } from "../src/index";

require("dotenv").config();

const app = createServer(process.env.TEST_DATABASE_URL);

describe("Summit", () => {
  describe("get all people registered for the summit", () => {
    it("should return 200 & the list of all people registered for the summit", async () => {
      return request(await app)
        .get("/summit/attendees")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          expect(res.statusCode).toBe(200);
        });
    });
  });
  describe("check if a person is already registered for the summit (by email)", () => {});
  describe("register a new person for the summit", () => {});
});

// TODO implement other summit unit tests
