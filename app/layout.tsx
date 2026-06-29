import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";

// Headings and body fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-merriweather",
});

export const metadata: Metadata = {
  title: {
    default: "Next News",
    template: "%s | Next News",
  },
  description: "Stay updated with the latest news from around the world.",
  icons: {
    icon: "/logo.jpg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${merriweather.variable}`}
    >
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
