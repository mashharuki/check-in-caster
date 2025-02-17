import CheckInMap from "@/components/app/map";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserInfo } from "@/lib/pinata";
import { prisma } from "@/lib/prisma";
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

export default async function ProfilePage({ params: { username } }: any) {
  const farcasterData = (await getUserInfo(username))?.data;

  const checkInCount = await prisma.checkin.count({
    where: {
      fid: username,
    },
  });

  const userStats = {
    checkIns: checkInCount,
    followers: farcasterData?.follower_count || 0,
    following: farcasterData?.following_count || 0,
    badges: 5,
    checkBalance: 10 * checkInCount,
    saved: 1,
    mayors: 2,
  };

  const userCheckIns = [
    { lat: 35.6764, lng: 139.65, name: "Tokyo" },
    { lat: 37.7749, lng: -122.4194, name: "San Francisco" },
    { lat: 40.7128, lng: -74.006, name: "New York" },
    { lat: 51.5074, lng: -0.1278, name: "London" },
    { lat: 48.8566, lng: 2.3522, name: "Paris" },
    { lat: 55.7558, lng: 37.6176, name: "Moscow" },
    { lat: 19.4326, lng: -99.1332, name: "Mexico City" },
  ];

  return (
    <main className="flex h-full flex-col">
      <section className="px-5 py-5">
        <div className="flex justify-between">
          <div>
            <Avatar className="h-[72px] w-[72px]">
              {farcasterData?.pfp_url && (
                <AvatarImage src={farcasterData?.pfp_url} />
              )}
              <AvatarFallback>
                <UserIcon className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            <div className="mt-2 font-bold">{farcasterData?.display_name}</div>
            <div className="text-sm text-gray-500">
              @{farcasterData?.username}
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
          <CheckInMap checkedInCoordinates={userCheckIns} />
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
    </main>
  );
}
