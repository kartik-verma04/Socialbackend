const mongoose=require('mongoose');

const zodSchema=new mongoose.Schema({
    zodiac:{
      type:String,
      required:true,  
    },
    profession:{
        type:String,
        required:true,
    },
});

const Zod=mongoose.model('ZODIAC',zodSchema);

module.exports=Zod;