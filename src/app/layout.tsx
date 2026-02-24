import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ParticleNetwork from "@/components/ParticleNetwork";
import { ViewTransitions } from 'next-view-transitions';
import { ViewTransition } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://quinton.dev"),
  title: {
    default: "Quinton Miller - Front-End Engineer",
    template: "%s | Quinton Miller",
  },
  description: "Personal website and blog of Quinton Miller, Front-End Engineer at Amazon. Explore my work, articles, and insights on web development.",
  keywords: ["Quinton Miller", "Front-End Engineer", "Web Development", "React", "TypeScript", "Next.js", "Amazon"],
  authors: [{ name: "Quinton Miller" }],
  creator: "Quinton Miller",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://quinton.dev",
    siteName: "Quinton Miller",
    title: "Quinton Miller - Front-End Engineer",
    description: "Personal website and blog of Quinton Miller, Front-End Engineer at Amazon",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Quinton Miller - Front-End Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quinton Miller - Front-End Engineer",
    description: "Personal website and blog of Quinton Miller, Front-End Engineer at Amazon",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ colorScheme: 'light dark' }}>
      <ViewTransition>
        <body suppressHydrationWarning style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          {/*<ParticleNetwork />*/}
          <Header />
          <main style={{ flex: 1 }}>
            {children}
          </main>
          <Footer />
        </body>
      </ViewTransition>
    </html>
  );
}
