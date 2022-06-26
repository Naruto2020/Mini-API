
// import UserSchema
const {User} = require("../Models/user");

// upload profile photo
module.exports.profilPhoto = async (req, res) =>{
    //console.log("test : ", res.locals.user.niveau);
    //if(res.locals.user.niveau === "admin" || res.locals.user.niveau === "user"){
        //const fileImg = "http://127.0.0.1:5000/api/post/" +  req.file.path;
        const photo =  req.file.filename;
        console.log("look : " , photo);
        
        try{
            User.findByIdAndUpdate(
                req.body.userId,
                { $set : {photo: photo}},
                { new: true, upsert: true, setDefaultsOnInsert: true},
                (err, docs) =>{
                    if(!err){
                        return res.send(docs);
                    }else{
                        return res.status(500).send({ message: err });
                    }
                }
            );
        }catch(err){
            
            //const errors = uploadErrors(err);
            res.status(500).send({message: err});
        }

    //}
    
};


