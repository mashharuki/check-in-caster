import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main>
      <div className="px-5 py-5">
        <div className="flex justify-between">
          <div>
            <Skeleton className="h-[72px] w-[72px] rounded-full" />
            <Skeleton className="mt-2 h-5 w-20 rounded-full" />
            <Skeleton className="mt-1 h-3 w-20 rounded-full" />
          </div>
          <div className="w-56">
            <div className="mt-5 flex justify-between">
              <Skeleton className="h-10 w-14 rounded-full" />
              <Skeleton className="h-10 w-14 rounded-full" />
              <Skeleton className="h-10 w-14 rounded-full" />
            </div>
            <div className="mt-5 flex justify-evenly">
              <Skeleton className="h-10 w-14 rounded-full" />
              <Skeleton className="h-10 w-14 rounded-full" />
            </div>
          </div>
        </div>

        <div className="mt-16">
          <Skeleton className="h-[284px] w-full rounded-md" />
        </div>
      </div>

      <div className="mt-2 px-5">
        <Skeleton className="h-7 w-28 rounded-full" />
        <Skeleton className="mt-5 h-7 w-28 rounded-full" />
      </div>
    </main>
  );
}
