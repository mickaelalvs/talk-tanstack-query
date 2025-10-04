import { useQuery } from "@tanstack/react-query";
import { getCart } from "@/app/nantes-shop/_services/get-cart";

export const useGetCartQuery = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
  });
};
