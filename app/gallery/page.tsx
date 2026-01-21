import DraggableCanvas from "@/components/draggable-canvas";
import type { Metadata } from "next";

/**
 * Gallery page metadata
 * 
 * Defines the title and description for the gallery page.
 * This appears in browser tabs and search results.
 */
export const metadata: Metadata = {
  title: "Explore",
  description: "Explore an interactive draggable canvas gallery. Browse curated collections with smooth animations, keyboard navigation, and dark mode support. Drag to navigate or use trackpad gestures.",
  keywords: ["gallery", "art gallery", "interactive gallery", "canvas", "draggable", "portfolio", "art collection"],
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Gallery - Explore Interactive Canvas",
    description: "Explore an interactive draggable canvas gallery. Browse curated collections with smooth animations, keyboard navigation, and dark mode support.",
    type: "website",
    url: "/gallery",
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
 * GalleryPage - Main gallery page component
 * 
 * Renders the DraggableCanvas component which provides:
 * - Draggable canvas with spring physics
 * - Grid of gallery items
 * - Modal detail view
 * - Keyboard navigation
 * - Dark mode support
 * 
 * @returns Gallery page with draggable canvas
 */
export default function GalleryPage() {
  return <DraggableCanvas />;
}
