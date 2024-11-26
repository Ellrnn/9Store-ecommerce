"use client";

import { Footer } from "@/components/Footer";
import { MenuBar } from "@/components/MenuBar/MenuBar";
import ProductCard from "@/components/ProductCard";
import SideBar from "@/components/SideBar/SideBar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProducts } from "@/hooks/useProducts";
import { useCartStore } from "@/stores/CartStore";
import { useCycle } from "framer-motion";
import { useState } from "react";

export default function Home() {
  const [category, setCategory] = useState<string>();
  console.log(category);

  const { data: productList, isLoading } = useProducts({ category });
  const { addProduct } = useCartStore();

  const [open, cycleOpen] = useCycle(false, true);

  return (
    <main className="min-h-screen relative">
      {open && <SideBar cycle={[open, cycleOpen]} />}
      <MenuBar onCartClick={cycleOpen} />

      <div className="flex flex-col justify-center items-center w-full">
        <Select onValueChange={setCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Categorias" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="masculino">Masculino</SelectItem>
              <SelectItem value="feminino">Feminino</SelectItem>
              <SelectItem value="acessorios">Acessorios</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="grid max-w-[960px] gap-y-16 grid-cols-4 gap-6 p-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
