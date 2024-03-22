"use client";

import { useRouter } from "next/navigation";
import {
  GoBell as BellIcon,
  GoBookmark as BookmarkIcon,
  GoMail as MailIcon,
  GoSearch as SearchIcon,
} from "react-icons/go";
import { RiHome7Line as HomeIcon } from "react-icons/ri";

const MenuItem: React.FC<{
  children: React.ReactNode;
  link: string;
}> = ({ children, link }) => {
  const router = useRouter();
  return (
    <li
      onClick={() => {
        router.push(link);
      }}
      className="cursor-pointer"
    >
      {children}
    </li>
  );
};

const Footer = () => {
  return (
    <footer className="border-t border-black border-opacity-10 px-5 py-4">
      <ul className="flex justify-around text-[#687684]">
        <MenuItem link="/">
          <HomeIcon className="h-5 w-5" />
        </MenuItem>
        <MenuItem link="/">
          <BookmarkIcon className="h-5 w-5" />
        </MenuItem>
        <MenuItem link="/">
          <SearchIcon className="h-5 w-5" />
        </MenuItem>
        <MenuItem link="/">
          <BellIcon className="h-5 w-5" />
        </MenuItem>
        <MenuItem link="/">
          <MailIcon className="h-5 w-5" />
        </MenuItem>
      </ul>
    </footer>
  );
};

export default Footer;
