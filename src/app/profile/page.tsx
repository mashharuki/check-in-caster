import { getVerifiedClaims, privy } from "@/lib/privy";

export default async function ProfilePage() {
  const verifiedClaims = await getVerifiedClaims();
  const user = privy.getUser(verifiedClaims.userId);

  return (
    <main className="flex h-full flex-col items-center justify-center">
      Profile
    </main>
  );
}
