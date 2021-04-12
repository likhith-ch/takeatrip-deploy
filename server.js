const exp=require("express")
const app=exp()
require("dotenv").config()
app.use(exp.json())
const path=require("path")
app.use(exp.static(path.join(__dirname,'dist/holidaybooking')))
const mongoose = require('mongoose');
const userApiObj=require("./APIS/user-api")
const hotelsApiObj=require("./APIS/hotels-api")
const holidayApiObj=require("./APIS/holiday-api")
const adminApiObj=require("./APIS/admin-api")
const port=process.env.PORT||8080
app.use("/user",userApiObj)
app.use("/hotels",hotelsApiObj)
app.use("/holiday",holidayApiObj)
app.use("/admin",adminApiObj)
mongoose.connect(process.env.DBURL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error',()=>{ console.log('connection error:')});
db.once('open', ()=>{
  console.log("connect to DB")
});
//middleware to deal with invalid paths
app.use((req,res,next)=>{res.send({message:req.url+" is not a valid path"})
})   
//error handler middleware
app.use((err,req,res,next)=>{res.send({message:err.message})})  
app.listen(port,()=>{
    console.log(`server started on port number ${port}`)
})