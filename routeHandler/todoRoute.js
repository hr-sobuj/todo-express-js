const express=require('express');
const mongoose=require('mongoose');
const todoSchema=require('../schamas/todoSchema');
const Todo=new mongoose.model('Todo',todoSchema);

// route object 
const route=express.Router();

// get all 
route.get('/',async(req,res,next)=>{
    await Todo.find({status:"active"})
    .select({_id:0,__v:0,date:0})
    .limit(2)
    .exec((err,data)=>{
        if(err){
            res.status(500).json({
                error:"There was a server side error!"
            })
        }else{
            res.status(200).json({
                result:data,
                message:"Success!"
            })
        }
    })
    
})
// get by id 
route.get('/:id',async(req,res,next)=>{
    // console.log(req.params.id);
    await Todo.find({_id:req.params.id})
    .exec((err,data)=>{
        if (err) {
            res.status(500).json({
              error: "There was a server side error!",
            });
          } else {
            res.status(200).json({
              result: data,
              message: "Success",
            });
        }
    })

})

// POST ONE TODO
route.post('/',async(req,res)=>{
    // console.log(req.body);
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
    // console.log(req.body);
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
route.put('/:id',async(req,res)=>{
    const result = await Todo.findByIdAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            status: "active",
          },
        },
        {
          new: true,
          useFindAndModify: false,
        },
        (err) => {
          if (err) {
            res.status(500).json({
              error: "There was a server side error!",
            });
          } else {
            res.status(200).json({
              message: "Todo was updated successfully!",
            });
          }
        }
      ).clone();
      console.log(result);
})

// DELETE TODO
route.delete('/:id',async(req,res,next)=>{
    await Todo.deleteOne({_id:req.params.id})
    .exec((err)=>{
        if (err) {
            res.status(500).json({
              error: "There was a server side error!",
            });
          } else {
            res.status(200).json({
              message: "Deleted",
            });
        }
    })
})


module.exports=route;