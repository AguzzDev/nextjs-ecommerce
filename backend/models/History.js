import mongoose from "mongoose"

const HistorySchema = new mongoose.Schema(
  {
    userId: { type: String, unique: true },
    item: [{ historyId: { type: String } }],
  },
  { timestamps: true }
)

export default mongoose.model("History", HistorySchema)
