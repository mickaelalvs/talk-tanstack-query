#!/usr/bin/env tsx

import { closeDatabase, getDatabase } from "../src/lib/database";

async function initDatabase() {
  console.log("Initializing database...");

  try {
    const db = getDatabase();
    console.log("✅ Database initialized successfully");
    console.log("📊 Database file created at: data/trip-planner.db");

    // Check if data was inserted
    const cityCount = db
      .prepare("SELECT COUNT(*) as count FROM cities")
      .get() as { count: number };
    const tripCount = db
      .prepare("SELECT COUNT(*) as count FROM trips")
      .get() as { count: number };

    console.log(`📈 Cities in database: ${cityCount.count}`);
    console.log(`📈 Trips in database: ${tripCount.count}`);
  } catch (error) {
    console.error("❌ Error initializing database:", error);
    process.exit(1);
  } finally {
    closeDatabase();
  }
}

initDatabase();
