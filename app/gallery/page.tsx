import DraggableCanvas from "@/components/draggable-canvas";
import type { Metadata } from "next";

/**
 * Gallery page metadata
 * 
 * Defines the title and description for the gallery page.
 * This appears in browser tabs and search results.
 */
export const metadata: Metadata = {
  title: "Gallery - Explore",
  description: "Draggable canvas gallery with tactile interactions",
  openGraph: {
    title: "Gallery - Explore",
    description: "Draggable canvas gallery with tactile interactions",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery - Explore",
    description: "Draggable canvas gallery with tactile interactions",
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
