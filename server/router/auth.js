const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

require('../DB/connect');
const User=require('../models/user');
const Ques=require('../models/question1');

router.get('/',(req,res)=>{
    res.send('welcome back!');
});

//using promises.
// router.post('/Register', (req,res)=>{

//     const{firstname,lastname,email,password,password2}=req.body;

//     if(!firstname || !lastname || !email || !password || !password2){
//         return res.status(422).json({error:"please fill all the fields properly"});
//     }
    
//     User.findOne({email:email}).
//     then((userExist)=>{
//         if(userExist){
//             return res.status(422).json({error:"Email already exists"}); 
//         }

//         const user=new User({firstname,lastname,email,password,password2});

//         user.save().then(() => {
//             res.status(201).json({message:"Successfully Registered"});
//         }).catch(()=>res.status(500).json({error:"Registration Failed"}));
//     }).catch(err=>{console.log(err);});
// });

router.post('/Signup',async (req,res)=>{
    try{
        const{firstname,lastname,email,password,password2}=req.body;

        if(!firstname || !lastname || !email || !password || !password2){
            return res.status(422).json({error:"please fill all the fields properly"});
        }

        const userExist = await User.findOne({email:email});

        if(userExist){
            return res.status(422).json({error:"Email already exists"}); 
        }
        const user=new User({firstname,lastname,email,password,password2});

        const userRegister=await user.save();

    if(userRegister){
        res.status(201).json({message:"Successfully Registered"});
    } else{
        res.status(500).json({error:"Registration Failed"});
    }} catch(err)
        {console.log(err);
        }

});


//login route
router.post('',async(req,res)=>{
    try{
        let token;
        const{email,password}=req.body;

    if(!email||!password){
        return res.status(400).json({error:"please fill the data properly"});
    }

    const userLogin = await User.findOne({email:email});

    if(userLogin){
        const isMatch = await bcrypt.compare(password, userLogin.password);
        
        token = await userLogin.generateAuthToken();
        console.log(token);

        res.cookie("jwtoken",token,{
           expires:new Date(Date.now()+25892000000),
           httpOnly:true
        });
    }

    if(!userLogin){
        return res.status(400).json({error:"ERROR!"})
    }else{
        return res.json({message:"User signin successful"});
    }

    }catch(err){
        console.log(err);
    }
});

//details route
router.post('/Question1',async (req,res)=>{
    try{
        const{gender,interested,date,district}=req.body;

        if(!gender || !interested || !date || !district){
            return res.status(422).json({error:"please fill all the fields properly"});
        }

        const question1=new Ques({gender,interested,date,district});

        const quesRegister=await question1.save();
        if(quesRegister){
            res.status(201).json({message:"Successfully saved information"});
        } else{
            res.status(500).json({error:"Refill information"});
}}catch(err){
        console.log(err);
    }
});

//interest route
router.post('/Question2',async (req,res)=>{
    try{
        const{interest}=req.body;
        if(!interest){return res.status(422).json({error:"please select your interests"});
    }
    const question2=new Ques({interest});
    const InterRegister=await question2.save();
    if(InterRegister){
        res.status(201).json({message:"Successfully saved information"});
    } else{
        res.status(500).json({error:"Reselect Interests"});
}}catch(err){
    console.log(err);
    }
});

//zod,prof route
router.post('/Question3',async (req,res)=>{
    try{
        const{zodiac,profession}=req.body;
        if(!zodiac || !profession){return res.status(422).json({error:"please select your zodiac and profession"});
    }
    const question3=new Ques({zodiac,profession});
    const zodRegister=await question3.save();
    if(zodRegister){
        res.status(201).json({message:"Successfully saved information"});
    } else{
        res.status(500).json({error:"Reselect Zodiac sign and Profession"});
}}catch(err){
        console.log(err);
    }
});

module.exports=router;