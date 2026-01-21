"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import Image from "next/image"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

/**
 * GalleryItem - Interface for gallery items
 * 
 * Defines the structure of each gallery item with image, title, description,
 * and optional aspect ratio for proper layout.
 */
interface GalleryItem {
  id: number
  title: string
  image: string
  description: string
  aspectRatio?: "portrait" | "landscape"
}

/**
 * SAMPLE_ITEMS - Sample gallery data
 * 
 * Replace this with your actual API data.
 * Each item includes an image URL, title, description, and aspect ratio.
 */
const SAMPLE_ITEMS: GalleryItem[] = [
  { 
    id: 1, 
    title: "Ethereal Landscape", 
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=800&fit=crop",
    description: "Misty mountains at dawn create a sense of infinite space and tranquility.",
    aspectRatio: "portrait"
  },
  { 
    id: 2, 
    title: "Urban Geometry", 
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=600&h=800&fit=crop",
    description: "Abstract architectural forms intersect in unexpected ways.",
    aspectRatio: "portrait"
  },
  { 
    id: 3, 
    title: "Natural Textures", 
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
    description: "Forest path in autumn reveals nature's subtle color palette.",
    aspectRatio: "landscape"
  },
  { 
    id: 4, 
    title: "Chromatic Study", 
    image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=600&h=800&fit=crop",
    description: "Vibrant color exploration through layered transparencies.",
    aspectRatio: "portrait"
  },
  { 
    id: 5, 
    title: "Minimal Form", 
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop",
    description: "Study in negative space and deliberate restraint.",
    aspectRatio: "landscape"
  },
  { 
    id: 6, 
    title: "Dynamic Motion", 
    image: "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=600&h=800&fit=crop",
    description: "Captured movement frozen in time.",
    aspectRatio: "portrait"
  },
  { 
    id: 7, 
    title: "Organic Flow", 
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop",
    description: "Water and light interact in unexpected patterns.",
    aspectRatio: "landscape"
  },
  { 
    id: 8, 
    title: "Industrial Poetry", 
    image: "https://images.unsplash.com/photo-1470790376778-a9fbc86d70e2?w=600&h=800&fit=crop",
    description: "Beauty found in manufactured forms and utilitarian design.",
    aspectRatio: "portrait"
  },
  { 
    id: 9, 
    title: "Soft Gradients", 
    image: "https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?w=800&h=600&fit=crop",
    description: "Sunset over water blends earth and sky seamlessly.",
    aspectRatio: "landscape"
  },
  { 
    id: 10, 
    title: "Sharp Contrast", 
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=800&fit=crop",
    description: "Light and shadow play creates dramatic depth.",
    aspectRatio: "portrait"
  },
  { 
    id: 11, 
    title: "Fluid Composition", 
    image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&h=600&fit=crop",
    description: "Botanical study revealing organic patterns.",
    aspectRatio: "landscape"
  },
  { 
    id: 12, 
    title: "Monochrome Mood", 
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=800&fit=crop",
    description: "Black and white study emphasizing form and texture.",
    aspectRatio: "portrait"
  },
]

/**
 * DraggableCanvas - Main gallery component with draggable canvas
 * 
 * Features:
 * - Draggable canvas with spring physics
 * - Grid of gallery items with hover effects
 * - Modal detail view with smooth animations
 * - Keyboard navigation (ESC to close)
 * - URL state management (deep linking)
 * - Reduced motion support for accessibility
 * - Touch-friendly drag interactions
 * 
 * @returns DraggableCanvas component
 */
