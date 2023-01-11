import { Router } from "express";
import { createClients } from "../controllers/clientsController.js";
import { clientsValidation } from "../middlewares/clientsValidationMiddleware.js";


const router = Router();

router.post("/clients", clientsValidation, createClients);
router.get("/clients/:id/orders");

export default router;