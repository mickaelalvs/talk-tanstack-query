import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CartButtonProps {
  setIsOpen: (isOpen: (isOpen: boolean) => boolean) => void;
  totalItemCount: number;
}

export const CartButton = ({ setIsOpen, totalItemCount }: CartButtonProps) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setIsOpen((isOpen: boolean) => !isOpen)}
      className="relative"
    >
      <ShoppingCart className="h-4 w-4 mr-2" />
      Panier
      {totalItemCount > 0 && (
        <Badge
          variant="destructive"
          className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
        >
          {totalItemCount}
        </Badge>
      )}
    </Button>
  );
};
