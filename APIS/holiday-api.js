const exp=require("express")
const Holiday= require("../models/holidays.js")
const holidaysapiObj=exp()
const bcrypt=require("bcrypt")
const verifyToken=require('./middlewares/verifytokens')
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
    folder: 'holiday-pictures',
    public_id: file.fieldname + '-' + Date.now()
    }},
   });
var upload = multer({ storage: storage });

holidaysapiObj.use(exp.json())
module.exports=holidaysapiObj
holidaysapiObj.post("/createpackage",upload.single('image'),verifyToken,errHandler(async (req,res)=>{
    req.body=JSON.parse(req.body.holidayObj)
req.body.image=req.file.path;
let dobj=req.body
    
    let nameFromDb= await Holiday.findOne({"package_id":dobj.productid})
    if(nameFromDb!=null){
        res.send({message:"holiday id already exists"})
    }
    else{
        let holidayObjtoModel=new Holiday({
            package_id:dobj.packageid,
            package_name:dobj.packagename,
            package_destination_city:dobj.packagecity,
            package_nights:dobj.packagenights,
            package_price:dobj.packageprice,
            package_features:dobj.packagefeatures,
            image:dobj.image
    
        })
        await holidayObjtoModel.save()
    res.send({message:"Holiday Package successfully added"})
    }
}))


holidaysapiObj.get("/getpackages",verifyToken,errHandler(async (req,res)=>{
    let holidayObj= await Holiday.find()
    res.send({message:holidayObj})
}))




holidaysapiObj.get("/getcitypackage/:city",verifyToken,errHandler(async (req,res)=>{
    let holidayObj= await Holiday.find({package_destination_city:req.params.city})
    res.send({message:"fetched successfully",packagelist:holidayObj})
}))
holidaysapiObj.post("/getfilteredpackages",verifyToken,errHandler(async (req,res)=>{
    dobj=req.body
    let holidayObj= await Holiday.find({package_destination_city:dobj.city,package_nights:{$gte:parseInt(dobj.minnights), $lte:parseInt(dobj.maxnights)},package_price:{$gte:parseInt(dobj.minprice), $lte:parseInt(dobj.maxprice)}})
    res.send({message:"fetched successfully",filteredpackagelist:holidayObj})
}))

holidaysapiObj.post("/updatepackage",verifyToken,errHandler(async (req,res)=>{
    let dobj=req.body
    let updateddata={}
    console.log("Call reached service")
    if(dobj.packagenights!="" && dobj.packagenights!=null){
        updateddata["package_nights"]=dobj.packagenights
    }
    if(dobj.packageprice!="" && dobj.packageprice!=null){
        updateddata["package_price"]=dobj.packageprice
    }
    if(dobj.packagefeatures!="" && dobj.packagefeatures!=null ){
        updateddata["package_features"]=dobj.packagefeatures
    }

    await Holiday.updateOne({package_id:req.body.packageid},updateddata)
    res.send({message:"Holiday package updated successfully"})
}))


holidaysapiObj.delete("/deletepackage/:package_id",verifyToken,errHandler(async (req,res)=>{
    console.log("hello")
    await Holiday.deleteOne({package_id:req.params.package_id})
    res.send({message:"Package deleted successfully"})
}))
