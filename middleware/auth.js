const USER_SCHEMA=require("../models/userModel");
const asyncHandler=require("express-async-handler");
const jwt=require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

exports.authenticate=asyncHandler(async(req,res,next)=>{
      if(req?.headers?.authorization?.startsWith("Bearer")){
        var token=req.headers.authorization.split(" ")[1];
      }
      if(!token){
        throw new Error("No token provided");
      }
 let decode=jwt.verify(token,JWT_SECRET);
 console.log(decode);
 let user=await USER_SCHEMA.findById(decode.id);
 console.log(user);

 if(!user){
    throw new Error("No user found");
 }
 req.user=user;
 next();
      
});