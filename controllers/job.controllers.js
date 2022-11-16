const Job=require("../models/job.model")
const User=require("../models/user.model")

const display=(job)=>{
    return {
        id:job._id,
        title:job.title,
        description:job.description,
        status:job.status,
        vacancies:job.vacancies
    }
}

exports.createJob=async (req,res)=>{
    const obj={
        title:req.body.title,
        description:req.body.description,
        vacancies:req.body.vacancies
    }
    try
    {
        // const user=await User.findOne({userId:req.user})
        const newJob=await Job.create(obj);
        // user.jobPublish.push(newJob);
        // await user.save();
        const n=display(newJob);
        res.status(201).send(n) 
    }catch(err)
    {
        console.log("Error while creating new Job",err.message);
        res.status(500).send({
            message:"Error while creating new Job"
        })
    }
}

exports.updateJob=async (req,res)=>{
    try
    {
        const job=await Job.findOne({_id:req.params.id});
        job.title=job.title?req.body.title:job.title;
        job.description=job.description?req.body.description:job.description;
        job.vacancies=job.vacancies?req.body.vacancies:job.vacancies;
        job.status=job.status?req.body.status:job.status;
        await job.save();
        res.status(200).send(job)
    }catch(err)
    {
        console.log("Error while updating  Job",err.message);
        res.status(500).send({
            message:"Error while updating  Job"
        })
    }
}

exports.deleteJob=async (req,res)=>{
    const job=await Job.deleteOne({_id:req.params.id});
    try
    {
        res.status(200).send({
            message:"User delete successfully"
        })
    }
    catch(err)
    {
        console.log("Error while deleting  Job",err.message);
        res.status(500).send({
            message:"Error while deleting  Job"
        })
    }
}
