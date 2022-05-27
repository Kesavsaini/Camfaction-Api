const mongoose=require("mongoose");
const CommentSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    communityId:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    vote:{
        type:Number,
        default:0
    }

},{timestamps:true})
module.exports=mongoose.model("Comment",CommentSchema);