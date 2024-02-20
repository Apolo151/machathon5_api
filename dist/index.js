"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbPool = void 0;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var bodyParser = require('body-parser');
var _a = require('express-validator'), body = _a.body, validationResult = _a.validationResult;
require('dotenv').config();
var pg_1 = require("pg");
// TODO: Change to prod DB
exports.dbPool = new pg_1.Pool({
    connectionString: process.env.PROD_DB_CONNECTION_STRING
});
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// insert attendee into database
app.post('/scores', function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    // insert into database
    var insertQuery = 'INSERT INTO stp.machathon_summit VALUES ($1, $2, $3, $4, TODO: sum of 3 and 4, NOW());';
    var _a = req.body, team_name = _a.team_name, team_code = _a.team_code, lap1_time = _a.lap1_time, lap2_time = _a.lap2_time;
    //
    exports.dbPool.query(insertQuery, [team_name, team_code, lap1_time, lap2_time], function (error, results) {
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
// Get all registered people
app.get('/scores', function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    exports.dbPool.query('SELECT * FROM stp.machathon_scores;', function (error, results) {
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
// A cron job endpoint to keep the server running
app.get('/cron', function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log("WAKE UP");
    res.status(200).json({
        state: "success"
    });
});
// Report server errors
var errHandler = function (error, req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.error("uncaught exception", error);
    return res.status(500).send("An unexpected error has occurred, please try again.");
};
app.use(errHandler);
// Run server on server port 
app.listen(process.env.SERVER_PORT, function () {
    console.log("Listening on port ".concat(process.env.SERVER_PORT));
});
