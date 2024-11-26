import { CartProduct, useCartStore } from "@/stores/CartStore";
import Image from "next/image";
import { Icons } from "../ui/icons";

type SideBarProductCardProps = CartProduct;

export default function SideBarProductCard({
  quantity,
  ...product
}: SideBarProductCardProps) {
  const cartStore = useCartStore();

  return (
    <div className="rounded-lg bg-white shadow-custom flex items-center justify-between p-4 w-full gap-[15%] relative">
      <div className="flex gap-5 items-center">
        <div className="w-12 h-12">
          <Image
            src={{ src: product.photo, width: 50, height: 50 }}
            alt="Product image"
          />
        </div>
        <div className="text-gray-900 text-sm font-normal">{product.name}</div>
      </div>

      <div className="flex gap-4 w-full justify-between">
        <div className="flex flex-col gap-1.5">
          <div className="h-[19px] border border-gray-300 rounded-md border-solid py-2 bg-white flex items-center justify-center gap-[1px]">
            <button
              onClick={() => cartStore.removeProduct(product)}
              className="border-none bg-transparent mx-[6px] hover:cursor-pointer"
            >
              -
            </button>
            <div className="mr-2 border-l border-l-gray-300 h-full p-1 pl-0 pr-0" />
            <span>{quantity}</span>
            <div className="ml-2 border-l border-l-gray-300 h-full p-1 pl-0 pr-0" />
            <button
              onClick={() => cartStore.addProduct(product)}
              className="border-none bg-transparent mx-[6px] hover:cursor-pointer"
            >
              +
            </button>
          </div>

          <div className="flex gap-2 items-center justify-between">
            <span className="text-black font-bold text-[14px]">
              R${product.price}
            </span>
            <button
              className="p-1 pr-2 pl-2 rounded-full border-0 text-white bg-white text-[8px] font-[18] absolute right-[-8px] top-[-8px] hover:cursor-pointer"
              onClick={() => cartStore.deleteProduct(product)}
            >
              <Icons.crossCircled color="black" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
