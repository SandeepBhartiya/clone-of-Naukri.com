const companyController=require("../controllers/company.controllers");
const {authVerify}=require("../middelwares")
module.exports=(app)=>{
    app.post("/naukri/api/v1/company",[authVerify.jwtVerify,authVerify.isAdmin],companyController.createCompany)
    app.delete("/naukri/api/v1/company/:id",[authVerify.jwtVerify,authVerify.isAdmin],companyController.deleteCompany)
}