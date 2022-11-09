const authController=require("../controllers/auth.controllers");
const {authValidation}=require("../middelwares")
module.exports=(app)=>{
    app.post("/naukri/api/v1/signUp",[authValidation.validateSingUp,authValidation.isvalidUser],authController.signUp);
    app.post("/naukri/api/v1/signIn",[authValidation.validateSignIn,authValidation.isUserExist,authValidation.isValidPassword],authController.signIn);
}