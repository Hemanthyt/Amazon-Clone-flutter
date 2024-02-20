const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name:{
        required:true,
        type:String,
        trim:true,
    },
    email:{
       required:true,
       type:String,
       trim:true,
       validate:{
        validator:(value)=>{
            const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            return value.match(re)
        },
        message:'Please Enter a Valid Email Address',
       },
    },
    password:{
        required:true,
        type:String,
        validator:(value)=>{
            return value.length > 6;
        },
        message:'Please Enter a Long Password',

    },
    address:{
        type:String,
        default:""
    },
    type:{
        type:String,
        default:'user'
    }

})

const User = mongoose.model("user",UserSchema);

module.exports =User;