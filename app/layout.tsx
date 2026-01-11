import type { Metadata } from "next";
// @ts-ignore: side-effect CSS import without type declarations
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { TRPCReactProvider } from "@/trpc/client";

export const metadata: Metadata = {
  title: "XENA TEKNO",
  description: "Created with XENA",
  generator: "XENA TEKNO",
};

const InterFont = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TRPCReactProvider>
      <html lang="en" className={`${InterFont.className}`}>
        <body>
          <Toaster />
          <main className="flex-grow">{children}</main>
        </body>
      </html>
    </TRPCReactProvider>
  );
}
