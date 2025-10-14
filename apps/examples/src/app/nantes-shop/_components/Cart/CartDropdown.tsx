"use client";

import { X } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { CartDropdownActions } from "../../cart/CartDropdownActions";
import { CartDropdownContent } from "../../cart/CartDropdownContent";

interface CartDropdownProps {
  setIsOpen: (isOpen: boolean) => void;
}

export const CartDropdown = ({ setIsOpen }: CartDropdownProps) => {
  return (
    <div className="absolute right-0 top-full mt-2 w-96 bg-card border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">Panier</h3>
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <CartDropdownContent />
      <CartDropdownActions />
    </div>
  );
};
