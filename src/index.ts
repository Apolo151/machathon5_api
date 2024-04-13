import express,{ RequestHandler, ErrorRequestHandler } from 'express';
import cors from 'cors';


const bodyParser = require('body-parser')
const { body, validationResult } = require('express-validator');
const path = require("path");

require('dotenv').config();

import { Pool } from 'pg';

export const dbPool = new Pool({
    connectionString: process.env.DATABASE_URL
});

const app = express();

// Middlewares
app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const isYearValid = (year: number): boolean => {
    if((year > 2033 || year < 1990)){
        return false;
    }
    return true;
}

const validateAttendeeDataMiddleware: RequestHandler = (req, res, next) => {
    body('email').isEmail().normalizeEmail(),
    body('national_id').isLength({
        min: 14,
        max: 14
    }),
    body('national_id').isInt(),
    body('name').isString(),
    body('phone_number').matches(/^01[0-2,5]\d{8}$/),
    body("university").isString(),
    body("faculty").isString(),
    isYearValid(body("grad_year")),
    next();
}

/*-----Summit-----*/
// insert attendee into database
app.post('/summit/attendees', validateAttendeeDataMiddleware, (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const errors = validationResult(req);
    // validate data
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }
    // insert into database
    const insertQuery = 'INSERT INTO machathon.summit VALUES ($1, $2, $3, $4, $5, $6, $7, NOW());';
    const {name, phone_number, email, national_id, university, faculty, grad_year} = req.body;
    //
    dbPool.query(insertQuery, [name, phone_number, email, national_id, university, faculty, grad_year], (error, results) => {
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

// Get all registered summit attendees
app.get('/summit/attendees', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    dbPool.query('SELECT * FROM machathon.summit;', (error, results) => {
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

// an endpoint to check if the user already exists in the database
app.get('/summit/attendees', async (req, res) => {
    const email: string = decodeURI(req.query.email as string);
    console.log(email);
    const nID = req.query.nid;
    const qu = "SELECT * FROM machathon.summit WHERE email=$1 OR national_id=$2;"
    //
    dbPool.query(qu, [email, nID], (error, results) => {
        if(error){
            throw error;
        }
        res.status(200).json(results.rows);
    })
})

/*-----Competition-----*/

// insert team submission into the database
app.post('/autonomous-race/submissions', (req, res) => {
    console.log(req.body);
    res.setHeader("Access-Control-Allow-Origin", "*");
    // insert into database
    const insertQuery = 'INSERT INTO machathon.autonomous_submissions (team_code, first_laptime, second_laptime, zip_file, created_at) VALUES ($1, $2, $3, $4, NOW());';
    const {team_code, first_laptime, second_laptime, solution_file} = req.body;
    //
    dbPool.query(insertQuery, [team_code, first_laptime, second_laptime, solution_file], (error, results) => {
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

// Get all teams submissions
app.get('/autonomous-race/submissions', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    // TODO: query database to get results
})

// Get Top scores
app.get('/autonomous-race/top-scores', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    dbPool.query('SELECT mat.team_name, best_laptime FROM machathon.autonomous_teams mat JOIN ( SELECT team_code, MIN(total_laptime) AS best_laptime FROM machathon.autonomous_submissions GROUP BY team_code) AS best_laptimes ON mat.team_code = best_laptimes.team_code;', (error, results) => {
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

// get all registered teams
app.get('/autonomous-race/teams', (req, res) => {
    // TODO
})

// Add a new team
app.post('/autonomous-race/teams', (req, res) => {
    // TODO
})

/*-----Other-----*/
// A cron job endpoint for health check and to keep the server running if needed
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