const request = require("supertest");
const app = require("../app");
const {User} = require("../Models/user");

// test display users 

describe('GET /users', function() {
    it('responds with json', async () => {
      const response = await request(app)
        .get('/api/user')
        .set('Accept', 'application/json')
      expect(response.status).toEqual(200);
    });
});

// test display user by id 62b83762ec4f5b62ab1b4eb7

describe('GET /users/:id', function() {
    it('responds with json', async () => {
      const response = await request(app)
        .get('/api/user/find/62b83762ec4f5b62ab1b4eb7')
        .set('Accept', 'application/json')
      expect(response.status).toEqual(200);
    });
});

