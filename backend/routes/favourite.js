import { verifyToken } from "../middleware/verifyToken.js"
import app from "express"
import {
  addFavourite,
  deleteFavourite,
  deleteItem,
  getFavourite,
} from "../controllers/favourite.js"

const router = app.Router()

router.post("/favourite", verifyToken, addFavourite)
router.post("/favourite/findItem/:id", verifyToken, deleteItem)
router.delete("/favourite/:id", verifyToken, deleteFavourite)

router.get("/favourite/:id", verifyToken, getFavourite)

export default router
