import { verifyToken } from "../middleware/verifyToken.js"
import app from "express"
import {
  addFavourite,
  deleteFavourite,
  deleteItem,
  getFavourite,
} from "../controllers/favourite.js"

const router = app.Router()

router.post("/", verifyToken, addFavourite)
router.post("/findItem/:id", verifyToken, deleteItem)
router.delete("/:id", verifyToken, deleteFavourite)

router.get("/:id", verifyToken, getFavourite)

export default router
