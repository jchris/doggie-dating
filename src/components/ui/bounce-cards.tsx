import { useEffect, useRef } from "react"
import gsap from "gsap"

interface BounceCardsProps {
  images: string[]
  containerWidth: number
  containerHeight: number
  animationDelay?: number
  animationStagger?: number
  easeType?: string
  transformStyles?: string[]
  className?: string
}

export function BounceCards({
  images,
  containerWidth,
  containerHeight,
  animationDelay = 1,
  animationStagger = 0.08,
  easeType = "elastic.out(1, 0.5)",
  transformStyles,
  className = "",
}: BounceCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const cards = container.querySelectorAll(".bounce-card")

    gsap.fromTo(
      cards,
      {
        opacity: 0,
        scale: 0.5,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: animationStagger,
        ease: easeType,
        delay: animationDelay,
      }
    )
  }, [animationDelay, animationStagger, easeType])

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{
        width: containerWidth,
        height: containerHeight,
      }}
    >
      {images.map((image, index) => (
        <div
          key={index}
          className="bounce-card absolute top-0 left-0 w-full h-full"
          style={{
            transform: transformStyles?.[index],
          }}
        >
          <img
            src={image}
            alt={`Card ${index + 1}`}
            className="w-full h-full object-cover rounded-xl shadow-2xl"
          />
        </div>
      ))}
    </div>
  )
} 