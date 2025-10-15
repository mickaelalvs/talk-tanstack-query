#!/usr/bin/env tsx

import { closeDatabase, getDatabase } from "../src/lib/database";

type ClearOptions = {
  trips?: boolean;
  appointments?: boolean;
  products?: boolean;
  cart?: boolean;
  all?: boolean;
};

async function clearData(options: ClearOptions = {}) {
  console.log("🗑️  Clearing data from database...");

  try {
    const db = getDatabase();
    
    // If 'all' is specified, clear everything
    if (options.all) {
      options = { trips: true, appointments: true, products: true, cart: true };
    }

    // Clear trips and trip-cities
    if (options.trips) {
      console.log("\n📋 Clearing trips...");
      
      const tripCountBefore = db
        .prepare("SELECT COUNT(*) as count FROM trips")
        .get() as { count: number };
      
      const tripCityCountBefore = db
        .prepare("SELECT COUNT(*) as count FROM trip_cities")
        .get() as { count: number };

      console.log(`   Found ${tripCountBefore.count} trips and ${tripCityCountBefore.count} trip-city relationships`);

      if (tripCountBefore.count > 0) {
        // Delete trip-cities first (foreign key constraint)
        const deleteTripCities = db.prepare("DELETE FROM trip_cities");
        const tripCitiesResult = deleteTripCities.run();
        console.log(`   ✅ Deleted ${tripCitiesResult.changes} trip-city relationships`);

        // Delete trips
        const deleteTrips = db.prepare("DELETE FROM trips");
        const tripsResult = deleteTrips.run();
        console.log(`   ✅ Deleted ${tripsResult.changes} trips`);
      } else {
        console.log("   ℹ️  No trips found");
      }
    }

    // Clear appointments
    if (options.appointments) {
      console.log("\n📅 Clearing appointments...");
      
      const appointmentCountBefore = db
        .prepare("SELECT COUNT(*) as count FROM appointments")
        .get() as { count: number };

      console.log(`   Found ${appointmentCountBefore.count} appointments`);

      if (appointmentCountBefore.count > 0) {
        const deleteAppointments = db.prepare("DELETE FROM appointments");
        const appointmentsResult = deleteAppointments.run();
        console.log(`   ✅ Deleted ${appointmentsResult.changes} appointments`);
      } else {
        console.log("   ℹ️  No appointments found");
      }
    }

    // Clear cart data
    if (options.cart) {
      console.log("\n🛒 Clearing cart data...");
      
      const cartCountBefore = db
        .prepare("SELECT COUNT(*) as count FROM cart")
        .get() as { count: number };
      
      const cartItemCountBefore = db
        .prepare("SELECT COUNT(*) as count FROM cart_items")
        .get() as { count: number };

      console.log(`   Found ${cartCountBefore.count} carts and ${cartItemCountBefore.count} cart items`);

      if (cartItemCountBefore.count > 0) {
        // Delete cart items first (foreign key constraint)
        const deleteCartItems = db.prepare("DELETE FROM cart_items");
        const cartItemsResult = deleteCartItems.run();
        console.log(`   ✅ Deleted ${cartItemsResult.changes} cart items`);
      }

      if (cartCountBefore.count > 0) {
        const deleteCarts = db.prepare("DELETE FROM cart");
        const cartsResult = deleteCarts.run();
        console.log(`   ✅ Deleted ${cartsResult.changes} carts`);
      }

      if (cartCountBefore.count === 0 && cartItemCountBefore.count === 0) {
        console.log("   ℹ️  No cart data found");
      }
    }

    console.log("\n🎉 Data clearing completed successfully!");

  } catch (error) {
    console.error("❌ Error clearing data:", error);
    process.exit(1);
  } finally {
    closeDatabase();
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const options: ClearOptions = {};

if (args.length === 0 || args.includes('--all')) {
  options.all = true;
} else {
  if (args.includes('--trips')) options.trips = true;
  if (args.includes('--appointments')) options.appointments = true;
  if (args.includes('--cart')) options.cart = true;
}

// If no specific options provided, default to clearing trips
if (Object.keys(options).length === 0) {
  options.trips = true;
}

clearData(options);
