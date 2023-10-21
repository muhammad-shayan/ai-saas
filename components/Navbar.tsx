import { UserButton } from "@clerk/nextjs";
import MobileNavbar from "./MobileNavbar";

interface NavbarProps {
  apiLimitCount: number;
}

const Navbar = ({ apiLimitCount }: NavbarProps) => {
  return (
    <div className="flex items-center p-4">
      <MobileNavbar apiLimitCount={apiLimitCount} />
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
