import { Router } from "express";

const router = Router();

router.post("/order");
router.get("/orders");
router.get("/orders/:id");

export default router;