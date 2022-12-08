
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
app.use(cors());
const bcryptjs = require('bcryptjs')


app.use(express.urlencoded({ extended: true }));
app.use(express.json())

const mongoUrl = "mongodb+srv://janet:janet0166@cluster0.vuxr8dg.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoUrl, {
    useNewUrlParser:true
}).then(() =>{console.log("connected to database")})
.catch(e => console.log(e));

app.listen(5000, ()=>{
    console.log('server is running')
})
//sample
// app.post("/post", async(req, res) =>{
//     console.log(req.body)
//     const { data } =req.body;

//     try{
//         if(data =="janet"){
//         res.send({status: "ok"});
//         }else{
//             res.send({ status: "User not found"})
//         }
//     }catch(error){
//         res.send({ status: "something went wrong, try again"})
//       }
// });
//getting data that enter into schema
require("./userDetails");
const StudentUser = mongoose.model("StudentUserInfo");

//register API to register any user
app.post("/register", async(req, res) =>{
    const { uname, email,studentClass,password} = req.body;
    console.log(req.body)

    //to encrypt password
    const encryptedPassword = await bcryptjs.hash(password, 10);

    try{
        //to avoid duplication of user record
        const oldUser = await StudentUser.findOne({ email });
        if (oldUser){
            return res.send({ error: "user already exist"})
        }
       await StudentUser.create({
        uname,
        email,
        studentClass,
        password:encryptedPassword,
       })
       res.send({
        status: "ok",
       })
    }catch(error){
        res.send({
            status: "error",
           })
    }
})

