const jwt = require("jsonwebtoken")


const authenticate = (req, res, next) => {

    const token = req.headers?.authorization?.split(" ")[1];
       console.log(token)
       

      if(token){
        const decoded = jwt.verify(token, "hush")
            
      if(decoded){
            const userId= decoded.userId
            req.body.userId=userId
            // console.log(decoded)
            //  console.log(userId)
            next()
        }else{
            res.send("please Login")
        }
      }

      else{
         res.send("Please Login")
      }   

}

module.exports={authenticate}
