const mongoose=require("mongoose")
const UserSchema=new mongoose.Schema({username:String,password:String,email:String,phone:Number,package:Array,rooms:Array})
const User=mongoose.model("user",UserSchema)
module.exports=User