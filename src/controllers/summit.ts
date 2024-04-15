import { RequestHandler } from "express";
import { Datastore } from "../datastore";
import { Attendee } from "../types";
import { validationResult } from "express-validator";

export class SummitController {
  private db: Datastore;

  constructor(db: Datastore) {
    this.db = db;
  }
  //
  public insertAttendee: RequestHandler = async (req, res) => {
    // validate data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    // extract data
    const {
      name,
      phone_number,
      email,
      national_id,
      university,
      faculty,
      grad_year,
    } = req.body;
    // insert into database
    const attendee: Attendee = {
      fullName: name,
      phoneNumber: phone_number,
      email: email,
      nationalID: national_id,
      university: university,
      facutly: faculty,
      graduationYear: grad_year,
      registeredAt: Date.now(),
    };
    const results = await this.db.createAttendee(attendee);
    console.log(results);
    return res.sendStatus(200);
  };

  public getAllAttendees: RequestHandler = async (_req, res) => {
    return res.send({ attendees: await this.db.getAllAttendees() });
  };

  getAttendeebyMail: RequestHandler = async (req, res) => {
    const email: string = decodeURI(req.query.email as string);
    //
    return res.send({ attendee: await this.db.getAttendeeByEmail(email) });
  };
}
