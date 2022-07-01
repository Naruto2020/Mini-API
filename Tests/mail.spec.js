const request = require("supertest");
const app = require("../app");
const {User} = require("../Models/user");

const order = {
    
    userId : "62b8355722a5f2d806b6e08d",
    products: {
        productId : "62bca589f807543082e2d5f3",
        quantity : 1
    },
    amount: 50
    
}

const user = {
    lastName : "evra-Unit-Test",
    firstName : "patrice",
    email: "guyfredy@gmail.com",
    password : "patrice2022",
    adress: "place des lices",
    niveau : "user"
}



// test send email
describe("Post /user/", ()=>{

    it(' should send order email confirmation ', async ()=>{
        await request(app)
        .post("/api/user/contact")
        .send({
        userId : "62b8355722a5f2d806b6e08d",
        products: {
            productId : "62bca589f807543082e2d5f3",
            quantity : 1
        },
        amount: 50
        })
        .expect(200);

    }); 
});

// test send email
describe("Post /user/notification", ()=>{

    it(' should send order email confirmation ', async ()=>{
        await request(app)
        .post("/api/user/notifications")
        .send({
            lastName : "evra-Unit-Test",
            firstName : "patrice",
            email: "guyfredy@gmail.com",
            password : "patrice2022",
            adress: "place des lices",
            niveau : "user"
        })
        .expect(200);

    }); 
});


