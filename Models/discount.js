const mongoose = require("mongoose");

const { Schema } = mongoose;

const DiscountSchema = new Schema({
    
    OrderId: { type: String, required: true },

    isFamillyPack: { type: Boolean, required: true, default:true },
    isMoreThanfifty: { type: Boolean, default: true, required: true },
 
  
    promo: { type: Number, required: true },

    
}, {timestamps : true});



var Discount =  mongoose.model("Discount", DiscountSchema);
module.exports = { Discount };