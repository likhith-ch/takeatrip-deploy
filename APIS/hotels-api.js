const exp=require("express")
const Hotel= require("../models/Hotels.js")
const hotelsapiObj=exp()
const bcrypt=require("bcrypt")
require("dotenv").config()
const verifyToken=require('./middlewares/verifytokens')
const errHandler=require("express-async-handler")
const cloudinary = require("cloudinary").v2
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const multer = require("multer")
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

cloudinary.config({
    cloud_name:"dhf3swlkx",
    api_key:"693836169542448",
    api_secret: "ZYAvTi1QlgFl3W1FgveYFRPLWZE"
   });

   const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:async (req, file) => {
    return {
    folder: 'hotel-pictures',
    public_id: file.fieldname + '-' + Date.now()
    }},
   });
var upload = multer({ storage: storage });

hotelsapiObj.use(exp.json())
module.exports=hotelsapiObj
hotelsapiObj.post("/createhotel",upload.single('image'),verifyToken,errHandler(async (req,res)=>{
    req.body=JSON.parse(req.body.hotelObj)
req.body.image=req.file.path;
let dobj=req.body
    
    let nameFromDb= await Hotel.findOne({"hotel_id":dobj.hotelid})
    if(nameFromDb!=null){
        res.send({message:"Hotel id already exists"})
    }
    else{
        let hotelObjtoModel=new Hotel({
           hotel_id:dobj.hotelid,
            hotel_name:dobj.hotelname,
            hotel_city:dobj.hotelcity,
            hotel_rooms_count:dobj.hotelrooms,
            hotel_price_pernight:dobj.hotelprice,
            daywise_bookings:[],
            image:dobj.image
    
        })
        await hotelObjtoModel.save()
    res.send({message:"hotel successfully added"})
    }
}))


hotelsapiObj.get("/gethotels",verifyToken,errHandler(async (req,res)=>{
    let hotelObj= await Hotel.find()
    res.send({message:hotelObj})
}))




hotelsapiObj.get("/gethotel/:hotelid",verifyToken,errHandler(async (req,res)=>{
    let hotelObj= await Hotel.findOne({hotel_id:req.params.hotelid})
    res.send({message:hotelObj})
}))


hotelsapiObj.post("/updatehotel",verifyToken,errHandler(async (req,res)=>{
    let dobj=req.body
    let updateddata={}
    if(dobj.hotelname!="" && dobj.hotelname!=null){
        updateddata["hotel_name"]=dobj.hotelname
    }
    if(dobj.hotelrooms!="" && dobj.hotelrooms!=null){
    updateddata["hotel_rooms_count"]=dobj.hotelrooms
    }
    if(dobj.hotelprice!="" && dobj.hotelprice!=null){
        updateddata["hotel_price_pernight"]=dobj.hotelprice
    }
        
    await Hotel.updateOne({hotel_id:req.body.hotelid},updateddata)
    res.send({message:"Hotel updated successfully"})
}))


hotelsapiObj.delete("/deletehotel/:hotel_id",verifyToken,errHandler(async (req,res)=>{
    await Hotel.deleteOne({hotel_id:req.params.hotel_id})
    res.send({message:"Hotel deleted successfully"})
}))
hotelsapiObj.post("/checkavailablehotels",verifyToken,errHandler(async (req,res)=>{
dobj=req.body  
availablehotels=[]
hotelsfound=0
checkin=new Date(dobj.checkindate)
checkout=new Date(dobj.checkoutdate)
console.log(dobj.rooms)
let datesarray=getDate(checkin,checkout)
hotelsincity=await Hotel.find({hotel_city:dobj.city}) 
if(hotelsincity!=null){
    //iteration for each hotel in hotels located in that city
    for(hotel of hotelsincity){
    //array to get booked dates in a hotel
     let bookeddates = hotel["daywise_bookings"].map(a => a.date);
     availabilitycount=0
     for(day of datesarray){
         //check if hotel is available for all dates choosen by user
         if(bookeddates.includes(day)){
            let obj = hotel["daywise_bookings"].find(obj => obj.date == day);
            if((obj.count+parseInt(dobj.rooms))<=hotel["hotel_rooms_count"]){
                availabilitycount=availabilitycount+1
            }
         }
         else{availabilitycount=availabilitycount+1}
     }
     if(availabilitycount==datesarray.length){availablehotels.push(hotel)}
    

    }
    
}
res.send({message:"hotels searched",hotelslist:availablehotels})

}))