import { useMutation } from "@tanstack/react-query";
import { updateCart } from "../_services/update-cart";

export const useUpdateCartItemMutation = () => {
  return useMutation({
    mutationKey: ["updateCartItem"],
    mutationFn: updateCart,
    onSuccess: (_data, _variables, _results, context) => {
      context.client.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
