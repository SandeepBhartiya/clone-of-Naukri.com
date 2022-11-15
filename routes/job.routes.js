const jobController=require("../controllers/job.controllers")
const {authVerify}=require("../middelwares")
module.exports=(app)=>{
    app.post("/naukri/api/v1/job",[authVerify.jwtVerify,authVerify.isHr],jobController.createJob);
    app.put("/naukri/api/v1/job/:id",[authVerify.jwtVerify,authVerify.isHr],jobController.updateJob);
    app.delete("/naukri/api/v1/job/:id",[authVerify.jwtVerify,authVerify.isHr],jobController.deleteJob)
}