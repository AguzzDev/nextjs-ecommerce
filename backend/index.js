import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoute from "./routes/user.js"
import authRoute from "./routes/auth.js"
import productRoute from "./routes/product.js"
import cartRoute from "./routes/cart.js"
import orderRoute from "./routes/order.js"
import favouriteRoute from "./routes/favourite.js"
import cors from "cors"
import { errorHandler } from "./middleware/errorHandler.js"
import path from "path"

const app = express()
const __dirname = path.resolve()
const loadPath = path.join(__dirname, "./.env")

dotenv.config({ silent: false, path: loadPath })

app.get("/", (req, res) => {
  res.send("hi")
})

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err)
  })
app.use(
  cors({
    credentials: true,
    origin: ["https://nextjs-ecommerce-aguzzdev.vercel.app","http://localhost:3000"]
  })
)
app.use(express.json())
app.use(errorHandler)
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/products", productRoute)
app.use("/api/users", cartRoute)
app.use("/api/users", favouriteRoute)
app.use("/api/orders", orderRoute)

app.listen(process.env.PORT || 5000, () => {
  console.log(`Backend server is running! ${process.env.PORT}`)
})
