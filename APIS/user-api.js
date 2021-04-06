const exp=require("express")
const User = require("../models/Users.js")
const Hotel = require("../models/Hotels.js")
const verifyToken=require('./middlewares/verifytokens')
//const Product = require("../models/Products.js")
require("dotenv").config()
const userapiObj=exp()
const bcrypt=require("bcrypt")
const errHandler=require("express-async-handler")
const jsonwebtoken=require("jsonwebtoken")

const userModel=require("../models/Users.js")
userapiObj.use(exp.json())
module.exports=userapiObj
Date.prototype.addDay = function (days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  }
  function getDate(strDate, stpDate) {
    var dArray = new Array();
    var cDate = strDate;
    while (cDate <= stpDate) {
          
        // Adding the date to array
        dArray.push(new Date (cDate).toLocaleString()); 
          
        // Increment the date by 1 day
        cDate = cDate.addDay(1); 
    }
    return dArray;
}

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
userapiObj.post("/bookhotel",verifyToken,errHandler(async (req,res)=>{
    let userobj= await User.findOne({username:req.body.username})
    dobj=req.body
    checkin=new Date(dobj.checkindate)
    checkout=new Date(dobj.checkoutdate)
    let datesarray=getDate(checkin,checkout)

    hotelobj=await Hotel.findOne({hotel_id:dobj.hoteldata["hotel_id"]}) 
    let bookeddates = hotelobj["daywise_bookings"].map(a => a.date);
    let bookingsarray=hotelobj["daywise_bookings"]
    let userbookinghistory=userobj["rooms"]
    userbookinghistory.push(dobj)
for(day of datesarray){
if(bookeddates.includes(day)){
    
   let obj = hotelobj["daywise_bookings"].find(obj => obj.date == day);
   var index = bookingsarray.indexOf(obj);
    
if (index !== -1) {
  bookingsarray.splice(index, 1);
}
obj.count=obj.count+parseInt(dobj.rooms)
bookingsarray.push(obj)
}
else{
bookingsarray.push({date:day,count:parseInt(dobj.rooms)})

}
    }
    console.log("booking history")
    console.log(userbookinghistory)
await Hotel.updateOne({hotel_id:hotelobj["hotel_id"]},{daywise_bookings:bookingsarray})
await User.updateOne({username:dobj.username},{rooms:userbookinghistory})
res.send({message:"hotel booked succesfully"})




}))





userapiObj.post("/checkpasswordasync",errHandler(async (req,res)=>{
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
        let signedToken= await jsonwebtoken.sign({username:userFromDb.username},process.env.SECRET,{expiresIn:1000})
        res.send({message:"login success",token:signedToken,username:userFromDb.username})
    }
}))


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