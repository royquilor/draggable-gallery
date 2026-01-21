"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

/**
 * Error Boundary Component
 * 
 * Catches and displays errors that occur in the application.
 * Provides a user-friendly error message and option to reset.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("Error:", error)
    }
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="max-w-md w-full space-y-4 text-center">
        <h2 className="text-2xl font-semibold text-foreground">
          Something went wrong!
        </h2>
        <p className="text-muted-foreground">
          An unexpected error occurred. Please try again.
        </p>
        {error.digest && (
          <p className="text-xs text-muted-foreground">
            Error ID: {error.digest}
          </p>
        )}
        <div className="flex gap-4 justify-center">
          <Button onClick={() => reset()}>Try again</Button>
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/gallery")}
          >
            Go to Gallery
          </Button>
        </div>
      </div>
    </div>
  )
}
