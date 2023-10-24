import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const font = Montserrat({ weight: "600", subsets: ["latin"] });

const LandingNavbar = () => {
  const { isSignedIn } = useAuth();
  return (
    <nav className="p-4 flex items-center justify-between bg-transparent">
      <Link href="/" className="flex items-center">
        <Image src="/logo.png" alt="Logo" height={24} width={24} />
        <h1
          className={cn("text-2xl font-bold text-white ml-4", font.className)}
        >
          Genius
        </h1>
      </Link>
      <div className="flex items-center gap-x-2">
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button variant="outline" className="rounded-full">
            Get Statrted
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default LandingNavbar;
