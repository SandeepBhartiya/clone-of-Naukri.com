const mongoose = require("mongoose");
const constant = require("../utils/constant.util");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    requried: true,
    trim:true
  },
  userId:{
    type:String,
    required:true,
    trim:true,
    unique:true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 10,
    lowercase: true,
    trim:true
  },
  password: {
    type:String,
    required: true,
    minLength:10,
    trim:true
  },
  userType: {
    type: String,
    default: constant.userType.jobseeker,
    enum: [
      constant.userType.admin,
      constant.userType.hr,
      constant.userType.jobseeker,
    ]
  },
  userStatus:{
    type:String,
    default:constant.userStatus.approved,
    enum:[
          constant.userStatus.pending,
          constant.userStatus.rejected,
          constant.userStatus.approved
        ]
  },
  jobApplied: {
    type: [mongoose.SchemaType.ObjectId],
    ref: "job",
  },
  companyId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "company",
  }
  
},{versionKey:false,timestamps:true});

module.exports = mongoose.model("user", userSchema);
