const exp=require("express")
const Holiday= require("../models/holidays.js")
const holidaysapiObj=exp()
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
    folder: 'holiday-pictures',
    public_id: file.fieldname + '-' + Date.now()
    }},
   });
var upload = multer({ storage: storage });

holidaysapiObj.use(exp.json())
module.exports=holidaysapiObj
holidaysapiObj.post("/createpackage",upload.single('image'),async (req,res)=>{
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
})


holidaysapiObj.get("/getproducts",errHandler(async (req,res)=>{
    let holidayObj= await Holiday.find()
    res.send({message:holidayObj})
}))




holidaysapiObj.get("/getproduct/:productId",errHandler(async (req,res)=>{
    let holidayObj= await Holiday.findOne({productId:parseInt(req.params.productId)})
    res.send({message:holidayObj})
}))


holidaysapiObj.post("/updatepackage",errHandler(async (req,res)=>{
    let dobj=req.body
    let updateddata={}
    console.log("Call reached service")
    if(dobj.packagename!=""){
updateddata["package_name"]=dobj.packagename
    }
    if(dobj.packagenights!=""){
        updateddata["package_nights"]=dobj.packagenights
    }
    if(dobj.packageprice!=""){
        updateddata["package_price"]=dobj.packageprice
    }
    if(dobj.packagefeatures!=""){
        updateddata["package_features"]=dobj.packagefeatures
    }

    await Holiday.updateOne({package_id:req.body.packageid},updateddata)
    res.send({message:"Holiday package updated successfully"})
}))


/*holidaysapiObj.delete("/deleteproduct/:productId",errHandler(async (req,res)=>{
    await Product.deleteOne({productId:parseInt(req.params.productId)})
    res.send({message:"Product deleted successfully"})
}))*/
