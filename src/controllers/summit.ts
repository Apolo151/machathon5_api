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
      full_name,
      phone_number,
      email,
      national_id,
      university,
      faculty,
      graduation_year,
    } = req.body.attendee;

    const attendee: Attendee = {
      fullName: full_name,
      phoneNumber: phone_number,
      email: email,
      nationalID: national_id,
      university: university,
      facutly: faculty,
      graduationYear: graduation_year,
      registeredAt: Date.now(),
    };
    // check if already exists in the database
    const existingAttendee = await this.db.getAttendeeByEmail(email);
    if (existingAttendee) {
      return res.status(400).send({
        success: false,
        message: "Attendee already exists",
        attendee: existingAttendee,
      });
    } else {
      await this.db.createAttendee(attendee);
      return res.status(200).send({ success: true, attendee: null });
    }
  };

  public getAllAttendees: RequestHandler = async (_req, res) => {
    return res.send({ attendees: await this.db.getAllAttendees() });
  };

  getAttendeebyMail: RequestHandler = async (req, res) => {
    const email: string = decodeURI(req.params.email as string);
    const attendee = await this.db.getAttendeeByEmail(email);
    if (!attendee) return res.status(404).send({ attendee: null });
    else {
      return res.status(200).send({ attendee });
    }
  };
}
