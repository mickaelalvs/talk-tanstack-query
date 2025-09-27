import Database from "better-sqlite3";
import path from "path";
import type { Product } from "@/app/nantes-shop/_components/types";
import type { City, Trip } from "./mock-data";

// Database file path
const dbPath = path.join(process.cwd(), "data", "trip-planner.db");

// Create database instance
let db: Database.Database | null = null;

export function getDatabase(): Database.Database {
  if (!db) {
    // Ensure the data directory exists
    const fs = require("fs");
    const dataDir = path.dirname(dbPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    db = new Database(dbPath);
    db.pragma("journal_mode = WAL");
    initializeTables();
  }
  return db;
}

function initializeTables() {
  if (!db) return;

  // Create cities table
  db.exec(`
    CREATE TABLE IF NOT EXISTS cities (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      country TEXT NOT NULL,
      description TEXT NOT NULL,
      image TEXT NOT NULL,
      weather_temperature INTEGER NOT NULL,
      weather_condition TEXT NOT NULL,
      weather_icon TEXT NOT NULL,
      attractions TEXT NOT NULL, -- JSON array as string
      best_time_to_visit TEXT NOT NULL
    )
  `);

  // Create trips table
  db.exec(`
    CREATE TABLE IF NOT EXISTS trips (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      created_at TEXT NOT NULL
    )
  `);

  // Create trip_cities junction table
  db.exec(`
    CREATE TABLE IF NOT EXISTS trip_cities (
      trip_id TEXT NOT NULL,
      city_id TEXT NOT NULL,
      order_index INTEGER NOT NULL,
      PRIMARY KEY (trip_id, city_id),
      FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE,
      FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE CASCADE
    )
  `);

  // Create products table
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      price REAL NOT NULL,
      original_price REAL,
      category TEXT NOT NULL,
      image TEXT NOT NULL,
      rating REAL NOT NULL,
      reviews INTEGER NOT NULL,
      in_stock BOOLEAN NOT NULL,
      is_promotion BOOLEAN NOT NULL,
      tags TEXT NOT NULL, -- JSON array as string
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create cart table
  db.exec(`
    CREATE TABLE IF NOT EXISTS cart (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create cart_items table
  db.exec(`
    CREATE TABLE IF NOT EXISTS cart_items (
      id INTEGER PRIMARY KEY,
      cart_id TEXT NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (cart_id) REFERENCES cart(id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
      UNIQUE(cart_id, product_id)
    )
  `);

  // Insert initial data if tables are empty
  const cityCount = db
    .prepare("SELECT COUNT(*) as count FROM cities")
    .get() as { count: number };
  if (cityCount.count === 0) {
    insertInitialData();
  }
}

function insertInitialData() {
  if (!db) return;

  const { mockCities, mockTrips } = require("./mock-data");

  // Insert cities
  const insertCity = db.prepare(`
    INSERT INTO cities (
      id, name, country, description, image,
      weather_temperature, weather_condition, weather_icon,
      attractions, best_time_to_visit
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const city of mockCities) {
    insertCity.run(
      city.id,
      city.name,
      city.country,
      city.description,
      city.image,
      city.weather.temperature,
      city.weather.condition,
      city.weather.icon,
      JSON.stringify(city.attractions),
      city.bestTimeToVisit,
    );
  }

  // Insert trips
  const insertTrip = db.prepare(`
    INSERT INTO trips (id, name, created_at) VALUES (?, ?, ?)
  `);

  const insertTripCity = db.prepare(`
    INSERT INTO trip_cities (trip_id, city_id, order_index) VALUES (?, ?, ?)
  `);

  for (const trip of mockTrips) {
    insertTrip.run(trip.id, trip.name, trip.createdAt.toISOString());

    // Insert trip cities
    trip.cities.forEach((city: any, index: number) => {
      insertTripCity.run(trip.id, city.id, index);
    });
  }
}

// Helper functions for data conversion
export function cityFromRow(row: any): City {
  return {
    id: row.id,
    name: row.name,
    country: row.country,
    description: row.description,
    image: row.image,
    weather: {
      temperature: row.weather_temperature,
      condition: row.weather_condition,
      icon: row.weather_icon,
    },
    attractions: JSON.parse(row.attractions),
    bestTimeToVisit: row.best_time_to_visit,
  };
}

export function tripFromRow(row: any, cities: City[]): Trip {
  return {
    id: row.id,
    name: row.name,
    cities,
    createdAt: new Date(row.created_at),
  };
}

// Product-related functions
export function getAllProducts(): Product[] {
  const db = getDatabase();
  const rows = db.prepare("SELECT * FROM products ORDER BY id").all() as any[];
  return rows.map(productFromRow);
}

export function getProductById(id: number): Product | null {
  const db = getDatabase();
  const row = db.prepare("SELECT * FROM products WHERE id = ?").get(id) as any;
  return row ? productFromRow(row) : null;
}

export function createProduct(product: Omit<Product, "id">): Product {
  const db = getDatabase();
  const insertProduct = db.prepare(`
    INSERT INTO products (
      name, description, price, original_price, category, image,
      rating, reviews, in_stock, is_promotion, tags
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const result = insertProduct.run(
    product.name,
    product.description,
    product.price,
    product.originalPrice || null,
    product.category,
    product.image,
    product.rating,
    product.reviews,
    product.inStock ? 1 : 0,
    product.isPromotion ? 1 : 0,
    JSON.stringify(product.tags),
  );

  return {
    id: result.lastInsertRowid as number,
    ...product,
  };
}

export function updateProduct(
  id: number,
  updates: Partial<Omit<Product, "id">>,
): Product | null {
  const db = getDatabase();

  // Build dynamic update query
  const updateFields = [];
  const values = [];

  if (updates.name !== undefined) {
    updateFields.push("name = ?");
    values.push(updates.name);
  }
  if (updates.description !== undefined) {
    updateFields.push("description = ?");
    values.push(updates.description);
  }
  if (updates.price !== undefined) {
    updateFields.push("price = ?");
    values.push(updates.price);
  }
  if (updates.originalPrice !== undefined) {
    updateFields.push("original_price = ?");
    values.push(updates.originalPrice);
  }
  if (updates.category !== undefined) {
    updateFields.push("category = ?");
    values.push(updates.category);
  }
  if (updates.image !== undefined) {
    updateFields.push("image = ?");
    values.push(updates.image);
  }
  if (updates.rating !== undefined) {
    updateFields.push("rating = ?");
    values.push(updates.rating);
  }
  if (updates.reviews !== undefined) {
    updateFields.push("reviews = ?");
    values.push(updates.reviews);
  }
  if (updates.inStock !== undefined) {
    updateFields.push("in_stock = ?");
    values.push(updates.inStock ? 1 : 0);
  }
  if (updates.isPromotion !== undefined) {
    updateFields.push("is_promotion = ?");
    values.push(updates.isPromotion ? 1 : 0);
  }
  if (updates.tags !== undefined) {
    updateFields.push("tags = ?");
    values.push(JSON.stringify(updates.tags));
  }

  if (updateFields.length === 0) {
    return getProductById(id);
  }

  updateFields.push("updated_at = CURRENT_TIMESTAMP");
  values.push(id);

  const updateQuery = `UPDATE products SET ${updateFields.join(", ")} WHERE id = ?`;
  const updateStmt = db.prepare(updateQuery);
  const result = updateStmt.run(...values);

  if (result.changes === 0) {
    return null;
  }

  return getProductById(id);
}

export function deleteProduct(id: number): boolean {
  const db = getDatabase();
  const deleteStmt = db.prepare("DELETE FROM products WHERE id = ?");
  const result = deleteStmt.run(id);
  return result.changes > 0;
}

export function productFromRow(row: any): Product {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    price: row.price,
    originalPrice: row.original_price || undefined,
    category: row.category,
    image: row.image,
    rating: row.rating,
    reviews: row.reviews,
    inStock: Boolean(row.in_stock),
    isPromotion: Boolean(row.is_promotion),
    tags: JSON.parse(row.tags),
  };
}

// Cart-related types
export interface CartItem {
  id: number;
  cartId: string;
  productId: number;
  quantity: number;
  product?: Product;
  createdAt: string;
  updatedAt: string;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

// Cart functions
export function getOrCreateCart(userId: string): Cart {
  const db = getDatabase();
  
  // Try to get existing cart
  let cartRow = db.prepare("SELECT * FROM cart WHERE user_id = ?").get(userId) as any;
  
  if (!cartRow) {
    // Create new cart
    const cartId = `cart_${userId}_${Date.now()}`;
    const insertCart = db.prepare("INSERT INTO cart (id, user_id) VALUES (?, ?)");
    insertCart.run(cartId, userId);
    
    cartRow = db.prepare("SELECT * FROM cart WHERE id = ?").get(cartId) as any;
  }
  
  // Get cart items with product details
  const items = db.prepare(`
    SELECT ci.*, p.name, p.price, p.original_price, p.category, p.image, 
           p.rating, p.reviews, p.in_stock, p.is_promotion, p.tags
    FROM cart_items ci
    JOIN products p ON ci.product_id = p.id
    WHERE ci.cart_id = ?
    ORDER BY ci.created_at
  `).all(cartRow.id) as any[];
  
  return {
    id: cartRow.id,
    userId: cartRow.user_id,
    items: items.map(itemFromRow),
    createdAt: cartRow.created_at,
    updatedAt: cartRow.updated_at,
  };
}

export function addToCart(cartId: string, productId: number, quantity: number = 1): CartItem | null {
  const db = getDatabase();
  
  // Check if item already exists
  const existingItem = db.prepare("SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?").get(cartId, productId) as any;
  
  if (existingItem) {
    // Update quantity
    const updateItem = db.prepare("UPDATE cart_items SET quantity = quantity + ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?");
    updateItem.run(quantity, existingItem.id);
    
    // Get updated item with product details
    const updatedItem = db.prepare(`
      SELECT ci.*, p.name, p.price, p.original_price, p.category, p.image, 
             p.rating, p.reviews, p.in_stock, p.is_promotion, p.tags
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.id = ?
    `).get(existingItem.id) as any;
    
    return itemFromRow(updatedItem);
  } else {
    // Insert new item
    const insertItem = db.prepare("INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)");
    const result = insertItem.run(cartId, productId, quantity);
    
    // Get new item with product details
    const newItem = db.prepare(`
      SELECT ci.*, p.name, p.price, p.original_price, p.category, p.image, 
             p.rating, p.reviews, p.in_stock, p.is_promotion, p.tags
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.id = ?
    `).get(result.lastInsertRowid) as any;
    
    return itemFromRow(newItem);
  }
}

export function updateCartItemQuantity(cartId: string, productId: number, quantity: number): CartItem | null {
  const db = getDatabase();
  
  if (quantity <= 0) {
    // Remove item if quantity is 0 or negative
    return removeFromCart(cartId, productId);
  }
  
  const updateItem = db.prepare("UPDATE cart_items SET quantity = ?, updated_at = CURRENT_TIMESTAMP WHERE cart_id = ? AND product_id = ?");
  const result = updateItem.run(quantity, cartId, productId);
  
  if (result.changes === 0) {
    return null;
  }
  
  // Get updated item with product details
  const updatedItem = db.prepare(`
    SELECT ci.*, p.name, p.price, p.original_price, p.category, p.image, 
           p.rating, p.reviews, p.in_stock, p.is_promotion, p.tags
    FROM cart_items ci
    JOIN products p ON ci.product_id = p.id
    WHERE ci.cart_id = ? AND ci.product_id = ?
  `).get(cartId, productId) as any;
  
  return itemFromRow(updatedItem);
}

export function removeFromCart(cartId: string, productId: number): null {
  const db = getDatabase();
  const deleteItem = db.prepare("DELETE FROM cart_items WHERE cart_id = ? AND product_id = ?");
  deleteItem.run(cartId, productId);
  return null;
}

export function clearCart(cartId: string): void {
  const db = getDatabase();
  const deleteItems = db.prepare("DELETE FROM cart_items WHERE cart_id = ?");
  deleteItems.run(cartId);
}

export function itemFromRow(row: any): CartItem {
  return {
    id: row.id,
    cartId: row.cart_id,
    productId: row.product_id,
    quantity: row.quantity,
    product: {
      id: row.product_id,
      name: row.name,
      description: '', // Not included in cart items query
      price: row.price,
      originalPrice: row.original_price || undefined,
      category: row.category,
      image: row.image,
      rating: row.rating,
      reviews: row.reviews,
      inStock: Boolean(row.in_stock),
      isPromotion: Boolean(row.is_promotion),
      tags: JSON.parse(row.tags),
    },
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// Close database connection (useful for cleanup)
export function closeDatabase() {
  if (db) {
    db.close();
    db = null;
  }
}
