// initialisation du routeur express
const express = require("express");
const router = express.Router();

// import controllers 
const carteController = require("../Controllers/carteController");
const auth = require("../Middleware/authMiddleware");



// create cart
router.post("/addCart", carteController.createCart);




module.exports = router;