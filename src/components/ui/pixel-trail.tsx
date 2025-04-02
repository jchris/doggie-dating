import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

interface PixelTrailProps {
  pixelSize?: number
  fadeDuration?: number
  delay?: number
  pixelClassName?: string
}

export function PixelTrail({
  pixelSize = 32,
  fadeDuration = 0.5,
  delay = 0,
  pixelClassName = "",
}: PixelTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [pixels, setPixels] = useState<{ x: number; y: number; id: number }[]>([])
  const nextPixelId = useRef(0)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    let timeoutId: number

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Add new pixel
      const newPixel = { x, y, id: nextPixelId.current++ }
      setPixels((prev) => [...prev, newPixel])

      // Remove pixel after animation
      setTimeout(() => {
        setPixels((prev) => prev.filter((p) => p.id !== newPixel.id))
      }, fadeDuration * 1000)
    }

    timeoutId = window.setTimeout(() => {
      container.addEventListener("mousemove", handleMouseMove)
    }, delay)

    return () => {
      window.clearTimeout(timeoutId)
      container.removeEventListener("mousemove", handleMouseMove)
    }
  }, [delay, fadeDuration])

  useEffect(() => {
    pixels.forEach((pixel) => {
      const element = document.getElementById(`pixel-${pixel.id}`)
      if (element) {
        gsap.to(element, {
          opacity: 0,
          duration: fadeDuration,
          ease: "power2.out",
        })
      }
    })
  }, [pixels, fadeDuration])

  return (
    <div ref={containerRef} className="w-full h-full relative">
      {pixels.map((pixel) => (
        <div
          key={pixel.id}
          id={`pixel-${pixel.id}`}
          className={`absolute rounded-full ${pixelClassName}`}
          style={{
            width: pixelSize,
            height: pixelSize,
            transform: `translate(${pixel.x - pixelSize / 2}px, ${
              pixel.y - pixelSize / 2
            }px)`,
          }}
        />
      ))}
    </div>
  )
} 