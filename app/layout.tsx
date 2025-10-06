import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { displayFont } from "@/lib/fonts";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "Kiwi Lankan Fitness Coaching - Elite Personal Training & Transformation",
  description:
    "Transform your body and mind with our championship-winning Kiwi Lankan trainers. Professional fitness coaching, nutrition guidance, and personalized workout plans for lasting results.",
  keywords:
    "personal trainer, fitness coaching, body transformation, elite training, New Zealand fitness, Sri Lankan fitness, muscle building, weight loss, nutrition coaching, kiwi lankan",
  authors: [{ name: "Kiwi Lankan Fitness Coaching" }],
  creator: "Kiwi Lankan Fitness Coaching",
  publisher: "Kiwi Lankan Fitness Coaching",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title:
      "Kiwi Lankan Fitness Coaching - Elite Personal Training & Transformation",
    description:
      "Transform your body and mind with our championship-winning Kiwi Lankan trainers. Professional fitness coaching for lasting results.",
    url: "https://kiwilankanfitness.com",
    siteName: "Kiwi Lankan Fitness Coaching",
    images: [
      {
        url: "/logo.png",
        width: 400,
        height: 400,
        alt: "Kiwi Lankan Fitness Coaching Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kiwi Lankan Fitness Coaching - Elite Personal Training",
    description:
      "Transform your body and mind with our championship-winning Kiwi Lankan trainers.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${displayFont.variable}`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
