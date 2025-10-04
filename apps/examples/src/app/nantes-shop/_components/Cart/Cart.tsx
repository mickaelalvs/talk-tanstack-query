"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchCart } from "@/app/nantes-shop/_stores/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { CartButton } from "./CartButton";
import { CartDropdown } from "./CartDropdown";
import { CartOverlay } from "./CartOverlay";

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
