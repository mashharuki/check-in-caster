import { prisma } from "@/lib/prisma";
import { getVerifiedClaims, privy } from "@/lib/privy";

export default async function BookmarksPage() {
  const verifiedClaims = await getVerifiedClaims();
  const user = privy.getUser(verifiedClaims.userId);
  const checkin = await prisma.checkin.findMany({
    take: 10,
  });

  return (
    <main className="h-full">
      <div className="">
        {checkin.map((record) => {
          return (
            <>
              <div
                key={record.checkin_id}
                className="relative grid grid-cols-3 place-items-center gap-5 border-b px-3 pb-4 pt-2 hover:bg-gray-50"
              >
                <img src={record.image ?? ""} className=" rounded" />
                <div className="col-span-2">
                  <p className="text-xs text-gray-500">{record.category}</p>
                  <p className="my-1 text-sm">{record.location}</p>

                  <div className="flex items-center space-x-5">
                    <p className="mt-2 flex items-center space-x-5 text-sm capitalize  text-gray-600">
                      <img
                        src="https://flagcdn.com/112x84/jp.png"
                        width={20}
                        height={20}
                        className="mr-2"
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
