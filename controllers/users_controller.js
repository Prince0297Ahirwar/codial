const { response } = require('express');
const User = require('../models/user');

//render signup page
module.exports.profile = function(req,res){
    User.findById(req.params.id,function(err,user){

        return res.render('users_profile',
        {
            title:"users profile",
            profile_user:user
        }
        );
    });

}

module.exports.update = function(req,res){
    console.log(req.user.id,req.params.id);
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){

            return res.redirect('back');
        });
    }else{
        return res.status(401).send('unauthorized');
    }
}

//render signin page
module.exports.signUp = function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:"codial|sign up"
    })
}


module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render("user_sign_in",{
        title:"codial|sign in"
    });
};

//create user action get signup data

module.exports.create = function(req,res){
    //to do
    //checking password
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    //checking if user already exist

    User.findOne({email:req.body.email},
            function(err,user){
                if(err){console.log("error in finding user for signup");return;}
                if(!user){
                    User.create(req.body,function(err,user){
                        if(err){
                            console.log("error in creating user");
                            return;
                        }
                        return res.redirect('/users/sign-in');

                    });
                }
                else{
                    res.redirect('back');
                }

            }
        );
}

//creatin session

module.exports.createSession = function(req,res){
    req.flash('success','Logged In Successfully');
    return res.redirect('/');

}

module.exports.destroySession = function(req,res){
    //req.logout function is provided by passport
    req.logout();
    req.flash('success','Logged Out Successfully');
    return res.redirect('/');
}
