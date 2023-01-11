import { Router } from "express";
import { createOrders, findOrder, findOrders } from "../controllers/orderController.js";
import { ordersValidation, orderValidation } from "../middlewares/ordersValidationMiddleware.js";

const router = Router();

router.post("/order", ordersValidation, createOrders);
router.get("/orders", findOrders);
router.get("/orders/:id", orderValidation, findOrder);

export default router;