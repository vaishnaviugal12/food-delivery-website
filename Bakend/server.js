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
const PORT = process.env.PORT;


app.use(
  cors({
    origin: "https://food-delivery-website-nine-theta.vercel.app",
    credentials: true,
  })
);
//middleware
app.use(express.json())


//db connection
connectDB();

app.listen(PORT,()=>{
  console.log(`server started on http://localhost:${PORT}`);
})

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

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});




