import { CartCard } from "../../nantes-shop/_components/Cart/CartCard";
import { useGetCartQuery } from "../../nantes-shop/_hooks/useGetCart";

export const CartDropdownContentQuery = () => {
  const { data: cart, error } = useGetCartQuery();

  if (error) {
    return (
      <div className="max-h-64 overflow-y-auto">
        <div className="p-4 text-center text-red-500">{error.message}</div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0)
    return (
      <div className="max-h-64 overflow-y-auto">
        <div className="p-8 text-center text-muted-foreground">
          Votre panier est vide
        </div>
      </div>
    );

  return (
    <div className="max-h-52 overflow-y-auto">
      <div className="p-4 space-y-3">
        {cart.items.map((item) => (
          <CartCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
