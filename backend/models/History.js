import mongoose from "mongoose";

const HistorySchema = new mongoose.Schema(
  {
    userId: { type: String, unique: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

export default mongoose.model("History", HistorySchema);
