// initialisation du server et des variables d'environnement 
const express = require("express");
const path = require('path');
const userRoutes = require("./Routes/userRoute");
//const orderRoutes = require("./Routes/orderRoute");


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
app.use("/uploads", express.static('client/uploads/posts'));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));



// routes 
app.use("/api/user", userRoutes);
//app.use("/api/order", postRoute);



module.exports = app;