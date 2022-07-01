// import files 
const { User } = require("../Models/user");
const nodemailer = require("nodemailer");
require("dotenv").config();
const crypto = require("crypto");
const async = require("async");

// gestion de l'envois de l'email de confirmation 
module.exports.sendEmail = (req, res) =>{
    let user = req.body;
    try{
        sendEmail(user, (info)=>{
            res.status(200).send(info);
            console.log(`email envoyé avec l'identifiant : ${user._id}`);
        });
        console.log(req.body);
        res.json({message: "message recu !!!"});
    }catch(err){
        return res.status(400).send(err);
    }
};

async function sendEmail(user, cb){
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
            to: user.email, // address email receptrice
            subject:"Mini✨",
            html: `<h1>Bonjour  ${user.firstName} </h1><br/>
            <h4>merci de rejoindre l'aventure Mini  !</h4>
            <p>cliquez sur le lien http://localhost:4200/ pour vous connectez </p> `, 
        };
        // envois du mail et de son contenu 
        let info = await transporter.sendMail(mailOptions);
        //console.log("send it ...", user.firstName);
        cb(info);
    }catch(err){
        //console.log(err.message);
    }
}


// requête pour mot de passe oublier
module.exports.forgotPwd = (req, res) =>{
    async.waterfall([
        function(done){
            crypto.randomBytes(20, (err, buf)=>{
                let token = buf.toString("hex");
                done(err, token);
            });
        },
        function (token, done){
            User.findOne({email : req.body.email}, (err, user)=>{
                if(!user){
                    return res.status(400).json({message:{mesBody : "l'utilisateur  n'existe pas.", mesError : true}});
                }
                user.reset = token;
                user.resetExpires = Date.now() + 3600000; // valide 1h
                user.save((err)=>{
                    done(err, token, user)
                });
            });
        },
        function(token, user, done){
            let smtpTransport = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth:{
                    user : process.env.EMAIL,
                    pass : process.env.PASSWORD 
                },
            });
            let mailOptions = {
                from: '"Mini✨" ghpower409@gmail.com', // address email emettrice
                to: user.email, // address email receptrice
                subject:"Mini✨ mot de passe oublié", // Sujet 
                html: `<h1>Bonjour  ${user.firstName} </h1><br/>
                <h4>Bienvenue sur Mini Mme/Mr ${user.lastName} clicquez ici pour reinitialiser votre mot de passe !</h4>
                <p>http://localhost:4200/${token} \n\n ignorez cet email si vous n'ête pas l'auteur de la démarche ...<p>`, 
            };
            smtpTransport.sendMail(mailOptions, (err)=>{
                res.json({message: 'message recu !!!'});
                done(err,"done");
            });
        }
    ], function (err){
        if(err){
            return next(err);
        }

    });
};

// recupérer la clef token 
module.exports.currentToken = (req, res) =>{
    try{
        User.findOne({reset: req.params.token, resetExpires: {$gt:Date.now()}}, (err, doc)=>{
            if(err){
                return res.status(400).json({message : {msgBody : "password reset token n'est pas valid.", msgError:true}});
            }
            res.status(200).json({ user : req.user});
        });
    }catch(err){
        return res.status(400).send(err);
    }
};

// reinitialiser le token (mot de passe )
module.exports.resetPwd = (req, res) =>{
    async.waterfall([
        function(done){
            User.findOne({reset: req.params.token, resetExpires: {$gt:Date.now()}}, (err, user)=>{
                console.log(req.params.token);
                if(!user){
                    res.status(400).json({message : {msgBody : "password reset token n'est pas valid ou a expiré.", msgError:true}});
                }
                user.password = req.body.password;
                user.password1 = req.body.password1;
                user.reset = undefined;
                user.resetExpires = undefined;
                if(user.password !== user.password1){
                    return res.status(500).json({message:{msgBody:"le mot de passe de confirmation doit être identique au nouveau mot de passe"}})
                }
                if(user.password === "" || user.password1 === ""){
                    return res.status(500).json({message:{messBody : "le mot de passe et/ou la confirmation doit être renseigné."}})
                }
                if(user.password.length < 8 || user.password1.length < 8){
                    return res.status(500).json({message:{msgBody:"le mot de passe et/ou la confirmation doit être supérieure à 8 caractères."}})
          
                }
                user.save((err)=>{
                    done(err, user);
                });
            });
        },
        function( user, done){

            var smtpTransport = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth:{
                    user : process.env.EMAIL,
                    pass : process.env.PASSWORD 
                },
            });
            let mailOptions = {
                from: 'Mini✨" ghpower409@gmail.com', // address email emettrice
                to: user.email, // address email receptrice
                subject:"Mini✨ mot de passe réinitialisé !", // Sujet 
                html: `<h1>Bonjour  ${user.firstName} </h1><br/>
                <h4>Bienvenue sur Mini Le mot de passe du compte  ${user.lastName} a bien été reinitialiser</h4>`,
            };
            smtpTransport.sendMail(mailOptions, (err)=>{
                res.json({message: 'message recu !!!'});
                done(err,"done");
            });

        }
    ], function(err){
        if(err){
            return next(err);
        }
    });
};