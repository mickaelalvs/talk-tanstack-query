import { NextRequest, NextResponse } from "next/server";
import { addToCart, updateCartItemQuantity, removeFromCart, getOrCreateCart } from "@/lib/database";

// POST /api/nantes-shop/cart/items - Add item to cart
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId = "default_user", productId, quantity = 1 } = body;

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const cart = getOrCreateCart(userId);
    const cartItem = addToCart(cart.id, productId, quantity);

    if (!cartItem) {
      return NextResponse.json(
        { error: "Failed to add item to cart" },
        { status: 500 }
      );
    }

    return NextResponse.json(cartItem);
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return NextResponse.json(
      { error: "Failed to add item to cart" },
      { status: 500 }
    );
  }
}

// PUT /api/nantes-shop/cart/items - Update item quantity
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId = "default_user", productId, quantity } = body;

    if (!productId || quantity === undefined) {
      return NextResponse.json(
        { error: "Product ID and quantity are required" },
        { status: 400 }
      );
    }

    const cart = getOrCreateCart(userId);
    const cartItem = updateCartItemQuantity(cart.id, productId, quantity);

    return NextResponse.json(cartItem);
  } catch (error) {
    console.error("Error updating cart item:", error);
    return NextResponse.json(
      { error: "Failed to update cart item" },
      { status: 500 }
    );
  }
}

// DELETE /api/nantes-shop/cart/items - Remove item from cart
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId") || "default_user";
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const cart = getOrCreateCart(userId);
    removeFromCart(cart.id, parseInt(productId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    return NextResponse.json(
      { error: "Failed to remove item from cart" },
      { status: 500 }
    );
  }
}
