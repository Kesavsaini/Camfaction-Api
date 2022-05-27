const jwt=require("jsonwebtoken");
const verify=(req,res,next)=>{
   const authtoken=req.headers.token;
   if(authtoken){
       const token=authtoken.split(" ")[1];
      jwt.verify(token,"HardtocrackKey76%$",(err,user)=>{
            if(err){
                res.status(403).json("There is an Error");
            }
            req.user=user;
            next();
      })
   }else{
       res.status(401).json("You are not autherized");
   }
}
module.exports=verify;