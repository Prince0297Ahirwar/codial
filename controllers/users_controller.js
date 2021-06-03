const { response } = require('express');
const User = require('../models/user');

const fs = require('fs');

const path = require('path');

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

module.exports.update = async function(req,res){
    if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);

            User.uploadedAvatar(req,res,function(err){
                if(err){console.log("@@@##**multer error",err);}
                //we can not read the body without multer thing
                user.name = req.body.name;
                user.email = req.body.email;
            
                if(req.file){
                    console.log(req.file);
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,"..",user.avatar));
                    }

                    //saving the path of avatar in model
                    user.avatar = User.avatarPath +'/'+req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });
        }
        catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }
    }
    else{
        req.flash('error','uunauthorized');
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
                if(err){req.flash('error',err);return res.redirect('back');}
                if(!user){
                    User.create(req.body,function(err,user){
                        if(err){
                            req.flash('error',err);return res.redirect('back');
                        }
                        req.flash('success','User created Successfully');
                        return res.redirect('/users/sign-in');

                    });
                }
                else{
                    req.flash('error',"User already exist");
                    return res.redirect('back');
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
