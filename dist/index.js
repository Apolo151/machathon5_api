"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbPool = void 0;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var bodyParser = require('body-parser');
require('dotenv').config();
var pg_1 = require("pg");
// TODO: Change to prod DB
exports.dbPool = new pg_1.Pool({
    connectionString: process.env.TEST_DB_CONNECTION_STRING
});
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// insert team score into the database
app.post('/scores', function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    // insert into database
    var insertQuery = 'INSERT INTO stp.machathon_scores VALUES ($1, $2, $3, $4, $5, $6, NOW());';
    var _a = req.body, team_name = _a.team_name, team_code = _a.team_code, first_laptime = _a.first_laptime, second_laptime = _a.second_laptime, zip_file = _a.zip_file;
    //
    exports.dbPool.query(insertQuery, [team_name, team_code, first_laptime, second_laptime,
        first_laptime + second_laptime, zip_file], function (error, results) {
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
// A cron job endpoint for maintaining the server
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
