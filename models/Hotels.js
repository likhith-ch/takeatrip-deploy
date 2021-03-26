const mongoose=require("mongoose")
const { StringDecoder } = require("string_decoder")
const hotelSchema=mongoose.Schema(
    {hotel_id:{type:String,required:true},
    hotel_name:{type:String,required:true},
    hotel_city:{type:String,required:true},
    hotel_rooms_count:{type:Number,required:true},
    hotel_price_pernight:{type:Number,required:true},
    daywise_bookings:{type:Array,required:true},
    image:{type:String,required:true}
})
const hotelsModel=mongoose.model("hotel",hotelSchema)
module.exports=hotelsModel