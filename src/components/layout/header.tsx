"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePrivy } from "@privy-io/react-auth";
import Image from "next/image";
import Link from "next/link";
import { FaUser as UserIcon } from "react-icons/fa";

const Header = () => {
  const { user } = usePrivy();

  return (
    <header className="flex items-center justify-between px-5 py-3 shadow">
      <Link href="/profile" passHref>
        <Avatar className="h-9 w-9">
          {user?.farcaster?.pfp && <AvatarImage src={user.farcaster.pfp} />}
          <AvatarFallback>
            <UserIcon />
          </AvatarFallback>
        </Avatar>
      </Link>
      <Link href="/" passHref>
        <Image
          src="/assets/logo.png"
          alt="logo"
          width={40}
          height={40}
          priority
        />
      </Link>
      <div className="h-9 w-9"></div>
    </header>
  );
};

export default Header;
