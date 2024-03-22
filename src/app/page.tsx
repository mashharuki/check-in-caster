import { getVerifiedClaimsWithoutRedirect, privy } from "@/lib/privy";

export default async function Home() {
  const verifiedClaims = await getVerifiedClaimsWithoutRedirect();
  const user = verifiedClaims
    ? await privy.getUser(verifiedClaims.userId)
    : null;
  const userFarcasterData = user?.farcaster;

  console.log(userFarcasterData);
  // TODO: If verifiedClaims is null, get generic farcaster feed else get user's farcaster feed

  return (
    <main className="flex h-full flex-col items-center justify-center">
      Home
    </main>
  );
}
