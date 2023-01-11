import { Router } from "express";
import { creatCakes } from "../controllers/cakesController.js";
import { cakesValidation } from "../middlewares/cakesValidationMiddleware.js";

const router = Router();

router.post("/cakes", cakesValidation, creatCakes);

export default router;