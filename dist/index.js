"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbPool = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
require('dotenv').config();
const pg_1 = require("pg");
// TODO: Change to prod DB
exports.dbPool = new pg_1.Pool({
    connectionString: process.env.TEST_DB_CONNECTION_STRING
});
const app = (0, express_1.default)();
app.use(multer);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// insert team score into the database
app.post('/scores', upload.any(), (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    // insert into database
    const insertQuery = 'INSERT INTO stp.machathon_scores (team_name, team_code, first_laptime, second_laptime, zip_file, created_at) VALUES ($1, $2, $3, $4, $5, NOW());';
    const { team_name, team_code, first_laptime, second_laptime } = req.body;
    const zip_file = null;
    ////
    exports.dbPool.query(insertQuery, [team_name, team_code, first_laptime, second_laptime, zip_file], (error, results) => {
        if (error) {
            res.status(500).json({
                success: false,
                message: "internal error, try again later" //error.message
            });
            throw error;
        }
        else {
            res.status(200).json({
                success: true,
                message: 'successful registration'
            });
        }
    });
});
// Get all database scores
app.get('/scores', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    exports.dbPool.query('SELECT * FROM stp.machathon_scores;', (error, results) => {
        if (error) {
            res.status(500).json({
                success: false,
                message: 'internal server error'
            });
            console.log(error);
            //throw error;
        }
        else {
            res.status(200).json(results.rows);
        }
    });
});
// A cron job endpoint for maintaining the server
app.get('/cron', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log("WAKE UP");
    res.status(200).json({
        state: "success"
    });
});
// Report server errors
const errHandler = (error, req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.error("uncaught exception", error);
    return res.status(500).send("An unexpected error has occurred, please try again.");
};
app.use(errHandler);
// Run server on server port 
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Listening on port ${process.env.SERVER_PORT}`);
});
