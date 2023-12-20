import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.js";
import authRoute from "./routes/auth.js";
import productRoute from "./routes/product.js";
import cartRoute from "./routes/cart.js";
import orderRoute from "./routes/order.js";
import favouriteRoute from "./routes/favourite.js";
import paymentRoute from "./routes/payment.js";
import historyRoute from "./routes/history.js";
import notificationRoute from "./routes/notifications.js";
import cors from "cors";
import path from "path";
import { createServer } from "http";
import bodyParser from "body-parser";

const app = express();
const server = createServer(app);

const __dirname = path.resolve();
const loadPath = path.join(__dirname, "./.env");
dotenv.config({ silent: false, path: loadPath });

app.get("/", (req, res) => {
  res.send("Ok");
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/favourite", favouriteRoute);
app.use("/api/orders", orderRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/history", historyRoute);
app.use("/api/notifications", notificationRoute);

server.listen(process.env.PORT, () => {
  console.log(`Backend server is running! ${process.env.PORT}`);
});
