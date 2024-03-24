import { Skeleton } from "@/components/ui/skeleton";

export default function BookmarksLoading() {
  return (
    <main>
      <div className="grid grid-cols-3 place-items-center gap-5 border-b px-3 py-4 hover:bg-gray-50">
        <Skeleton className="aspect-square w-full rounded-md" />
        <div className="col-span-2">
          <Skeleton className="h-3 w-36 rounded-full" />
          <Skeleton className="mt-2 h-5 w-56 rounded-full" />
          <Skeleton className="mt-3 h-4 w-56 rounded-full" />
        </div>
      </div>
      <div className="grid grid-cols-3 place-items-center gap-5 border-b px-3 py-4 hover:bg-gray-50">
        <Skeleton className="aspect-square w-full rounded-md" />
        <div className="col-span-2">
          <Skeleton className="h-3 w-36 rounded-full" />
          <Skeleton className="mt-2 h-5 w-56 rounded-full" />
          <Skeleton className="mt-3 h-4 w-56 rounded-full" />
        </div>
      </div>
    </main>
  );
}
