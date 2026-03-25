/**
 * Mewar Nath Fashion Store - Database Seeder
 * Run: node server/seeder.js
 * 
 * Seeds MongoDB with initial products, admin user, and test user.
 */
import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { readFileSync } from "fs";

// Models
import User from "./models/User.js";
import Product from "./models/Product.js";
import Order from "./models/Order.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Explicitly load .env from root
dotenv.config({ path: join(__dirname, "../.env") });

// Load existing db.json data
const dbJson = JSON.parse(readFileSync(join(__dirname, "../src/data/db.json"), "utf8"));

const seedDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in .env file");
    }
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    console.log("🗑️  Cleared existing data");

    // ──────────────── SEED USERS ────────────────
    const userData = [
      {
        name: "Admin",
        lastname: "User",
        email: "admin@fashion.com",
        password: "admin123",
        role: "admin",
      },
      {
        name: "Test",
        lastname: "User",
        email: "test@fashion.com",
        password: "test123",
        role: "customer",
      },
      {
        name: "Aleksandar",
        lastname: "Kuzmanovic",
        email: "aleksandarkuzmanovic021@gmail.com",
        password: "1233214321",
        role: "customer",
      },
    ];

    for (const user of userData) {
      await User.create(user);
    }
    console.log(`👤 Seeded ${userData.length} users`);

    // ──────────────── SEED PRODUCTS ────────────────
    const catalogPool = [
      "product image 1.jpg", "product image 2.jpg", "product image 3.jpg",
      "product image 4.jpg", "product image 5.jpg", "product image 6.jpg",
      "product image 7.jpg", "product image 8.jpg", "product image 9.jpg",
      "product image 10.jpg", "product image 11.jpg", "product image 12.jpg",
      "product image 13.jpg", "product image 14.jpg", "product image 15.jpg",
      "product image 16.jpg", "product image 17.jpg", "product image 18.jpg",
      "men-catalog.png", "women-catalog.png", "boys-catalog.png", "girls-catalog.png",
      "men-suit-1.png", "men-casual-1.png", "boys-shirt-1.png", "girls-dress-1.png",
      "luxury fashion 7 1.png", "luxury fashion 7 2.png"
    ];

    const getRandomImage = () => catalogPool[Math.floor(Math.random() * catalogPool.length)];

    const productData = [
      ...dbJson.products.map((p) => ({
        title: p.title,
        image: p.image, // Use exact image
        category: p.category,
        price: p.price,
        popularity: p.popularity !== undefined ? p.popularity : Math.floor(Math.random() * 20) + 1,
        stock: p.stock !== undefined ? p.stock : Math.floor(Math.random() * 100) + 1,
        description: `Premium quality ${p.title} from our exclusive collection.`
      })),
      // MENS
      {
        title: "Men's Luxury Navy Suit",
        image: "mens_navy_suit.png",
        category: "men",
        price: 15000,
        popularity: 15,
        stock: 50,
        description: "A masterfully tailored navy blue suit for the modern gentleman."
      },
      {
        title: "Classic White Linen Shirt",
        image: "mens_white_shirt.png",
        category: "men",
        price: 3500,
        popularity: 12,
        stock: 80,
        description: "Breathable and stylish linen shirt, perfect for casual elegance."
      },
      {
        title: "Premium Slim Fit Pants",
        image: "mens_grey_pants.png",
        category: "men",
        price: 4500,
        popularity: 18,
        stock: 20,
        description: "High-quality slim fit trousers for a sharp professional look."
      },
      // BOYS
      {
        title: "Boys Designer Polo",
        image: "boys_tshirt.png",
        category: "boys",
        price: 1800,
        popularity: 8,
        stock: 60,
        description: "Comfortable and vibrant polo shirt for active boys."
      },
      {
        title: "Kids Denim Jacket",
        image: "boys-catalog.png",
        category: "kids",
        price: 2500,
        popularity: 7,
        stock: 45,
        description: "Cool and durable denim jacket for everyday wear."
      },
      // GIRLS
      {
        title: "Girls Pink Lace Dress",
        image: "girls-dress-1.png",
        category: "girls",
        price: 2800,
        popularity: 10,
        stock: 40,
        description: "A beautiful floral lace dress for special occasions."
      },
      {
        title: "Golden Party Gown",
        image: "girls-catalog.png",
        category: "girls",
        price: 4200,
        popularity: 11,
        stock: 25,
        description: "Make her feel like a princess in this elegant golden gown."
      }
    ];

    const products = await Product.insertMany(productData);
    console.log(`👗 Seeded ${products.length} products`);

    console.log("\n✅ Database seeded successfully!");
    console.log("─────────────────────────────────────────");
    console.log("Admin Login:   admin@fashion.com  / admin123");
    console.log("Test Login:    test@fashion.com   / test123");
    console.log("─────────────────────────────────────────");

    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  }
};

seedDB();
