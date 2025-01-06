import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YouClick",
  description:
    "Use YouClick Chrome Extension to automate like, comment and subscribe for your favorite youtuber, seamlessly binge watch whole playlist without exiting full screen and also not missing to like and comment!",
  openGraph: {
    title: "YouClick | Support Your Favorite YouTuber",
    description:
      "A chrome extension, aims to make win-win situation for both youtuber and consumer!",
    url: "https://you-click.vercel.app/",
    images: [
      {
        url: "https://you-click.vercel.app/thumbnail-you-click.png",
        width: 1200,
        height: 630,
        alt: "YouClick Preview",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Suspense>
        <body className={inter.className}>{children}</body>
      </Suspense>
    </html>
  );
}
