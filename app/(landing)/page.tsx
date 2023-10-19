"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const { isSignedIn } = useUser();
  const router = useRouter();
  // useEffect(() => {
  //   console.log(isSignedIn);
  //   if (isSignedIn) router.push("/dashboard");
  // }, []);
  return (
    <>
      {isSignedIn && router.push("/dashboard")}
      <Link href="/sign-in">
        <Button>Login</Button>
      </Link>
      <Link href="/sign-up">
        <Button>Register</Button>
      </Link>
    </>
  );
}
