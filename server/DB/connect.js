const mongoose=require('mongoose');

const DB = process.env.DB; 
mongoose.connect(DB,{
    UseNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log('connection successful....');  
}).catch((err) => console.log('connection unsuccessful!'));