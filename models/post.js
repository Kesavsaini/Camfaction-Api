const mongoose=require("mongoose");
const postSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    communityId:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        default:""
    },
    data:{
        type:String,
        default:""
    },
    isVideo:{
        type:Boolean,
        default:false
    },
    upVotes:Array,
    downVotes:Array,
    comments:{
      type:Array,
      default:[]
    }

},{timestamps:true})
module.exports=mongoose.model("Post",postSchema);