import { type Product } from "@/services/productService";
import { create } from "zustand";

export type CartProduct = Product & {
  quantity: number;
};

type CartState = {
  products: CartProduct[];
  addProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;
  deleteProduct: (produc: Product) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  products: [],
  addProduct: (newProduct) => {
    console.log("called");

    return set((cart) => {
      if (cart.products.some((p) => p.id === newProduct.id)) {
        const newProductsState = cart.products.map((oldProduct) => {
          if (oldProduct.id === newProduct.id) {
            oldProduct.quantity += 1;
          }
          return oldProduct;
        });
        return {
          products: newProductsState,
        };
      }
      return {
        products: [...cart.products, { ...newProduct, quantity: 1 }],
      };
    });
  },
  removeProduct: (thereIsProduct) => {
    return set((currentCartState) => {
      const newProductsState = currentCartState.products.map((oldProduct) => {
        if (thereIsProduct.id === oldProduct.id && oldProduct.quantity > 1) {
          oldProduct.quantity -= 1;
        }
        return oldProduct;
      });
      return { products: newProductsState };
    });
  },
  deleteProduct: (target) => {
    return set((oldCartState) => {
      const newProductsState = oldCartState.products.filter((oldProduct) => {
        return oldProduct.id !== target.id;
      });
      return {
        products: newProductsState,
      };
    });
  },
  clearCart: () => set(() => ({ products: [] })),
}));
