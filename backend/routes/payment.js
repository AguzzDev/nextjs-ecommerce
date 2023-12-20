import express from "express";
import { createPayment, getPaymentOrder } from "../controllers/payment.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getPaymentOrder);
router.post("/", verifyToken, createPayment);

export default router;
