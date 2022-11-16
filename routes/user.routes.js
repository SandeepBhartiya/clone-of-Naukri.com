const userController=require("../controllers/user.controllers");
const {authVerify}=require("../middelwares")
module.exports=(app)=>{
    app.post("/naukri/api/v1/user",[authVerify.jwtVerify,authVerify.isOwner,authVerify.isJobSeeker],userController.search)
    app.post("/naukri/api/v1/user/:id",[authVerify.jwtVerify,authVerify.isJobSeeker],userController.applyJob)
}