import { Button } from "@/components/ui/button";
import { motion, CycleState } from "framer-motion";
import { useCartStore } from "@/stores/CartStore";
import { useRouter } from "next/navigation";
import { Icons } from "../ui/icons";
import SideBarProductCard from "./SideBarProductCard";

type SideBarProps = {
  cycle: CycleState<boolean>;
};

export default function SideBar({ cycle: [open, cycleOpen] }: SideBarProps) {
  const cartStore = useCartStore();

  const sideVariants = {
    closed: {
      transition: {
        staggerChildren: 0.2,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        staggerChildren: 0.2,
        staggerDirection: 1,
      },
    },
  };

  const total = cartStore.products.reduce((total, currentProduct) => {
    return total + Number(currentProduct.price) * currentProduct.quantity;
  }, 0);

  const router = useRouter();

  return (
    <>
      {open && (
        <motion.aside
          initial={{ width: 0 }}
          animate={{ width: "auto" }}
          exit={{
            width: 0,
            transition: { delay: 0.7, duration: 0.3 },
          }}
          className="absolute right-0 h-full"
        >
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={sideVariants}
            className="bg-neutral-500 flex flex-col min-h-full max-h-full justify-between gap-16"
          >
            <div className="flex justify-between items-center w-full p-9 gap-[40%]">
              <span className="text-[27px] font-bold leading-normal text-white">
                Carrinho de compras
              </span>
              <Button
                className="px-4 py-3 rounded-full border-none text-white bg-black text-[20px] font-normal hover:cursor-pointer"
                onClick={() => cycleOpen()}
              >
                <Icons.crossCircled className="size-10" />
              </Button>
            </div>
            <div className="flex flex-col items-center p-9 gap-4">
              {cartStore.products.map((cartProducts) => {
                return (
                  <SideBarProductCard
                    key={cartProducts.id}
                    {...cartProducts}
                  ></SideBarProductCard>
                );
              })}
            </div>
            <div className="flex flex-col w-full">
              <div className="flex items-center p-9 justify-between">
                <span className="text-[28px] font-bold leading-[15px] text-white">
                  TOTAL:
                </span>
                <span className="text-[28px] font-bold leading-[15px] text-white">
                  R$ {total}
                </span>
              </div>
              <Button
                onClick={() => router.push("/finalizar")}
                className="bg-black text-white w-full border-none p-6 text-[28px] font-bold leading-[15px] hover:cursor-pointer"
              >
                Finalizar Compra
              </Button>
            </div>
          </motion.div>
        </motion.aside>
      )}
    </>
  );
}
