import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { UserButton } from "@clerk/nextjs";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
  return (
    <div className="flex items-center p-4">
      <MobileNavbar />
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
