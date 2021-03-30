const jwt=require("jsonwebtoken")
require("dotenv").config()
const secret=process.env.SECRET
const verifyToken=(req,res,next)=>{
    let tokenwithbearer=req.headers["authorization"]
    if(tokenwithbearer==undefined)
    {
        res.send({message:"failed",reason:"unauthorized access"})
    }
    else{
        let token=tokenwithbearer.slice(7,tokenwithbearer.length)
        jwt.verify(token,secret,(err,decededToken)=>
        {
            if(err){
                res.send({message:"failed",reason:"Session Expired"})
            }
            else{
                next()
            }
        })
    }
}
module.exports=verifyToken