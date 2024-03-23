import CheckInMap from "@/components/app/map";
import Timeline from "@/components/app/timeline";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { prisma } from "@/lib/prisma";
import { getVerifiedClaims, privy } from "@/lib/privy";
import { fetchQuery, init } from "@airstack/node";
import { redirect } from "next/navigation";
import { FaUser as UserIcon } from "react-icons/fa";

const BioData: React.FC<{
  label: string;
  value: number | string;
  smallFont?: boolean;
}> = ({ label, value, smallFont }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`whitespace-nowrap ${smallFont ? "text-sm" : "text-lg font-bold"}`}
      >
        {value}
      </div>
      <div className="whitespace-nowrap text-xs text-gray-500">{label}</div>
    </div>
  );
};

const getPoapBadges = async (fid: string) => {
  init(process.env.AIRSTACK_API_KEY!);

  const { data, error } = await fetchQuery(
    `query USER_POAP_COUNTRY($owner: Identity = "fc_fid:${fid}") {
            Poaps(input: {filter: {owner: {_eq: $owner}}, blockchain: ALL}) {
              Poap {
                eventId 
                poapEvent {
                  eventName
                  description
                  metadata 
                  isVirtualEvent
                  city
                  country
                }
              }
            }
          }`,
  );

  const poapData = [];

  for (const poap of data.Poaps.Poap) {
    if (poap.poapEvent.isVirtualEvent === false)
      poapData.push({
        eventId: poap.eventId,
        eventName: poap.poapEvent.eventName,
        description: poap.poapEvent.description,
        image_url: poap.poapEvent.metadata.image_url,
        country: poap.poapEvent.country,
        city: poap.poapEvent.city,
      });
  }

  return poapData;
};

export default async function ProfilePage() {
  const verifiedClaims = await getVerifiedClaims();
  const user = await privy.getUser(verifiedClaims.userId);
  if (!user.farcaster) redirect("/signin?redirect_to=/profile");

  const poapBadges = await getPoapBadges(String(user.farcaster?.fid));

  console.log(poapBadges);

  const userInfo = await prisma.user.findFirst({
    where: {
      fid: String(user.farcaster?.fid),
    },
  });

  const checkInCount = await prisma.checkin.count({
    where: {
      fid: userInfo?.fid,
    },
  });

  const farcasterData = user.farcaster;
  const userStats = {
    checkIns: checkInCount,
    followers: 100,
    following: 123,
    badges: 5,
    checkBalance: 1000,
    saved: 0,
    mayors: 2,
  };

  const userCheckInsData = [
    {
      name: "TELUS",
      place: "Tokyo",
      location: { lat: 35.6764, lng: 139.65 },
      timestamp: "2023-03-20T10:00:00Z",
      type: "work",
    },
    {
      name: "Clipper Cafe",
      place: "San Francisco",
      location: { lat: 37.7749, lng: -122.4194 },
      timestamp: "2023-03-21T11:00:00Z",
      type: "lunch",
    },
    {
      name: "Central Park",
      place: "New York",
      location: { lat: 40.7128, lng: -74.006 },
      timestamp: "2023-03-22T12:00:00Z",
      type: "park",
    },
    {
      name: "Big Ben",
      place: "London",
      location: { lat: 51.5074, lng: -0.1278 },
      timestamp: "2023-03-23T13:00:00Z",
      type: "sightseeing",
    },
    {
      name: "Eiffel Tower",
      place: "Paris",
      location: { lat: 48.8566, lng: 2.3522 },
      timestamp: "2023-03-27T14:00:00Z",
      type: "sightseeing",
    },
    {
      name: "Red Square",
      place: "Moscow",
      location: { lat: 55.7558, lng: 37.6176 },
      timestamp: "2023-03-25T15:00:00Z",
      type: "sightseeing",
    },
    {
      name: "Zocalo",
      place: "Mexico City",
      location: { lat: 19.4326, lng: -99.1332 },
      timestamp: "2023-03-25T16:00:00Z",
      type: "restaurant",
    },
  ];

  userCheckInsData.sort((a, b) => {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  const userCheckInLocations = userCheckInsData.map((checkIn) => {
    return { ...checkIn.location, name: checkIn.place };
  });

  return (
    <main className="flex h-full flex-col">
      <section className="px-5 py-5">
        <div className="flex justify-between">
          <div>
            <Avatar className="h-[72px] w-[72px]">
              {farcasterData.pfp && <AvatarImage src={farcasterData.pfp} />}
              <AvatarFallback>
                <UserIcon className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            <h1 className="mt-2 font-bold">{farcasterData.displayName}</h1>
            <div className="text-sm text-gray-500">
              @{farcasterData.username}
            </div>
          </div>

          <div className="w-56">
            <div className="mt-5 flex justify-between">
              <BioData label="check-ins" value={userStats.checkIns} />
              <BioData label="followers" value={userStats.followers} />
              <BioData label="following" value={userStats.following} />
            </div>
            <div className="mt-5 flex justify-evenly">
              <BioData label="badges" value={userStats.badges} />
              <BioData label="$CHECK" value={userStats.checkBalance} />
            </div>
          </div>
        </div>

        <div className="mt-14">
          <CheckInMap checkedInCoordinates={userCheckInLocations} />
          <div>
            <div className="flex items-center justify-evenly rounded-b-md py-3 shadow">
              <BioData label="Visited" value={userStats.checkIns} smallFont />
              <div className="h-7 w-0.5 bg-gray-100"></div>
              <BioData label="Saved" value={userStats.saved} smallFont />
              <div className="h-7 w-0.5 bg-gray-100"></div>
              <BioData label="Mayors" value={userStats.mayors} smallFont />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-2">
        <div className="flex border-b border-gray-100 px-5 pb-2">
          <h2 className="font-semibold">Check-ins</h2>{" "}
          <div className="ml-3 text-gray-500">{userStats.checkIns}</div>
        </div>

        <Timeline data={userCheckInsData} />
      </section>
    </main>
  );
}
