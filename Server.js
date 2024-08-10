const express=require("express");
const { PORT } = require("./config");
const { connectDB } = require("./config/database");
const { error } = require("./middleware/err");
const userRouter=require("./router/userRouter");
const postRouter=require("./router/postRouter");
connectDB();
const app=express();

app.use(express.json())
app.use("/users",userRouter);
app.use("/posts",postRouter);

app.use(error);
app.listen(PORT,(err)=>{
    if(err) throw err
    console.log(`Server is running at port ${PORT}`);    
})


