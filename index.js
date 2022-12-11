const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const express =  require("express")
const cors = require("cors")
const {connection} = require("./config/db")
const {UserModel} = require("./models/user.model");
const { noteRouter } = require("./routes/note.route");
const {authenticate} = require("./middlewares/authentication")

const app = express();
app.use(express.json())

// app.use()

app.get("/",(req,res) =>{
    res.send("welcome home")
})


app.post("/signup", async(req,res)=>{
//    console.log(req.body)
   const {email,password,name} = req.body;
   const userpresent = await UserModel.findOne({email})

     if(userpresent?.email){
         res.send("try logged in already exist")
     }else{
          try{
             bcrypt.hash(password,4,async function(err,hash){
                const user = new UserModel({email,password:hash},name)

                await user.save()
                res.send("sign up successful")
             })
          }
          catch(err){
            console.log(err)
            res.send("Something went wrong, pls try again")
          }

     }
})


app.post("/login",async(req,res) =>{
    const {email,password} = req.body;

    try{
    const  user = await UserModel.find({email})

     if(user.length>0){
    const hashed_password = user[0].password;

     bcrypt.compare(password,hashed_password,function(err,result){
          if(result){
            const token =jwt.sign({"userId":user[0]._id},"hush");
            res.send({"msg":"Login sucessfull","token":token})
          }else{
            res.send("Login failed")
          }
     })}

     else{
        res.send("Login failed")
     }
    
    }
    catch(err){
   res.send("Something went wrong , please try afetr sometimes")
    }

})


app.get("/about", (req,res)=>{
    res.send("About the pages")
})   


 app.use(authenticate)
app.use("/notes",noteRouter)


app.listen(8000, async () =>{
   try{
      await connection;
       console.log("connected to database")
   }catch(err){
       console.log("something went wrong")
       console.log(err)
   }
    console.log("listen on port 8080")
})