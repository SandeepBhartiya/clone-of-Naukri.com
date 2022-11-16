const User=require("../models/user.model");
const Job=require("../models/job.model")
exports.search=async(req,res)=>{
    const queryobj={};
    const userStatus=req.query.status;
    const title=req.query.title;
    if(userStatus)
    {
        queryobj.status=userStatus;
    }
    if(title)
    {
        queryobj.title=title;
    }

    console.log(queryobj.title)
    try
    {
        const job =await Job.find(queryobj);
        res.status(200).send(job)
    }catch(err)
    {
        console.log("Error while searching jobs",err.message);
        res.status(500).send({
            message:"Error while searching jobs"
        });
    }   
}

exports.applyJob=async(req,res)=>{
    try
    {
        const user=await User.findOne({userId:req.userId});
        const job=await Job.findOne({_id:req.params.id});
        const vac=job.vacancies-1;
        job.vacancies=job.vacancies?vac:job.vacancies;
        if(job.vacancies<=0)
        {
            return res.status(500).send({
                message:"Failed!!! No Vacancie Avilabel"
            })
        }
        user.jobApplied.push(job._id);
        job.jobseeker.push(user._id);
        user.save();
        job.save();
        console.log(job)
        res.status(200).send({message:"User successfully applied for job"});
    }
    catch(err)
    {
        console.log("Error while applying jobs",err.message);
        res.status(500).send({
            message:"Error while applying jobs"
        });
    }
}