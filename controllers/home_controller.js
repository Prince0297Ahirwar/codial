

const Post = require('../models/post');

module.exports.home = function(req,res){
    // console.log(req.cookies);

    // Post.find({},function(err,posts){
    //     if(err){console.log("error in retrieving posts",err); return}
    //     return res.render('home',{
    //         title:"CODIAL| HOME",
    //         posts:posts
    //     });
        
    // })

    Post.find({}).populate('user').exec(
        function(err,posts){
            if(err){console.log("error in retrieving posts",err); return}
            return res.render('home',{
                title:"CODIAL| HOME",
                posts:posts
            });
            
        }
    );
}
//module.exports.ActionName = function(req,res){};