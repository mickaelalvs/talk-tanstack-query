import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Cart } from "@/lib/database";

interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cart: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (userId: string = "default_user") => {
    const response = await fetch(`/api/nantes-shop/cart?userId=${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch cart");
    }
    return response.json();
  },
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({
    userId = "default_user",
    productId,
    quantity = 1,
  }: {
    userId?: string;
    productId: number;
    quantity?: number;
  }) => {
    const response = await fetch("/api/nantes-shop/cart/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, productId, quantity }),
    });
    if (!response.ok) {
      throw new Error("Failed to add item to cart");
    }
    return response.json();
  },
);

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({
    userId = "default_user",
    productId,
    quantity,
  }: {
    userId?: string;
    productId: number;
    quantity: number;
  }) => {
    const response = await fetch("/api/nantes-shop/cart/items", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, productId, quantity }),
    });
    if (!response.ok) {
      throw new Error("Failed to update cart item");
    }
    return response.json();
  },
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({
    userId = "default_user",
    productId,
  }: {
    userId?: string;
    productId: number;
  }) => {
    const response = await fetch(
      `/api/nantes-shop/cart/items?userId=${userId}&productId=${productId}`,
      {
        method: "DELETE",
      },
    );
    if (!response.ok) {
      throw new Error("Failed to remove item from cart");
    }
    return { productId };
  },
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (userId: string = "default_user") => {
    const response = await fetch(`/api/nantes-shop/cart?userId=${userId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to clear cart");
    }
    return true;
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<Cart>) => {
      state.cart = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    // Optimistic updates - these update the UI immediately
    optimisticAddToCart: (
      state,
      action: PayloadAction<{
        productId: number;
        quantity: number;
        // biome-ignore lint/suspicious/noExplicitAny: please
        product: any;
      }>,
    ) => {
      if (!state.cart) return;

      const { productId, quantity, product } = action.payload;
      const existingItemIndex = state.cart.items.findIndex(
        (item) => item.productId === productId,
      );

      if (existingItemIndex >= 0) {
        state.cart.items[existingItemIndex].quantity += quantity;
      } else {
        state.cart.items.push({
          id: Date.now(), // Temporary ID
          cartId: state.cart.id,
          productId,
          quantity,
          product,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }
    },
    optimisticUpdateQuantity: (
      state,
      action: PayloadAction<{ productId: number; quantity: number }>,
    ) => {
      if (!state.cart) return;

      const { productId, quantity } = action.payload;
      const existingItemIndex = state.cart.items.findIndex(
        (item) => item.productId === productId,
      );

      if (existingItemIndex >= 0) {
        if (quantity <= 0) {
          state.cart.items.splice(existingItemIndex, 1);
        } else {
          state.cart.items[existingItemIndex].quantity = quantity;
        }
      }
    },
    optimisticRemoveFromCart: (state, action: PayloadAction<number>) => {
      if (!state.cart) return;

      const productId = action.payload;
      state.cart.items = state.cart.items.filter(
        (item) => item.productId !== productId,
      );
    },
    optimisticClearCart: (state) => {
      if (!state.cart) return;

      state.cart.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch cart - only this operation shows loading
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cart";
      })
      // Add to cart - no loading state, just sync with server
      .addCase(addToCart.fulfilled, (state, action) => {
        if (state.cart) {
          // Update the cart with the server response
          const existingItemIndex = state.cart.items.findIndex(
            (item) => item.productId === action.payload.productId,
          );
          if (existingItemIndex >= 0) {
            state.cart.items[existingItemIndex] = action.payload;
          } else {
            state.cart.items.push(action.payload);
          }
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.error.message || "Failed to add item to cart";
        // Revert optimistic update by refetching cart
      })
      // Update cart item quantity - no loading state
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        if (state.cart && action.payload) {
          const existingItemIndex = state.cart.items.findIndex(
            (item) => item.productId === action.payload.productId,
          );
          if (existingItemIndex >= 0) {
            state.cart.items[existingItemIndex] = action.payload;
          }
        }
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.error = action.error.message || "Failed to update cart item";
        // Revert optimistic update by refetching cart
      })
      // Remove from cart - no loading state
      .addCase(removeFromCart.fulfilled, (_state, _action) => {
        // Server already confirmed removal, no need to update state
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.error = action.error.message || "Failed to remove item from cart";
        // Revert optimistic update by refetching cart
      })
      // Clear cart - no loading state
      .addCase(clearCart.fulfilled, (_state, _action) => {
        // Server already confirmed clear, no need to update state
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.error = action.error.message || "Failed to clear cart";
        // Revert optimistic update by refetching cart
      });
  },
});

export const {
  setCart,
  clearError,
  optimisticAddToCart,
  optimisticUpdateQuantity,
  optimisticRemoveFromCart,
  optimisticClearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
