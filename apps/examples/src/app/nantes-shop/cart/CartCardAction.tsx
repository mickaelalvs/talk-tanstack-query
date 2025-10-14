import { Minus, Plus } from "lucide-react";
import { Button } from "../../../components/ui/button";
import type { CartItem } from "../../../lib/database";
import { useCartActions } from "../_hooks/useCartActions";

export const CartCardAction = ({ item }: { item: CartItem }) => {
  const { updateItemQuantity } = useCartActions();

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    updateItemQuantity({ productId, quantity });
  };

  return (
    <div className="flex items-center gap-1">
      <Button
        size="sm"
        variant="outline"
        className="h-6 w-6 p-0"
        onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
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
    </div>
  );
};
