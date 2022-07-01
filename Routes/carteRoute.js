// initialisation du routeur express
const express = require("express");
const router = express.Router();

// import controllers 
const carteController = require("../Controllers/carteController");
const auth = require("../Middleware/authMiddleware");



// create cart
router.post("/addCart", carteController.createCart);

// get cart
router.get("/", auth.requireAuth , auth.checkUser, carteController.getAllCarts);
router.get("/find/:id", auth.requireAuth , auth.checkUser, carteController.getCartId);


// update and delete
router.patch("/mini/:id", auth.requireAuth ,carteController.editCartProduct);
router.put("/:id", auth.requireAuth ,carteController.editCart);

router.delete("/:id", auth.requireAuth , carteController.deleteCarte);




module.exports = router;