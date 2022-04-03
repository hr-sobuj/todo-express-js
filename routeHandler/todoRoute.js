const express=require('express');
const mongoose=require('mongoose');
const todoSchema=require('../schamas/todoSchema');
const Todo=new mongoose.model('Todo',todoSchema);

// route object 
const route=express.Router();

// get all 
route.get('/',async(req,res,next)=>{

})
// get by id 
route.get('/:id',async(req,res,next)=>{

})

// POST ONE TODO
route.post('/',async(req,res)=>{
    console.log(req.body);
    const newTodo=new Todo(req.body);
    await newTodo.save((err)=>{
        if(err){
            res.status(500).json({
                error:"There was a server side error!"
            })
        }else{
            res.status(200).json({
                message:"Todo inserted successfully!"
            })
        }
    })
})
// POST MULTI TODO
route.post('/all',async(req,res,next)=>{
    console.log(req.body);
    Todo.insertMany(req.body,(err)=>{
        if(err){
            res.status(500).json({
                error:"There was a server side error!"
            })
        }else{
            res.status(200).json({
                message:"Todo inserted successfully!"
            })
        }
    })
})

// PUT TODO
route.put('/',async(req,res,next)=>{

})

// DELETE TODO
route.put('/',async(req,res,next)=>{

})


module.exports=route;