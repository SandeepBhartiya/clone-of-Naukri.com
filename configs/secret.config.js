if(process.NODE_ENV!="production")
{
    require("dotenv").config();
}

module.exports={
    secretkey:process.env.secretkey
}