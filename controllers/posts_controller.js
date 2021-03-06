const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

module.exports.create = async function(req,res){

    try{
        let post = await Post.create({
            content:req.body.content,
            user:req.user._id
        });
        let postwithuser = await Post.findOne({_id:post._id}).populate('user',{name:1,email:1});
        //checking if request is xml http request
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:postwithuser
                },
                message:"post created!"
            });
        }

        req.flash('success','Post Published');
        return res.redirect('back');
    }
    catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
   
}

module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);

        if(post.user == req.user.id){
            //.id string version of object id using for comparison
            post.remove();
            await Comment.deleteMany({post:req.params.id});

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    message:"post deleted "
                });
            }

            req.flash('success','Post and its comment deleted successfully');
            return res.redirect('back');
            
        }
        else{
            req.flash('error','You are not allowed to delete post');
            return res.redirect('back');
        }

    }
    catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }


}