import { getVerifiedClaims, privy } from "@/lib/privy";

export default async function BookmarksPage() {
  const verifiedClaims = await getVerifiedClaims();
  const user = privy.getUser(verifiedClaims.userId);

  return (
    <main className="flex h-full flex-col items-center justify-center">
      Bookmarks
    </main>
  );
}
