import type { Metadata } from "next";
import { Geist, Geist_Mono, Gloria_Hallelujah } from "next/font/google";
import "./globals.css";

const gloriaSans = Gloria_Hallelujah({
  variable: "--font-gloria-sans",
  weight: "400",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "🥂 One more year older 🥂",
  description: "Free food and drinks if you come.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${gloriaSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
