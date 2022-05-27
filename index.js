const express=require("express");
const app=express();
const session=require("express-session")
const dotenv=require("dotenv");
const mongoose=require("mongoose");
const authRoute=require('./routes/auth')
const bodyParser = require('body-parser')
const userRoute=require('./routes/users');
const postRoute=require("./routes/posts");
const communityRoute=require("./routes/communities");
dotenv.config()
mongoose.connect(process.env.MONGO_URL,async()=>{
    try{
    console.log("connected to database");
    }catch(err){
        console.log(err)
    }
});

app.use(express.json());
app.use(session({ secret: 'keyboard cat',saveUninitialized: false, resave: true,cookie: { maxAge: 60000 }}))
app.use("/api/auth",authRoute);
app.use("/api/user",userRoute);
app.use("/api/community",communityRoute);
app.use("/api/post",postRoute);
app.listen(3000,()=>{
    console.log("app is running");
});