import express from "express";
import cors from "cors";

const bodyParser = require("body-parser");

require("dotenv").config();

import { SummitController } from "./controllers/summit";
import { AutonomousCompetitionController } from "./controllers/autonomous";
import { validateAttendeeDataMiddleware } from "./middleware/validate-attendee-middleware";
import { errorHandlerMiddleWare } from "./middleware/error-middleware";
import { checkServer } from "./controllers/misc";
import { db, initDb } from "./datastore";

export async function createServer() {
  await initDb();

  const app = express();

  // Middlewares
  app.use(cors());
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  const summitController = new SummitController(db);
  const autonomousCompetitionController = new AutonomousCompetitionController(
    db
  );

  /*-----Summit-----*/
  // insert attendee into database
  app.post(
    "/summit/attendees",
    validateAttendeeDataMiddleware,
    summitController.insertAttendee
  );

  // Get all registered summit attendees
  app.get("/summit/attendees", summitController.getAllAttendees);

  // an endpoint to check if the user already exists in the database
  app.get("/summit/attendees/:email", summitController.getAttendeebyMail);

  /*-----Competition-----*/

  // insert team submission into the database
  app.post(
    "/autonomous-race/submissions",
    autonomousCompetitionController.insertSubmission
  );

  // Get all teams submissions
  app.get(
    "/autonomous-race/submissions",
    autonomousCompetitionController.getAllSubmissions
  );

  // Get Top scores
  app.get(
    "/autonomous-race/top-scores",
    autonomousCompetitionController.getTopScores
  );

  // get all registered teams
  app.get(
    "/autonomous-race/teams",
    autonomousCompetitionController.getAllAutonomousTeams
  );

  // Add a new team
  app.post(
    "/autonomous-race/teams",
    autonomousCompetitionController.insertTeam
  );

  /*-----Other-----*/
  // A cron job endpoint for health check and to keep the server running if needed
  app.get("/cron", checkServer);

  // Report server errors
  app.use(errorHandlerMiddleWare);

  return app;
}
