const mongoose=require("mongoose");

const companySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true
    },
    jobPosted:{
        type:[mongoose.SchemaTypes.ObjectId],
        ref:"job",
     },
     hrs:{
        type:[mongoose.SchemaTypes.ObjectId],
        ref:"user"
     }
    
},{versionKey:false,timestamps:true});

module.exports=mongoose.model("company",companySchema)