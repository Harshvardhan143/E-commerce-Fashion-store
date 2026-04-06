/**
 * Fix broken product images in MongoDB
 * Run: node fix_images.js
 */
import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, ".env") });

const productSchema = new mongoose.Schema({
  title: String,
  image: String,
  category: String,
  price: Number,
  popularity: Number,
  stock: Number,
  description: String,
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

const fixImages = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // List all products with their current images so we can see the broken ones
    const products = await Product.find({}, "title image");
    console.log("\nAll products:");
    products.forEach(p => console.log(`  [${p._id}] "${p.title}" => ${p.image}`));

    // Fix: replace all known broken/missing image filenames
    const fixes = [
      { from: "girls-catalog.png",  to: "golden_party_dress.png" },
      { from: "women-catalog.png",  to: "silk_occasion_dress.png" },
      { from: "boys-catalog.png",   to: "boys_tshirt.png" },
      { from: "men-catalog.png",    to: "mens_navy_suit.png" },
      { from: "men-suit-1.png",     to: "mens_navy_suit.png" },
    ];

    let totalFixed = 0;
    for (const fix of fixes) {
      const result = await Product.updateMany(
        { image: fix.from },
        { $set: { image: fix.to } }
      );
      if (result.modifiedCount > 0) {
        console.log(`\n✅ Fixed: ${fix.from} → ${fix.to} (${result.modifiedCount} product(s))`);
        totalFixed += result.modifiedCount;
      }
    }

    if (totalFixed === 0) {
      console.log("\nNo broken images found with those filenames.");
    } else {
      console.log(`\n🎉 Total fixed: ${totalFixed} product(s)`);
    }

    // Also fix the "Premium Couture Dress" specifically to use premium_couture_dress.png
    const couture = await Product.findOneAndUpdate(
      { title: "Premium Couture Dress" },
      { $set: { image: "premium_couture_dress.png" } },
      { new: true }
    );
    if (couture) console.log(`✅ Fixed Premium Couture Dress image`);

    console.log("\n✅ Done!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
};

fixImages();
