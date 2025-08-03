import mongoose from "mongoose";

export const connectDB = async ()=>{
  await mongoose.connect(process.env.MONGPDB_URL).then(()=>console.log("db connected"))
}
