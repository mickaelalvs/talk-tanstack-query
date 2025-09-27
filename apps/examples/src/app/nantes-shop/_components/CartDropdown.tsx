"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { 
  fetchCart, 
  updateCartItemQuantity, 
  removeFromCart, 
  clearCart,
  optimisticUpdateQuantity,
  optimisticRemoveFromCart,
  optimisticClearCart
} from "@/app/nantes-shop/_stores/cartSlice";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Minus, ShoppingCart, X } from "lucide-react";
import Image from "next/image";

export const CartDropdown = () => {
  const dispatch = useAppDispatch();
  const { cart, loading, error } = useAppSelector((state) => state.cart);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    // Optimistic update - UI updates immediately
    dispatch(optimisticUpdateQuantity({ productId, quantity }));
    // Sync with server in background
    dispatch(updateCartItemQuantity({ productId, quantity }));
  };

  const handleRemoveItem = (productId: number) => {
    // Optimistic update - UI updates immediately
    dispatch(optimisticRemoveFromCart(productId));
    // Sync with server in background
    dispatch(removeFromCart({ productId }));
  };

  const handleClearCart = () => {
    // Optimistic update - UI updates immediately
    dispatch(optimisticClearCart());
    // Sync with server in background
    dispatch(clearCart());
  };

  const getTotalPrice = () => {
    if (!cart) return 0;
    return cart.items.reduce((total, item) => {
      return total + (item.product?.price || 0) * item.quantity;
    }, 0);
  };

  const getTotalItems = () => {
    if (!cart) return 0;
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <ShoppingCart className="h-4 w-4 mr-2" />
        Panier
        {getTotalItems() > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
          >
            {getTotalItems()}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-96 bg-card border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-hidden">
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Panier</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="max-h-64 overflow-y-auto">
              {error ? (
                <div className="p-4 text-center text-red-500">
                  {error}
                </div>
              ) : !cart || cart.items.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  Votre panier est vide
                </div>
              ) : (
                <div className="p-4 space-y-3">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-2 border rounded-lg">
                      <div className="relative w-10 h-10 flex-shrink-0">
                        <Image
                          src={item.product?.image || "/placeholder.jpg"}
                          alt={item.product?.name || ""}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">
                          {item.product?.name}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {(item.product?.price || 0).toLocaleString("fr-FR", {
                            style: "currency",
                            currency: "EUR",
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-6 w-6 p-0"
                          onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-xs font-medium w-4 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-6 w-6 p-0"
                          onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                          onClick={() => handleRemoveItem(item.productId)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart && cart.items.length > 0 && (
              <div className="p-4 border-t border-border bg-muted/50">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold text-lg">
                    {getTotalPrice().toLocaleString("fr-FR", {
                      style: "currency",
                      currency: "EUR",
                    })}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleClearCart}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    Vider
                  </Button>
                  <Button size="sm" className="flex-1">
                    Commander
                  </Button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
