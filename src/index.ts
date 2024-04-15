import express, { RequestHandler, ErrorRequestHandler } from "express";
import cors from "cors";

const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");

require("dotenv").config();

import { Pool } from "pg";
import { insertAttendee } from "./controllers/summit";
import {
  getAllAutonomousTeams,
  getAllSubmissions,
  getTopScores,
  insertTeam,
} from "./controllers/autonomous";
import { validateAttendeeDataMiddleware } from "./middleware/validate-attendee-middleware";
import { errorHandlerMiddleWare } from "./middleware/error-middleware";

export const dbPool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*-----Summit-----*/
// insert attendee into database
app.post("/summit/attendees", validateAttendeeDataMiddleware, (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const errors = validationResult(req);
  // validate data
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  // insert into database
  const insertQuery =
    "INSERT INTO machathon.summit VALUES ($1, $2, $3, $4, $5, $6, $7, NOW());";
  const {
    name,
    phone_number,
    email,
    national_id,
    university,
    faculty,
    grad_year,
  } = req.body;
  //
  dbPool.query(
    insertQuery,
    [name, phone_number, email, national_id, university, faculty, grad_year],
    (error, results) => {
      if (error) {
        res.status(500).json({
          success: false,
          message: "internal error, try again later", //error.message
        });
        throw error;
      } else {
        res.status(200).json({
          success: true,
          message: "successful registration",
        });
      }
    }
  );
});

// Get all registered summit attendees
app.get("/summit/attendees", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  dbPool.query("SELECT * FROM machathon.summit;", (error, results) => {
    if (error) {
      res.status(500).json({
        success: false,
        message: "internal server error",
      });
      console.log(error);
      //throw error;
    } else {
      res.status(200).json(results.rows);
    }
  });
});

// an endpoint to check if the user already exists in the database
app.get("/summit/attendees", async (req, res) => {
  const email: string = decodeURI(req.query.email as string);
  console.log(email);
  const nID = req.query.nid;
  const qu = "SELECT * FROM machathon.summit WHERE email=$1 OR national_id=$2;";
  //
  dbPool.query(qu, [email, nID], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

/*-----Competition-----*/

// insert team submission into the database
app.post("/autonomous-race/submissions", insertAttendee);

// Get all teams submissions
app.get("/autonomous-race/submissions", getAllSubmissions);

// Get Top scores
app.get("/autonomous-race/top-scores", getTopScores);

// get all registered teams
app.get("/autonomous-race/teams", getAllAutonomousTeams);

// Add a new team
app.post("/autonomous-race/teams", insertTeam);

/*-----Other-----*/
// A cron job endpoint for health check and to keep the server running if needed
app.get("/cron", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  console.log("WAKE UP");
  res.status(200).json({
    state: "success",
    msg: "I am awake",
  });
});

// Report server errors
app.use(errorHandlerMiddleWare);

module.exports = app;
