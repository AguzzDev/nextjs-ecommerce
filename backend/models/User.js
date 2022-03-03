import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    cart: { type: Array },
    favourite: { type: Array },
  },
  { timestamps: true }
)

export default mongoose.model("User", UserSchema)
