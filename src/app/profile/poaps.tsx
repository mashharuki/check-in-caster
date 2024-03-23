import { getPoapBadgesFromAirstack } from "@/lib/helpers";

export default async function Poaps({ fid }: { fid: string }) {
  const poapBadges = await getPoapBadgesFromAirstack(fid);

  return (
    <section className="mt-5">
      <div className="flex border-b border-gray-100 px-5 pb-2">
        <h2 className="font-semibold">POAPs</h2>{" "}
        <div className="ml-3 text-gray-500">{poapBadges.length}</div>
      </div>

      <div className="my-10 grid grid-flow-row grid-cols-2 gap-x-1 gap-y-8">
        {poapBadges.map((poap) => (
          <div
            key={poap.eventId}
            className="col-span-1 flex flex-col items-center"
          >
            {/* eslint-disable-next-line  */}
            <img
              src={poap.image_url}
              alt={poap.eventName}
              className="aspect-square w-32 rounded-full object-cover"
              loading="lazy"
            />

            <h3 className="mt-3 line-clamp-2 text-ellipsis px-3 text-center text-sm font-semibold">
              {poap.eventName}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
