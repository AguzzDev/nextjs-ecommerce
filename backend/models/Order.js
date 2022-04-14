import mongoose from "mongoose"

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    paymentId: { type: String },
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
        name: { type: String },
        email: { type: String },
        address: { type: String },
        city: { type: String },
        province: { type: String },
        postal_code: { type: Number },
        country: { type: String },
      },
    ],
    createdAt: { type: Date },
    status: { type: String, default: "Pendiente" },
    sending: { type: Boolean },
    total: { type: Number, required: true },
  },
  { timestamps: true }
)

export default mongoose.model("Order", OrderSchema)
