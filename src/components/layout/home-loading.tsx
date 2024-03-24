import { Skeleton } from "@/components/ui/skeleton";

const HomeLoading = (
  <main>
    <div className="grid grid-flow-row grid-cols-12 border-b bg-purple-50 bg-opacity-20 px-5 py-5">
      <div className="col-span-2 pr-3">
        <Skeleton className="aspect-square w-full rounded-full" />
      </div>
      <div className="col-span-10">
        <Skeleton className="h-5 w-56 rounded-full" />

        <div className="mt-8 flex flex-col gap-y-3 pr-5">
          <Skeleton className="h-4 w-full rounded-full" />
          <div className="flex flex-col gap-y-3 pr-5">
            <Skeleton className="h-4 w-full rounded-full" />
            <Skeleton className="h-4 w-full rounded-full" />
          </div>
          <Skeleton className="h-4 w-full rounded-full" />
          <Skeleton className="mt-5 h-36 w-full rounded-lg" />

          <div className="mt-5 flex justify-between gap-x-5">
            <Skeleton className="h-5 flex-1 rounded-full" />
            <Skeleton className="h-5 flex-1 rounded-full" />
            <Skeleton className="h-5 flex-1 rounded-full" />
            <Skeleton className="h-5 flex-1 rounded-full" />
          </div>
        </div>
      </div>
    </div>
    <div className="grid grid-flow-row grid-cols-12 border-b bg-purple-50 bg-opacity-20 px-5 py-5">
      <div className="col-span-2 pr-3">
        <Skeleton className="aspect-square w-full rounded-full" />
      </div>
      <div className="col-span-10">
        <Skeleton className="h-5 w-56 rounded-full" />

        <div className="mt-8 flex flex-col gap-y-3 pr-5">
          <Skeleton className="h-4 w-full rounded-full" />
          <div className="flex flex-col gap-y-3 pr-5">
            <Skeleton className="h-4 w-full rounded-full" />
            <Skeleton className="h-4 w-full rounded-full" />
          </div>
          <Skeleton className="h-4 w-full rounded-full" />
          <Skeleton className="mt-5 h-36 w-full rounded-lg" />

          <div className="mt-5 flex justify-between gap-x-5">
            <Skeleton className="h-5 flex-1 rounded-full" />
            <Skeleton className="h-5 flex-1 rounded-full" />
            <Skeleton className="h-5 flex-1 rounded-full" />
            <Skeleton className="h-5 flex-1 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  </main>
);

export default HomeLoading;
