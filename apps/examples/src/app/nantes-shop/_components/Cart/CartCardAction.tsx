import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import type { CartItem } from "../../../../lib/database";
import { useCartActions } from "../../_hooks/useCartActions";

export const CartCardAction = ({ item }: { item: CartItem }) => {
  const { updateItemQuantity, removeItemFromCart } = useCartActions();

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    updateItemQuantity(productId, quantity);
  };

  const handleRemoveItem = (productId: number) => {
    removeItemFromCart(productId);
  };

  return (
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
  );
};
