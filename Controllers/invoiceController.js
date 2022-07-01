// import UserSchema & OrderShemas
const {User} = require("../Models/user");
const {Order} = require("../Models/order");
const {Product} = require("../Models/product");
const { Carte } = require("../Models/carte");
const { Discount } = require("../Models/discount");

// import de l'objetId de mongoose
const ObjetId = require("mongoose").Types.ObjectId;


// update user 

module.exports.invoice = async (req, res) =>{
    
    // verrification de la validité de l'ID
    if(!ObjetId.isValid(req.params.id))
        return res.status(400).send(`Id incorrecte ${req.params.id}`);

        let countMiniFamPack = 0;
        let allQty = 0;
        let promoMini = 0;

        
        try{

        Order.findById(
            // id order en parametre
            req.params.id,
            (err, order) =>{
                if(!err){
                    let orderProd = order.products;
                    for(let prod of orderProd){

                        let orderProdQty = prod.quantity;
                        let orderProdId = prod.productId;

                        allQty += orderProdQty

                        Product.findById(
                            {_id : orderProdId},
                            (err, product) =>{
                                if(!err){

                                    if(product.title === "MiNi Familly pack"){

                                        const OrderId = order._id;
                                        const isFamillyPack = true;
                                        const isMoreThanfifty = false;
                                        const promo = 20 // 20% on amount

                                        try{

                                            const newDiscount =  Discount.create({OrderId, isFamillyPack, isMoreThanfifty, promo });
                                    
                                            // enregistrement du profil 
                                            newDiscount.then(function(result){
                                                console.log("wherre !!!! : ", result);
                                                res.status(200).json({discount : result.promo})

                                            });
                                        }catch(err){
                                         
                                            
                                            res.status(400).send(err);
                                        }

                                        let promo1 =  (order.amount * 20/100);
                                        order.amount = order.amount - promo1
                                       
                                       countMiniFamPack += 1;
                                        //order.amount = order.amount - promo1;
                                       
                                       
                                    }

                                    if( allQty - countMiniFamPack > 50){

                                        const isFamillyPack = false;
                                        const isMoreThanfifty = true;
                                        const promo = 40 // 40% on every mini 

                                        try{

                                            const newDiscount =  Discount.create({isFamillyPack, isMoreThanfifty, promo });
                                    
                                            // enregistrement de la promo 
                                            newDiscount.then(function(result){
                                                console.log("wherre !!!! : ", result);
                                                res.status(200).json({discount : result.promo})

                                            });
                                        }catch(err){
                                         
                                            
                                            res.status(400).send(err);
                                        }

                                        promoMini += 1

                                        let promo2 = 6 * (allQty - countMiniFamPack) ;
                                        order.amount - promo2;
                                    }
                                   
                                
                                    console.log("final amount : ", order.amount);
                                   
                                                                                                    
                                }else{
                                    return res.status(500).send({message : "le produit n'existe pas ! "})
                                }
                            },

                            
                        );
                        
                    }
                
                   
                }
            }
        );
  

    }catch(err){
        res.status(400).send(err);
    }

    
};