const {jobStatus}=require("../utils/constant.util");
const Job=require("../models/job.model");

const jobValid=async(req,res,next)=>{

    if(!req.body.title || req.body.title==" ")
    {
        return res.status(400).send({
            message:"Failed!!! user doesn't provide title"
        })
    } 
    if(!req.body.description || req.body.description==" ")
    {
        return res.status(400).send({
            message:"Failed!!! user doesn't provide description"
        })
    }
    if(req.body.vacancies<=0)
    {
        return res.status(400).send({
            message:"Failed!!! please provide Vacancie value in positive number"
        })
    }
    if(req.body.status==jobStatus.expired)
    {
        return res.status(400).send({
            message:"Failed!!! status cannot be Expired"
        });
    }
    const jobstatus=[jobStatus.active,jobStatus.expired]
    if(!jobstatus.includes(req.body.status))
    {
        return res.status(400).send({
            message:"Failed!!! invalid status provided"
        })
    }
    next();
}

const isvacancie=async(req,res,next)=>{
    if(req.body.vacancies<=0)
    {
        return res.status(500).send({
            message:"Failed!!! please provide Vacancie value in positive number"
        })
    };
    next();
}

const isJobExist=async(req,res,next)=>{
   const job=await Job.findOne({title:req.body.title}); 
    if(job)
    {
        return res.status(400).send({
            message:"Failed!!! job already Exist"
        })
    }
    next();
}
const jobValidation={
    jobValid:jobValid,
    isJobExist:isJobExist,
    isvacancie:isvacancie
}

module.exports=jobValidation