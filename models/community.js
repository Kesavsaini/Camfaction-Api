const mongoose=require("mongoose");
const CommunitySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    profilePicture:{
      type:String,
      default:"https://cdn-icons-png.flaticon.com/512/25/25437.png"
    },
    desc:{
        type:String,
        default:""
    },
    followers:{
        type:Array,
        default:[]
    },
    Admins:{
        type:Array,
        required:true
    },
    private:{
        type:Boolean,
        default:false
    },
    Adminsonly:{
        type:Boolean,
        default:false
    }

},{timestamps:true})
module.exports=mongoose.model("Community",CommunitySchema);