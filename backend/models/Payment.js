import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },
    orderId: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", PaymentSchema);
