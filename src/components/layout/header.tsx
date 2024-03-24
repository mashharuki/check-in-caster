"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePrivy } from "@privy-io/react-auth";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUser as UserIcon } from "react-icons/fa";

const Header = () => {
  const { user } = usePrivy();
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between px-5 py-3 shadow">
      <Link
        href="/profile"
        passHref
        className={pathname === "/profile" ? "sr-only" : ""}
      >
        <Avatar className="h-9 w-9">
          {user?.farcaster?.pfp && <AvatarImage src={user.farcaster.pfp} />}
          <AvatarFallback>
            <UserIcon />
          </AvatarFallback>
        </Avatar>
      </Link>

      {pathname === "/profile" && (
        <Link href="/" passHref>
          <div className="flex h-9 w-9 items-center justify-center">
            <ChevronLeftIcon className="h-7 w-7" />
          </div>
        </Link>
      )}

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