export default function DraggableCanvas() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const shouldReduceMotion = useReducedMotion()
  const constraintsRef = useRef<HTMLDivElement>(null)

  // URL state management - sync selected item with URL query params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const itemId = params.get("item")
    if (itemId) {
      const item = SAMPLE_ITEMS.find(i => i.id === parseInt(itemId))
      if (item) setSelectedItem(item)
    }
  }, [])

  /**
   * openDetail - Opens the detail modal for an item
   * 
   * Updates both state and URL to support deep linking and browser back/forward.
   */
  const openDetail = (item: GalleryItem) => {
    setSelectedItem(item)
    const params = new URLSearchParams(window.location.search)
    params.set("item", item.id.toString())
    window.history.pushState({}, "", `?${params.toString()}`)
  }

  /**
   * closeDetail - Closes the detail modal
   * 
   * Clears state and removes item from URL query params.
   */
  const closeDetail = () => {
    setSelectedItem(null)
    const params = new URLSearchParams(window.location.search)
    params.delete("item")
    const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname
    window.history.pushState({}, "", newUrl)
  }

  // Keyboard navigation - ESC key closes modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedItem) {
        closeDetail()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedItem])

  // Disable text selection during drag for better UX
  const handleDragStart = () => {
    document.body.style.userSelect = 'none'
  }

  const handleDragEnd = () => {
    document.body.style.userSelect = ''
  }

  // Stagger animation variants for grid items
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.05,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.6,
        ease: [0.22, 1, 0.36, 1] as const
      }
    }
  }

  return (
    <div 
      ref={constraintsRef}
      className="fixed inset-0 overflow-hidden bg-background touch-manipulation"
    >
      {/* Custom fonts - Instrument Serif for display, Inter for body */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600&display=swap');
        
        .font-display {
          font-family: 'Instrument Serif', serif;
        }
        
        .font-body {
          font-family: 'Inter', sans-serif;
        }
      `}</style>

      {/* Header with title and instruction */}
      <header className="fixed top-0 left-0 right-0 z-20 px-6 py-4 md:px-12 md:py-6 flex items-center justify-between pointer-events-none">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="text-2xl md:text-3xl font-light text-foreground pointer-events-auto font-display"
        >
          Gallery
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay: 0.1 }}
          className="text-sm text-muted-foreground pointer-events-auto font-body"
        >
          Drag to explore
        </motion.div>
      </header>

      {/* Draggable Canvas with enhanced spring physics */}
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        dragTransition={{ 
          bounceStiffness: 300, 
          bounceDamping: 20,
          power: 0.2,
          timeConstant: 200
        }}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
        style={{ touchAction: "none" }}
      >
        <div className="relative min-w-[200vw] min-h-[200vh] p-[10vw]">
          {/* Grid with stagger animation */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12 max-w-[180vw] mx-auto"
          >
            {SAMPLE_ITEMS.map((item) => (
              <motion.article
                key={item.id}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  transition: { 
                    duration: 0.3,
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }
                }}
                whileTap={{ scale: 0.95 }}
                className="group"
                style={{ pointerEvents: "auto" }}
                onClick={(e) => {
                  e.stopPropagation()
                  openDetail(item)
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    openDetail(item)
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${item.title}`}
              >
                <Card className="relative overflow-hidden border-0 bg-muted/50 backdrop-blur-sm">
                  <div 
                    className="relative"
                    style={{ 
                      aspectRatio: item.aspectRatio === "portrait" ? "3/4" : "4/3" 
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      style={{ willChange: "transform" }}
                      priority={item.id <= 4}
                    />
                    
                    {/* Animated gradient overlay on hover */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                    />
                    
                    {/* Title overlay with slide-up animation on hover */}
                    <motion.div 
                      initial={{ y: "100%" }}
                      whileHover={{ y: 0 }}
                      transition={{ 
                        duration: 0.3,
                        ease: [0.22, 1, 0.36, 1] as const
                      }}
                      className="absolute bottom-0 left-0 right-0 p-4"
                    >
                      <h3 className="text-lg font-light text-white font-display">
                        {item.title}
                      </h3>
                    </motion.div>
                  </div>
                </Card>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Lightbox Modal with backdrop blur */}
      <AnimatePresence mode="wait">
        {selectedItem && (
          <>
            {/* Backdrop with blur effect */}
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.3 }}
              className="fixed inset-0 z-50 bg-black/90"
              onClick={closeDetail}
            />

            {/* Modal content with spring animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{
                type: shouldReduceMotion ? "tween" : "spring",
                damping: 25,
                stiffness: 300,
                duration: shouldReduceMotion ? 0.01 : undefined
              }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 pointer-events-none"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative max-w-6xl w-full bg-card rounded-lg overflow-hidden pointer-events-auto shadow-2xl">
                {/* Close button with rotation on hover */}
                <motion.button
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 90,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeDetail}
                  className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
                  aria-label="Close detail view"
                >
                  <X className="w-5 h-5 text-foreground" />
                </motion.button>

                <div className="grid md:grid-cols-2 gap-0 max-h-[90vh] overflow-y-auto">
                  {/* Image section */}
                  <div className="relative bg-muted min-h-[40vh] md:min-h-full">
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="relative w-full h-full min-h-[40vh]"
                    >
                      <Image
                        src={selectedItem.image}
                        alt={selectedItem.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                        priority
                      />
                    </motion.div>
                  </div>

                  {/* Content section with stagger animation */}
                  <motion.div 
                    initial="hidden"
                    animate="show"
                    variants={{
                      hidden: { opacity: 0 },
                      show: {
                        opacity: 1,
                        transition: {
                          staggerChildren: shouldReduceMotion ? 0 : 0.1,
                          delayChildren: shouldReduceMotion ? 0 : 0.2,
                        }
                      }
                    }}
                    className="p-8 md:p-12 flex flex-col justify-center space-y-6"
                  >
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
                        show: { opacity: 1, y: 0 }
                      }}
                    >
                      <h2 className="text-4xl md:text-5xl font-light text-foreground font-display">
                        {selectedItem.title}
                      </h2>
                    </motion.div>
                    
                    <motion.p 
                      variants={{
                        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
                        show: { opacity: 1, y: 0 }
                      }}
                      className="text-lg text-muted-foreground font-body leading-relaxed"
                    >
                      {selectedItem.description}
                    </motion.p>
                    
                    <motion.div 
                      variants={{
                        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
                        show: { opacity: 1, y: 0 }
                      }}
                      className="flex gap-4 pt-4"
                    >
                      <Button size="lg" className="font-body">
                        View Full Size
                      </Button>
                      <Button size="lg" variant="outline" className="font-body">
                        Add to Collection
                      </Button>
                    </motion.div>

                    {/* Metadata section */}
                    <motion.div 
                      variants={{
                        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
                        show: { opacity: 1, y: 0 }
                      }}
                      className="pt-8 mt-8 border-t"
                    >
                      <dl className="space-y-3 text-sm font-body">
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Item</dt>
                          <dd className="text-foreground">#{String(selectedItem.id).padStart(3, "0")}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Type</dt>
                          <dd className="text-foreground">Image</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Format</dt>
                          <dd className="text-foreground">JPEG</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Aspect Ratio</dt>
                          <dd className="text-foreground capitalize">{selectedItem.aspectRatio}</dd>
                        </div>
                      </dl>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
