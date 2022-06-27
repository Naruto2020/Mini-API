const request = require("supertest");
const app = require("../app");
const {User} = require("../Models/user");

const newUser = {
    lastName : "evra-Unit-Test",
    firstName : "patrice",
    email: "evra2022@test.com",
    password : "patrice2022",
    adress: "place des lices",
    niveau : "user"
}

// cancel user account test before create another one 
beforeEach( async()=>{
    
    await User.findOneAndDelete(
        {lastName : "henry"}
    );
    await User.findOneAndDelete(
        {lastName : "evra-Unit-Test"}
    );
    await User(newUser).save();
});


// test display users protected by middleware


describe('check  middleware', function() {
    it('Should return Invalid request 401', async () => {
        const response = await request(app)
            .get('/authUser')
            .set('Accept', 'application/json')
            expect(response.status).toEqual(401);
    });
});

describe('check  middleware', function() {
    it('Should return response.locals.token', async () => {
        const response = await request(app)
            .get('/jwtid')
            .set('Accept', 'application/json')
            expect(response.status).toEqual(401);
           
    });
});