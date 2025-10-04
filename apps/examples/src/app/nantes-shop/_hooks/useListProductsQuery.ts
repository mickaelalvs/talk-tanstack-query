import { useQuery } from "@tanstack/react-query";
import { listProducts, type ProductsParams } from "../_services/list-products";

export const useListProductsQuery = (params: ProductsParams) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => listProducts(params),
  });
};
