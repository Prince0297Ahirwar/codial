const user = require('../models/user');

module.exports.profile = function(req,res){
    return res.render('users_profile',
    {
        title:"users profile"
    }
    
    );
}

module.exports.signUp = function(req,res){
    user.create({
        email:req.body.email,
        password:req.body.password,
        name:req.body.name
    },function(err,newUser){
            if(err){
                console.log("error in creating user",err);
                return;
            }
            console.log("New user created is:",newUser);
            window.alert('Account create successfully sign in')
            return res.redirect('back');
        }
    );
}

