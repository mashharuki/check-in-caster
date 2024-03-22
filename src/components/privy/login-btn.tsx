"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePrivy } from "@privy-io/react-auth";
import { useEffect, useRef } from "react";

interface PrivyLoginBtnProps {
  autoTriggerLoginPopup?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const PrivyLoginBtn: React.FC<PrivyLoginBtnProps> = ({
  autoTriggerLoginPopup = false,
  className,
  children,
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const { ready, authenticated, login } = usePrivy();
  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready || (ready && authenticated);

  useEffect(() => {
    if (autoTriggerLoginPopup && !disableLogin) {
      btnRef.current?.click();
    }
  }, [autoTriggerLoginPopup, disableLogin]);

  return (
    <Button
      disabled={disableLogin}
      onClick={login}
      ref={btnRef}
      className={cn("bg-[#6A6FF5]", className)}
    >
      {children ? children : "Sign In"}
    </Button>
  );
};

export default PrivyLoginBtn;
