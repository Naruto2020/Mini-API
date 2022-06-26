
const request = require("supertest");
const app = require("../app");
const {User} = require("../Models/user");
const newUser = {
    lastName : "evra",
    firstName : "patrice",
    email: "evra2020@test.com",
    password : "patrice2020",
    adress: "place des lices",
    niveau : "user"
}

// cancel user account test before create another one 
beforeEach( async()=>{
    
    await User.findOneAndDelete(
        {lastName : "henry"}
    );
    await User.findOneAndDelete(
        {lastName : "evra"}
    );
    await User(newUser).save();
});

// test singUp user
describe("Post /user", ()=>{

    it(' should singUp user', async ()=>{
         await request(app)
          .post("/api/user/register")
          .send({
            lastName : "henry",
            firstName : "thiery",
            adress: "bvd clémenceau",
            email : "titi01@test.com",
            password : "test2020",
            niveau : "user"
          })
          .expect(200);

    }); 
});

// test signIn user 
describe("Post login user", ()=>{
    it("should singIn user", async () =>{
        const response = await request(app)
          .post("/api/user/login")
          .send({
              email : newUser.email,
              password : newUser.password
          })
          .expect(200)
          expect(response.get(`Set-Cookie`)).toBeDefined();
          console.log("connect with firstName --> ",newUser.firstName);
    });
});

// test singOut user 
describe("Get logout user ", () =>{
    it("should singOut user", async () =>{
        const response = await request(app)
          .get("/api/user/logout")
          .send({})
          .expect(302)
       
    });
});