import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../lib/store";
import type { Product } from "../_components/types";
import {
  addToCart,
  clearCart,
  removeFromCart,
  updateCartItemQuantity,
} from "../_stores/cartSlice";

export const useCartActions = () => {
  const dispatch = useDispatch<AppDispatch>();

  const addItemToCart = ({productId, quantity = 1}: {productId: number, quantity: number}) => {
    return dispatch(
      addToCart({
        productId,
        quantity,
      }),
    );
  };

  const updateItemQuantity = ({productId, quantity}: {productId: number, quantity: number}) => {
    return dispatch(
      updateCartItemQuantity({
        productId,
        quantity,
      }),
    );
  };

  const removeItemFromCart = (productId: number) => {
    return dispatch(
      removeFromCart({
        productId,
      }),
    );
  };

  const clearCartItems = () => {
    return dispatch(clearCart());
  };

  return {
    addItemToCart,
    updateItemQuantity,
    removeItemFromCart,
    clearCartItems,
  };
};
