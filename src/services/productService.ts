import { api } from "./api/config";

export type Product = {
  id: number;
  photo: string;
  name: string;
  description: string;
  price: number;
};

async function getProducts() {
  const response = await api.get<Product[]>("/products");

  return response.data;
}

export const productService = { getProducts };
