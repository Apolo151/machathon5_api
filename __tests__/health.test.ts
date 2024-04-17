import request from "supertest";
import { createServer } from "../src/index";

require("dotenv").config();

export const app = createServer(process.env.TEST_DATABASE_URL);

describe("send request to keep server running", () => {
  it("should return 200 & a wake up message", async () => {
    return request(await app)
      .get("/cron")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.msg).toBe("I am awake");
        expect(res.statusCode).toBe(200);
      });
  });
});
