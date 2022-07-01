// initialisation du server et des variables d'environnement 
const express = require("express");
const path = require('path');
const userRoutes = require("./Routes/userRoute");
const productRoutes = require("./Routes/productRoute");
const orderRoutes = require("./Routes/orderRoute");
const carteRoutes = require("./Routes/carteRoute");
const Auth0 = require("./Middleware/authMiddleware");


const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')

// import fichier .env
require("dotenv").config({path:"./Config/.env"});
//const {mongoose} = require("./config/db");
const {mongoose} = require("./Config/db");

const app = express();


const corsOptions = {
  // cors policy from dev or prod 
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
  }

app.use(cors(corsOptions));

// gestions des dossiers 

app.use("/uploads", express.static('client/uploads/profiles'));
app.use("/uploads", express.static('client/uploads/products'));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));


// securité auth jwt 
app.get("/authUser", Auth0.requireAuth); // on verrifie le jetton de connexion 
app.get("/jwtid", Auth0.checkUser, (req, res) =>{ // on récuppère les infos de l'ut connecté 
    res.status(200).send(res.locals.token);
}); 

// routes 
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/cart", carteRoutes);



module.exports = app;