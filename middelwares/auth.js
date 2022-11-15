const jwt=require("jsonwebtoken")
const User=require("../models/user.model")
const secret=require("../configs/secret.config")
const {userType}=require("../utils/constant.util")
const jwtVerify=async(req,res,next)=>{
    const token=req.headers["x-access-token"];

    jwt.verify(token,secret.secretkey,(err,decoded)=>{
        if(err)
        {
            return res.status(400).send({
                message:"Failed !!! Invalid token provided"
            });
        }
        req.user=decoded.id
    })
    next();
}
const isAdminorHR=async(req,res,next)=>{
    const user=await User.findOne({userId:req.user});
    // console.log("newUser:",user)
    // if(!user)
    // {
    //     return res.status(500).send({
    //         message:"Failed!!!User does not Exist"
    //     })
    // }
    search(user);
    if(user.userType==userType.admin ||user.userType==userType.hr)
    {
        next();
    }else
    {
        return res.status(403).send({
            message:"Failed!!! Only Admin and Hr can access this endpoint"
        });
    }
}

const isHr=async (req,res,next)=>{
    const user=await User.findOne({userId:req.user})
    if(user.userType==userType.hr)
    {
        next();
    }
    else
    {
        return res.status(403).send({
            message:"Failed!!! Only Hr can access this endpoint"
        })
    }
   
}

const isAdminorOwner=async(req,res,next)=>{
    const user=await User.findOne({userId:req.user});
    if(user.userId==req.body.userId ||user.userType==userType.admin)
    {
        next();
    }
    else
    {
        return res.status(403).send({
            message:"Failed!!! Only Owner or Admin can access this endpoint"
        })
    }
}

const search=(user)=>{
    if(!user)
    {
        return res.status(500).send({
            message:"Failed!!!User does not Exist"
        })
    }
}
const authVerify={
    jwtVerify:jwtVerify,
    isAdminorHR:isAdminorHR,
    isHr:isHr,
    isAdminorOwner:isAdminorOwner
}
module.exports=authVerify