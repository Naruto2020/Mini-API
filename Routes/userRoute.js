// initialisation du routeur express
const express = require("express");
const router = express.Router();

// import controllers 
const authController = require("../Controllers/authController");
const userController = require("../Controllers/userController");
const uploadController = require("../Controllers/uploadController");


// multer for upload img 
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb){
       
        //cb(null, 'roadTrip/src/assets/uploads/profiles');
        cb(null, 'client/uploads/profiles');
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

// upload image
router.post("/upload", upload.single("photo") , uploadController.profilPhoto );



module.exports = router;