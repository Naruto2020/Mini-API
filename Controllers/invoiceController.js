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
    if(!ObjetId.isValid(req.params.OrderId))
        return res.status(400).send(`Id incorrecte ${req.params.OrderId}`);


    let countMiniFamPack = 0;
    let allQty = 0;
    
    try{

        await Order.findById(
            req.params.OrderId,
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
                                    
                                    order.amount += product.price ;

                                    if(product.title === "MiNi Familly pack"){

                                        const isFamillyPack = true;
                                        const isMoreThanfifty = false;
                                        const promo = 20 // 20% on amount

                                        try{

                                            const newDiscount =  Discount.create({isFamillyPack, isMoreThanfifty, promo });
                                    
                                            // enregistrement du profil 
                                            res.status(200).json({newDiscount:newDiscount._id});
                                        }catch(err){
                                         
                                            
                                            res.status(400).send(err);
                                        }

                                        let promo1 = order.amount - (order.amount * 20/100);
                                        countMiniFamPack += 1;
                                        order.amount = order.amount - promo1;
                                    }

                                    if( allQty - countMiniFamPack > 50){

                                        const isFamillyPack = false;
                                        const isMoreThanfifty = true;
                                        const promo = 40 // 40% on every mini 

                                        try{

                                            const newDiscount =  Discount.create({isFamillyPack, isMoreThanfifty, promo });
                                    
                                            // enregistrement du profil 
                                            res.status(200).json({newDiscount:newDiscount._id});
                                        }catch(err){
                                         
                                            
                                            res.status(400).send(err);
                                        }



                                        let promo2 = 6 * (allQty - countMiniFamPack) ;
                                        newOrder.amount - promo2;
                                    }
                                    
                                    
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

    console.log("you : ", currentOrderId);
};