import { UserButton } from "@clerk/nextjs";
import MobileNavbar from "./MobileNavbar";

interface NavbarProps {
  apiLimitCount: number;
  isPro: boolean;
}

const Navbar = ({ apiLimitCount, isPro }: NavbarProps) => {
  return (
    <div className="flex items-center p-4">
      <MobileNavbar apiLimitCount={apiLimitCount} isPro={isPro} />
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
