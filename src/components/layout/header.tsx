"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePrivy } from "@privy-io/react-auth";
import Image from "next/image";
import { FaUser as UserIcon } from "react-icons/fa";

const Header = () => {
  const { user } = usePrivy();

  return (
    <header className="flex items-center justify-between px-5 py-3 shadow">
      <Avatar className="h-9 w-9">
        {user?.farcaster?.pfp && <AvatarImage src={user.farcaster.pfp} />}
        <AvatarFallback>
          <UserIcon />
        </AvatarFallback>
      </Avatar>
      <Image
        src="/assets/logo.png"
        alt="logo"
        width={40}
        height={40}
        priority
      />
      <div className="h-9 w-9"></div>
    </header>
  );
};

export default Header;
