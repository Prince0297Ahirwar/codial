const express = require('express');
const app = express();

const port = 8000;

//importing layouts 
const expressLayout = require('express-ejs-layouts');

//importing database

const db = require('./config/mongoose');

//seting up static files

app.use(express.static('./assets'))

//need to use layout before rendering any page it tells that rendered views belongs to this layouts
app.use(expressLayout);

//extract style and script from sub pages
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//using routes for routing
app.use('/',require('./routes'));

//setting view engine
app.set("view engine",'ejs');
app.set("views",'./views');


app.listen(port,function(err){
    if(err){
        console.log(`Error in running server: ${err}`);
    }
    console.log(`server is running on port : ${port}`);
});
