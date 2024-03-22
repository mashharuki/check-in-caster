import AppLayout from "@/components/layout";
import PrivyProvider from "@/providers/privy-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Check-In Caster",
  description: "Coming soon!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PrivyProvider>
          <AppLayout>{children}</AppLayout>
        </PrivyProvider>
      </body>
    </html>
  );
}
