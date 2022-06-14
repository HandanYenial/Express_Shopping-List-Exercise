//first we'll create our express server
const express = require("express"); //we need to require that express library we downloaded
const app = express(); //set up our server by creating an app variable which is just by calling this express function--
//--by calling express a function we create an application which allows us to set up 
//our entire server. 

const itemRoutes = require("./routes/items");
const ExpressError = require("./expressError.js");

app.use(express.json());
app.use("/items" , itemsRoutes);

// 404 handler. In expressErrors.js there is an error class, we use the error class for extentions. If we only use the error message in
//here, here will be same error messages for all error. When we use Error class it helps us to customize the error messages.
app.use(function(req,res,next){
    return new ExpressError("Not Found" , 404);
});

// for general error handler
app.use((err,req,res,next)=>{
    res.status(err.status || 500);

    return res.json({
        error: err.message,
    });
});

// To use this app.js file in other files let's be sure that we export it, then

module.exports =app 