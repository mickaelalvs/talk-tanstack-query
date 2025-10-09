import Image from "next/image";
import type { CartItem } from "../../../../lib/database";
import { CartCardAction } from "./CartCardAction";

interface CartCardProps {
  item: CartItem;
}

export const CartCard = ({ item }: CartCardProps) => {
  return (
    <div
      key={item.id}
      className="flex items-center gap-3 p-2 border rounded-lg"
    >
      <div className="relative w-10 h-10 flex-shrink-0">
        <Image
          src={`/nantes-shop${item.product?.image}` || "/placeholder.jpg"}
          alt={item.product?.name || ""}
          fill
          className="object-cover rounded"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm truncate">{item.product?.name}</h4>
        <p className="text-xs text-muted-foreground">
          {(item.product?.price || 0).toLocaleString("fr-FR", {
            style: "currency",
            currency: "EUR",
          })}
        </p>
      </div>
      <CartCardAction item={item} />
    </div>
  );
};
