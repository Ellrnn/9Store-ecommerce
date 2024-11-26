import { productService } from "@/services/productService";
import { useQuery } from "@tanstack/react-query";

type UseProductsParams = {
  category?: string;
};

export function useProducts({ category }: UseProductsParams) {
  return useQuery({
    queryKey: ["products", category],
    queryFn: () => productService.getProducts({ category }),
  });
}
