import { NextRequest, NextResponse } from "next/server";
import { getOrCreateCart, clearCart, type Cart } from "@/lib/database";

// GET /api/nantes-shop/cart - Get or create cart for user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId") || "default_user";

    const cart = getOrCreateCart(userId);
    return NextResponse.json(cart);
  } catch (error) {
    console.error("Error getting cart:", error);
    return NextResponse.json(
      { error: "Failed to get cart" },
      { status: 500 }
    );
  }
}

// DELETE /api/nantes-shop/cart - Clear cart
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId") || "default_user";

    const cart = getOrCreateCart(userId);
    clearCart(cart.id);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error clearing cart:", error);
    return NextResponse.json(
      { error: "Failed to clear cart" },
      { status: 500 }
    );
  }
}
