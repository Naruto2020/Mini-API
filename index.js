const app = require("./app");

// server
app.listen(process.env.PORT, ()=>{
    console.log(`ecoute sur le port ${process.env.PORT}`);
});