import {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} from "../middleware/verifyToken.js"
import app from "express"
import {
  createCart,
  deleteCart,
  getAllCart,
  getCart,
  deleteItem,
} from "../controllers/cart.js"

const router = app.Router()

router.post("/cart", verifyToken, createCart)
router.post("/cart/findItem/:id", verifyToken, deleteItem)
router.delete("/cart/:id", verifyToken, deleteCart)

router.get("/cart/:id", verifyToken, getCart)
router.get("/cart", verifyTokenAndAdmin, getAllCart)

export default router
