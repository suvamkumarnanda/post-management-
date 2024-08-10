const POST_SCHEMA=require("../models/postModel");
const asyncHandler=require("express-async-handler");

exports.addPost=asyncHandler(async(req,res)=>{
    let payload=req.body;
    let addPost=await POST_SCHEMA.create(payload);
    res.status(201).json({success:true,message:"post added successfully",addPost});

})

//=============fetch all posts===================
exports.fetchALlPosts=asyncHandler(async(req,res)=>{
    let users=await POST_SCHEMA.find();
    if(users.length==0){
        throw new Error("User not found");
    }
    res.status(200).json({success:true,message:"User details fetched successfully",users})
})

//==============fetchSingle post details==========================
exports.fetchOne=asyncHandler(async(req,res)=>{
    let {id}=req.params;
    let user=await POST_SCHEMA.findById(id);
    if(!user){
        throw new Error("User not found");
    }
    res.status(200).json({success:true,message:"user details found",user});
})

//===========================update the post==================
exports.updatePost=asyncHandler(async(req,res)=>{
    let {id}=req.params;
    let user=await POST_SCHEMA.findById(id);
    if(!user){
        throw new Error("User not found");
    }
    await POST_SCHEMA.findByIdAndUpdate(id,req.body,{new:true});
    res.status(200).json({success:true,message:"User details updated successfully"});

})

//=================================post details delete=====================
exports.deletePost=asyncHandler(async(req,res)=>{
    let {id}=req.params;
    let user=await POST_SCHEMA.findById(id);
    if(!user){
        throw new Error("User not found");
    }
    let deleteUser=await POST_SCHEMA.findByIdAndDelete(id);
    res.status(200).json({success:true,message:"user details deleted successfully",deleteUser });
})
