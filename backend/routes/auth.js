import app from "express"
import {
  login,
  register,
  forgetPassword,
  changePassword,
} from "../controllers/auth.js"
import { verifyToken } from "../middleware/verifyToken.js"

const router = app.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/forget-password", verifyToken, forgetPassword)
router.post("/change-password", verifyToken, changePassword)

export default router
