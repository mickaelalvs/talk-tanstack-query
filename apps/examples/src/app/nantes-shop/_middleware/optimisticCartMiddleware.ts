import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import type { Cart } from "@/lib/database";
import type { Product } from "../_components/types";
import {
  addToCart,
  clearCart,
  removeFromCart,
  updateCartItemQuantity,
} from "../_stores/cartSlice";

interface OptimisticAddToCartPayload {
  productId: number;
  quantity: number;
  product: Product;
}

interface OptimisticUpdateQuantityPayload {
  productId: number;
  quantity: number;
}

const applyOptimisticAddToCart = (
  cart: Cart | null,
  payload: OptimisticAddToCartPayload,
): Cart | null => {
  if (!cart) return null;

  const { productId, quantity, product } = payload;
  const existingItemIndex = cart.items.findIndex(
    (item) => item.productId === productId,
  );

  const newCart = { ...cart, items: [...cart.items] };

  if (existingItemIndex >= 0) {
    newCart.items[existingItemIndex] = {
      ...newCart.items[existingItemIndex],
      quantity: newCart.items[existingItemIndex].quantity + quantity,
    };
  } else {
    newCart.items.push({
      id: Date.now(),
      cartId: cart.id,
      productId,
      quantity,
      product,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  return newCart;
};

const applyOptimisticUpdateQuantity = (
  cart: Cart | null,
  payload: OptimisticUpdateQuantityPayload,
): Cart | null => {
  if (!cart) return null;

  const { productId, quantity } = payload;
  const existingItemIndex = cart.items.findIndex(
    (item) => item.productId === productId,
  );

  if (existingItemIndex === -1) return cart;

  const newCart = { ...cart, items: [...cart.items] };

  if (quantity <= 0) {
    newCart.items.splice(existingItemIndex, 1);
  } else {
    newCart.items[existingItemIndex] = {
      ...newCart.items[existingItemIndex],
      quantity,
    };
  }

  return newCart;
};

const applyOptimisticRemoveFromCart = (
  cart: Cart | null,
  productId: number,
): Cart | null => {
  if (!cart) return null;

  return {
    ...cart,
    items: cart.items.filter((item) => item.productId !== productId),
  };
};

const applyOptimisticClearCart = (cart: Cart | null): Cart | null => {
  if (!cart) return null;

  return {
    ...cart,
    items: [],
  };
};

export const optimisticCartMiddleware = createListenerMiddleware();

optimisticCartMiddleware.startListening({
  matcher: isAnyOf(
    addToCart.pending,
    updateCartItemQuantity.pending,
    removeFromCart.pending,
    clearCart.pending,
  ),
  effect: (action, listenerApi) => {
    const state = listenerApi.getState() as { cart: { cart: Cart | null } };
    const currentCart = state.cart.cart;

    const originalCart = currentCart ? { ...currentCart } : null;

    let optimisticCart: Cart | null = null;

    if (addToCart.pending.match(action)) {
      const { productId, quantity, product } = action.meta.arg as {
        productId: number;
        quantity: number;
        product: Product;
      };
      optimisticCart = applyOptimisticAddToCart(currentCart, {
        productId,
        quantity,
        product,
      });
    } else if (updateCartItemQuantity.pending.match(action)) {
      const { productId, quantity } = action.meta.arg as {
        productId: number;
        quantity: number;
      };
      optimisticCart = applyOptimisticUpdateQuantity(currentCart, {
        productId,
        quantity,
      });
    } else if (removeFromCart.pending.match(action)) {
      const { productId } = action.meta.arg as { productId: number };
      optimisticCart = applyOptimisticRemoveFromCart(currentCart, productId);
    } else if (clearCart.pending.match(action)) {
      optimisticCart = applyOptimisticClearCart(currentCart);
    }

    if (optimisticCart) {
      listenerApi.dispatch({
        type: "cart/setCart",
        payload: optimisticCart,
      });
    }

    (action.meta as { originalCart: Cart | null }).originalCart = originalCart;
  },
});

optimisticCartMiddleware.startListening({
  matcher: isAnyOf(
    addToCart.rejected,
    updateCartItemQuantity.rejected,
    removeFromCart.rejected,
    clearCart.rejected,
  ),
  effect: (action, listenerApi) => {
    const originalCart = (action.meta as { originalCart: Cart | null })
      .originalCart;

    if (originalCart !== undefined) {
      // Rollback to original state
      listenerApi.dispatch({
        type: "cart/setCart",
        payload: originalCart,
      });
    }
  },
});

export default optimisticCartMiddleware;
