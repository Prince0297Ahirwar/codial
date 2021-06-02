

const { populate } = require('../models/post');
const Post = require('../models/post');
const User = require('../models/user');

//Using aync await to simplify our code

module.exports.home = async function(req,res){

    try{
        let posts = await Post.find({}) //first this will run and store successful result in posts
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
        });
    
    
       let users = await  User.find({}); //thent this will run 
    
        return res.render('home',{
            title:"CODIAL| HOME",
            posts:posts,
            all_users:users
        });
    }
    catch{
        console.log('Error',err);
    }

}
//module.exports.ActionName = function(req,res){};