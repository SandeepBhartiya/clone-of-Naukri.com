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
        req.userId=decoded.id;
        next();
    })
   
}
const isAdminorHR=async(req,res,next)=>{
    const user=await User.findOne({userId:req.userId});
    // console.log("newUser:",user)
    if(!user)
    {
        return res.status(500).send({
            message:"Failed!!!User does not Exist"
        })
    }
    // search(user);
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
    const user=await User.findOne({userId:req.userId})
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
const isAdmin=async(req,res,next)=>{
    const user=await User.findOne({userId:req.userId});
    if(user.userType==userType.admin)
    {
        next();
    }
    else
    {
        return res.status(403).send({
            message:"Failed!!! Only Admin can access this endpoint"
        })
    }
}
const isOwner=async(req,res,next)=>{
    const user=await User.findOne({userId:req.userId});
    if(user.userId==req.body.userId)
    {
        next();
    }
    else
    {
        return res.status(403).send({
            message:"Failed!!! Only User can access this endpoint"
        })
    }
}

const isAdminorOwner=async(req,res,next)=>{
    const user=await User.findOne({userId:req.userId});
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
const isJobSeeker=async(req,res,next)=>{
    const user=await User.findOne({userId:req.userId});
    if(user.userType==userType.jobseeker)
    {
        next();
    }
    else
    {
        return res.status(403).send({
            message:"Failed!!! Only jobseeker can access this endpoint"
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
    isAdminorOwner:isAdminorOwner,
    isAdminorHR:isAdminorHR,
    jwtVerify:jwtVerify,
    isAdmin:isAdmin,
    isOwner:isOwner,
    isHr:isHr,
    isJobSeeker:isJobSeeker
}
module.exports=authVerify