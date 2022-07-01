const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProductSchema = new Schema({

    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true, },
    img: { type: String},
    price: { type: Number, required: true },


    
}, {timestamps : true});



var Product =  mongoose.model("Product", ProductSchema);
module.exports = { Product };