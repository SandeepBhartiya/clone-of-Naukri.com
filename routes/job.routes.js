const jobController=require("../controllers/job.controllers")
const {authVerify,jobValidation}=require("../middelwares")
module.exports=(app)=>{
    app.post("/naukri/api/v1/job",[authVerify.jwtVerify,authVerify.isHr,jobValidation.jobValid,jobValidation.isJobExist],jobController.createJob);
    app.put("/naukri/api/v1/job/:id",[authVerify.jwtVerify,authVerify.isHr,jobValidation.isvacancie],jobController.updateJob);
    app.delete("/naukri/api/v1/job/:id",[authVerify.jwtVerify,authVerify.isHr],jobController.deleteJob)
}