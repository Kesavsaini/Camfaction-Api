const User = require("../models/user");
const Community=require('../models/community');
const router=require("express").Router();
const verify=require("../verify");
//Getting your Profile
router.get("/profile",verify,async(req,res)=>{
  try{
    const user=await User.findById(req.user.id);
    res.status(200).json(user);
  }catch{
     res.status()
  }
})
//Getting Other Users Profile
router.get("/:id/userprofile",async(req,res)=>{
try{
   const user=await User.findById(req.params.id)
   res.status(200).json(user);
}catch(err){
  console.log(err);
  res.status(500).json(err);
}
})
//following someone 
router.put("/:id/followuser",verify,async(req,res)=>{
try{
  await User.findByIdAndUpdate(req.params.id,{$push:{followers:req.user.id}});
  await User.findByIdAndUpdate(req.user.id,{$push:{following:req.params.id}});
  res.status(200).json("You start Following new person");
}catch(err){
  console.log(err);
  res.status(500).json(err);
}
});
//Following communites
router.put("/:id/followcom",verify,async(req,res)=>{
try{
  await Community.findByIdAndUpdate(req.params.id,{$push:{followers:req.user.id}});
  await User.findByIdAndUpdate(req.user.id,{$push:{communities:req.params.id}});
  res.status(200).json("You start Following new community");
}catch(err){
  console.log(err);
  res.status(500).json(err);
}
})
//saving a post
router.put("/:id/savepost",verify,async(req,res)=>{
  try{
  const user=await User.findByIdAndUpdate(req.params.id,{$push:{savedpost:req.user.id}},{new:true});
  res.status(200).json(user);
  }catch(err){
    console.log(err);
    res.status(500).json(err);
  }
});
//updating ProfilePicture
router.put("/profile/update",verify,async(req,res)=>{
  try{
  const user=await User.findByIdAndUpdate(req.user.id,{profilePicture:req.body.pic},{new:true});
  res.status(200).json(user);
  }catch(err){
    console.log(err);
    res.status(500).json(err);
  }
});
module.exports=router;