import { api } from "./api/config";

export type Product = {
  id: number;
  photo: string;
  name: string;
  description: string;
  price: number;
};

type GetProductsParams = {
  category?: string;
};

async function getProducts(params: GetProductsParams) {
  const response = await api.get<Product[]>("/products", {
    params,
  });

  return response.data;
}

export const productService = { getProducts };
