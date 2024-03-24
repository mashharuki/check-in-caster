import Cast from "@/components/app/cast";
import HomeLoading from "@/components/layout/home-loading";
import { prisma } from "@/lib/prisma";
import { getVerifiedClaimsWithoutRedirect, privy } from "@/lib/privy";
import { Suspense } from "react";

async function Home() {
  const feedData = await prisma.checkin.findMany({
    include: {
      user: true,
    },
  });

  const verifiedClaims = await getVerifiedClaimsWithoutRedirect();
  const user = verifiedClaims
    ? await privy.getUser(verifiedClaims.userId)
    : null;
  const userFarcasterData = user?.farcaster;

  feedData.sort((a, b) => {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  return (
    <main className="flex h-full flex-col">
      {feedData.map((cast) => (
        <Cast
          key={cast.parent_hash}
          country={cast.country ?? ""}
          category={cast.category ?? ""}
          object={""}
          hash={cast.parent_hash ?? ""}
          author={cast?.user as any}
          text={cast.text ?? ""}
          timestamp={String(cast.timestamp)}
          embeds={
            cast.image
              ? [
                  {
                    url: cast.image ?? "",
                  },
                ]
              : []
          }
          reactions={{
            likes: [],
            recasts: [],
            replies: {
              count: 10,
            },
          }}
        />
      ))}
    </main>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={HomeLoading}>
      <Home />
    </Suspense>
  );
}
