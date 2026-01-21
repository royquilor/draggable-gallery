import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

/**
 * Inter font configuration
 * 
 * Using Inter as the primary font for the application.
 * This matches the design system used in the gallery component.
 */
const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
});

/**
 * Root layout metadata
 * 
 * Defines the default title and description for all pages.
 * Individual pages can override this with their own metadata.
 */
export const metadata: Metadata = {
  title: "Gallery",
  description: "Draggable canvas gallery",
};

/**
 * RootLayout - Root layout component for the entire application
 * 
 * Wraps all pages with:
 * - ThemeProvider for dark mode support
 * - Inter font
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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
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
