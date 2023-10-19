"use client";
import { Card } from "@/components/ui/card";
import { tools } from "@/constants";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  return (
    <>
      <div className="mt-2 space-y-4">
        <h1 className="text-2xl md:text-4xl font-bold text-center">
          Explore the power of AI
        </h1>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Chat with thee smartest AI - Experience the power of AI
        </p>
      </div>
      <div className="mt-8 space-y-4 px-4 md:px-20 lg:px-32">
        {tools.map((tool, index) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={index}
            className="p-4 flex items-center justify-between border-black/5 cursor-pointer hover:shadow-lg transition"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div className="font-semibold">{tool.label}</div>
            </div>
            <ArrowRight />
          </Card>
        ))}
      </div>
    </>
  );
};

export default Dashboard;
