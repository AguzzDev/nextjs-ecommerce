import mongoose from "mongoose";
import slug from "mongoose-slug-generator";

mongoose.plugin(slug);

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, unique: true },
    slug: { type: String, slug: "title" },
    desc: { type: String },
    img: { type: Array, default: "" },
    categories: { type: Array },
    size: { type: Array },
    color: { type: Array },
    price: { type: Number },
    quantity: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
