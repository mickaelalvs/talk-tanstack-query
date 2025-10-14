"use client";

import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../lib/hooks";
import { fetchCart } from "../_stores/cartSlice";
import { CartButton } from "../_components/Cart/CartButton";
import { CartDropdown } from "../_components/Cart/CartDropdown";
import { CartOverlay } from "../_components/Cart/CartOverlay";

export const Cart = () => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const totalItemCount = useMemo(() => {
    if (!cart) return 0;
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  return (
    <div className="relative">
      <CartButton setIsOpen={setIsOpen} totalItemCount={totalItemCount} />

      {isOpen && (
        <>
          <CartOverlay setIsOpen={setIsOpen} />
          <CartDropdown setIsOpen={setIsOpen} />
        </>
      )}
    </div>
  );
};
