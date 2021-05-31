const Post = require('../models/post');

const Comment = require('../models/comment');

module.exports.create = function(req,res){
    console.log(req.body);
    Post.create({
        content:req.body.content,
        user:req.user._id
    },function(err,post){
        if(err){console.log('error in creating post');return;}
        return res.redirect('back');
    });
}

module.exports.destroy = function(req,res){
    Post.findById(req.params.id,function(err,post){
        //now we check post is of who is deleting
        if(post.user == req.user.id){
            //.id string version of object id using for comparison
            post.remove();
            Comment.deleteMany({post:req.params.id},function(err){
                return res.redirect('back');
            });

        }
        else{
            return res.redirect('back');
        }
    });
}