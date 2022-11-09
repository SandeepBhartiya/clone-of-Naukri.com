const User=require("../models/user.model");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const secret=require("../configs/secret.config")

exports.signUp=async (req,res)=>{
    const obj={
        name:req.body.name,
        email:req.body.email,
        userId:req.body.userId,
        userType:req.body.userType,
        password:bcrypt.hashSync(req.body.password,8),
    }
    try
    {
        const userObj=await User.create(obj);
        res.status(201).send(userObj);
        console.log(userObj)
    }catch(err)
    {
        console.log("Error while signUp",err.message);
        res.status(500).send({
            message:"Error while performing signUp operation"
        })
    }
}

exports.signIn=async(req,res)=>{
    try
    {
    const user=await User.findOne({userId:req.body.userId});
    console.log(user)
    const token=jwt.sign({id:user.userId},secret.secretkey,{
        expiresIn:60
    });
    const isvalid=bcrypt.compareSync(req.body.password,user.password);
    if(!isvalid)
    {
        return res.status(500).send({
            message:"Password is Invalid"
        })
    }

    
        res.status(200).send({
            name:user.name,
            email:user.email,
            userId:user.userId,
            password:user.password,
            userType:user.userType,
            userStatus:user.userStatus,
            jobApplied:user.jobApplied,
            companyId:user.companyId,
            token:token
        })
    }
    catch(err)
    {
        console.log("Error while signIn",err.message);
        res.status(500).send({
            message:"error while performing signIn"
        })
    }
}