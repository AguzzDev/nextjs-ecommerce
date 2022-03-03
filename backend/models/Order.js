import mongoose from "mongoose"

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        img: { type: String },
        color: { type: String },
        title: { type: String },
        size: { type: String },
      },
    ],
    userInfo: [
      {
        address: { type: String, required: true },
        city: { type: String },
        state: { type: String },
        postal_code: { type: Number },
        country: { type: String },
        cardType: { type: String },
        lastNumbers: { type: String },
      },
    ],
    createdAt: { type: String },
    total: { type: Number, required: true },
    status: { type: String, default: "Pendiente" },
  },
  { timestamps: true }
)

export default mongoose.model("Order", OrderSchema)
