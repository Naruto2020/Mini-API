const {User} = require("../Models/user");
const jwt = require("jsonwebtoken");


// verrification liée a la connexion utilisateur 
module.exports.checkUser = (req, res, next)=>{
    // authentification du token utilisateur
    try{
        const token = req.cookies.jwt;
        if(token){
            console.log("decodedToken : ", token);
            jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) =>{
                if(err){
                    res.locals.user = null;
                    res.cookie('jwt', '', {maxlife:1});
                    next();
                }else{
                    res.locals.token = decodedToken;
                    console.log("decodedToken",  decodedToken);
                    let user = await User.findById(decodedToken.id);
                    res.locals.user = user;
                    console.log("check",res.locals.token);
                    next();
                }
            })
        }else{
            res.locals.user = null;
            return res.status(401).json({
                message: "echec de l'authentification token absent"
            });
            //console.log("check2",res.locals.user);
            //next();
        }

    }catch(err){
        return res.status(401).json({
            message: "echec de l'authentification"
        });
    }
}

// information de l'utilisateur connecté 
module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) =>{
            if(err){
                console.log(err);
            }else{
                console.log("current user.id : ",decodedToken.id);
                res.status(200).json({decodedToken: decodedToken.id})
                next();
            }
        });
    }else{
        res.status(401).json({error: 'Invalid request! user is not authenticate'});

        //console.log("token absent ...");
    }
}