import type { Metadata } from "next";
import { Cinzel_Decorative, Inter, Tiro_Devanagari_Hindi } from "next/font/google";
import "./globals.css";

const cinzelDecorative = Cinzel_Decorative({
  variable: "--font-cinzel-decorative",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const tiro = Tiro_Devanagari_Hindi({
  variable: "--font-tiro",
  weight: "400",
  subsets: ["devanagari", "latin"],
});

export const metadata: Metadata = {
  title: "Raghuvansh Theatre Group",
  description: "The Curtain Rises - Raghuvansh Theatre Group, founded by Late Shri Amitosh Sharma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzelDecorative.variable} ${inter.variable} ${tiro.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body bg-canvas text-ink">{children}</body>
    </html>
  );
}
