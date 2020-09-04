// init code means initial code 
const mongoose = require('mongoose');

//user schema create
const userSchema = mongoose.Schema({
    //first filed define then data types 
    username : {
        type:String,
        required:true
    },
    email : {
        type: String,
        required:true,
        unique: true
    },
    password : {
        type:String,
        required: true
    },
    isActive:{
        type : Boolean,
        default : true
    },
    CreatedON:{
        type: Date,
        default : Date.now()
    }
});


//User Model
//collection name = users and Userschema is const of conection 
mongoose.model('users', userSchema);


//module export
module.exports = mongoose.model('users');
