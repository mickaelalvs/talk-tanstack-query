import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Cart } from "../../../lib/database";
import { addItemToCart } from "../_services/add-item-to-cart";
import { deleteCartItem } from "../_services/delete-cart-item";
import { getCart } from "../_services/get-cart";
import { updateCart } from "../_services/update-cart";

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

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  return await getCart();
});

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({
    productId,
    quantity = 1,
  }: {
    productId: number;
    quantity?: number;
  }) => {
    return await addItemToCart({ productId, quantity });
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
    return await updateCart({ userId, productId, quantity });
  },
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId }: { productId: number }) => {
    return await deleteCartItem(productId);
  },
);

export const clearCart = createAsyncThunk("cart/clearCart", async () => {
  const response = await fetch(`/api/nantes-shop/cart?userId=default_user`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to clear cart");
  }
  return true;
});

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
      // Add to cart - sync with server response
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
      })
      // Update cart item quantity - sync with server response
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
      })
      // Remove from cart - server already confirmed removal
      .addCase(removeFromCart.fulfilled, (_state, _action) => {
        // Server already confirmed removal, no need to update state
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.error = action.error.message || "Failed to remove item from cart";
      })
      // Clear cart - server already confirmed clear
      .addCase(clearCart.fulfilled, (_state, _action) => {
        // Server already confirmed clear, no need to update state
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.error = action.error.message || "Failed to clear cart";
      });
  },
});

export const { setCart, clearError } = cartSlice.actions;
export default cartSlice.reducer;
