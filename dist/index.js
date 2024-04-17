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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const bodyParser = require("body-parser");
require("dotenv").config();
const summit_1 = require("./controllers/summit");
const autonomous_1 = require("./controllers/autonomous");
const validate_attendee_middleware_1 = require("./middleware/validate-attendee-middleware");
const error_middleware_1 = require("./middleware/error-middleware");
const misc_1 = require("./controllers/misc");
const datastore_1 = require("./datastore");
function createServer(dbConnectionString) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, datastore_1.initDb)(dbConnectionString);
        const app = (0, express_1.default)();
        // Middlewares
        app.use((0, cors_1.default)());
        app.use(express_1.default.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
        const summitController = new summit_1.SummitController(datastore_1.db);
        const autonomousCompetitionController = new autonomous_1.AutonomousCompetitionController(datastore_1.db);
        /*-----Summit-----*/
        // get all registered summit attendees
        app.get("/summit/attendees", summitController.getAllAttendees);
        // check if user is already registered
        app.get("/summit/attendees/:email", summitController.getAttendeebyMail);
        // add a new attendee
        app.post("/summit/attendees", validate_attendee_middleware_1.validateAttendeeDataMiddleware, summitController.insertAttendee);
        /*-----Competition-----*/
        // get all registered teams
        app.get("/autonomous-race/teams", autonomousCompetitionController.getAllAutonomousTeams);
        // add a new team
        app.post("/autonomous-race/teams", autonomousCompetitionController.insertTeam);
        // get all teams submissions
        app.get("/autonomous-race/submissions", autonomousCompetitionController.getAllSubmissions);
        // get all submissions of a specific team
        app.get("/autonomous-race/submissions/:team_code", autonomousCompetitionController.getTeamSubmissions);
        // insert team submission into the database
        app.post("/autonomous-race/submissions", autonomousCompetitionController.insertSubmission);
        // get Top scores
        app.get("/autonomous-race/top-scores", autonomousCompetitionController.getTopScores);
        /*-----Other-----*/
        // a cron job endpoint for health check and to keep the server running if needed
        app.get("/cron", misc_1.checkServer);
        // report server errors
        app.use(error_middleware_1.errorHandlerMiddleWare);
        return app;
    });
}
exports.createServer = createServer;
