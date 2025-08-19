const express = require("express")
const app = express()

const dotenv = require("dotenv")
dotenv.config()
const cors = require("cors")
const connectToDb = require("./dbConfig/connectToDb")
const userRouter = require("./Router/userRoutes")
const productRouter = require("./Router/productRouter")
const ports = process.env.port
app.use(express.json())

require("./dbConfig/nodeMailerTransport")


const sendEmail = require("./utils/sendEmail")
// sendEmail("emmanuelabiodun041@gmail.com", "Emyyyyy") 
   
app.use(cors())

app.listen(ports,()=>{
  console.log(`Port Running at http://localhost:${ports}`);  
  
})

connectToDb()



app.use("/", userRouter)
app.use("/", productRouter)



app.all("/{*any}",(req,res)=>{
  res.status(404).json({
    Message : `${req.method}` `${req.originalUrl} is not a valid endpoint`
  })
})