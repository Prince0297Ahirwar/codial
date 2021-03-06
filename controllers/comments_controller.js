const Comment = require('../models/comment');

const Post = require('../models/post');

const commentsMailer = require('../mailers/comments_mailer');


module.exports.create = async function(req,res){

    try{

        let post = await Post.findById(req.body.post);

        if(post){
            let comment = await Comment.create({
                content:req.body.content,
                user:req.user._id,
                post:req.body.post
            });
            
            post.comments.push(comment);
            post.save();

            comment = await comment.populate('user', 'name email').execPopulate();

            commentsMailer.newComment(comment);
            if (req.xhr){
                // Similar for comments to fetch the user's id!
                
    
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
            }

            req.flash('success','Comment created');
            return res.redirect('/');
        }
    
    }
    catch(err){
            req.flash('error',err);return res.redirect('back');
    }



}


module.exports.destroy = async function(req,res){
    try{
        let comment = await Comment.findById(req.params.id);
        if(comment.user == req.user.id){
            let postId = comment.post;
            comment.remove();
    
            let post = await Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}});
            
                        // send the comment id which was deleted back to the views
                        if (req.xhr){
                            return res.status(200).json({
                                data: {
                                    comment_id: req.params.id
                                },
                                message: "Post deleted"
                            });
                        }

            req.flash('success','Your Comment Deleted');
            return res.redirect('back');
        }
        else{
            req.flash('error','You are not allowed to delete comment');
            return res.redirect('back');
        }

    }
    catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
    

}