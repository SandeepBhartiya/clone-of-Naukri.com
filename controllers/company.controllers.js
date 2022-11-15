const Company=require("../models/company.model")

exports.createCompany=async(req,res)=>{
    const obj={
        name:req.body.name,
        address:req.body.address 
    }
    try
    {
        const newCompany=await Company.create(obj)
        res.status(201).send(newCompany);
    }   
    catch(err)
    {
        console.log("Error while creating company",err.message);
        res.status(500).send({
            message:"Error while creating company"
        })
    }
}

exports.deleteCompany=async (req,res)=>{
    const company=await Company.deleteOne({_id:req.params.id});
    try
    {
        res.status(200).send({
            message:"Company Successfully Deleted"
        })
    }
    catch(err)
    {
        console.log("error while deleting the company",err.message)
        res.status(500).send({
            message:"Failed!!! while deleting the company"
        })
    }
}