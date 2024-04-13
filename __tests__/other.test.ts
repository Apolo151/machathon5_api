import request from 'supertest'
const app = require("../src/index")

require("dotenv").config();

describe('GET /cron', () => {
    it('should return 200 & a wake up message', async () => {
        return request(app)
        .get('/cron')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
            console.log(res);
            expect(res.body.msg).toBe("I am awake");
            expect(res.statusCode).toBe(200);
        })
    });
});

// TODO implement other autonomous competition unit tests