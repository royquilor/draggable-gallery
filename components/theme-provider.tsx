"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

/**
 * ThemeProvider - Wrapper component for next-themes
 * 
 * Provides theme context (light/dark/system) to the entire application.
 * This is a client component wrapper around next-themes ThemeProvider.
 * 
 * @param props - Props for ThemeProvider (attribute, defaultTheme, enableSystem, etc.)
 * @returns ThemeProvider component with children
 */
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
