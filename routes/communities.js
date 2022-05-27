const router=require("express").Router();
const User=require("../models/user");
const verify = require("../verify");
const Community=require("../models/community");
//create comunity
router.post("/createnew",verify,async(req,res)=>{
    try{
        const newcommunity=await new Community({...req.body,Admins:[req.session.id]});
        const community=await newcommunity.save();
        const user=await User.findByIdAndUpdate(req.user.id,{$push:{Adminof:community.id}},{new:true});
        console.log(community);
        res.status(200).json(community);
        

    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});
//Getting Community that you are admin of
router.get("/adminof",verify,async(req,res)=>{
    try{
        const user=await User.findById(req.user.id);
        console.log(user.Adminof);
        res.status(200).json(user.Adminof);
    }catch(err){
            console.log(err);
            res.status(500).json(err);
    }
});
//Getting community by id
router.get("/:id/getcom",async(req,res)=>{
    try{
     const community=await Community.findById(req.params.id);
     res.status(200).json(community);
    }catch(err){
       console.log(err);
       res.status(500).json(err);
    }
})
//Getting Community that you follow
router.get("/communities",verify,async(req,res)=>{
    try{
        const user=await User.findById(req.user.id);
        res.status(200).json(user.communities);
    }catch(err){
            res.status(500).json(err);
    }
})
//update community
router.put("/update/:id",verify,async(req,res)=>{
    if(req.user.isAdmin.includes(req.params.id)){
    try{
        const updatecom=await Community.findByIdAndUpdate(req.params.id,req.body);
        res.status(200).json(updatecom);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}else{
    res.json("Only admin can update this community")
}
})
//
module.exports=router;