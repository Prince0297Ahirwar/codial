const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true
        }
    },{
        //holds created at and updated at time of every entry
        timestamps:true
    }
);

const user = mongoose.model('user',userSchema);

module.exports = user;
