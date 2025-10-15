"use client";

import { useMemo, useState } from "react";
import { CartButton } from "../../nantes-shop/_components/Cart/CartButton";
import { CartDropdown } from "../../nantes-shop/_components/Cart/CartDropdown";
import { CartOverlay } from "../../nantes-shop/_components/Cart/CartOverlay";
import { useGetCartQuery } from "../../nantes-shop/_hooks/queries/useGetCartQuery";

export const CartQuery = () => {
  const { data: cart } = useGetCartQuery();
  const [isOpen, setIsOpen] = useState(false);

  const totalItemCount = useMemo(() => {
    if (!cart || !cart.items) return 0;
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
