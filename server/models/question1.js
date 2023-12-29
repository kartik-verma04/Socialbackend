const mongoose=require('mongoose');

const quesSchema=new mongoose.Schema({
    gender:{
      type:String,
      required:true,  
    },
    interested:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        required:true,
    },
    district:{
        type:String,
        required:true,
    },
});

const Ques=mongoose.model('QUESTION',quesSchema);

module.exports=Ques;