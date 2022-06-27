const mongoose = require("mongoose");

// connct to MongoDB data base
MONGODB_URI = process.env.myDbUrl


mongoose.connect(
    MONGODB_URI , 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  
    }
);  

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function(){
  console.log("connected successfuly to Mongodb");
});
  
module.exports = mongoose;



