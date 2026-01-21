"use client"

import { useState, useEffect, useRef, useMemo, useCallback } from "react"
import { motion, AnimatePresence, useReducedMotion, useMotionValue, useSpring, animate } from "motion/react"
import Image from "next/image"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

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
  { 
    id: 13, 
    title: "Urban Nightscape", 
    image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=600&fit=crop",
    description: "City lights create a vibrant tapestry of modern life.",
    aspectRatio: "landscape"
  },
  { 
    id: 14, 
    title: "Serene Waters", 
    image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=600&h=800&fit=crop",
    description: "Calm waters reflect the sky in perfect symmetry.",
    aspectRatio: "portrait"
  },
  { 
    id: 15, 
    title: "Abstract Forms", 
    image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&h=600&fit=crop",
    description: "Geometric shapes dance in colorful harmony.",
    aspectRatio: "landscape"
  },
  { 
    id: 16, 
    title: "Mountain Vista", 
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=800&fit=crop",
    description: "Majestic peaks reach toward endless skies.",
    aspectRatio: "portrait"
  },
  { 
    id: 17, 
    title: "Desert Dreams", 
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop",
    description: "Endless dunes create waves of golden sand.",
    aspectRatio: "landscape"
  },
  { 
    id: 18, 
    title: "Coastal Breeze", 
    image: "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=600&h=800&fit=crop",
    description: "Ocean waves meet the shore in rhythmic motion.",
    aspectRatio: "portrait"
  },
  { 
    id: 19, 
    title: "Forest Canopy", 
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
    description: "Sunlight filters through dense green leaves.",
    aspectRatio: "landscape"
  },
  { 
    id: 20, 
    title: "City Architecture", 
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=600&h=800&fit=crop",
    description: "Modern structures define the urban landscape.",
    aspectRatio: "portrait"
  },
  { 
    id: 21, 
    title: "Sunset Glow", 
    image: "https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?w=800&h=600&fit=crop",
    description: "Warm colors paint the evening sky.",
    aspectRatio: "landscape"
  },
  { 
    id: 22, 
    title: "Winter Silence", 
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=800&fit=crop",
    description: "Snow-covered landscapes in peaceful stillness.",
    aspectRatio: "portrait"
  },
  { 
    id: 23, 
    title: "Tropical Paradise", 
    image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&h=600&fit=crop",
    description: "Lush vegetation thrives in warm climates.",
    aspectRatio: "landscape"
  },
  { 
    id: 24, 
    title: "Starry Night", 
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=800&fit=crop",
    description: "Infinite stars illuminate the dark canvas above.",
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
  const contentRef = useRef<HTMLDivElement>(null)
  
  // Use Motion values for smooth, GPU-accelerated animations
  // These provide better performance than state updates for continuous animations
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  // Spring animations for smooth momentum-based movement
  // Lower damping = more bounce, higher damping = smoother/settles faster
  // Defined outside component or with useMemo to avoid recreating on every render
  const springConfig = useMemo(() => ({ stiffness: 300, damping: 30 }), [])
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)
  
  // Utility clamp used for drag + trackpad panning.
  const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

  /**
   * panBounds
   *
   * We use explicit numeric constraints (instead of ref constraints) so:
   * - dragging and trackpad panning share the same bounds
   * - we can clamp x/y updates for wheel/trackpad gestures
   */
  const [panBounds, setPanBounds] = useState({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  })

  // Keep latest state in refs for non-react event listeners (wheel).
  const panBoundsRef = useRef(panBounds)
  const selectedItemRef = useRef<GalleryItem | null>(selectedItem)
  const isAnimatingRef = useRef(false)
  const hasInitializedRef = useRef(false)

  useEffect(() => {
    panBoundsRef.current = panBounds
  }, [panBounds])

  useEffect(() => {
    selectedItemRef.current = selectedItem
  }, [selectedItem])

  /**
   * Compute pan bounds from actual rendered content size.
   *
   * This makes the canvas behave like a "scrollable" surface:
   * - x is clamped to [-(contentWidth - viewportWidth), 0]
   * - y is clamped to [-(contentHeight - viewportHeight), 0]
   *
   * If content fits in the viewport, bounds collapse to 0 (no panning needed).
   */
  useEffect(() => {
    const recalc = () => {
      const viewportEl = constraintsRef.current
      const contentEl = contentRef.current
      if (!viewportEl || !contentEl) return

      const viewportWidth = viewportEl.clientWidth
      const viewportHeight = viewportEl.clientHeight
      const contentRect = contentEl.getBoundingClientRect()
      const contentWidth = Math.ceil(contentRect.width)
      const contentHeight = Math.ceil(contentRect.height)

      const left = contentWidth > viewportWidth ? -(contentWidth - viewportWidth) : 0
      const right = 0
      const top = contentHeight > viewportHeight ? -(contentHeight - viewportHeight) : 0
      const bottom = 0

      // Only update bounds if they actually changed to prevent infinite loops
      setPanBounds((prev) => {
        if (
          prev.left === left &&
          prev.right === right &&
          prev.top === top &&
          prev.bottom === bottom
        ) {
          return prev // Return same object reference if unchanged
        }
        return { left, right, top, bottom }
      })

      // On first load, set an initial "camera" focus toward the middle of row 1.
      // On resize, keep the user’s current position but clamp it into the new bounds.
      // On first load only, calculate and center on the true middle of the content.
      // This works for any number of items by finding the middle row and middle item.
      if (!hasInitializedRef.current) {
        const itemsPerRow = 7
        const totalItems = SAMPLE_ITEMS.length
        const totalRows = Math.ceil(totalItems / itemsPerRow)
        
        // Find the middle row (0-indexed)
        const middleRowIndex = Math.floor(totalRows / 2)
        
        // Find the items in the middle row
        const middleRowStart = middleRowIndex * itemsPerRow
        const middleRowEnd = Math.min(middleRowStart + itemsPerRow, totalItems)
        const middleRowItemCount = middleRowEnd - middleRowStart
        
        // Find the middle item index within that row (0-indexed)
        const middleItemIndexInRow = Math.floor(middleRowItemCount / 2)
        
        // Calculate X position to center the middle item horizontally
        const itemWidth = 200 // size-[200px] wrapper
        const itemGap = 200
        const centerItemXPosition = (middleItemIndexInRow * (itemWidth + itemGap)) + (itemWidth / 2)
        const offsetX = centerItemXPosition - (viewportWidth / 2)
        
        // Calculate Y position to center the middle row vertically
        const itemHeight = 112 // Height of items
        const rowGap = 200
        const padding = 100
        // Position of the middle of the middle row
        const centerRowYPosition = padding + (middleRowIndex * (itemHeight + rowGap)) + (itemHeight / 2)
        const offsetY = centerRowYPosition - (viewportHeight / 2)

        const clampedX = clamp(-offsetX, left, right)
        const clampedY = clamp(-offsetY, top, bottom)
        
        // Set initial position directly (no animation on first load)
        x.set(clampedX)
        y.set(clampedY)
        hasInitializedRef.current = true
      } else {
        // On resize, just clamp the current position to new bounds
        const currentX = x.get()
        const currentY = y.get()
        const clampedX = clamp(currentX, left, right)
        const clampedY = clamp(currentY, top, bottom)
        
        // Only update if position needs clamping (avoid unnecessary animations)
        if (Math.abs(clampedX - currentX) > 1 || Math.abs(clampedY - currentY) > 1) {
          animate(x, clampedX, { type: "spring", ...springConfig })
          animate(y, clampedY, { type: "spring", ...springConfig })
        }
      }
    }

    // Use requestAnimationFrame to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      recalc()
    }, 0)

    window.addEventListener("resize", recalc)
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener("resize", recalc)
    }
  }, []) // Empty deps - only run on mount and resize (not when x/y change)

  /**
   * Trackpad swipe support with smooth momentum (two-finger scroll → pan the canvas)
   *
   * On macOS trackpads, "swipe" gestures produce wheel events (deltaX/deltaY).
   * We translate those deltas into smooth, momentum-based x/y movement.
   *
   * Performance optimizations:
   * - Uses requestAnimationFrame for throttling to maintain 60fps
   * - Motion's spring values provide GPU-accelerated animations
   * - Prevents unnecessary re-renders by using motion values directly
   *
   * Accessibility wins:
   * - Users can explore without click+drag
   * - Works with trackpads and mice with tilt wheels
   * - Smooth animations respect prefers-reduced-motion
   */
  useEffect(() => {
    const viewportEl = constraintsRef.current
    if (!viewportEl) return

    let wheelTimeout: ReturnType<typeof setTimeout> | null = null
    let rafId: number | null = null
    let pendingUpdate = false

    const onWheel = (e: WheelEvent) => {
      // If the modal is open, don't hijack scrolling (let modal scroll naturally).
      if (selectedItemRef.current) return

      // Prevent the browser/page from scrolling.
      e.preventDefault()

      // Throttle updates using requestAnimationFrame for smooth 60fps performance
      if (!pendingUpdate) {
        pendingUpdate = true
        rafId = requestAnimationFrame(() => {
          const { left, right, top, bottom } = panBoundsRef.current
          const currentX = x.get()
          const currentY = y.get()

          // Simple, direct position update - the spring will smooth it
          const speed = 1.0
          const newX = clamp(currentX - e.deltaX * speed, left, right)
          const newY = clamp(currentY - e.deltaY * speed, top, bottom)

          // Update position immediately - springX/springY will provide smooth interpolation
          x.set(newX)
          y.set(newY)

          pendingUpdate = false
        })
      }

      // Clear any pending timeout
      if (wheelTimeout) {
        clearTimeout(wheelTimeout)
      }

      // After wheel stops, ensure smooth final position (spring will handle deceleration)
      wheelTimeout = setTimeout(() => {
        // No-op - the spring already provides smooth deceleration
        // This just ensures we don't have any lingering animations
      }, 100)
    }

    // Important: passive:false so we can call preventDefault().
    viewportEl.addEventListener("wheel", onWheel, { passive: false })
    return () => {
      if (wheelTimeout) clearTimeout(wheelTimeout)
      if (rafId) cancelAnimationFrame(rafId)
      viewportEl.removeEventListener("wheel", onWheel as EventListener)
    }
  }, [])

  // Calculate item dimensions - memoized to prevent recalculation
  const itemHeight = 112
  const getItemWidth = useCallback((aspectRatio: "portrait" | "landscape") => {
    return aspectRatio === "portrait" 
      ? Math.round(itemHeight * (3/4)) 
      : Math.round(itemHeight * (4/3))
  }, [])


  // URL state management - sync selected item with URL query params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const itemId = params.get("item")
    if (itemId) {
      // Validate and sanitize input - only allow numeric IDs
      const parsedId = parseInt(itemId, 10)
      if (!isNaN(parsedId) && parsedId > 0) {
        const item = SAMPLE_ITEMS.find(i => i.id === parsedId)
        if (item) setSelectedItem(item)
      }
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

  /**
   * Navigate to previous item in the gallery
   */
  const navigateToPrevious = useCallback(() => {
    if (!selectedItem) return
    
    const currentIndex = SAMPLE_ITEMS.findIndex(item => item.id === selectedItem.id)
    if (currentIndex > 0) {
      const previousItem = SAMPLE_ITEMS[currentIndex - 1]
      setSelectedItem(previousItem)
      // Update URL to reflect the new item
      const params = new URLSearchParams(window.location.search)
      params.set("item", previousItem.id.toString())
      window.history.pushState({}, "", `?${params.toString()}`)
    } else {
      // Wrap around to last item
      const lastItem = SAMPLE_ITEMS[SAMPLE_ITEMS.length - 1]
      setSelectedItem(lastItem)
      const params = new URLSearchParams(window.location.search)
      params.set("item", lastItem.id.toString())
      window.history.pushState({}, "", `?${params.toString()}`)
    }
  }, [selectedItem])

  /**
   * Navigate to next item in the gallery
   */
  const navigateToNext = useCallback(() => {
    if (!selectedItem) return
    
    const currentIndex = SAMPLE_ITEMS.findIndex(item => item.id === selectedItem.id)
    if (currentIndex < SAMPLE_ITEMS.length - 1) {
      const nextItem = SAMPLE_ITEMS[currentIndex + 1]
      setSelectedItem(nextItem)
      // Update URL to reflect the new item
      const params = new URLSearchParams(window.location.search)
      params.set("item", nextItem.id.toString())
      window.history.pushState({}, "", `?${params.toString()}`)
    } else {
      // Wrap around to first item
      const firstItem = SAMPLE_ITEMS[0]
      setSelectedItem(firstItem)
      const params = new URLSearchParams(window.location.search)
      params.set("item", firstItem.id.toString())
      window.history.pushState({}, "", `?${params.toString()}`)
    }
  }, [selectedItem])

  // Keyboard navigation - ESC to close modal, Arrow keys to navigate
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedItem) return

      switch (e.key) {
        case "Escape":
          closeDetail()
          break
        case "ArrowLeft":
          e.preventDefault()
          navigateToPrevious()
          break
        case "ArrowRight":
          e.preventDefault()
          navigateToNext()
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedItem, navigateToPrevious, navigateToNext])

  // Disable text selection during drag for better UX
  const handleDragStart = () => {
    document.body.style.userSelect = 'none'
  }

  const handleDragEnd = () => {
    document.body.style.userSelect = ''
  }

  // Stagger animation variants for grid items - memoized to prevent recreation
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.05,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      }
    }
  }), [shouldReduceMotion])

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.6,
        ease: [0.22, 1, 0.36, 1] as const
      }
    }
  }), [shouldReduceMotion])

  // Structured data (JSON-LD) for SEO
  // Use state to avoid hydration mismatch - set after client-side mount
  const [structuredData, setStructuredData] = useState<string | null>(null)

  useEffect(() => {
    // Set structured data after hydration to avoid mismatch
    const data = {
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      "name": "Interactive Gallery",
      "description": "An interactive draggable canvas gallery featuring curated art collections with smooth animations and tactile interactions",
      "url": window.location.origin,
      "image": SAMPLE_ITEMS.slice(0, 4).map(item => item.image),
      "numberOfItems": SAMPLE_ITEMS.length,
    }
    setStructuredData(JSON.stringify(data))
  }, [])

  return (
    <>
      {/* Structured data for SEO - only render after hydration */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredData }}
        />
      )}
      <div 
        ref={constraintsRef}
        className="fixed inset-0 overflow-hidden bg-background touch-manipulation"
        style={{ touchAction: "none" }}
        role="main"
        aria-label="Interactive gallery"
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

      {/* Header with title and instruction - hidden */}
      <header className="fixed top-0 left-0 right-0 z-20 px-6 py-4 md:px-12 md:py-6 flex items-center justify-between pointer-events-none hidden" aria-hidden="true">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="text-2xl md:text-3xl font-light text-foreground pointer-events-auto font-display"
        >
          Gallery
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay: 0.1 }}
          className="text-sm text-muted-foreground pointer-events-auto font-body"
        >
          Drag to explore
        </motion.div>
      </header>

      {/* Draggable Canvas - follows Figma code pattern exactly */}
      <motion.div
        drag
        dragConstraints={panBounds}
        dragElastic={0.1}
        dragTransition={{ 
          bounceStiffness: 300, 
          bounceDamping: 20
        }}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDrag={(event, info) => {
          // Update motion values directly during drag for smooth interaction
          x.set(info.offset.x)
          y.set(info.offset.y)
        }}
        className="absolute cursor-grab active:cursor-grabbing"
        style={{
          x: springX,
          y: springY,
        }}
      >
        <div
          ref={contentRef}
          className="flex flex-col gap-[200px] items-center justify-center p-[100px] min-h-dvh"
          role="region"
          aria-label="Gallery items"
        >
          {/* Row 1 - Items 1-7 */}
          <motion.section 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex gap-[200px] items-center justify-center"
            aria-label="Gallery row 1"
          >
            {SAMPLE_ITEMS.slice(0, 7).map((item) => {
              const width = getItemWidth(item.aspectRatio || "landscape")
              return (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center size-[200px] cursor-pointer shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
                  <div className="relative shadow-none" style={{ width: width, height: itemHeight }}>
                    <Image
                      src={item.image}
                      alt={`${item.title} - ${item.description}`}
                      width={width}
                      height={itemHeight}
                      sizes={`${width}px`}
                      className="absolute inset-0 max-w-none object-cover pointer-events-none size-full rounded-md"
                      priority={item.id <= 4}
                      loading={item.id <= 4 ? undefined : "lazy"}
                    />
                    {/* Title overlay on hover - hidden */}
                    <motion.div 
                      initial={{ opacity: 0, y: "100%" }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 via-transparent to-transparent hidden"
                    >
                      <h3 className="text-xs font-light text-white font-display line-clamp-2">
                        {item.title}
                      </h3>
                    </motion.div>
                  </div>
                </motion.div>
              )
            })}
          </motion.section>

          {/* Row 2 - Items 8-14 */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex gap-[200px] items-center justify-center"
            aria-label="Gallery row 2"
          >
            {SAMPLE_ITEMS.slice(7, 14).map((item) => {
              const width = getItemWidth(item.aspectRatio || "landscape")
              return (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center size-[200px] cursor-pointer shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
                  <div className="relative shadow-none" style={{ width: width, height: itemHeight }}>
                    <Image
                      src={item.image}
                      alt={`${item.title} - ${item.description}`}
                      width={width}
                      height={itemHeight}
                      sizes={`${width}px`}
                      className="absolute inset-0 max-w-none object-cover pointer-events-none size-full rounded-md"
                    />
                    {/* Title overlay on hover - hidden */}
                    <motion.div 
                      initial={{ opacity: 0, y: "100%" }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 via-transparent to-transparent hidden"
                    >
                      <h3 className="text-xs font-light text-white font-display line-clamp-2">
                        {item.title}
                      </h3>
                    </motion.div>
                  </div>
                </motion.div>
              )
            })}
          </motion.section>

          {/* Row 3 - Items 15-21 */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex gap-[200px] items-center justify-center"
            aria-label="Gallery row 3"
          >
            {SAMPLE_ITEMS.slice(14, 21).map((item) => {
              const width = getItemWidth(item.aspectRatio || "landscape")
              return (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center size-[200px] cursor-pointer shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
                  <div className="relative shadow-none" style={{ width: width, height: itemHeight }}>
                    <Image
                      src={item.image}
                      alt={`${item.title} - ${item.description}`}
                      width={width}
                      height={itemHeight}
                      sizes={`${width}px`}
                      className="absolute inset-0 max-w-none object-cover pointer-events-none size-full rounded-md"
                    />
                    {/* Title overlay on hover - hidden */}
                    <motion.div 
                      initial={{ opacity: 0, y: "100%" }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 via-transparent to-transparent hidden"
                    >
                      <h3 className="text-xs font-light text-white font-display line-clamp-2">
                        {item.title}
                      </h3>
                    </motion.div>
                  </div>
                </motion.div>
              )
            })}
          </motion.section>

          {/* Row 4 - Items 22-24 (centered) */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex gap-[200px] items-center justify-center"
            aria-label="Gallery row 4"
          >
            {SAMPLE_ITEMS.slice(21, 24).map((item) => {
              const width = getItemWidth(item.aspectRatio || "landscape")
              return (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center size-[200px] cursor-pointer shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
                  <div className="relative shadow-none" style={{ width: width, height: itemHeight }}>
                    <Image
                      src={item.image}
                      alt={`${item.title} - ${item.description}`}
                      width={width}
                      height={itemHeight}
                      sizes={`${width}px`}
                      className="absolute inset-0 max-w-none object-cover pointer-events-none size-full rounded-md"
                    />
                    {/* Title overlay on hover - hidden */}
                    <motion.div 
                      initial={{ opacity: 0, y: "100%" }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 via-transparent to-transparent hidden"
                    >
                      <h3 className="text-xs font-light text-white font-display line-clamp-2">
                        {item.title}
                      </h3>
                    </motion.div>
                  </div>
                </motion.div>
              )
            })}
          </motion.section>
        </div>
      </motion.div>

      {/* Enhanced Lightbox Modal with backdrop blur */}
      <AnimatePresence mode="wait">
        {selectedItem && (
          <>
            {/* Backdrop with blur effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.3 }}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
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
                  className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
                        alt={`${selectedItem.title} - ${selectedItem.description}`}
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
                      <h1 className="text-4xl md:text-5xl font-light text-foreground font-display text-balance">
                        {selectedItem.title}
                      </h1>
                    </motion.div>
                    
                    <motion.p 
                      variants={{
                        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
                        show: { opacity: 1, y: 0 }
                      }}
                      className="text-lg text-muted-foreground font-body leading-relaxed text-pretty"
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
                          <dd className="text-foreground tabular-nums">#{String(selectedItem.id).padStart(3, "0")}</dd>
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
    </>
  )
}
