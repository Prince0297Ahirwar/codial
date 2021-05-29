const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

User = require('../models/user');

//authentication using passport
passport.use(new LocalStrategy({
    usernameField:'email'    
},function(email,password,done){ //done is an callback function reporting back to passport.js
    //find a user and establish identity
    User.findOne({email:email},function(err,user){
        if(err){
            console.log('Error in finding user -- passport');
            return done(err);
        }
        if(!user || user.password != password){
            console.log('invalid username/password');
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
    
}

module.exports = passport;
