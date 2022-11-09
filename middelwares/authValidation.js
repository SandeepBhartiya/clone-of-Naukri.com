const {userType}=require("../utils/constant.util");
const User=require("../models/user.model");
const bcrypt=require("bcryptjs")
const validateSingUp=async(req,res,next)=>{
    if(!req.body.name ||req.body.name==" ")
    {
        return res.status(400).send({
            message:"Failed!!! user doesn't provide userName."
        });
    }
    if(!req.body.userId ||req.body.userId==" ")
    {
        return res.status(400).send({
            message:"Failed!!! user doesn't provide userId."
        });
    }
    if(!req.body.email ||req.body.email==" ")
    {
        return res.status(400).send({
            message:"Failed!!! user doesn't provide email."
        });
    }
    if(!req.body.password ||req.body.password==" ")
    {
        return res.status(400).send({
            message:"Failed!!! user doesn't provide password."
        });
    }
    if(req.body.userType==userType.admin)
    {
        return res.status(400).send({
            message:"Failed!!! userType cannot be Admin"
        })
    }
    next();
}

const validateSignIn=async(req,res,next)=>{

    if(!req.body.userId || req.body.userId==" ")
    {
        return res.status(400).send({
            message:"Failed!!! user does not provide userId."
        })
    }
    if(!req.body.password ||req.body.password==" ")
    {
        return res.status(400).send({
            message:"Failed!!! user doesn't provide password."
        });
    }
    next();
}
const isvalidUser=async (req,res,next)=>{
    const user=await User.findOne({userId:req.body.userId});
    if(user!=null)
    {
        return res.status(400).send({
            message:"Failed!!!User already Exist's"
        })
    }
    next();
}
const isUserExist=async(req,res,next)=>{
        const user=await User.findOne({userId:req.body.userId});
        if(!user)
        {
            return res.status(400).send({
                message:"Failed!!! User doesn't Exist"
            })
        }
        next();

}
const isValidPassword=async(req,res,next)=>{
    const user=await User.findOne({userId:req.body.userId});
    const isvalid=bcrypt.compareSync(req.body.password,user.password);
    if(!isvalid)
    {
        return res.status(500).send({
            message:"Failed!!! Password is Invalid"
        })
    }
    next();
}
const authValidation={
    validateSingUp:validateSingUp,
    validateSignIn:validateSignIn,
    isUserExist:isUserExist,
    isvalidUser:isvalidUser,
    isValidPassword:isValidPassword
}

module.exports=authValidation