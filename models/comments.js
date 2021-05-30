const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    //user do comments
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    //posts  has comments
    post:{
        type:mongoose.Schema.Types.ObjectI,
        ref:'Post'
    }
},{
    timestamps:true
});

const Comment = mongoose.model('Comment',commentSchema);

module.exports = Comment;