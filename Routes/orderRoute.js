// initialisation du routeur express
const express = require("express");
const router = express.Router();

// import controllers 
const orderController = require("../Controllers/orderController");
const uploadController = require("../Controllers/uploadController");
const invoiceController = require("../Controllers/invoiceController");

const auth = require("../Middleware/authMiddleware");



// create cart
router.post("/orderPdt", auth.requireAuth , orderController.ord);

// get order
router.get("/", auth.requireAuth , auth.checkUser, orderController.getAllOrders);
router.get("/find/:id", auth.requireAuth , auth.checkUser, orderController.editOrder);


// update and delete
router.put("/:id", auth.requireAuth ,orderController.editOrder);
router.patch("/mini/:id", auth.requireAuth ,orderController.miniProduct);

router.delete("/:id", auth.requireAuth , orderController.deleteOrder);

// create discount
router.post("/discount/:id", invoiceController.invoice);




module.exports = router;