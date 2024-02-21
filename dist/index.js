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
//const upload = multer({ dest: './' })
require('dotenv').config();
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        let filename = 'solution.zip';
        req.body.file = filename;
        cb(null, filename);
    }
});
var upload = multer({ storage: storage });
const pg_1 = require("pg");
exports.dbPool = new pg_1.Pool({
    connectionString: process.env.DB_CONNECTION_STRING
});
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// insert team score into the database
app.post('/scores', upload.any(), (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    // insert into database
    const insertQuery = 'INSERT INTO stp.machathon_scores (team_code, first_laptime, second_laptime, zip_file, created_at) VALUES ($1, $2, $3, $4, NOW());';
    const { team_code, first_laptime, second_laptime } = JSON.parse(req.body.body);
    const zip_file = req.body.file;
    //
    exports.dbPool.query(insertQuery, [team_code, first_laptime, second_laptime, zip_file], (error, results) => {
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
    exports.dbPool.query('SELECT mt.team_name, ms.total_laptime FROM stp.machathon_scores ms JOIN stp.machathon_teams mt ON ms.team_code=mt.team_code;', (error, results) => {
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
