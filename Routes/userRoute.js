// initialisation du routeur express
const express = require("express");
const router = express.Router();

// import controllers 
const authController = require("../Controllers/authController");
const userController = require("../Controllers/userController");
const uploadController = require("../Controllers/uploadController");
const orderController = require("../Controllers/orderController");
const nodemailController = require("../Controllers/nodeMailController");
const contactmailController = require("../Controllers/contactMailController");
const auth = require("../Middleware/authMiddleware");


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



// send confirmation email 
router.post("/notifications", nodemailController.sendEmail);
// send contact email 
router.post("/contact", contactmailController.orderEmail);
// requête pour mot de passe oublier
router.post("/forgotPassword", nodemailController.forgotPwd);
// recupérer la clef token 
router.get("/reset/:token", nodemailController.currentToken);
// reinitialiser le mdp
router.post("/reset/:token", nodemailController.resetPwd);


//diqplay user 
router.get("/", auth.requireAuth , auth.checkUser, userController.getAllUsers);
router.get("/find/:id", auth.requireAuth , auth.checkUser, userController.getUserId);
router.get("/find/:nom", auth.requireAuth , auth.checkUser, userController.getUserName);

// update and delete
router.put("/:id", auth.requireAuth , userController.editUser);
router.delete("/:id", auth.requireAuth , userController.deleteUser);

// upload image
router.post("/upload", upload.single("photo") , auth.requireAuth , uploadController.profilPhoto );



module.exports = router;