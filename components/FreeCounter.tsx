import { Card, CardContent } from "./ui/card";
import { useEffect, useState } from "react";
import { MAX_FREE_COUNTS } from "@/constants";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
import { useProModal } from "@/hooks/useProModal";

interface FreeCounterProps {
  apiLimitCount: number;
}
const FreeCounter = ({ apiLimitCount }: FreeCounterProps) => {
  const proModal = useProModal();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Card className="bg-white/10 border-0">
      <CardContent className="py-4">
        <div className="test-sm text-center text-white mb-4 space-y-2">
          <p>
            {apiLimitCount}/{MAX_FREE_COUNTS} Free Generations
          </p>
          <Progress
            className="h-3"
            value={(apiLimitCount / MAX_FREE_COUNTS) * 100}
          />
        </div>
        <Button
          className="w-full"
          variant="premium"
          onClick={() => proModal.onOpen()}
        >
          Upgrade <Zap className="w-4 h-4 ml-2 fill-white" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default FreeCounter;
