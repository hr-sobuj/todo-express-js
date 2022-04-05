const jwt=require('jsonwebtoken');

// Auth Verfication 
const checkAuth=(req,res,next)=>{
    // console.log("Called auth");
    try {
        const authorization=req.headers.authorization;
        const token=authorization.split(" ")[1];
        const decode=jwt.verify(token,process.env.JWT_KEY);
        // console.log(decode);
        req.name=decode.name;
        req.id=decode.id;
        next();
    } catch (error) {
        next('Authentication Failed!')
    }
}

module.exports=checkAuth;