import { useEffect, useState } from "react"

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const

type Breakpoint = keyof typeof breakpoints

export function useScreenSize() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  )

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const lessThan = (breakpoint: Breakpoint) => width < breakpoints[breakpoint]
  const greaterThan = (breakpoint: Breakpoint) => width > breakpoints[breakpoint]

  return {
    width,
    lessThan,
    greaterThan,
  }
} 