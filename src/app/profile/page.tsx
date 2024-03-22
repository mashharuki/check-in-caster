import { getVerifiedClaims } from "@/lib/privy";

export default async function ProfilePage() {
  const verifiedClaims = await getVerifiedClaims();

  return (
    <main className="flex h-full flex-col items-center justify-center">
      Profile
    </main>
  );
}
