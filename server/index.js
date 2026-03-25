import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/users.js";
import productRoutes from "./routes/products.js";
import orderRoutes from "./routes/orders.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly load .env from root
dotenv.config({ path: path.join(__dirname, "../.env") });

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// Auth routes (login, register)
app.use("/api/auth", userRoutes);
// User management routes (alias for json-server compatibility)
app.use("/api/users", userRoutes);
// Product routes
app.use("/api/products", productRoutes);
// Order routes
app.use("/api/orders", orderRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "✅ Mewar Nath Fashion Store API is running", status: "ok" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// Error handler
app.use((err, req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📦 MongoDB: ${process.env.MONGO_URI}`);
});
