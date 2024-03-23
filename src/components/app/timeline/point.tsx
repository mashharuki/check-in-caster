import {
  FaMapMarkerAlt as MarkerIcon,
  FaLaptop as WorkIcon,
} from "react-icons/fa";
import { ImSpoonKnife as FoodIcon } from "react-icons/im";
import { PiBinocularsFill as SightSeeingIcon } from "react-icons/pi";

interface PointProps {
  initial?: boolean;
  type?: string;
}

const getIcon = (type?: string) => {
  if (!type) return null;

  let icon: React.ReactNode;

  switch (type) {
    case "food":
    case "restaurant":
    case "lunch":
    case "dinner":
    case "breakfast":
    case "cafe":
      icon = <FoodIcon className="h-5 w-5" />;
      break;

    case "work":
    case "meeting":
    case "conference":
    case "job":
      icon = <WorkIcon className="h-5 w-5" />;
      break;

    case "sightseeing":
      icon = <SightSeeingIcon className="h-5 w-5" />;
      break;

    default:
      icon = <MarkerIcon className="h-5 w-5" />;
  }

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
