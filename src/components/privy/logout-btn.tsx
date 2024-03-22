"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePrivy } from "@privy-io/react-auth";

interface PrivyLogoutBtnProps {
  className?: string;
  children?: React.ReactNode;
}

const PrivyLogoutBtn: React.FC<PrivyLogoutBtnProps> = ({
  className,
  children,
}) => {
  const { ready, authenticated, logout } = usePrivy();
  // Disable logout when Privy is not ready or the user is not authenticated
  const disableLogout = !ready || (ready && !authenticated);

  return (
    <Button
      disabled={disableLogout}
      onClick={logout}
      className={cn("bg-[#6A6FF5]", className)}
    >
      {children ? children : "Sign Out"}
    </Button>
  );
};

export default PrivyLogoutBtn;
