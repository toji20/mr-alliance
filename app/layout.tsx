import type { Metadata } from "next";
import { Geist, Geist_Mono,Oswald } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/shared/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MR | ALLIANCE",
  description: "Строительная компания",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" data-rh="true" href="/mrlogo.png" />
      <body
        className={`${oswald.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
