import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  FaRegCommentAlt as ReplyIcon,
  FaUser as UserIcon,
} from "react-icons/fa";
import { FaRetweet as RecastIcon } from "react-icons/fa6";
import { IoHeartOutline as HeartIcon } from "react-icons/io5";
import { TbUpload as ShareIcon } from "react-icons/tb";
import Embed from "./embed";

interface CastProps {
  object: string;
  hash: string;
  country?: string;
  category?: string;
  author: {
    username: string;
    display_name: string;
    pfp_url: string;
  };
  text: string;
  timestamp: string;
  embeds: {
    url: string;
  }[];
  reactions: {
    likes: {
      fid: number;
      fname: string;
    }[];
    recasts: {
      fid: number;
      fname: string;
    }[];
    replies: {
      count: number;
    };
  };
}

const CastBtns: React.FC<{
  icon: React.ReactNode;
  text?: string;
}> = ({ icon, text }) => {
  return (
    <li className="flex cursor-pointer items-center">
      {icon}
      {text && <div className="ml-1 text-xs">{text}</div>}
    </li>
  );
};

const Cast: React.FC<CastProps> = ({
  object,
  hash,
  author,
  text,
  country,
  category,
  timestamp,
  embeds,
  reactions,
}) => {
  const minutesPassed = Math.floor(
    (Date.now() - new Date(timestamp).getTime()) / 60000,
  );
  const hoursPassed = Math.floor(minutesPassed / 60);
  const timeText = hoursPassed > 0 ? `${hoursPassed}h` : `${minutesPassed}m`;
  const textToHTML = (text: string) => {
    return text
      .replace(/\n/g, "<br>")
      .replace(/\*(.*?)\*/g, `<b class="text-lg">$1</b>`)
      .replace(/_(.*?)_/g, "<i>$1</i>")
      .replace(/`(.*?)`/g, "<code>$1</code>")
      .replace(
        /((?:https?:\/\/|www\.)[^\s]+)/g,
        '<a href="$1" target="_blank" rel="noopener noreferrer" class="underline">$1</a>',
      );
  };

  return (
    <div className="grid grid-flow-row grid-cols-12 border-b bg-purple-50 bg-opacity-20 px-5 py-5">
      <div className="col-span-2 pr-3">
        <Avatar className="h-auto w-full">
          <AvatarImage src={author.pfp_url} alt={`@${author.username}`} />
          <AvatarFallback>
            <UserIcon />
          </AvatarFallback>
        </Avatar>
      </div>

      <div className="col-span-10">
        <div>
          <span className="font-semibold">{author.display_name}</span>{" "}
          <span className="text-gray-500">@{author.username}</span>
          <span className="text-gray-500">
            &nbsp;&nbsp;·&nbsp;
            {timeText}
          </span>
        </div>

        <div className="mt-3">
          <p
            dangerouslySetInnerHTML={{
              __html: textToHTML(text.replace("@checkin", "")),
            }}
            className="break-words"
          ></p>

          <div className="mt-2 flex items-center space-x-5">
            {country ? (
              <p className="mt-2 text-xs capitalize text-gray-500">{country}</p>
            ) : null}
            {category ? (
              <p className="mt-2 text-xs capitalize text-gray-500">
                {category}
              </p>
            ) : null}
          </div>
        </div>

        <div className="w-full">
          {embeds.map((embed, index) => (
            <Embed key={hash + index} url={embed.url} />
          ))}
        </div>

        <ul className="mt-5 flex justify-between px-4 text-[#687684]">
          <CastBtns
            icon={<ReplyIcon />}
            text={reactions.replies.count.toString()}
          />
          <CastBtns
            icon={<RecastIcon />}
            text={reactions.recasts.length.toString()}
          />
          <CastBtns
            icon={<HeartIcon />}
            text={reactions.likes.length.toString()}
          />
          <CastBtns icon={<ShareIcon />} />
        </ul>
      </div>
    </div>
  );
};

export default Cast;
