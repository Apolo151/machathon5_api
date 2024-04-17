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

export async function createServer(dbConnectionString?: string) {
  await initDb(dbConnectionString);

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

  // get all registered summit attendees
  app.get("/summit/attendees", summitController.getAllAttendees);

  // check if user is already registered
  app.get("/summit/attendees/:email", summitController.getAttendeebyMail);

  // add a new attendee
  app.post(
    "/summit/attendees",
    validateAttendeeDataMiddleware,
    summitController.insertAttendee
  );

  /*-----Competition-----*/

  // get all registered teams
  app.get(
    "/autonomous-race/teams",
    autonomousCompetitionController.getAllAutonomousTeams
  );

  // add a new team
  app.post(
    "/autonomous-race/teams",
    autonomousCompetitionController.insertTeam
  );

  // get all teams submissions
  app.get(
    "/autonomous-race/submissions",
    autonomousCompetitionController.getAllSubmissions
  );

  // get all submissions of a specific team
  app.get(
    "/autonomous-race/submissions/:team_code",
    autonomousCompetitionController.getTeamSubmissions
  );

  // insert team submission into the database
  app.post(
    "/autonomous-race/submissions",
    autonomousCompetitionController.insertSubmission
  );

  // get Top scores
  app.get(
    "/autonomous-race/top-scores",
    autonomousCompetitionController.getTopScores
  );

  /*-----Other-----*/
  // a cron job endpoint for health check and to keep the server running if needed
  app.get("/cron", checkServer);

  // report server errors
  app.use(errorHandlerMiddleWare);

  return app;
}
