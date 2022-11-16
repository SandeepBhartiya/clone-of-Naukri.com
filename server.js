
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const bcrypt=require("bcryptjs")
const bodyParser=require("body-parser")

const dbconfig=require("./configs/db.config")
const serverconfig=require("./configs/server.config")
const User=require("./models/user.model");
const Job=require("./models/job.model");
const Company=require("./models/company.model")

mongoose.connect(dbconfig.DB);
const db=mongoose.connection;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

db.on("error",()=>{
    console.log("ERROR...")
});

db.once("open",()=>{
    console.log("Connected....");
   init();
});

async function init()
{
    await User.collection.drop();
    await Job.collection.drop();
    await Company.collection.drop();
    try
    {
    
      

        const user=await User.create({
                name:"Sandeep",
                email:"san@gmail.com",
                userId:"01",
                password:bcrypt.hashSync("Welcome",8),
                userType:"ADMIN"

        });
        const job=await Job.create({
            title:"Web App Developer",
            description:"Only Backend Developer Needed",
            vacancies:3
        });
        job.jobseeker.push(user._id);
        user.jobApplied.push(job._id);
        await user.save();
        await job.save();
        const company=await Company.create({
            name:"InfoSys",
            address:"malad(W)"
        });
        console.log(user);
        console.log(job);
        console.log(company);
        
    }
    catch(err)
    {
        console.log("error while Initializating DB",err.message)
    }
}


require("./routes/auth.routes")(app);
require("./routes/job.routes")(app);
require("./routes/company.routes")(app);
require("./routes/user.routes")(app);

app.listen(serverconfig.PORT,()=>{
    console.log("I Am Listening AT:",serverconfig.PORT)
});
