import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    location: {
      address: { type: String },
      address_number: { type: String },
      postal_code: { type: String },
    },
    status: { type: String, default: "Pendiente" },
    sending: { type: Boolean, default: false },
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
