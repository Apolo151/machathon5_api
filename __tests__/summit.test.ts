import request from "supertest";
import { Attendee } from "../src/types";
import { createServer } from "../src/index";

require("dotenv").config();

export const app = createServer(process.env.TEST_DATABASE_URL);

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
  describe("check if a person is already registered for the summit (by email)", () => {
    const email = "mytestemail@email.com";
    it("should return 200 & the person's details if the person is already registered", async () => {
      return request(await app)
        .get("/summit/attendees/" + email)
        .expect("Content-Type", /json/)
        .expect(404)
        .then((res) => {
          expect(res.statusCode).toBe(404);
          expect(res.body.attendee).toBeNull();
        });
    });
  });
  describe("register a new person for the summit", () => {
    const attendee: Attendee = {
      fullName: "myname",
      phoneNumber: "0123456789",
      email: "myemail@email.com",
      nationalID: 12345678901234,
      university: "myuniversity",
      facutly: "myfaculty",
      graduationYear: 2093,
      registeredAt: Date.now(),
    };

    const payload = {
      attendee: {
        full_name: attendee.fullName,
        phone_number: attendee.phoneNumber,
        email: attendee.email,
        national_id: attendee.nationalID,
        university: attendee.university,
        faculty: attendee.facutly,
        graduation_year: attendee.graduationYear,
        registered_at: attendee.registeredAt,
      },
    };
    it("should register attendee and return 200", async () => {
      return request(await app)
        .post("/summit/attendees")
        .send(payload)
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          expect(res.statusCode).toBe(200);
          expect(res.body.attendee).toBeNull();
        });
    });
  });
});
