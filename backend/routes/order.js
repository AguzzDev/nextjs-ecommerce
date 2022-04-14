import {
  verifyToken,
  verifyTokenAndAdmin,
} from "../middleware/verifyToken.js"
import app from "express"
import { createOrder, deleteOrder, getAllOrder, getUserOrder, updateOrder } from "../controllers/order.js";

const router = app.Router()

router.post("/", verifyToken, createOrder);
router.put("/:id", verifyTokenAndAdmin, updateOrder);
router.delete("/:id", verifyTokenAndAdmin, deleteOrder);

router.get("/", verifyTokenAndAdmin, getAllOrder);
router.get("/:id", verifyToken, getUserOrder);

export default router
