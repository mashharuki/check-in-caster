"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignOutPage() {
  const { ready, logout } = usePrivy();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;

    (async () => {
      await logout();
      setTimeout(() => {
        router.replace("/signin");
      }, 1000);
    })();
  }, [ready, logout, router]);

  return null;
}
