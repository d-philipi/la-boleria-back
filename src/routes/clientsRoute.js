import { Router } from "express";


const router = Router();

router.post("/clients");
router.get("/clients/:id/orders");

export default router;