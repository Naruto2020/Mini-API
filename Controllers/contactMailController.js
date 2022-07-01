// import files 
const { User } = require("../Models/user");
const nodemailer = require("nodemailer");
require("dotenv").config();
const crypto = require("crypto");
const async = require("async");
const { Order } = require("../Models/order");
const { Discount } = require("../Models/discount");

// gestion de l'envois de l'email de confirmation 
module.exports.orderEmail = (req, res) =>{
    let order = req.body;

    User.findById(
        order.userId,
        (err, user) =>{
            if(!err){
                try{
                    sendEmail(user, (info)=>{
                        res.status(200).send(info);
                        //console.log(`email envoyé avec l'identifiant : ${user._id}`);
                    });
                    //console.log(req.body);
                    res.json({message: "message recu !!!"});
                }catch(err){
                    return res.status(400).send(err);
                }

            }
        }
    )
};

async function sendEmail(user, cb){
    Order.findOne(
        {userId : user._id},
        (err, order) =>{
            if(!err){
                Discount.findOne(
                    {OrderId : order._id},
                    async (err, discount) =>{
                        if(!err){
                            try{
                                // creation du transport réutilisable avec celui du SMTP
                                let transporter = nodemailer.createTransport({
                                    host : "smtp.gmail.com",
                                    port: 587,
                                    secure: false, // true for 465, false for other ports
                                    auth: {
                                        user : process.env.EMAIL,
                                        pass : process.env.PASSWORD
                                    }
                                });
                                let mailOptions = {
                                    from: 'Mini✨ ghpower409@gmail.com', // address email emettrice
                                    to :  user.email,  to: 'ghpower409@gmail.com', // address email receptrice
                                    subject:"Mini✨",
                                    html: `<h1>Bonjour la commande  N° :  ${order._id} </h1><br/>
                                    <h4> émise par le compte ${user.lastName}, montant ${order.amount}, promo ${discount.promo} </h4>
                                    <p> à été bien enregistrer </p> `, 
                                };
                                // envois du mail et de son contenu 
                                let info = await transporter.sendMail(mailOptions);
                                //console.log("send it ...", user.firstName);
                                cb(info);
                            }catch(err){
                                //console.log(err.message);
                            }

                        }

                    }
                );
            }
        }
    );
}


