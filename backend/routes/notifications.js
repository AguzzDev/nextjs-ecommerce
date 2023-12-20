import express from "express"
import { listenNotifications } from "../controllers/payment.js";

const router = express.Router();

router.post("/", listenNotifications);

export default router;
