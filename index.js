const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv')
const todoRoute=require('./routeHandler/todoRoute');
const userRoute=require('./routeHandler/userRoute');

const app=express();
dotenv.config();
app.use(express.json());

// connect with mongoDB
mongoose.connect("mongodb://localhost/todos")
.then(()=>{
    console.log("Connection successfull.");
})
.catch((err)=>{
    console.log(err);
})


app.use('/todo',todoRoute);
app.use('/user',userRoute);

const errorHandler=(err,req,res,next)=>{
    if(req.headerSent){
        return next('Error')
    }
    res.status(500).json({ error: err });
}

app.use(errorHandler);

app.listen(3000,()=>{
    console.log("App is runing in 3000 port");
})

