#!/usr/bin/env tsx

import { closeDatabase, createProduct, getDatabase } from "../src/lib/database";
import { products } from "./mock-bordeaux-data";

async function populateProducts() {
  console.log("🚀 Starting to populate products database...");

  try {
    // Initialize database connection
    const db = getDatabase();
    console.log("✅ Database connection established");

    // Check if products already exist
    const existingProducts = db
      .prepare("SELECT COUNT(*) as count FROM products")
      .get() as { count: number };

    if (existingProducts.count > 0) {
      console.log(
        `⚠️  Products table already contains ${existingProducts.count} products`,
      );
      console.log("🔄 Clearing existing products...");
      db.prepare("DELETE FROM products").run();
      console.log("✅ Existing products cleared");
    }

    // Insert all products from mock data
    console.log(`📦 Inserting ${products.length} products...`);

    for (const product of products) {
      try {
        const createdProduct = createProduct({
          name: product.name,
          description: product.description,
          price: product.price,
          originalPrice: product.originalPrice,
          category: product.category,
          image: product.image,
          rating: product.rating,
          reviews: product.reviews,
          inStock: product.inStock,
          isPromotion: product.isPromotion,
          tags: product.tags,
        });
        console.log(
          `✅ Created product: ${createdProduct.name} (ID: ${createdProduct.id})`,
        );
      } catch (error) {
        console.error(`❌ Failed to create product ${product.name}:`, error);
      }
    }

    // Verify insertion
    const finalCount = db
      .prepare("SELECT COUNT(*) as count FROM products")
      .get() as { count: number };
    console.log(
      `🎉 Successfully populated database with ${finalCount.count} products!`,
    );
  } catch (error) {
    console.error("❌ Error populating products:", error);
    process.exit(1);
  } finally {
    closeDatabase();
    console.log("🔌 Database connection closed");
  }
}

// Run the script
populateProducts()
  .then(() => {
    console.log("✨ Script completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Script failed:", error);
    process.exit(1);
  });
