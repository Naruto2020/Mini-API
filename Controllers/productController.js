// import UserSchema & OrderShemas
const {User} = require("../Models/user");
const {Order} = require("../Models/order");
const {Product} = require("../Models/product");
const { Carte } = require("../Models/carte");

// import de l'objetId de mongoose
const ObjetId = require("mongoose").Types.ObjectId;


// order mini

module.exports.createProduct = async (req, res)=>{
    const  { title , desc, price} = req.body;

    if(res.locals.user.niveau === "user"){
        res.status(401).json({error: 'Invalid request! user dont have all rigths'});
    }else{
        try{
    
            const newProduct = await  Product.create({ title , desc, price});
    
            // enregistrement du profil 
            res.status(200).json({newProduct:newProduct._id});
        }catch(err){
         
            
            res.status(400).send(err);
        }

    }
    
};


// display all produts just for admin
module.exports.getAllProducts = async (req, res)=>{

    //console.log("check-it",res.locals.user.niveau);
    if(res.locals.user.niveau === "user"){
        res.status(401).json({error: 'Invalid request! user dont have all rigths'});
    }else{
        const product = await Product.find();
        res.status(200).json(product);

    }

};

// display product by Id 
module.exports.getProdutId =  (req, res)=>{

    if(res.locals.user.niveau === "user"){
        res.status(401).json({error: 'Invalid request! user dont have all rigths'});
    }else{

        // verrification de la validité de l'ID
        if(!ObjetId.isValid(req.params.id))
            return res.status(400).send(`Id incorrecte ${req.params.id}`);
        
        Product.findById(req.params.id, (err, docs)=>{
            if(!err){
                return res.send(docs);
            }else{
                console.log("erreur de transmission de produit:" + JSON.stringify(err, undefined, 2));
            }
        });

    };
    


};


// update product just for admin

module.exports.editProduct = async (req, res) =>{

    if(res.locals.user.niveau === "user"){
        res.status(401).json({error: 'Invalid request! user dont have all rigths'});
    }else{
        // verrification de la validité de l'ID
        if(!ObjetId.isValid(req.params.id))
            return res.status(400).send(`Id incorrecte ${req.params.id}`);
    
        let newProduct =  { 
            title : req.body.title, 
            desc : req.body.desc,
            price : req.body.price,
            
        };
        
        try{
            Product.findByIdAndUpdate(
                req.params.id,
                {$set : newProduct},
                {new:true, upsert: true, setDefaultsOnInsert: true},
                (err, docs) =>{
                    if(!err){
                        
                        return res.send(docs);
                    }else{
                        return res.status(500).send({message: "erreur lors de la mise a jour produit"});
                    }
                }
            );  
    
        }catch(err){
            res.status(400).send(err);
        }

    }
    

    
};

// delete order 
module.exports.deleteProduct = async(req, res) =>{

    if(res.locals.user.niveau === "user"){
        res.status(401).json({error: 'Invalid request! user dont have all rigths'});
    }else{
        if (!ObjetId.isValid(req.params.id))
            return res.status(400).send(`id incorrecte ${req.params.id}`);
        try{
            Product.findByIdAndDelete(
                req.params.id,
                (err, docs) =>{
                    if(!err){
                        return res.send(docs);
                    }else{
                        return res.status(500).send({message : "erreur lors de la suppression du produit"})
                    }
                }
            );
        } catch(err){
            res.status(400).send(err);
        }    

    }
    

    
};