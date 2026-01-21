import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

/**
 * Space Grotesk font configuration
 * 
 * Using Space Grotesk as the primary font for the entire application.
 * This provides a modern, geometric typeface for body text, headings, and UI elements.
 */
const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

/**
 * Root layout metadata
 * 
 * Defines the default title and description for all pages.
 * Individual pages can override this with their own metadata.
 */
export const metadata: Metadata = {
  title: {
    default: "Gallery",
    template: "%s | Gallery",
  },
  description: "Explore an interactive draggable canvas gallery with smooth animations and tactile interactions. Browse curated collections with keyboard navigation and dark mode support.",
  keywords: ["gallery", "art", "images", "interactive", "canvas", "draggable", "portfolio"],
  authors: [{ name: "Gallery" }],
  creator: "Gallery",
  publisher: "Gallery",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL 
    || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Gallery - Interactive Canvas Gallery",
    description: "Explore an interactive draggable canvas gallery with smooth animations and tactile interactions.",
    siteName: "Gallery",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery - Interactive Canvas Gallery",
    description: "Explore an interactive draggable canvas gallery with smooth animations and tactile interactions.",
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
};

/**
 * RootLayout - Root layout component for the entire application
 * 
 * Wraps all pages with:
 * - ThemeProvider for dark mode support
 * - Space Grotesk font for all text (body, headings, UI)
 * - Global styles
 * 
 * @param children - React children (page content)
 * @returns Root layout with theme provider
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning
      className={spaceGrotesk.variable}
    >
      <body className={spaceGrotesk.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
