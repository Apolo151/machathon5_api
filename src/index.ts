import express,{ RequestHandler, ErrorRequestHandler } from 'express';
import cors from 'cors';

const bodyParser = require('body-parser')

require('dotenv').config();

import { Pool } from 'pg';

// TODO: Change to prod DB
export const dbPool = new Pool({
    connectionString: process.env.PROD_DB_CONNECTION_STRING
});

const app = express();

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// insert attendee into database
app.post('/scores', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    // insert into database
    const insertQuery = 'INSERT INTO stp.machathon_summit VALUES ($1, $2, $3, $4, TODO: sum of 3 and 4, NOW());';
    const {team_name, team_code, lap1_time, lap2_time} = req.body;
    //
    dbPool.query(insertQuery, [team_name, team_code, lap1_time, lap2_time], (error, results) => {
        if(error){
            res.status(500).json({
                success: false,
                message: "internal error, try again later" //error.message
            })
            throw error;
        }
        else{
            res.status(200).json({
                success: true,
                message: 'successful registration'
            })
        }
    })
});

// Get all registered people
app.get('/scores', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    dbPool.query('SELECT * FROM stp.machathon_scores;', (error, results) => {
        if(error){
            res.status(500).json({
                success: false,
                message: 'internal server error'
            });
            console.log(error);
            //throw error;
        }
        else{
            res.status(200).json(results.rows);
        }
    })
});

// A cron job endpoint to keep the server running
app.get('/cron', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log("WAKE UP");
    res.status(200).json({
        state: "success"
    });
})
// Report server errors
const errHandler: ErrorRequestHandler = (error, req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.error("uncaught exception", error);
    return res.status(500).send("An unexpected error has occurred, please try again.");
}
app.use(errHandler);

// Run server on server port 
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Listening on port ${process.env.SERVER_PORT}`)}
    );