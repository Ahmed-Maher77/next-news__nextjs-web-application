import type { Metadata, Viewport } from "next";
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

const SITE_URL = "https://next-news.vercel.app";
const SITE_NAME = "Next News";
const SITE_DESCRIPTION =
  "Next News is a modern, server-rendered news application built with Next.js 16. It delivers the latest news in a concise, unbiased manner through a clean, accessible interface with article browsing, detailed views, image modals, and a date-filtered archive system.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#181817",
};

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "news",
    "latest news",
    "world news",
    "breaking news",
    "Next.js",
    "React",
    "Next.js 16",
    "React 19",
    "TypeScript",
    "Tailwind CSS",
    "SQLite",
    "server-rendered",
    "SSR",
    "web application",
    "news aggregator",
  ],
  authors: [{ name: "Ahmed" }],
  creator: "Ahmed",
  publisher: "Next News",
  metadataBase: new URL(SITE_URL),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [
      {
        url: "/logo.jpg",
        width: 512,
        height: 512,
        alt: "Next News Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ["/logo.jpg"],
    creator: "@nextnews",
  },
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
  category: "news",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    applicationCategory: "NewsApplication",
    operatingSystem: "Web",
    author: {
      "@type": "Person",
      name: "Ahmed",
    },
    keywords:
      "news, latest news, world news, breaking news, Next.js, React, TypeScript",
    inLanguage: "en-US",
    isAccessibleForFree: true,
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${merriweather.variable}`}
    >
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
