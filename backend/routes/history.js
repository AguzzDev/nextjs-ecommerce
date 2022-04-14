import express from "express"
import { verifyToken } from "../middleware/verifyToken.js"
import { getHistoryUser, setHistory } from "../controllers/history.js"
const router = express.Router()

router.get("/:id", verifyToken, getHistoryUser)
router.post("/", verifyToken, setHistory)

export default router
