// initialisation du routeur express
const express = require("express");
const router = express.Router();

// import controllers 
const authController = require("../Controllers/authController");
const userController = require("../Controllers/userController");



// create user and Auth 
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);



//diqplay user 
router.get("/", userController.getAllUsers);
router.get("/find/:id", userController.getUserId);
router.get("/find/:nom", userController.getUserName);

// update and delete
router.put("/:id", userController.editUser);
router.delete("/:id", userController.deleteUser);



module.exports = router;