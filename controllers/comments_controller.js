const Comment = require('../models/comment');

const Post = require('../models/post');


module.exports.create = function(req,res){
    Post.findById(req.body.post,function(err,post){
        if(err){console.log("error in finding post",err); return ;}


        Comment.create({
            content:req.body.content,
            user:req.user._id,
            post:req.body.post
        },function(err,comment){
            if(err){console.log("error in creating comment",err);return;}
            
            post.comments.push(comment);
            post.save();
            console.log(comment);
            return res.redirect('/');
        });
    });
}