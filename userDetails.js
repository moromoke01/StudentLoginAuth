const mongoose = require('mongoose')


const userDetailSchema = new mongoose.Schema({
    uname:{
        type:String,
    } ,
    email:{
        type:String,
        unique:true,
    } ,
    studentClass:{
        type:String,
    } ,
    password:{
        type:String,
    } 
    },

{
    collection: "StudentUserInfo",
}
);

 mongoose.model("StudentUserInfo", userDetailSchema);

