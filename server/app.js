const express = require("express");
const connection = require("./database/db.js");
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authroute = require("./routes/auth.route.js");
const userRoute = require("./routes/user.route.js");
const postRoute = require("./routes/post.route.js");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use((req,res,err,next)=>{
    const errStatus = err.status || 500
    const errMessage = err.message || "something went wrong !"
    res.status(errStatus).send(errMessage);
})

app.use('/api/v1/auth',authroute);
app.use('/api/v1/user',userRoute);
app.use('/api/v1/posts',postRoute);

app.listen(5000,()=>{
    connection()
    console.log(`port is listening at the 5000 port`)
})