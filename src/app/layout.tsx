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
    type: "profile",
    firstName: "Amit",
    lastName: "Kumar",
    username: "dr-amit-kumar",
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Dr. Amit Kumar",
    "jobTitle": "EV Infrastructure & MSME Consultant",
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Indian Institute of Technology Delhi"
    },
    "worksFor": [
      {
        "@type": "Organization",
        "name": "Sun's Shine India",
        "role": "Founder & Managing Director"
      },
      {
        "@type": "Organization",
        "name": "Anify Innovations Pvt Ltd",
        "role": "Founder & CMD"
      }
    ],
    "url": siteUrl,
    "sameAs": [
      "https://www.linkedin.com/in/dr-amit-kumar"
    ]
  };

  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
