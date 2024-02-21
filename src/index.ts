import express,{ RequestHandler, ErrorRequestHandler } from 'express';
import cors from 'cors';

//const bodyParser = require('body-parser')
const multer  = require('multer');

var storage = multer.diskStorage({

    destination: function (req:any, file:any, cb:any) {
  
      cb(null, '/filepath')
    },
  
  
    filename: function (req:any, file:any, cb:any) {
  
      let filename = 'solution.zip';
       req.body.file = filename
  
      cb(null, filename)
    }
  })
  
//const upload = multer({ dest: 'uploads/' });

var upload = multer({storage: storage});

require('dotenv').config();

import { Pool } from 'pg';

// TODO: Change to prod DB
export const dbPool = new Pool({
    connectionString: process.env.TEST_DB_CONNECTION_STRING
});

const app = express();
app.use(multer)
app.use(cors());
//app.use(express.json())
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());

// insert team score into the database
app.post('/scores', upload.any(), (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    // insert into database
    const insertQuery = 'INSERT INTO stp.machathon_scores (team_name, team_code, first_laptime, second_laptime, zip_file, created_at) VALUES ($1, $2, $3, $4, $5, NOW());';
    const {team_name, team_code, first_laptime, second_laptime} = req.body;
    const zip_file = req.body.file;
    ////
    dbPool.query(insertQuery, [team_name, team_code, first_laptime, second_laptime, zip_file], (error, results) => {
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

// Get all database scores
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

// A cron job endpoint for maintaining the server
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