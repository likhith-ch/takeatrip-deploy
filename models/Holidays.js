const mongoose=require("mongoose")
const holidaySchema=mongoose.Schema(
    {package_id:{type:String,required:true},
    package_name:{type:String,required:true},
    package_destination_city:{type:String,required:true},
    package_nights:{type:Number,required:true},
    package_price:{type:Number,required:true},
    package_features:{type:Array,required:true},
    image:{type:String,required:true}
})
const holidaysModel=mongoose.model("holiday",holidaySchema)
module.exports=holidaysModel