
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
app.use(cors());
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");

const JWT_SECRET = "tyihwkggfsujg73987530205()kejfhggt5r9709rehdvjvsdvkjvgfddhglkj9809jklreiuorn8?[]]rstyudj"



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

//getting data that enter into schema
require("./userDetails");
const StudentUser = mongoose.model("StudentUserInfo");

//register API to register any user
app.post("/register", async(req, res) =>{
    const { uname, email,studentClass,password } = req.body;
    console.log(req.body)

    //to encrypt password
    const encryptedPassword = await bcrypt.hash(password, 10);

    try{
        //to avoid duplication of user record
        const check = await StudentUser.findOne({ email });
        if (check){
            return res.send({ error: "user already exist"})
        }
        // else{
        //     return res.send({ status:"ok", message:"Successfully Registered"})
        // }
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
//route for login
app.post("/login-user", async (req, res)=>{
    const {email,password} = req.body;
    const user = await StudentUser.findOne({email});
    if(!user){
    return res.json({error: "User not found"})    
}


if(await bcrypt.compare(password,user.password)){
    const token = jwt.sign({email:user.email}, JWT_SECRET)
    if(res.status(201)){
        return res.json({
            status: "ok",
            data: token
        })
    }
        else{
            return res.json({error: "error"});
        }
    }
    res.json({status:"error", error:"Invalid password"});
});

    app.post("/userData", async(req, res)=>{
        const { token } = req.body;
        try{
            const user = jwt.verify(token, JWT_SECRET);
            const useremail =user.email;
            StudentUser.findOne({email: useremail})
            .then((data) =>{
                res.send({status: "ok", data: data});
            })
            .catch((error)=>{
                res.send({status: "error", data: error})
            });
    }catch(error){}
});
    

