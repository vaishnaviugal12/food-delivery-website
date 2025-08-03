import express from 'express'
//for image storage system
import multer from 'multer';
import { addFood } from '../controllers/foodController.js';
import { listFood } from '../controllers/foodController.js';
import { removeFood } from '../controllers/foodController.js';
const foodRouter =express.Router();

//Image storage Engine
const storage =multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
      return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload =multer({storage:storage})


//Endpoints for adding,finding,removing items in database
foodRouter.post("/add",upload.single("image"),addFood)

foodRouter.get("/list", listFood)

foodRouter.post("/remove", removeFood)



export default foodRouter;