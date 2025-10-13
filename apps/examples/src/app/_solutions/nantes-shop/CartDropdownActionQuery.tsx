import { useMemo } from "react";
import { Button } from "../../../components/ui/button";
import { useGetCartQuery } from "../../nantes-shop/_hooks/useGetCart";

export const CartDropdownActionQuery = () => {
  const { data: cart } = useGetCartQuery();

  const totalPrice = useMemo(() => {
    return (
      cart?.items.reduce(
        (acc, item) => acc + (item.product?.price ?? 0) * item.quantity,
        0,
      ) ?? 0
    );
  }, [cart]);

  if ((cart?.items.length ?? 0) === 0) {
    return null;
  }

  return (
    <div className="p-4 border-t border-border bg-muted/50">
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold">Total:</span>
        <span className="font-bold text-lg">
          {totalPrice.toLocaleString("fr-FR", {
            style: "currency",
            currency: "EUR",
          })}
        </span>
      </div>
      <div className="flex gap-2">
        <Button size="sm" className="flex-1">
          Commander
        </Button>
      </div>
    </div>
  );
};
