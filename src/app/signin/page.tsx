"use client";

import { PrivyLoginBtn, PrivyLogoutBtn } from "@/components/privy";
import { usePrivy } from "@privy-io/react-auth";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function SignInPage() {
  const { user, linkFarcaster } = usePrivy();
  const [showAuthAlert, setShowAuthAlert] = useState(false);
  const [showRedirectMessage, setShowRedirectMessage] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (user && !user.farcaster) setShowAuthAlert(true);
    else setShowAuthAlert(false);
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const redirectTo = searchParams.get("redirect_to");
    let timeout: NodeJS.Timeout;
    if (redirectTo) {
      setShowRedirectMessage(true);

      // Redirect after 5 seconds (takes around 2 seconds for confirmation modals to close)
      timeout = setTimeout(() => {
        router.push(redirectTo);
      }, 5000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [searchParams, user, router]);

  return (
    <main className="flex h-full flex-col items-center justify-center gap-y-24">
      <Image
        src="/assets/logo-full.png"
        alt="logo"
        width={250}
        height={130}
        priority
      />

      <div className="flex flex-col items-center">
        {showAuthAlert && (
          <div className="mx-10 mb-10 rounded border border-red-600 px-3 py-3 text-sm text-red-600">
            Sorry, it seems you don&apos;t have a Farcaster account. Please
            login with Farcaster or{" "}
            <button
              onClick={() => {
                linkFarcaster();
              }}
              className="font-semibold underline"
            >
              link your account
            </button>{" "}
            to continue.
          </div>
        )}

        {showRedirectMessage && (
          <div className="mx-10 mb-10 px-3 py-3 text-sm text-gray-500">
            Logged in! Redirecting in 3 seconds...
          </div>
        )}

        {!user ? (
          <PrivyLoginBtn
            autoTriggerLoginPopup={true}
            className="h-auto items-center px-6 py-3 text-lg"
          />
        ) : (
          <PrivyLogoutBtn className="h-auto items-center px-6 py-3 text-lg" />
        )}
      </div>
    </main>
  );
}

export default function SignInPageWithSuspense() {
  return (
    <Suspense>
      <SignInPage />
    </Suspense>
  );
}
