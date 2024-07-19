const express = require('express');
const cors=require("cors");
const bcrypt=require("bcrypt");
const {User}=require("./db");



const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use((req,res,next)=>{
    console.log(req.path,req.method);
    next();
})

app.post('/user/login',async(req,res)=>{

    const {email,password}=req.body;

    try{
        const user=await User.findOne({email});
        if(!user){
            res.json({msg:'Email not registered'});
        }

        const match=await bcrypt.compare(password,user.password);

        if(!match){
            res.json({msg:'Incorrect password'});
        }

        res.status(200).json(user);
    }
    catch(err){
        res.status(400).json({msg:err.message});
    }
})



app.post('user/signup',async(req,res)=>{

    const {email,password,name,phoneNumber,address}=req.body;

    try{
        const hash=await bcrypt.hash(password,10);
        const user=await User.create({email,password:hash,name,phoneNumber,address});
        res.status(200).json(user);
    }
    catch(err){
        res.status(400).json({msg:err.message});
    }
})