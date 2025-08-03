import foodModel from "../models/foodModel.js";
//importing file system which is prebuilt in node js
import fs from 'fs';

//add items, function

const addFood = async (req,resp)=>{
  
    let image_filename= `${req.file.filename}`;
    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })
    try{
        await food.save();
        resp.json({success:true,message:"food Added"})
    }
    catch(error){
        console.log("error");
        resp.json({success:false,message:"error"})
    }


}

//listing or finding out the fooditem in our datat base
const listFood = async(req,res)=>{
     try{
        const foods = await foodModel.find({});
        res.json({success:true, data:foods})
     } catch(error){
       console.log(error);
       res.json({success:false,message:'error'})
     }

}

//removing the fooditems from our database
const removeFood = async (req, res)=>{
    try{
    const food =await foodModel.findById(req.body.id);
    
    
    //if db contain nothing it will send this
    if (!food) {
      return res.status(404).json({ success: false, message: "Food item not found" });
    }


    //deleting the image of the item first using the following
    fs.unlink(`uploads/${food.image}`,(err)=>{
        if (err) {
        console.error("Failed to delete image:",err);
      } else {
        console.log("Image deleted successfully");
      }
    })

     // Then deleting the data of the item
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({success:true, message:"food Removed"})
    }catch(error){
       console.log(error);
       res.json({success:false, message:'error'})
    }
}
export {addFood,listFood,removeFood}