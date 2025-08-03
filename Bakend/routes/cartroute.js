import express from "express";
import { addToCart } from "../controllers/cartController.js";
import { removeFromCart } from "../controllers/cartController.js";
import { getcart } from "../controllers/cartController.js";
import authMiddleware from "../middleware/Auth.js";


const cartRouter = express.Router();

cartRouter.post("/add",authMiddleware, addToCart);
cartRouter.post("/remove",authMiddleware, removeFromCart);
cartRouter.post("/get",authMiddleware,  getcart);

export default cartRouter;