"use client";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import {
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Music,
  Settings,
  VideoIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";

import FreeCounter from "./FreeCounter";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-pink-700",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-orange-700",
  },
  {
    label: "Music Generation",
    icon: Music,
    href: "/music",
    color: "text-emerald-500",
  },
  {
    label: "Code Generation",
    icon: Code,
    href: "/code",
    color: "text-green-700",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];
interface SidebarProps {
  apiLimitCount: number;
}

const Sidebar = ({ apiLimitCount }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <>
      <div className="w-full h-full flex flex-col justify-between py-4 bg-[#111827] text-white">
        <div className="px-3 py-2">
          <Link href="/dashboard" className="flex px-3 mb-14 items-center">
            <Image src="/logo.png" alt="Logo" width={30} height={30} />
            <h1 className={cn("ml-4 text-2xl font-bold", montserrat.className)}>
              Genius
            </h1>
          </Link>
          <div className="flex flex-col space-y-2">
            {routes.map((route, index) => (
              <Link
                key={index}
                href={route.href}
                className={cn(
                  "flex gap-x-3 text-sm group p-3 w-full justify-start font-medium rounded-lg hover:bg-white/10 transition",
                  pathname === route.href
                    ? "bg-white/10 text-white"
                    : "text-zinc-400"
                )}
              >
                <route.icon className={cn("h-5 w-5", route.color)} />
                {route.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="mb-4 px-3">
          <FreeCounter apiLimitCount={apiLimitCount} />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
