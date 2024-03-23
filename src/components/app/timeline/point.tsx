import {
  FaUmbrellaBeach as BeachIcon,
  FaMapMarkerAlt as MarkerIcon,
  FaLaptop as WorkIcon,
} from "react-icons/fa";
import { FaBagShopping as ShoppingIcon } from "react-icons/fa6";
import { ImSpoonKnife as FoodIcon } from "react-icons/im";
import { MdTempleBuddhist as TempleIcon } from "react-icons/md";
import { PiBinocularsFill as SightSeeingIcon } from "react-icons/pi";

interface PointProps {
  initial?: boolean;
  type?: string;
}

const includesAny = (str: string, arr: string[]) => {
  return arr.some((item) => str.includes(item));
};

const getIcon = (type?: string) => {
  if (!type) return null;
  type = type.toLowerCase();

  let icon = <MarkerIcon className="h-5 w-5" />;

  if (includesAny(type, ["temple", "church", "mosque", "worship", "prayer"]))
    icon = <TempleIcon className="h-5 w-5" />;
  else if (
    includesAny(type, [
      "food",
      "restaurant",
      "lunch",
      "dinner",
      "breakfast",
      "cafe",
    ])
  )
    icon = <FoodIcon className="h-5 w-5" />;
  else if (
    includesAny(type, ["work", "meeting", "conference", "job", "office"])
  )
    icon = <WorkIcon className="h-5 w-5" />;
  else if (
    includesAny(type, [
      "sightseeing",
      "tour",
      "tourism",
      "tourist",
      "attraction",
      "landmark",
    ])
  )
    icon = <SightSeeingIcon className="h-5 w-5" />;
  else if (includesAny(type, ["beach", "sea", "ocean", "water", "pool"]))
    icon = <BeachIcon className="h-5 w-5" />;
  else if (includesAny(type, ["shop", "store", "mall", "market", "buy"]))
    icon = <ShoppingIcon className="h-5 w-5" />;

  return (
    <div className="flex items-center justify-center p-4 text-white">
      {icon}
    </div>
  );
};

const Point: React.FC<PointProps> = ({ initial, type }) => {
  return (
    <div className={`timeline-point relative mx-10 ${type ? "mt-6" : "my-2"}`}>
      <div
        className={`absolute left-0 top-0 z-50 min-h-3 min-w-3 -translate-x-1/2 -translate-y-1/2 rounded-full ${initial ? "bg-[#6D5FB5]" : "bg-[#ffa733]"}`}
      >
        {getIcon(type)}
      </div>
    </div>
  );
};

export default Point;
