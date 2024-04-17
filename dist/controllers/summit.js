"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SummitController = void 0;
const express_validator_1 = require("express-validator");
class SummitController {
    constructor(db) {
        //
        this.insertAttendee = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // validate data
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array(),
                });
            }
            // extract data
            const { full_name, phone_number, email, national_id, university, faculty, graduation_year, } = req.body.attendee;
            const attendee = {
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
            const existingAttendee = yield this.db.getAttendeeByEmail(email);
            if (existingAttendee) {
                return res.status(400).send({
                    success: false,
                    message: "Attendee already exists",
                    attendee: existingAttendee,
                });
            }
            else {
                yield this.db.createAttendee(attendee);
                return res.status(200).send({ success: true, attendee: null });
            }
        });
        this.getAllAttendees = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            return res.send({ attendees: yield this.db.getAllAttendees() });
        });
        this.getAttendeebyMail = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const email = decodeURI(req.params.email);
            const attendee = yield this.db.getAttendeeByEmail(email);
            if (!attendee)
                return res.status(404).send({ attendee: null });
            else {
                return res.status(200).send({ attendee });
            }
        });
        this.db = db;
    }
}
exports.SummitController = SummitController;
