import { PrivyClient } from "@privy-io/server-auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const PRIVY_APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID;
if (!PRIVY_APP_ID) throw new Error("Missing PRIVY_APP_ID in env");

const PRIVY_APP_SECRET = process.env.PRIVY_APP_SECRET;
if (!PRIVY_APP_SECRET) throw new Error("Missing PRIVY_APP_SECRET in env");

const privy = new PrivyClient(PRIVY_APP_ID, PRIVY_APP_SECRET);

const getVerifiedClaims = async () => {
  const privyToken = cookies().get("privy-token")?.value;
  // This condition mostly doesn't happen because the middleware handles it, if it does, middleware is not configured for the route
  if (!privyToken) redirect("/signin");

  const verifiedClaims = await privy
    .verifyAuthToken(privyToken)
    .then((val) => val)
    .catch(() => {
      return null;
    });

  // Redirect to signout page if the token is invalid
  if (!verifiedClaims) redirect("/auth/signout");
  return verifiedClaims;
};

export { getVerifiedClaims, privy };
