"use client";

import { PrivyProvider } from "@privy-io/react-auth";

export default function Provider({ children }: { children: React.ReactNode }) {
  const PRIVY_APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID;
  if (!PRIVY_APP_ID) throw new Error("Missing PRIVY_APP_ID in env");

  return (
    <PrivyProvider
      appId={PRIVY_APP_ID}
      config={{
        // Customize Privy's appearance in your app
        appearance: {
          theme: "light",
          accentColor: "#676FFF",
          logo: "/assets/logo-full.png",
          showWalletLoginFirst: false,
        },
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
        loginMethodsAndOrder: {
          primary: ["farcaster", "email", "google", "discord"],
          overflow: [
            "detected_wallets",
            "metamask",
            "coinbase_wallet",
            "rainbow",
            "wallet_connect",
          ],
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
