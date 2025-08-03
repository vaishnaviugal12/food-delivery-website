import express from 'express';
import authMiddleware from '../middleware/Auth.js';
import { placeOrder, verifyOrder,userOrders,listOrders, updateStatus } from '../controllers/orderController.js';
const OrderRouter =express.Router();

OrderRouter.post("/place", authMiddleware,placeOrder);
OrderRouter.post("/verify",verifyOrder);
OrderRouter.post("/userorders", authMiddleware, userOrders)
OrderRouter.get("/listorders", listOrders);
OrderRouter.post("/status", updateStatus)


export default OrderRouter