const mongoose = require("mongoose");

const { Schema } = mongoose;

const OrderSchema = new Schema({
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
    amount: { type: Number, required: true },

    address : {type : Object, required : true},
    
    /*address: {
      rue : {
        type : String,
      },
      codePostale : {
        type:String,
      },
      ville : {
        type : String,
      },
      pays : {
        type: String
      }
    },*/

    status: { type: String, default: "en cours" },
    

    serialNum : {
        type : String
    }



    
}, {timestamps : true});



var Order =  mongoose.model("Order", OrderSchema);
module.exports = { Order };