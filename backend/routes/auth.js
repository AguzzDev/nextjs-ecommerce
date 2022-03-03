import app from "express"
import { login, register } from "../controllers/auth.js"

const router = app.Router()

router.post("/register", register)
router.post("/login", login)


export default router
