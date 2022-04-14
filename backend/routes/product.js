import { verifyTokenAndAdmin } from "../middleware/verifyToken.js"
import app from "express"
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProduct,
  updateProduct,
  getProductsFilterCategory
} from "../controllers/product.js"

const router = app.Router()

router.post("/", verifyTokenAndAdmin, createProduct)
router.put("/:id",  verifyTokenAndAdmin, updateProduct)
router.delete("/:id", verifyTokenAndAdmin, deleteProduct)

router.post("/:category",getProductsFilterCategory)
router.get("/:id", getProduct)
router.get("/", getAllProduct)

export default router
