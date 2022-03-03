import {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} from "../middleware/verifyToken.js"
import app from "express"
import { createOrder, deleteOrder, getAllOrder, getIncome, getUserOrder, updateOrder } from "../controllers/order.js";

const router = app.Router()

router.post("/", verifyToken, createOrder);
router.put("/:id", verifyTokenAndAdmin, updateOrder);
router.delete("/:id", verifyTokenAndAdmin, deleteOrder);

router.get("/", verifyTokenAndAdmin, getAllOrder);
router.get("/:userId", verifyToken, getUserOrder);
router.get("/income", verifyTokenAndAdmin, getIncome);

export default router
