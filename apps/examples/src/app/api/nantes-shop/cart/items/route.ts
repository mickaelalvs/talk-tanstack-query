import { type NextRequest, NextResponse } from "next/server";
import {
  addToCart,
  getOrCreateCart,
  updateCartItemQuantity,
} from "../../../../../lib/database";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId = "default_user", productId, quantity = 1 } = body;

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 },
      );
    }

    const cart = getOrCreateCart(userId);
    const cartItem = addToCart(cart.id, productId, quantity);

    if (!cartItem) {
      return NextResponse.json(
        { error: "Failed to add item to cart" },
        { status: 500 },
      );
    }

    return NextResponse.json(cartItem);
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return NextResponse.json(
      { error: "Failed to add item to cart" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId = "default_user", productId, quantity } = body;

    if (!productId || quantity === undefined) {
      return NextResponse.json(
        { error: "Product ID and quantity are required" },
        { status: 400 },
      );
    }

    const cart = getOrCreateCart(userId);
    const cartItem = updateCartItemQuantity(cart.id, productId, quantity);

    // If quantity is 0, the item is automatically deleted and cartItem will be null
    if (quantity === 0) {
      return NextResponse.json({ success: true, deleted: true });
    }

    return NextResponse.json(cartItem);
  } catch (error) {
    console.error("Error updating cart item:", error);
    return NextResponse.json(
      { error: "Failed to update cart item" },
      { status: 500 },
    );
  }
}
