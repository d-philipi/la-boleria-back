import { Router } from "express";
import { createClients, findClient } from "../controllers/clientsController.js";
import { clientsValidation, clientValidation } from "../middlewares/clientsValidationMiddleware.js";


const router = Router();

router.post("/clients", clientsValidation, createClients);
router.get("/clients/:id/orders", clientValidation, findClient);

export default router;