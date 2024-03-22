"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";
import {
  FaUserCircle as ProfileFilledIcon,
  FaRegUserCircle as ProfileIcon,
} from "react-icons/fa";
import {
  RiBookmarkFill as BookmarkFilledIcon,
  RiBookmarkLine as BookmarkIcon,
  RiHome7Fill as HomeFilledIcon,
  RiHome7Line as HomeIcon,
} from "react-icons/ri";

const MenuItem: React.FC<{
  link: string;
  icon: React.ReactNode;
  filledIcon: React.ReactNode;
  active?: boolean;
}> = ({ link, icon, filledIcon, active }) => {
  const router = useRouter();
  return (
    <li
      onClick={() => {
        router.push(link);
      }}
      className={`cursor-pointer ${active ? "text-[#6D5FB5]" : "text-[#687684]"}`}
    >
      {active ? filledIcon : icon}
    </li>
  );
};

const Footer = () => {
  const pathname = usePathname();

  return (
    <footer className="border-t border-black border-opacity-10 px-5 py-4">
      <ul className="flex justify-around">
        <MenuItem
          link="/"
          icon={<HomeIcon className="h-5 w-5" />}
          filledIcon={<HomeFilledIcon className="h-5 w-5" />}
          active={pathname === "/"}
        />
        <MenuItem
          link="/bookmarks"
          icon={<BookmarkIcon className="h-5 w-5" />}
          filledIcon={<BookmarkFilledIcon className="h-5 w-5" />}
          active={pathname.startsWith("/bookmarks")}
        />
        <MenuItem
          link="/profile"
          icon={<ProfileIcon className="h-5 w-5" />}
          filledIcon={<ProfileFilledIcon className="h-5 w-5" />}
          active={pathname.startsWith("/profile")}
        />
      </ul>
    </footer>
  );
};

export default Footer;
