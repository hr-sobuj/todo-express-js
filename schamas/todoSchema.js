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
    }
})

todoSchema.methods={
    findActive:function(){
        return mongoose.model("Todo").find({status:"active"})
    },
    findActiveWithCallback:function(cb){
        return mongoose.model("Todo").find({status:"active"},cb)
    }
}
todoSchema.statics ={
    findByJS:function(){
        return this.find({title:/js/i})
    }
}

todoSchema.query={
    byLanguage:function(ln){
        return this.find({title:new RegExp(ln,"i")})
    }
}

module.exports=todoSchema