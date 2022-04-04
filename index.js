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

app.listen(3000,()=>{
    console.log("App is runing in 3000 port");
})

