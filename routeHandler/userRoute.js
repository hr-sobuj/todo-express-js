const express=require('express');
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const userSchema=require('../schemas/userSchema');
const User=new mongoose.model('User',userSchema);

// ROUTE OBJECT
const route=express.Router();


// SINGUP
route.post('/singup',async(req,res)=>{
  try {
    const hashPassWord=await bcrypt.hash(req.body.password,10);
    const UserName=req.body.username.replace(/[^A-Z0-9]+/ig, "").toLowerCase();
    const newUser=new User({
        name:req.body.name,
        username:UserName,
        password:hashPassWord
    });
      await newUser.save();
      res.status(200).json({
          message:"User Created Successfully!"
      })
  } catch (error) {
    res.status(400).json({
        error:"User Creation failed!"+error.message
    })
  }

})


module.exports=route;