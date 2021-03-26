const exp=require("express")
const User = require("../models/Users.js")
//const Product = require("../models/Products.js")
require("dotenv").config()
const userapiObj=exp()
const bcrypt=require("bcrypt")
const errHandler=require("express-async-handler")
const jsonwebtoken=require("jsonwebtoken")

const userModel=require("../models/Users.js")
userapiObj.use(exp.json())
module.exports=userapiObj
userapiObj.post("/createuser",errHandler(async (req,res)=>{
    let hashedpassword=bcrypt.hashSync(req.body.password,7)
    let userObjtoModel=new User({
        username:req.body.username,
        password:hashedpassword,
        email:req.body.email,
        phone:req.body.phone,
        hotels:[],
        holiday:[]

    })
    if(await User.findOne({username:req.body.username})==null){
    await userObjtoModel.save()
    res.send({message:"User sucessfully created"})}
    else{res.send({message:"User already exists"})}
}))
userapiObj.get("/getusers",errHandler(async (req,res)=>{
    let userarray= await User.find()
    res.send({message:userarray})
}))
userapiObj.get("/getuser/:username",errHandler(async (req,res)=>{
    let userobj= await User.findOne({username:req.params.username})
    res.send({message:userobj})
}))





userapiObj.post("/checkpasswordasync",async (req,res)=>{
    let dobj=req.body
    let userFromDb= await User.findOne({"username":dobj.username})
    if(!userFromDb){
        res.send({message:"invalid username"})
    }

    else if(!userFromDb || !bcrypt.compareSync(dobj.password,userFromDb.password))
    {
    res.send(false)
    }
    else{
        let signedToken= await jsonwebtoken.sign({username:userFromDb.username},process.env.SECRET,{expiresIn:100})
        res.send({message:"login success",token:signedToken,username:userFromDb.username})
    }
})


/*userapiObj.post("/getcartproducts",async (req,res)=>{
    let dobj=req.body
    items=[]
    let userFromDb= await User.findOne({"username":dobj.username})
    let ss=userFromDb.cart
    for(var val of ss){
        let prod= await Product.findOne({"productid":parseInt(val)})
        items.push(prod)}
    res.send({"message":"data fetched","productsarray":items})
})


userapiObj.post("/deletecartitem",async (req,res)=>{
    let dobj=req.body
    let userFromDb= await User.findOne({"username":dobj.username})
    let ss=userFromDb.cart;
    const index = ss.indexOf(dobj.productid)
    items=[]
    if (index > -1) {
        ss.splice(index, 1);
      }
    await User.updateOne({"username":dobj.username},{"cart":ss})
    for(var val of ss){
        let prod= await Product.findOne({"productid":parseInt(val)})
        items.push(prod)}
    res.send({message:"product deleted","productsarray":items})

})*/