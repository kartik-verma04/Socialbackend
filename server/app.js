const express=require ('express');
const cors=require ('cors');
const path=require ('path');
const mongoose=require ('mongoose');
const app=express ();
const dotenv=require ('dotenv');
const authRoute=require('./router/auth')

dotenv.config({ path: './config.env' });
require('./DB/connect');
const User=require('./models/user');

app.use(express.json());
app.use(cors());

//router files
app.use(require('./router/auth'));
const PORT=process.env.PORT;


//middleware

const middleware=(req,res,next)=>{
    next();
}

app.use('/api/v1/auth',authRoute)

app.listen(PORT,(req,res)=>{
    console.log('server is on: ${PORT}');
});
//console.log('succesfull!')