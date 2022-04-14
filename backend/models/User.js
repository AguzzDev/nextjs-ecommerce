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
    address: { type: String, required: true },
    city: { type: String, required: true },
    postal_code: { type: Number, required: true },
    country: { type: String, required: true },
    province: { type: String, required: true },
    cart: { type: Array },
    favourite: { type: Array },
    changePassword: { type: String },
  },
  { timestamps: true }
)

export default mongoose.model("User", UserSchema)
