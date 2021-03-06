const express=require('express');
const mongoose=require('mongoose');
const checkAuth = require('../middlewares/checkAuth');
const todoSchema=require('../schemas/todoSchema');
const userSchema=require('../schemas/userSchema');
const Todo=new mongoose.model('Todo',todoSchema);
const User=new mongoose.model('User',userSchema);

// ROUTE OBJECT
const route=express.Router();

// GET ALL TODO
route.get('/',checkAuth,(req,res,next)=>{
  Todo.find({})
 .populate("user","name username -_id")
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
 
});

// GET ACTIVE TODO with static 
route.get('/js',async(req,res)=>{
  // console.log("called");
  const data=await Todo.findByJS();
  res.status(200).json({
    data
  })
})

// GET ACTIVE TODO with static 
route.get('/language',async(req,res)=>{
  // console.log("called
  const data=await Todo.find().byLanguage("js");
  res.status(200).json({
    data
  })
})


// GET ACTIVE TODO 
route.get('/active',async(req,res)=>{
  // console.log("called");
  const todo=new Todo();
  const data=await todo.findActive();
  res.status(200).json({
    data
  })
})

// GET ACTIVE TODO with Callback 
route.get('/active-callback',(req,res)=>{
  // console.log("called");
  const todo=new Todo();
  todo.findActiveWithCallback((err,data)=>{
    res.status(200).json({
      data
    })
  });
  
})

// GET BY ID
route.get('/:id',async(req,res)=>{
    // console.log(req.params.id);
    
    try {
      const data=await Todo.find({_id:req.params.id});
      res.status(200).json({
        result: data,
        message: "Success",
      });
    } catch (error) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    }
   

})

// POST ONE TODO
route.post('/',checkAuth, async(req,res)=>{
    try {
      const newTodo=new Todo({
        ...req.body,
        user:req.id
      });
      const todo=await newTodo.save();
      console.log(todo._id);
      try {
        await User.updateOne({
          _id:req.id
        },{
          $push:{
            todos:todo._id
          }
        })
      } catch (error) {
        console.log(error);
      }
      res.status(200).json({
        message:"Todo inserted successfully!"
    })
    } catch (error) {
      res.status(500).json({
        error:"There was a server side error!"
    })
    }
   
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