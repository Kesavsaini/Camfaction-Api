const router=require("express").Router();
const User=require('../models/user');
const bcrypt=require('bcrypt');
const jwt=require("jsonwebtoken");
const validator = require("email-validator");
//Sign up New user
router.post('/signup',async(req,res)=>{
    try{
      const salt=bcrypt.genSaltSync(10);
      const hashedPassword=bcrypt.hashSync(req.body.password,salt);
      const newUser=await new User({
        name:req.body.firstname+" "+req.body.lastname,
        email:req.body.email,
        username:req.body.username,
        password:hashedPassword,
        collage:req.body.collage
      });
        const user=await newUser.save();
        res.status(200).json(user);
    }catch(err){
      console.log(err);
      res.status(500).json(err);
    }
    
});
//login
router.post('/login',async(req,res)=>{
  try{
    let user
    if(validator.validate(req.body.username)){
       user=await User.findOne({email:req.body.username});
    }else {
      user=await User.findOne({username:req.body.username});
    }
   if(user && bcrypt.compareSync(req.body.password,user.password)){
     const accsessToken=jwt.sign({id:user.id},"HardtocrackKey76%$", {expiresIn: '24h'});
     req.session.id=user.id;
     req.session.profilePic=user.profilePic;
     req.session.name=user.firstname+user.lastname;
     req.session.profilePic=user.profilePic;
     res.status(200).json({id:user.id,accsessToken});
   }else{
     res.status(200).json("Email or password is Wrong")
   }
  }catch(err){
     console.log(err)
     res.status(500).json(err);
  }
});
module.exports=router;
