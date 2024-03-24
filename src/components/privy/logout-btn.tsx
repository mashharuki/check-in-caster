"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";

interface PrivyLogoutBtnProps {
  className?: string;
  children?: React.ReactNode;
  redirectToHome?: boolean;
}

const PrivyLogoutBtn: React.FC<PrivyLogoutBtnProps> = ({
  className,
  children,
  redirectToHome,
}) => {
  const { ready, authenticated, logout } = usePrivy();
  const router = useRouter();

  // Disable logout when Privy is not ready or the user is not authenticated
  const disableLogout = !ready || (ready && !authenticated);

  return (
    <Button
      disabled={disableLogout}
      onClick={async () => {
        await logout();
        if (redirectToHome) {
          router.push("/");
        }
      }}
      className={cn("bg-[#6A6FF5]", className)}
    >
      {children ? children : "Sign Out"}
    </Button>
  );
};

export default PrivyLogoutBtn;
