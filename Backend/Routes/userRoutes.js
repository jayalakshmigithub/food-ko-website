import express from "express";


import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";

const userRoutes = express.Router();



userRoutes.post("/orders", createOrder);
userRoutes.get("/orders", getAllOrders);
userRoutes.get("/orders/:id", getOrderById);
userRoutes.put("/orders/:orderId", updateOrder);
userRoutes.delete("/orders/:orderId", deleteOrder);

export default userRoutes;
