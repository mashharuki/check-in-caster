import CheckInMap from "@/components/app/map";
import Timeline from "@/components/app/timeline";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserInfo } from "@/lib/pinata";
import { prisma } from "@/lib/prisma";
import { getVerifiedClaims, privy } from "@/lib/privy";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { FaUser as UserIcon } from "react-icons/fa";
import Poaps from "./poaps";

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

export default async function ProfilePage() {
  const verifiedClaims = await getVerifiedClaims();
  const user = await privy.getUser(verifiedClaims.userId);
  if (!user.farcaster) redirect("/signin?redirect_to=/profile");

  const userInfo = await prisma.user.findFirst({
    where: {
      fid: String(user.farcaster.fid),
    },
    include: {
      _count: {
        select: {
          badges: true,
          bookmarks: true,
        },
      },
    },
  });

  const farcasterData = (await getUserInfo(String(user.farcaster.fid)))?.data;

  const userCheckInsData = userInfo
    ? await prisma.checkin.findMany({
        where: {
          fid: userInfo.fid,
        },
      })
    : [];

  const userStats = {
    checkIns: userCheckInsData.length,
    followers: farcasterData?.follower_count || 0,
    following: farcasterData?.following_count || 0,
    badges: userInfo?._count.badges || 0,
    checkBalance: 10 * userCheckInsData.length,
    saved: userInfo?._count.bookmarks || 0,
    mayors: userCheckInsData.length > 2 ? 2 : 0,
  };

  const checkIns = userCheckInsData.map((checkIn) => {
    return {
      name: checkIn.location || "",
      place:
        (checkIn.city
          ? checkIn.city + ", " + checkIn.country
          : checkIn.country) || "",
      location: checkIn.coordinates as { lat: number; lng: number } | null,
      timestamp: checkIn.timestamp.toISOString(),
      type: checkIn.category || "",
    };
  });

  checkIns.sort((a, b) => {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  const userCheckInLocations = checkIns.map((checkIn) => {
    return { ...checkIn.location, name: checkIn.place };
  });

  return (
    <main className="flex h-full flex-col">
      <section className="px-5 py-5">
        <div className="flex justify-between">
          <div>
            <Avatar className="h-[72px] w-[72px]">
              {farcasterData?.pfp_url && (
                <AvatarImage src={farcasterData.pfp_url} />
              )}
              <AvatarFallback>
                <UserIcon className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            <h1 className="mt-2 font-bold">{farcasterData?.display_name}</h1>
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

        <Timeline data={checkIns} />
      </section>

      <Suspense>
        <Poaps fid={String(user.farcaster.fid)} />
      </Suspense>
    </main>
  );
}
