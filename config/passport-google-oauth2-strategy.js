const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

//mentioning which strategy passport should use here we are using passport-google-oauth

passport.use(new googleStrategy({
            clientID:"290068150112-02ur7vg2n6de3l4lo0k5qmocp1qu489s.apps.googleusercontent.com",
            clientSecret:"YTWwk4b6jp1W0ValxbvHWxCr",
            callbackURL:"http://localhost:8000/users/auth/google/callback"
        },
        function(accessToken,refreshToken,profile,done){
            //found the user
            User.findOne({email:profile.emails[0].value}).exec(function(err,user){
                if(err){
                    console.log("error in google-passport-strategy");
                    return;
                }
                console.log(accessToken);
                console.log(refreshToken);
                console.log(profile);

                if(user){
                    //if found set the user as req.user
                    return done(null,user);
                }
                else{
                    //if not found create the user and set user as request.user
                    User.create({
                        name:profile.displayName,
                        email:profile.emails[0].value,
                        password:crypto.randomBytes(20).toString('hex')

                    },function(err,user){
                        if(err){
                                console.log("error in google-passport-strategy");
                                return;
                            }
                        return done(null,user);
                    });
                }
            });
        }

));


module.exports = passport;

