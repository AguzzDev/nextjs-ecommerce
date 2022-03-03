import mongoose from "mongoose"
import slug from "mongoose-slug-generator"

mongoose.plugin(slug)

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    slug: { type: String, slug: "title" },
    desc: { type: String, required: true, },
    img: { type: String, required: true },
    categories: { type: Array },
    size: { type: Array },
    color:{ type: Array },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
