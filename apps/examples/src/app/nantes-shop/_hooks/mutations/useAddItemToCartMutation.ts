import { useMutation } from "@tanstack/react-query";
import { addItemToCart } from "../../_services/add-item-to-cart";

export const useAddItemToCartMutation = () => {
  return useMutation({
    mutationKey: ["addItemToCart"],
    mutationFn: addItemToCart,
    onSuccess: (_data, _variables, _results, context) => {
      context.client.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
