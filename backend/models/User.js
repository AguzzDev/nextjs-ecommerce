import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    location: {
      address: { type: String, required: true },
      address_number: { type: Number, required: true },
      country: { type: String, required: true },
      province: { type: String, required: true },
      city: { type: String, required: true },
      postal_code: { type: String, required: true },
    },
    cart: {
      _id: { type: String },
      products: [
        {
          id: { type: String },
          quantity: { type: Number },
          price: { type: Number },
          size: { type: Array },
          color: { type: Array },
        },
      ],
      total: { type: Number, default: 0 },
    },
    favourite: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    changePassword: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
