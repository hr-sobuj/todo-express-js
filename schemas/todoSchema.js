const mongoose=require('mongoose');

const todoSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    status:{
        type:String,
        enum:['active','inactive']
    },
    date:{
        type:Date,
        default:Date.now
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }
})

// INSTANCE METHOD 
todoSchema.methods={
    findActive:function(){
        return mongoose.model("Todo").find({status:"active"})
    },
    findActiveWithCallback:function(cb){
        return mongoose.model("Todo").find({status:"active"},cb)
    }
}

// STATICS 
todoSchema.statics ={
    findByJS:function(){
        return this.find({title:/js/i})
    }
}

// QUERY 
todoSchema.query={
    byLanguage:function(ln){
        return this.find({title:new RegExp(ln,"i")})
    }
}

// EXPORT 
module.exports=todoSchema