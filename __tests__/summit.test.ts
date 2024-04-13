import request from 'supertest'
const app = require("../src/index")

require("dotenv").config();

describe('GET /summit/attendees', () => {
    it('should return 200 & the list of all people registered for the summit', async () => {
        return request(app)
        .get('/summit/attendees')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
            expect(res.statusCode).toBe(200);
        })
    });
});

// TODO implement other summit unit tests