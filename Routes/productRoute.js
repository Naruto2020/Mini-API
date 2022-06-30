// initialisation du routeur express
const express = require("express");
const router = express.Router();

// import controllers 
const productController = require("../Controllers/productController");
const uploadController = require("../Controllers/uploadController");

const auth = require("../Middleware/authMiddleware");


// multer for upload img 
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb){
       
        //cb(null, 'roadTrip/src/assets/uploads/profiles');
        cb(null, 'client/uploads/products');
    },

    filename: function(req, file, cb){
        cb(null, new Date().toISOString().replace(/:/g, '-') +  file.originalname);
    }
});

const fileFilter = (req, file, cb) =>{
    
    // reject a file
    if(file.mimetype === "image/jpeg"  || file.mimetype === "image/png"){
        cb(null, true);
    } else{
        cb(null, false);
    }
    
    
};

const upload = multer({
    storage: storage, limits:{
    fileSize: 1024 * 1024 * 5 
    },
    fileFilter: fileFilter

});



// create products
router.post("/addProducts", auth.requireAuth , auth.checkUser, productController.createProduct);

// get order
router.get("/", auth.requireAuth , auth.checkUser, productController.getAllProducts);
router.get("/find/:id", auth.requireAuth , auth.checkUser, productController.getProdutId);


// update and delete
router.put("/:id", auth.requireAuth ,productController.editProduct);
router.delete("/:id", auth.requireAuth , productController.deleteProduct);


// upload image
//router.post("/upload", upload.single("img") , auth.requireAuth , uploadController.profilPhoto );



module.exports = router;