"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { FaUser as UserIcon } from "react-icons/fa";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-5 py-3 shadow">
      <Avatar className="h-9 w-9">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>
          <UserIcon />
        </AvatarFallback>
      </Avatar>
      <Image src="/assets/logo.png" alt="logo" width={40} height={100} />
      <div className="h-9 w-9"></div>
    </header>
  );
};

export default Header;
