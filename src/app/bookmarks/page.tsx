import { getVerifiedClaims } from "@/lib/privy";

export default async function BookmarksPage() {
  const verifiedClaims = await getVerifiedClaims();

  return (
    <main className="flex h-full flex-col items-center justify-center">
      Bookmarks
    </main>
  );
}
