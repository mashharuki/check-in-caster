import { prisma } from "@/lib/prisma";
import { getVerifiedClaims, privy } from "@/lib/privy";
import countries from "i18n-iso-countries";
import { redirect } from "next/navigation";

export default async function BookmarksPage() {
  const verifiedClaims = await getVerifiedClaims();
  const user = await privy.getUser(verifiedClaims.userId);
  if (!user.farcaster) redirect("/signin?redirect_to=/bookmarks");

  const bookmarks = await prisma.bookmarks.findMany({
    where: {
      fid: String(user.farcaster.fid),
    },
    include: {
      checkin: true,
    },
    take: 10,
  });

  const getCountryCode = (country: string | null) => {
    return countries.getAlpha2Code(country || "", "en")?.toLowerCase() || "jp";
  };

  return (
    <main className="h-full">
      <div className="">
        {bookmarks.length === 0 && (
          <div className="flex h-full items-center justify-center">
            <p className="text-gray-500">No bookmarks found</p>
          </div>
        )}

        {bookmarks.map((bookmark) => {
          const record = bookmark.checkin;
          return (
            <>
              <div
                key={record.checkin_id}
                className="relative grid grid-cols-3 place-items-center gap-5 border-b px-3 py-4 hover:bg-gray-50"
              >
                {/* eslint-disable-next-line */}
                <img
                  src={record.image ?? ""}
                  className=" rounded"
                  loading="lazy"
                />
                <div className="col-span-2">
                  <p className="text-xs text-gray-500">{record.category}</p>
                  <p className="my-1 text-sm">{record.location}</p>

                  <div className="flex items-center space-x-5">
                    <p className="mt-2 flex items-center space-x-5 text-sm capitalize  text-gray-600">
                      {/* eslint-disable-next-line */}
                      <img
                        src={`https://flagcdn.com/112x84/${getCountryCode(record.country)}.png`}
                        width={20}
                        height={20}
                        className="mr-2"
                        loading="lazy"
                      />

                      {record.country}
                    </p>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </main>
  );
}
