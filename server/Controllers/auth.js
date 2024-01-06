// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("./user.model");
const CreateError = require("../error");

exports.register = async(req,res,next)=>{
    try{
        const user = await userModel.findOne({email:req.body.email});
        if(user) return next(CreateError(400,"user with this email already exists !"));
        // const salt = await bcrypt.genSalt(10);
        // const hashPassword = await bcrypt.hash(req.body.password,salt)
        const newUSer = new userModel({...req.body})
        await newUSer.save()
        res.status(200).json(newUSer);
    }catch(err){
        next(err)
    }
}

exports.login = async(req,res,next)=>{
    try{
        const user = await userModel.findOne({email:req.body.email})
        if(!user)return next(CreateError(404,"user not found !"))

        if(req.body.password !== user.password) return next(CreateError(401,"unAuthorized user"))

        const token = jwt.sign({
            id:user._id
        },process.env.SECRETKEY)

        const {password, ...others} = user._doc

        res.cookie("accessToken",token,{
            httpOnly:true,
        }).status(200).json(others)
    }catch(err){
        next(err)
    }
}

exports.logOut = async(req,res,next) =>{
    try{
        res.clearCookie("accessToken",{
            sameSite:"none",
            secure:true
        }).status(200).json({message:"user has been logged out successfully !"})
    }catch(err){
        next(err)
    }
}

