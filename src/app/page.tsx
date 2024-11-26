"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/header/header";
import ProductCard from "@/components/ProductCard";
import SideBar from "@/components/SideBar/SideBar";
import { useProducts } from "@/hooks/useProducts";
import { useCartStore } from "@/stores/CartStore";
import { useCycle } from "framer-motion";

export default function Home() {
  const { data: productList, isLoading } = useProducts();
  const { addProduct } = useCartStore();

  const [open, cycleOpen] = useCycle(true, false);

  return (
    <main className="min-h-screen relative">
      {/* <Menubar color="#242423" /> */}
      {open && <SideBar cycle={[open, cycleOpen]} />}
      <Header onCartClick={cycleOpen} />

      <div className="flex justify-center items-center w-full">
        <div className="grid max-w-[960px] grid-cols-4 gap-6 p-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {!isLoading && productList
            ? productList.map((product) => {
                return (
                  <ProductCard
                    key={product.id}
                    onAddToCart={addProduct}
                    {...product}
                  />
                );
              })
            : null}
        </div>
      </div>
      <Footer />
    </main>
  );
}
