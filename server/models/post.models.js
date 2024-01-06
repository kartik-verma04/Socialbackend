const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:false
    },
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    likes:{
        type:Array,
        default:[]
    },
    shares:{
        type:Number,
        default:0
    }
},{timestamps:true})

module.exports = mongoose.model("posts",postSchema)