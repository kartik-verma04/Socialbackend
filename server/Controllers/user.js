const CreateError = require("../error");
const userModel = require("./user.model")

exports.getauser = async(req,res,next) =>{
    try{
        const user = await userModel.findById(req.params.id);
        const{password, ...others} = user._doc;
        res.status(200).json(user)
    }catch(err){
        next(err)
    }
}


exports.getAllUser = async(req,res,next) =>{
    try{
        const users = await userModel.find()
        res.status(200).json(users)
    }catch(err){
        next(err)
    }
}

exports.addFreind = async(req,res,next) =>{
    try{
        const Activeuser = await userModel.findById(req.userId)
        const freind = await userModel.findById(req.params.id)
        if(!Activeuser.freinds.includes(freind._id)){
            await Activeuser.updateOne({$push:{freinds:freind._id}})
            await freind.updateOne({$push:{freinds:Activeuser._id}})
        }else return next(CreateError(400,"user is already a freind !"))

        res.status(200).json({message:"user added freind !"})
    }catch(err){
        next(err)
    }
}

exports.getafreind = async(req,res,next)=>{
    try{
        const freind = await userModel.findById(req.params.id)
        res.status(200).json(freind)
    }catch(err){
        next(err)
    }
}


exports.getAllFreinds = async(req,res,next)=>{
    try{
        const user = await userModel.findById(req.userId)
        const freinds = await Promise.all(
            user.freinds.map((freind)=>{
                return userModel.findById(freind)
            })
        )
        const freindList = []
        freinds.map((f)=>{
            const {email,password,...user} = f._doc;
            freindList.push(user)
        })
        res.status(200).json(freindList)
    }catch(err){
        next(err)
    }
}
