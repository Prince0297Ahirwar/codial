

const { populate } = require('../models/post');
const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = function(req,res){
    // console.log(req.cookies);

    // Post.find({},function(err,posts){
    //     if(err){console.log("error in retrieving posts",err); return}
    //     return res.render('home',{
    //         title:"CODIAL| HOME",
    //         posts:posts
    //     });
        
    // })


    //populate using nestin to populate first populate user in post and then populate comments and then populating user in each comments by nexting and specifying path
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec(
        function(err,posts){
            if(err){console.log("error in retrieving posts",err); return}
            User.find({},function(err,users){
                return res.render('home',{
                    title:"CODIAL| HOME",
                    posts:posts,
                    all_users:users
                });
            });
            
            
        }
    );
}
//module.exports.ActionName = function(req,res){};