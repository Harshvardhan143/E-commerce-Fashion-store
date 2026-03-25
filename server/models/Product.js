import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: [
        "special-edition",
        "luxury-collection",
        "summer-edition",
        "unique-collection",
        "men",
        "women",
        "kids",
        "boys",
        "girls",
      ],
    },
    description: { type: String, trim: true },
    price: { type: Number, required: true, min: 0 },
    popularity: { type: Number, default: 5, min: 1, max: 20 },
    stock: { type: Number, required: true, default: 100, min: 0 },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
