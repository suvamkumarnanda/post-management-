const USER_SCHEMA=require("../models/userModel");
const asyncHandler=require("express-async-handler");

exports.addUser=asyncHandler(async(req,res)=>{
    let payload=req.body;
   let addContact=await USER_SCHEMA.create(payload);
   res.status(201).json({success:true,message:"User details added successfully",addContact});
})



//to fetch all the users

exports.fetchAll=asyncHandler(async (req,res)=>{
 
    let users=await USER_SCHEMA.find();
    if(users.length==0)
    {
        throw new Error("No users found")
    }
    res.status(200).json({success:true,message:"All users are fetched successfully", users})
})

//to fetch the details of single user
exports.fetchOne=asyncHandler(async (req,res)=>{
    let {id}=req.params;
    const user=await USER_SCHEMA.findById(id);
    if(!user)
    {
        throw new Error("User not found");
    }
  res.status(200).json({
    success:true,
    message:"User details fetched successfully",
    user
  })
})

//update the user details================================
exports.updateUser=asyncHandler(async (req,res)=>{
    let {id}=req.params;
    const findUser=await USER_SCHEMA.findById(id);
    if(!findUser){
        throw new Error("User details not found")
    }
     const updatedUser=await USER_SCHEMA.findByIdAndUpdate(id,req.body,{new:true});
     res.status(200).json({success:true,message:"user details updated successfully",updatedUser});

})

//delete the user details===============

exports.deleteUser=asyncHandler(async (req,res)=>{
    let {id}=req.params;
    const findUser= await USER_SCHEMA.findById(id);
    if(!findUser){
        throw new Error("User details not found");
    }
    await USER_SCHEMA.findOneAndDelete(id);
    res.status(200).json({success:true,message:"user details deleted successfully"})
})

///=================login User====================

exports.loginUser=asyncHandler(async (req,res)=>{
    let {email,password}=req.body;
    const findUser=await USER_SCHEMA.findOne({email:email});
    if(!findUser){
        throw new Error("User not found")
    }
    let isMatch=await findUser.matchPassword(password);
    if(!isMatch){
        throw new Error("Password did not match");
    }
    if(isMatch)
    {
        // res.status(200).json({success:true,message:"User loggedIn"});
       sendToken(findUser,200,res);
    }
})

const sendToken=(user,statusCode,res)=>{
    const token=user.getToken();
    const options={
        expiresIn:"1d",
        httpOnly:true

    }
    res.status(statusCode).cookie("abc",token,options).json({success:true,token})
}