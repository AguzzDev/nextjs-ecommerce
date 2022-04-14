import {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} from "../middleware/verifyToken.js"
import app from "express"
import {
  deleteUser,
  getAllUser,
  getUser,
  updateUser,
} from "../controllers/user.js"

const router = app.Router()

router.put("/:id", verifyTokenAndAuthorization, updateUser)
router.delete("/:id", verifyTokenAndAuthorization, deleteUser)

router.get("/:id", verifyTokenAndAdmin, getUser)
router.get("/", verifyTokenAndAdmin, getAllUser)

export default router
