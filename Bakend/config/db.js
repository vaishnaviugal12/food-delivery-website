import mongoose from "mongoose";

export const connectDB = async ()=>{
  await mongoose.connect('mongodb+srv://vaishnaviugale14:9322473414@cluster0.rcr2yeo.mongodb.net/food-del').then(()=>console.log("db connected"))
}
