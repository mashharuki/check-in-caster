import Line from "./line";
import Point from "./point";

interface TimelineProps {
  data: {
    name: string;
    place: string;
    timestamp: string;
    type: string;
  }[];
}

const getDateString = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getTimeString = (date: string) => {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });
};

const Timeline: React.FC<TimelineProps> = ({ data }) => {
  const uniqueDates = Array.from(
    new Set(data.map((item) => item.timestamp.split("T")[0])),
  );

  return (
    <div className="relative mt-1 overflow-y-hidden">
      {/* Trigger line render on each rerender */}
      <Line key={Math.random()} />
      {uniqueDates.map((date, dateIndex) => {
        const filteredData = data.filter((item) =>
          item.timestamp.includes(date),
        );
        return (
          <div key={date}>
            <div className="flex w-min items-center whitespace-nowrap rounded-r-full bg-gray-100 py-2 pr-7 text-sm text-gray-600">
              <Point initial={dateIndex === 0} />
              <div>{getDateString(date)}</div>
            </div>
            <ul>
              {filteredData.map((item, itemIndex) => (
                <li key={item.name + itemIndex} className="my-10 flex">
                  <Point type={item.type} />
                  <div className="">
                    <div className="mb-1 font-semibold capitalize">
                      {item.name}
                    </div>
                    <div className="text-sm capitalize text-gray-500">
                      {item.place}
                    </div>
                    <div className="text-sm text-gray-500">
                      {getDateString(item.timestamp)}
                      {" at "}
                      {getTimeString(item.timestamp)}
                    </div>
                    <div className="mt-3 text-sm capitalize">{item.type}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
