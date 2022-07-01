// import UserSchema & OrderShemas
const {User} = require("../Models/user");
const {Order} = require("../Models/order");
const {Product} = require("../Models/product");
const { Carte } = require("../Models/carte");

// import de l'objetId de mongoose
const ObjetId = require("mongoose").Types.ObjectId;


// order mini

module.exports.ord = async (req, res)=>{
    const  { userId , products, amount, address, status,  serialNum, } = req.body;
    
    try{

        const newOrder = await  Order.create({ userId , products, amount, address, status, serialNum});

        // enregistrement du profil 
        res.status(200).json({newOrder:newOrder._id});
    }catch(err){
     
        
        res.status(400).send(err);
    }
};


// display all orders just for admin
module.exports.getAllOrders = async (req, res)=>{

    //console.log("check-it",res.locals.user.niveau);
    if(res.locals.user.niveau === "user"){
        res.status(401).json({error: 'Invalid request! user dont have all rigths'});
    }else{
        const order = await Order.find();
        res.status(200).json(order);

    }

};



// display order by Id 
module.exports.getOrderId =  (req, res)=>{

    if(res.locals.user.niveau === "user"){
        res.status(401).json({error: 'Invalid request! user dont have all rigths'});
    }else{

        // verrification de la validité de l'ID
        if(!ObjetId.isValid(req.params.id))
            return res.status(400).send(`Id incorrecte ${req.params.id}`);
        
        Order.findById(req.params.id, (err, docs)=>{
            if(!err){
                return res.send(docs);
            }else{
                console.log("erreur de transmission de la commande:" + JSON.stringify(err, undefined, 2));
            }
        });

    };
    


};

// update orders products array 

module.exports.miniProduct = async (req, res) =>{

    if(!ObjetId.isValid(req.params.id))
    return res.status(400).send(`Id incorrecte ${req.params.id}`);

    try{
        Order.findByIdAndUpdate(
            // order id 
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

// update order 

module.exports.editOrder = async (req, res) =>{
    
    // verrification de la validité de l'ID
    if(!ObjetId.isValid(req.params.id))
        return res.status(400).send(`Id incorrecte ${req.params.id}`);

    let newOrder =  { 
        address : req.body.address, 
        products: req.body.products,
        amount : req.body.amount,
        status : req.body.status,
        serialNum : req.body.serialNum
    };
    
    try{
        Order.findByIdAndUpdate(
            req.params.id,
            {$set : newOrder},
            {new:true, upsert: true, setDefaultsOnInsert: true},
            (err, docs) =>{
                if(!err){
                    
                    return res.send(docs);
                }else{
                    return res.status(500).send({message: "erreur lors de la mise a jour commande"});
                }
            }
        );  

    }catch(err){
        res.status(400).send(err);
    }

    
};

// delete order 
module.exports.deleteOrder = async(req, res) =>{
    
    if (!ObjetId.isValid(req.params.id))
        return res.status(400).send(`id incorrecte ${req.params.id}`);
    try{
        Order.findByIdAndDelete(
            req.params.id,
            (err, docs) =>{
                if(!err){
                    return res.send(docs);
                }else{
                    return res.status(500).send({message : "erreur lors de la suppression du commande"})
                }
            }
        );
    } catch(err){
        res.status(400).send(err);
    }    

    
};