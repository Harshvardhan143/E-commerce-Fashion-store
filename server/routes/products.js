import express from "express";
import Product from "../models/Product.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

// @GET /api/products  (public - get all products)
router.get("/", async (req, res) => {
  try {
    const { category, _limit, _sort, _order } = req.query;
    let query = {};
    if (category) query.category = category;

    let productsQuery = Product.find(query);

    if (_sort) {
      const sortOrder = _order === "desc" ? -1 : 1;
      productsQuery = productsQuery.sort({ [_sort]: sortOrder });
    }

    if (_limit) productsQuery = productsQuery.limit(Number(_limit));

    const products = await productsQuery;
    // Return in json-server compatible format (id as string)
    res.json(products.map((p) => ({
      id: p._id.toString(),
      title: p.title,
      image: p.image,
      category: p.category,
      price: p.price,
      popularity: p.popularity,
      stock: p.stock,
    })));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @GET /api/products/:id  (public)
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({
      id: product._id.toString(),
      title: product.title,
      image: product.image,
      category: product.category,
      price: product.price,
      popularity: product.popularity,
      stock: product.stock,
    });
  } catch (err) {
    res.status(404).json({ message: "Product not found" });
  }
});

// @POST /api/products  (admin only)
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const { title, image, category, price, popularity, stock } = req.body;
    const product = await Product.create({ title, image, category, price, popularity, stock });
    res.status(201).json({
      id: product._id.toString(),
      title: product.title,
      image: product.image,
      category: product.category,
      price: product.price,
      popularity: product.popularity,
      stock: product.stock,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @PUT /api/products/:id  (admin only)
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({
      id: product._id.toString(),
      title: product.title,
      image: product.image,
      category: product.category,
      price: product.price,
      popularity: product.popularity,
      stock: product.stock,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @DELETE /api/products/:id  (admin only)
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
