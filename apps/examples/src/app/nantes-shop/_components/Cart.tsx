"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchCart, updateCartItemQuantity, removeFromCart, clearCart } from "@/app/nantes-shop/_stores/cartSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import Image from "next/image";

export const Cart = () => {
  const dispatch = useAppDispatch();
  const { cart, loading, error } = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    dispatch(updateCartItemQuantity({ productId, quantity }));
  };

  const handleRemoveItem = (productId: number) => {
    dispatch(removeFromCart({ productId }));
  };

  const handleClearCart = () => {
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

  if (loading) {
    return (
      <Card className="w-80">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Panier
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">Chargement...</div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-80">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Panier
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 text-red-500">{error}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Panier
          </div>
          {cart && cart.items.length > 0 && (
            <Badge variant="secondary">{getTotalItems()}</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!cart || cart.items.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Votre panier est vide
          </div>
        ) : (
          <div className="space-y-4">
            {cart.items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="relative w-12 h-12 flex-shrink-0">
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
                  <p className="text-sm text-muted-foreground">
                    {(item.product?.price || 0).toLocaleString("fr-FR", {
                      style: "currency",
                      currency: "EUR",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="text-sm font-medium w-6 text-center">
                    {item.quantity}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleRemoveItem(item.productId)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
            
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
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
                  Vider le panier
                </Button>
                <Button size="sm" className="flex-1">
                  Commander
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
