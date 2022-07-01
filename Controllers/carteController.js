// import UserSchema & OrderShemas
const {User} = require("../Models/user");
const {Order} = require("../Models/order");
const {Product} = require("../Models/product");
const { Carte } = require("../Models/carte");

// import de l'objetId de mongoose
const ObjetId = require("mongoose").Types.ObjectId;


// cart

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


// display all carts just for admin
module.exports.getAllCarts = async (req, res)=>{

    //console.log("check-it",res.locals.user.niveau);
    if(res.locals.user.niveau === "user"){
        res.status(401).json({error: 'Invalid request! user dont have all rigths'});
    }else{
        const cart = await Carte.find();
        res.status(200).json(cart);

    }

};



// display cart by Id 
module.exports.getCartId =  (req, res)=>{

    if(res.locals.user.niveau === "user"){
        res.status(401).json({error: 'Invalid request! user dont have all rigths'});
    }else{

        // verrification de la validité de l'ID
        if(!ObjetId.isValid(req.params.id))
       
            return res.status(400).send(`Id incorrecte ${req.params.id}`);
        
        Carte.findById(req.params.id, (err, docs)=>{
            if(!err){
                return res.send(docs);
            }else{
                console.log("erreur de transmission du pagnier:" + JSON.stringify(err, undefined, 2));
            }
        });

    };
    


};

// update cart products array 

module.exports.editCartProduct = async (req, res) =>{

    if(!ObjetId.isValid(req.params.id))
    return res.status(400).send(`Id incorrecte ${req.params.id}`);

    try{
        Carte.findByIdAndUpdate(
            req.params.id,
            {
                        
                        
                $push:{
                    products:{
                        
                        productId: req.body.productId,
                        quantity: req.body.quantity,
                    }
                }   
                
            },
            {new : true},
            (err, docs) =>{
                if(!err){
                    return res.send(docs);
                }else{
                    return res.status(500).send({message:`erreur lors de l'ajout produit `})
                }
            }
        );
    }catch(err){
         
        res.status(400).send(errors);
    }    
};

// update cart 

module.exports.editCart = async (req, res) =>{
    
    // verrification de la validité de l'ID
    if(!ObjetId.isValid(req.params.id))
        return res.status(400).send(`Id incorrecte ${req.params.id}`);

    let newCarte =  { 
        products : req.body.products, 
      
    };
    
    try{
        Carte.findByIdAndUpdate(
            req.params.id,
            {$set : newCarte},
            {new:true, upsert: true, setDefaultsOnInsert: true},
            (err, docs) =>{
                if(!err){
                    
                    return res.send(docs);
                }else{
                    return res.status(500).send({message: "erreur lors de la mise a jour pagnier"});
                }
            }
        );  

    }catch(err){
        res.status(400).send(err);
    }

    
};

// delete order 
module.exports.deleteCarte = async(req, res) =>{
    
    if (!ObjetId.isValid(req.params.id))
        return res.status(400).send(`id incorrecte ${req.params.id}`);
    try{
        Carte.findByIdAndDelete(
            req.params.id,
            (err, docs) =>{
                if(!err){
                    return res.send(docs);
                }else{
                    return res.status(500).send({message : "erreur lors de la suppression du pagnier"})
                }
            }
        );
    } catch(err){
        res.status(400).send(err);
    }    

    
};