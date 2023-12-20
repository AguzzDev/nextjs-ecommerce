import { verifyToken, verifyTokenAndAdmin } from "../middleware/verifyToken.js";
import {
  deleteOrder,
  getAllOrder,
  getUserOrder,
  updateOrder,
} from "../controllers/order.js";
import app from "express";

const router = app.Router();

router.put("/:id", verifyTokenAndAdmin, updateOrder);
router.delete("/:id", verifyTokenAndAdmin, deleteOrder);

router.get("/all", verifyTokenAndAdmin, getAllOrder);
router.get("/", verifyToken, getUserOrder);

export default router;
