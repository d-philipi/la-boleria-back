import { Router } from "express";
import { createOrders } from "../controllers/orderController.js";
import { ordersValidation } from "../middlewares/ordersValidationMiddleware.js";

const router = Router();

router.post("/order", ordersValidation, createOrders);
router.get("/orders");
router.get("/orders/:id");

export default router;