const exp=require("express")
const Hotel= require("../models/Hotels.js")
const hotelsapiObj=exp()
const bcrypt=require("bcrypt")
require("dotenv").config()
const errHandler=require("express-async-handler")
const cloudinary = require("cloudinary").v2
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const multer = require("multer")

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
hotelsapiObj.post("/createhotel",upload.single('image'),async (req,res)=>{
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
})


hotelsapiObj.get("/getproducts",errHandler(async (req,res)=>{
    let hotelObj= await Hotel.find()
    res.send({message:hotelObj})
}))




hotelsapiObj.get("/getproduct/:productId",errHandler(async (req,res)=>{
    let hotelObj= await Hotel.findOne({productId:parseInt(req.params.productId)})
    res.send({message:hotelObj})
}))


hotelsapiObj.post("/updatehotel",errHandler(async (req,res)=>{
    let dobj=req.body
    let updateddata={}
    if(dobj.hotelname!=""){
        updateddata["hotel_name"]=dobj.hotelname
    }
    if(dobj.hotelrooms!=""){
    updateddata["hotel_rooms_count"]=dobj.hotelrooms
    }
    if(dobj.hotelprice!=""){
        updateddata["hotel_price_pernight"]=dobj.hotelprice
    }
        
    await Hotel.updateOne({hotel_id:req.body.hotelid},updateddata)
    res.send({message:"Hotel updated successfully"})
}))


/*hotelsapiObj.delete("/deleteproduct/:productId",errHandler(async (req,res)=>{
    await Product.deleteOne({productId:parseInt(req.params.productId)})
    res.send({message:"Product deleted successfully"})
}))*/
