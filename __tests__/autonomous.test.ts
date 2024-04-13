import request from 'supertest'
const app = require("../src/index")

require("dotenv").config();

describe('GET /autonomous-race/top-scores', () => {
    it('should return 200 & the list of each team top-score sorted according to the best score',
     async () => {
        return request(app)
        .get('/autonomous-race/top-scores')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
            expect(res.statusCode).toBe(200);
        })
    });
});

// TODO implement other autonomous competition unit tests