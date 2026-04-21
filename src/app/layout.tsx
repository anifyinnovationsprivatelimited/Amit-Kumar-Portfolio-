import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Dr. Amit Kumar | EV Infrastructure & MSME Consultant",
  description:
    "Official portfolio of Dr. Amit Kumar - purpose-driven entrepreneur, EV infrastructure expert, and MSME Lean & ZED consultant in India.",
  keywords: [
    "Dr Amit Kumar EV Consultant",
    "MSME Lean Consultant India",
    "EV Infrastructure Expert India",
    "Founder Sun's Shine India",
    "Anify Innovations",
  ],
  openGraph: {
    title: "Dr. Amit Kumar | EV Infrastructure & MSME Consultant",
    description:
      "Leading sustainable mobility, MSME transformation, and innovation-driven infrastructure in India.",
    type: "website",
    url: siteUrl,
    images: [
      {
        url: "/About.jpeg",
        width: 1200,
        height: 630,
        alt: "Dr. Amit Kumar Portfolio",
      },
    ],
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>{children}</body>
    </html>
  );
}
