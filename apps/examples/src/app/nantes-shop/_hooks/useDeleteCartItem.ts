import { useMutation } from "@tanstack/react-query";
import { deleteCartItem } from "../_services/delete-cart-item";

export const useDeleteCartItemMutation = () => {
  return useMutation({
    mutationKey: ["deleteCartItem"],
    mutationFn: deleteCartItem,
    onSuccess: (_data, _variables, _results, context) => {
      context.client.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
