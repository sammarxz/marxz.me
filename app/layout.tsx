import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";
import "./globals.css";

const siteName = "Samuel Marxz";
const siteUrl = "https://marxz.me";
const defaultDescription =
  "Designer e Desenvolvedor Web com mais de 8 anos de experiência. Especializado em front-end com ReactJS, construindo interfaces de usuário responsivas e acessíveis.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords: [
    "desenvolvedor web",
    "front-end developer",
    "react developer",
    "ui designer",
    "web design",
    "typescript",
    "nextjs",
    "react",
    "samuel marxz",
  ],
  authors: [{ name: "Samuel Marxz", url: siteUrl }],
  creator: "Samuel Marxz",
  publisher: "Samuel Marxz",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
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
    locale: "pt_BR",
    url: siteUrl,
    siteName,
    title: siteName,
    description: defaultDescription,
    images: [
      {
        url: `${siteUrl}/og-image.jpg`, // Lembre-se de criar esta imagem
        width: 1200,
        height: 630,
        alt: "Samuel Marxz - Designer e Desenvolvedor Web",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: defaultDescription,
    creator: "@sammarxz",
    images: [`${siteUrl}/og-image.jpg`],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/apple-touch-icon-precomposed.png",
    },
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#18181b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "dark",
  viewportFit: "cover",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Samuel Marxz",
  url: siteUrl,
  jobTitle: "Designer e Desenvolvedor Web",
  sameAs: [
    "https://twitter.com/sammarxz",
    "https://github.com/sammarxz",
    "https://linkedin.com/in/sammarxz",
  ],
  description: defaultDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="[color-scheme:dark]" suppressHydrationWarning>
      <head>
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="460a7db4-1d11-4a90-9137-d638758f029d"
          strategy="afterInteractive"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} dark font-sans overscroll-y-none bg-zinc-950 antialiased selection:bg-indigo-600/90 selection:text-white text-zinc-500`}
      >
        <svg
          className="pointer-events-none fixed isolate z-50 opacity-70 mix-blend-soft-light"
          width="100%"
          height="100%"
          aria-hidden="true"
        >
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.80"
              numOctaves="4"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
        <div className="min-h-screen relative z-10">
          <div className="md:max-w-2xl px-8 mx-auto flex flex-col gap-16 md:gap-24 py-16 md:py-28">
            {children}
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
