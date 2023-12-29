const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>{
    res.send('welcome back!');
});

router.post('/Register',(req,res)=>{
    console.log(req.body);
});

module.exports=router;