import { Skeleton } from "@/components/ui/skeleton";
import { getPoapBadges } from "@/lib/airstack";
import PoapAction from "./PoapAction";

export default async function Poaps({ fid }: { fid: string }) {
  const poapBadges = await getPoapBadges(fid);

  return (
    <section className="mt-5">
      <div className="flex border-b border-gray-100 px-5 pb-2">
        <h2 className="font-semibold">POAPs</h2>{" "}
        <div className="ml-3 text-gray-500">{poapBadges.length}</div>
      </div>

      <div className="my-10 grid grid-flow-row grid-cols-1 gap-x-1 gap-y-8">
        {poapBadges.map((poap, index) => (
          <PoapAction
            key={poap.eventId}
            poap={poap}
            hideBorder={index === poapBadges.length - 1}
          />
        ))}
      </div>
    </section>
  );
}

const PoapsLoading = (
  <div className="mt-5 px-5">
    <Skeleton className="h-7 w-28 rounded-full" />
    <div className="my-10">
      <div className="grid grid-flow-row grid-cols-4 gap-x-5">
        <Skeleton className="col-span-1 aspect-square w-28 rounded-full" />
        <div className="col-span-3 px-10">
          <Skeleton className="mt-3 h-10 rounded-full" />
          <Skeleton className="mt-3 h-5 rounded-full" />
        </div>
      </div>
      <div className="mt-10 grid grid-flow-row grid-cols-4 gap-x-5">
        <Skeleton className="col-span-1 aspect-square w-28 rounded-full" />
        <div className="col-span-3 px-10">
          <Skeleton className="mt-3 h-10 rounded-full" />
          <Skeleton className="mt-3 h-5 rounded-full" />
        </div>
      </div>
    </div>
  </div>
);

export { PoapsLoading };
