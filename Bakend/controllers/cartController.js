import userModel from "../models/userModel.js";
import mongoose from "mongoose";
//add the item to user cart
//In the foolowing code we are extracting the user in _id
//As itemId refers to the item _id thet get stored in db when we add any item in food collection
 

const addToCart = async (req,res)=>{
try{
     //we will get userId using the middleware
    let userData = await userModel.findById(req.userId);
    let cartData = await userData.cartData;

if (!req.body.itemId) {
  return res.json({ success: false, message: "Item ID is missing" });
}

    if(!cartData[req.body.itemId]){
        cartData[req.body.itemId] =1 ;
     
    }
    else{
        cartData[req.body.itemId] +=1;
    }

    //console.log("Updated cartData:", cartData);
   
    await userModel.findByIdAndUpdate(req.userId,{cartData});
    res.json({success:true, message:"Added to cart"})
}

catch(error){
 console.log(error);
 res.json({success:false,message:error.meesage});
}
}


//remove the items from user cart
const removeFromCart = async(req,res)=>{
 try{
     //we will get userId using the middleware
    let userData = await userModel.findById(req.userId);
    let cartData = await userData.cartData;

if (!req.body.itemId) {
  return res.json({ success: false, message: "Item ID is missing" });}

    if(cartData[req.body.itemId]){
        if(cartData[req.body.itemId]>0){
        cartData[req.body.itemId]-=1;
        }
    }
   // console.log("Updated Cart Data:", cartData);
    
   await userModel.findByIdAndUpdate(req.userId,{cartData});
    res.json({success:true,message:"Removed from the cart"})

 }
 catch(error){
  console.log(error);
  res.json({success:false, meesage:"error"})
 }
}

//fetch user cart data

const getcart = async (req,res)=>{
    try{
        //we will get userId using the middleware
        let userData = await userModel.findById(req.userId);
        let cartData = await userData.cartData;
        res.json({success:true, cartData})
    }
    catch(error){
        console.log(error);
        res.json({success:false, message:"error"})
    }
}


export{addToCart,removeFromCart,getcart};