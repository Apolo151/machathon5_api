import request from "supertest";
import { createServer } from "../src/index";

require("dotenv").config();

const app = createServer();

describe("send request to keep server running", () => {
  it("should return 200 & a wake up message", async () => {
    return request(await app)
      .get("/cron")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        console.log(res);
        expect(res.body.msg).toBe("I am awake");
        expect(res.statusCode).toBe(200);
      });
  });
});

// TODO implement other autonomous competition unit tests
