import DraggableCanvas from "@/components/draggable-canvas";
import type { Metadata } from "next";

/**
 * Home page metadata
 * 
 * Defines the title and description for the home page.
 * This appears in browser tabs and search results.
 */
export const metadata: Metadata = {
  title: "Explore",
  description: "Explore an interactive draggable canvas gallery. Browse curated collections with smooth animations, keyboard navigation, and dark mode support. Drag to navigate or use trackpad gestures.",
  keywords: ["gallery", "art gallery", "interactive gallery", "canvas", "draggable", "portfolio", "art collection"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Gallery - Explore Interactive Canvas",
    description: "Explore an interactive draggable canvas gallery. Browse curated collections with smooth animations, keyboard navigation, and dark mode support.",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery - Explore Interactive Canvas",
    description: "Explore an interactive draggable canvas gallery. Browse curated collections with smooth animations, keyboard navigation, and dark mode support.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * HomePage - Home page component
 * 
 * Displays the interactive draggable gallery directly on the home page.
 * 
 * @returns Home page with gallery
 */
export default function HomePage() {
  return <DraggableCanvas />;
}
