const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

User = require('../models/user');

//authentication using passport
passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback :true // this allow us to pass req to callback function           
},function(req,email,password,done){ //done is an callback function reporting back to passport.js
    //find a user and establish identity
    User.findOne({email:email},function(err,user){
        if(err){
            req.flash('error',err);
            return done(err);
        }
        if(!user || user.password != password){
            req.flash('error','Invalid Username/Password');
            return done(null,false);
        }

        return done(null,user);
    });
}


));

//serializing the user to decide which key is to be kept in cookie

passport.serializeUser(function(user,done){
    done(null,user.id); //user id will be used as cookie -encrypted
});



//deserializing the user from cookie

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding user -- passport');
            return done(err);
        }
        return done(null,user);
    });
});

//checking for user authentication

passport.checkAuthentication = function(req,res,next){

    //if the user is signed in pass on the req to the function(controller action)
    

    if(req.isAuthenticated()){
        return next();
    }
    //if user is not signed in

    return res.redirect('/users/sign-in');
}

//setting up authenticated user
passport.setAuthenticatedUser = function(req,res,next){
    
    if(req.isAuthenticated()){

        //req.user contains current signed in user from  cookie we are sending this to the locals for views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;
