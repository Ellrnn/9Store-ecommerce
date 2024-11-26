import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ShoppingCart } from "../icons/ShoppingCart";
import { useCartStore } from "@/stores/CartStore";

type HeaderProps = {
  onCartClick: () => void;
};

export function Header({ onCartClick }: HeaderProps) {
  const cartStore = useCartStore();

  return (
    <header className="flex justify-between items-center w-full px-24 sm:px-6 bg-blue-500 h-[10dvh]">
      <div>
        <span className="text-white text-4xl font-semibold leading-5">
          9Store{" "}
          <span className="text-white text-xl font-light leading-5">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </span>
        </span>
      </div>
      <button
        onClick={onCartClick}
        className="flex gap-4 justify-center items-center bg-transparent border-none rounded-lg min-w-[90px] h-[45px] font-montserrat hover:cursor-pointer"
      >
        <ShoppingCart />
        <span className="font-bold">{cartStore.products.length}</span>
      </button>
    </header>
  );
}
