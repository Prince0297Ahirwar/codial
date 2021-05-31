const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

const port = 8000;

//importing layouts 
const expressLayout = require('express-ejs-layouts');

//importing database

const db = require('./config/mongoose');

//used for session cookies
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);

const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    prefix:'/css'
}));


//seting up static files and cookie parser
app.use(cookieParser()); 

app.use(express.static('./assets'))

//need to use layout before rendering any page it tells that rendered views belongs to this layouts
app.use(expressLayout);

//extract style and script from sub pages
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//creating middleware for html form parsing
app.use(express.urlencoded());


//setting view engine
app.set("view engine",'ejs');
app.set("views",'./views');

//order using middleware is important because we need urlencoded so that req is parsed befor using session cookies

//mongo store is used to store cookies in db
app.use(session({
    name:'codial',
    //change secret to deploy in production mode
    secret:'itsasecret',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:new MongoStore({
        mongooseConnection:db,
        autoRemove:'disabled'
    },function(err){
        console.log(err||'connect mongodb setup ok')
    })
}));


app.use(passport.initialize());
app.use(passport.session());


app.use(passport.setAuthenticatedUser);

//using routes for routing
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`Error in running server: ${err}`);
    }
    console.log(`server is running on port : ${port}`);
});


