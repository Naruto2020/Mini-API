// import UserSchema
const {User} = require("../Models/user");

// import de l'objetId de mongoose
const ObjetId = require("mongoose").Types.ObjectId;

const bcrypt = require('bcrypt');


// display all users without pasword
module.exports.getAllUsers = async (req, res)=>{

    const users = await User.find().select("-password");
    res.status(200).json(users);

};



// display user by Id 
module.exports.getUserId =  (req, res)=>{
    
    // verrification de la validité de l'ID
    if(!ObjetId.isValid(req.params.id))
        return res.status(400).send(`Id incorrecte ${req.params.id}`);
    
    User.findById(req.params.id, (err, docs)=>{
        if(!err){
            return res.send(docs);
        }else{
            console.log("erreur de transmission du comptes utilisateur:" + JSON.stringify(err, undefined, 2));
        }
    }).select("-password");


};

// display user by name 
module.exports.getUserName = async (req, res) =>{
    
    try{
        await User.findOne(
            {nom :req.params.nom},
            (err, user)=>{
                if(!user){
                    return res.json({message : "Couldn't find a user by that name"});
                }else{
                    res.status(200).json(user);
                }
            }
        );
    }catch(err){
        res.status(400).send(err);
    }

};

// update user 

module.exports.editUser = async (req, res) =>{
    
    // verrification de la validité de l'ID
    if(!ObjetId.isValid(req.params.id))
        return res.status(400).send(`Id incorrecte ${req.params.id}`);

    let newUser =  { 
        adress : req.body.adress, 
        phone : req.body.phone
    };
    
    try{
        User.findByIdAndUpdate(
            req.params.id,
            {$set : newUser},
            {new:true, upsert: true, setDefaultsOnInsert: true},
            (err, docs) =>{
                if(!err){
                    
                    return res.send(docs);
                }else{
                    return res.status(500).send({message: "erreur lors de la mise a jour utilisateur"});
                }
            }
        );  

    }catch(err){
        res.status(400).send(err);
    }

    
};

// delete user 
module.exports.deleteUser = async(req, res) =>{
    
    if (!ObjetId.isValid(req.params.id))
        return res.status(400).send(`id incorrecte ${req.params.id}`);
    try{
        User.findByIdAndDelete(
            req.params.id,
            (err, docs) =>{
                if(!err){
                    return res.send(docs);
                }else{
                    return res.status(500).send({message : "erreur lors de la suppression du compte"})
                }
            }
        );
    } catch(err){
        res.status(400).send(err);
    }    

    
};

