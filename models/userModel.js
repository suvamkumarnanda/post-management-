const {Schema,model}=require("mongoose");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const userSchema=new Schema({
    name:{
    type:String,
    trim:true,
    required:true
},
email:{
    type:String,
    trim:true,
    required:true,
    unique:true
},
password:{
    type:String,
    trim:true,
    require:true
}
},{timestamps:true})

// !pre hook
userSchema.pre("save",async function(){
    let salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
})

//!match password
userSchema.methods.matchPassword= async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

//!Generate token

userSchema.methods.getToken=function(){
    return jwt.sign({id:this._id},JWT_SECRET,{expiresIn:"1d"});
};




module.exports=model("User",userSchema);
