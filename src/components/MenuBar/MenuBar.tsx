import { Menubar, MenubarMenu } from "@/components/ui/menubar";
import { useCartStore } from "@/stores/CartStore";
import { Icons } from "../ui/icons";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

type MenuBarProps = {
  onCartClick: () => void;
};

export function MenuBar({ onCartClick }: MenuBarProps) {
  const cartStore = useCartStore();

  return (
    <Menubar className="p-8">
      <div className="flex-1 flex justify-start">
        <Icons.logo9Store />
      </div>
      <MenubarMenu>
        <div className="flex gap-4 flex-1 items-center justify-end">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <button
            onClick={onCartClick}
            className="flex gap-4 justify-center items-center bg-transparent border rounded-lg min-w-[70px] h-[30px] font-montserrat hover:cursor-pointer l-10"
          >
            <Icons.shoppingCartBlack className="size-6" />
            <span className="font-bold">{cartStore.products.length}</span>
          </button>
        </div>
      </MenubarMenu>
    </Menubar>
  );
}
