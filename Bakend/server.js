import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodroutes.js"
import userRouter from "./routes/userRoute.js"
//importing env file
import 'dotenv/config';
import cartRouter from "./routes/cartroute.js"

import OrderRouter from "./routes/orderRouter.js";
//app config

const app=express()
const port =4000

//middleware
app.use(express.json())
app.use(cors()) //using this we can acess bakend from any frontend

//db connection
connectDB();

//api endpoint
//for food
app.use("/api/food",foodRouter)

//by this we can acess the image that we have added in our db. api endpoint 
app.use('/images',express.static('uploads'))

//api endpoint for user
app.use('/api/user',userRouter)

//cart endpoint
app.use("/api/cart",cartRouter);

//order api  endpoint
app.use("/api/order",OrderRouter);

app.get("/",(req,res)=>{
   res.send("API Working")
})

app.listen(port,()=>{
  console.log(`server started on http://localhost:${port}`)
})




