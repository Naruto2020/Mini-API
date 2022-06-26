const mongoose = require("mongoose");

const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
    photo : {
        type : String,
        
    },   
    lastName : {
        type: String,
        required: true,
        minlength : 3,
        maxlength : 55
    },
    firstName : {
        type: String,
        required: true,
        minlength : 3,
        maxlength : 55
    },

    password : {
        type: String,
        required: true,
        minlength : 6,
        maxlength : 1024
    },

    email : {
        type: String,
        required: true,
        lowercase:true,
        unique:true,
        match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        trim:true
    },

    adress: {
        type: String,
        required: true
    },
 
    phone : {
        type : String,
    },

    
    niveau:{
        type:String,
        required : 'vous devez sélectioner admin ou user ou visit',
        enum : ["admin", "user" ]    
        
    },


    reset: String,

    resetExpires: Date,
    //date: { type: Date, default: Date.now },
    
}, {timestamps : true});


UserSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
  
UserSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email')
}

var User =  mongoose.model("User", UserSchema);
module.exports = { User };