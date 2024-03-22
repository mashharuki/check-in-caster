"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function RefreshPage() {
  const { getAccessToken, ready } = usePrivy();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!ready) return;

    (async () => {
      const accessToken = await getAccessToken();
      const redirectTo = searchParams.get("redirect_to") || "/";

      if (accessToken) {
        window.location.replace(redirectTo);
      } else {
        window.location.replace("/");
      }
    })();
  }, [getAccessToken, ready, searchParams]);

  return null;
}

export default function RefreshPageWithSuspense() {
  return (
    <Suspense>
      <RefreshPage />
    </Suspense>
  );
}
