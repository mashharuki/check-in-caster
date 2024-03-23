"use client";

import { APIProvider, AdvancedMarker, Map } from "@vis.gl/react-google-maps";

const MAPS_API_KEY = process.env.NEXT_PUBLIC_MAPS_API_KEY;
const MAP_ID = process.env.NEXT_PUBLIC_MAP_ID;
if (!MAPS_API_KEY) throw new Error("NEXT_PUBLIC_MAPS_API_KEY not found in env");
if (!MAP_ID) throw new Error("NEXT_PUBLIC_MAP_ID not found in env");

interface Location {
  lat: number;
  lng: number;
  name: string;
}

const CheckInMarker: React.FC<Location> = ({ lat, lng, name }) => {
  return (
    <AdvancedMarker position={{ lat, lng }}>
      <div className="relative h-2 w-2 rounded-full bg-black">
        <div
          className="absolute -top-2 left-3 whitespace-nowrap p-1 text-sm"
          style={{ textShadow: "1px 1px 0.5px white" }}
        >
          {name}
        </div>
      </div>
    </AdvancedMarker>
  );
};

const CheckInMap: React.FC<{
  checkedInCoordinates: Location[];
}> = ({ checkedInCoordinates }) => {
  const defaultCenter = { lat: 35.6764, lng: 139.65 }; // Tokyo

  return (
    <APIProvider apiKey={MAPS_API_KEY}>
      <div className="h-56 w-full">
        <Map
          defaultCenter={defaultCenter}
          defaultZoom={10}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          mapId={MAP_ID}
          className="h-full w-full rounded-md rounded-b-none outline-none"
        >
          {checkedInCoordinates.map((location, index) => (
            <CheckInMarker
              key={location.name + index}
              lat={location.lat}
              lng={location.lng}
              name={location.name}
            />
          ))}
        </Map>
      </div>
    </APIProvider>
  );
};

export default CheckInMap;
