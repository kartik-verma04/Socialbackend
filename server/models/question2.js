const mongoose=require('mongoose');

const interSchema=new mongoose.Schema({
    interest:{
        type:String,
        required:true
    },
    interest2:{
        type:String,
        required:true
    },
    interest3:{
        type:String,
        required:true
    },
    interest4:{
        type:String,
        required:true
    },
    interest5:{
        type:String,
        required:true
    },
    interest6:{
        type:String,
        required:true
    },
    interest7:{
        type:String,
        required:true
    },
    interest8:{
        type:String,
        required:true
    },
    interest9:{
        type:String,
        required:true
    },
    interest10:{
        type:String,
        required:true
    },
    interest11:{
        type:String,
        required:true
    },
    interest12:{
        type:String,
        required:true
    },
    interest13:{
        type:String,
        required:true
    },
    interest14:{
        type:String,
        required:true
    },
    interest15:{
        type:String,
        required:true
    },
    
});
const Inter=mongoose.model('INTERESTS',interSchema);

module.exports = Inter;