const router=require("express").Router();
const User=require("../models/user");
const Post=require("../models/post")
const verify=require("../verify");
//posting post
router.post("/:id/createpost",verify,async(req,res)=>{
  try{
    const user=await User.findById(req.user.id);
    if(user.communities.includes(req.params.id)){
    const post=await new Post({userId:req.user.id,communityId:req.params.id,...req.body})
    await post.save();
    res.status(200).json(post);
    }else{
      res.json("you have to follow this commuiny first to post here");
    }
  }catch(err){
      console.log(err);
      res.status(500).json(err);
  }
});
//Getting post of a community
router.get("/:id/getpost",verify,async(req,res)=>{
    let posts=[]
    try{
     posts=await Post.find({communityId:req.params.id});
     res.status(200).json(posts);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});
//Getting post of some person
router.get("/:id/getuserpost",verify,async(req,res)=>{
  let composts=[]
  try{
    const user=await User.findById(req.params.id);
    const userposts=await Post.find({userId:user.id});
      composts=await Promise.all(
      user.communities.map((comId)=>{
        if(comId){
         return Post.find({communityId:comId});
        }
      })
    );
    res.status(200).json(userposts.concat(...composts));
  }catch(err){
    console.log(err);
    res.status(500).json(err);
  }
});
//Getting post of Your Timeline
router.get("/getpost",verify,async(req,res)=>{
    try{
      const user=await User.findById(req.user.id);
      const userposts=await Post.find({userId:user.id});
       const composts=await Promise.all(
        user.communities.map((comId)=>{
           return Post.find({communityId:comId});
        })
      );
      res.status(200).json(userposts.concat(...composts));
    }catch(err){
      console.log(err);
      res.status(500).json(err);
    }
});
//UPvoting a post
router.put("/:id/upvote",verify,async(req,res)=>{
  try{
     const post=await Post.findById(req.params.id);
     if(!post.upVotes.includes(req.user.id)){
        let upvotepost=await Post.findByIdAndUpdate(req.params.id,{$push:{upVotes:req.user.id},$pull:{downVotes:req.user.id}},{new:true});
        res.status(200).json(upvotepost.upVotes.length-upvotepost.downVotes.length);
     }else{
       res.json("you already upvoted this post");
     }
  }catch(err){
      console.log(err);
      res.status(500).json(err);
  }

});
//Downvoting a post
router.put("/:id/downvote",verify,async(req,res)=>{
  try{
     const post=await Post.findById(req.params.id);
     if(!post.downVotes.includes(req.user.id)){
        let downpost=await Post.findByIdAndUpdate(req.params.id,{$push:{downVotes:req.user.id},$pull:{upVotes:req.user.id}},{new:true});
        res.status(200).json(downpost.upVotes.length-downpost.downVotes.length);
     }else{
       res.json("you already downvoted this post");
     }
  }catch(err){
      console.log(err);
      res.status(500).json(err);
  }

});


module.exports=router;
