const mongoose=require("mongoose");
const {jobStatus}=require("../utils/constant.util")
const jobSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
        minLength:15
    },
    status:{
        type:String,
        default:jobStatus.active,
        enum:[jobStatus.active,jobStatus.expired]
    },
    vacancies:{
        type:Number,
        required:true,
        default:0
    },
    jobseeker:{
        type:[mongoose.SchemaTypes.ObjectId],
        ref:"user",
    },
    company:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"company",
    }
},{versionKey:false,timestamps:true});

module.exports=mongoose.model("job",jobSchema)