import {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} from "../middleware/verifyToken.js";
import app from "express";
import {
  createCart,
  deleteCart,
  getAllCart,
  getCart,
  deleteItemCart,
} from "../controllers/cart.js";

const router = app.Router();

router.get("/all", verifyTokenAndAdmin, getAllCart);
router.get("/", verifyToken, getCart);
router.post("/", verifyToken, createCart);
router.put("/", verifyToken, deleteItemCart);
router.delete("/", verifyToken, deleteCart);

export default router;
