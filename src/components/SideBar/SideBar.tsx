import { Button } from "@/components/ui/button";
import { motion, CycleState } from "framer-motion";
import { useCartStore } from "@/stores/CartStore";
import { useRouter } from "next/navigation";
import { Icons } from "../ui/icons";
import SideBarProductCard from "./SideBarProductCard";
import { ScrollArea } from "../ui/scroll-area";

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
          className="fixed right-0 h-dvh z-20"
        >
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={sideVariants}
            className="bg-gray-700 flex flex-col min-h-full max-h-full gap-4 justify-between pt-4 w-80"
          >
            <div className="flex-1 px-3">
              <div className="flex justify-between items-center w-full g-3">
                <span className="text-[20px] font-bold leading-normal text-white">
                  Meu Carrinho
                </span>
                <button
                  className="text-white text-[20px] font-normal hover:cursor-pointer"
                  onClick={() => cycleOpen()}
                >
                  <Icons.crossCircled className="size-5" />
                </button>
              </div>
              <ScrollArea className="h-[80dvh] rounded-md border">
                <div className="flex flex-col items-center p-4 gap-4">
                  {cartStore.products.map((cartProducts) => {
                    return (
                      <SideBarProductCard
                        key={cartProducts.id}
                        {...cartProducts}
                      />
                    );
                  })}
                </div>
              </ScrollArea>
            </div>
            <div className="flex flex-col w-full px-3 pb-10">
              <div className="flex items-center p-1 justify-between ">
                <span className="text-lg font-bold leading-[15px] text-white">
                  Total:
                </span>
                <span className="text-lg font-bold leading-[15px] text-white">
                  R$ {total}
                </span>
              </div>
              <Button
                onClick={() => router.push("/checkout")}
                className="bg-black text-white w-full border-none p-6 text-[20px] font-bold leading-[15px] hover:cursor-pointer"
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
