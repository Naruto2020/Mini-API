// import UserSchema & OrderShemas
const {User} = require("../Models/user");
const {Order} = require("../Models/order");
const {Product} = require("../Models/product");
const { Carte } = require("../Models/carte");

// import de l'objetId de mongoose
const ObjetId = require("mongoose").Types.ObjectId;


// order mini

module.exports.createCart = async (req, res)=>{
    const  { userId , products} = req.body;
    
    try{

        const newCarte = await  Carte.create({ userId , products});

        // enregistrement du profil 
        res.status(200).json({newCarte:newCarte._id});
    }catch(err){
     
        
        res.status(400).send(err);
    }
};