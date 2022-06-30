const mongoose = require("mongoose");

const { Schema } = mongoose;

const CarteSchema = new Schema({
    
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],


    
}, {timestamps : true});



var Carte =  mongoose.model("Carte", CarteSchema);
module.exports = { Carte };