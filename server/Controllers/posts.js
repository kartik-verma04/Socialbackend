const CreateError = require("../error")
const postModel = require("./posts.model")
const userModel = require("./user.model")
const { post } = require("../routes/auth.route")

exports.uploadpost = async(req,res,next)=>{
    const post = new postModel({userId:req.userId,...req.body})
    try{
        await post.save()
        res.status(200).json(post)
    }catch(err){
        next(err)
    }
}

exports.getApost = async(req,res,next)=>{
    try{
        const post = await postModel.findById(req.params.id)
        res.status(200).json(post)
    }catch(err){
        next(err)
    }
}

exports.likePost = async(req,res,next)=>{
    try{
        const post = await postModel.findByIdAndUpdate(req.params.id,{$addToSet:{likes:req.userId}})
        res.status(200).json(post)
    }catch(err){
        next(err)
    }
}

exports.deletePost = async(req,res,next)=>{
    try{
        const post = await postModel.findById(req.params.id);
        if(post.userId !== req.userId) return next(CreateError(404,"you can delete only your post"))
        await postModel.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"post has been deleted successfully !"})
    }catch(err){
        next(err)
    }
}

exports.getAllPost = async(req,res,next) =>{
    try{
        const allPosts = await postModel.find({userId:req.userId})
        res.status(200).json(allPosts)
    }catch(err){
        next(err)
    }
}