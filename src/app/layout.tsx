import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://master-mine.vercel.app"),
  title: "MasterPath US — IT Master's Degree Finder",
  description: "Compare accredited US IT master's degrees by tuition, format, ranking, and funding.",
  openGraph: {
    title: "MasterPath US — IT Master's Degree Finder",
    description: "Compare accredited US IT master's degrees by tuition, format, ranking, and funding.",
    type: "website",
    url: "https://master-mine.vercel.app",
    // Add og:image: create public/og-image.png (1200x630) and uncomment below.
    // images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "MasterPath US" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MasterPath US — IT Master's Degree Finder",
    description: "Compare accredited US IT master's degrees by tuition, format, ranking, and funding.",
  },
  alternates: {
    canonical: "https://master-mine.vercel.app",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
