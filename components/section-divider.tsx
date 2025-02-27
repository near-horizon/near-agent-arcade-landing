"use client"

import { useEffect, useRef } from "react"

interface SectionDividerProps {
  position: "top" | "bottom"
  variant?: "glow" | "minimal"
}

export default function SectionDivider({ position, variant = "glow" }: SectionDividerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set up canvas with proper pixel ratio
    const pixelRatio = window.devicePixelRatio || 1
    canvas.width = canvas.offsetWidth * pixelRatio
    canvas.height = canvas.offsetHeight * pixelRatio
    ctx.scale(pixelRatio, pixelRatio)

    const drawGlowDivider = () => {
      // Create gradient for the glow effect
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
      gradient.addColorStop(0, "rgba(95, 138, 250, 0)")
      gradient.addColorStop(0.2, "rgba(95, 138, 250, 0.1)")
      gradient.addColorStop(0.5, "rgba(95, 138, 250, 0.2)")
      gradient.addColorStop(0.8, "rgba(95, 138, 250, 0.1)")
      gradient.addColorStop(1, "rgba(95, 138, 250, 0)")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add animated particles
      const time = Date.now() * 0.001
      for (let i = 0; i < 50; i++) {
        const x = (Math.sin(time + i) + 1) * 0.5 * canvas.width
        const y = (Math.cos(time * 0.5 + i) + 1) * 0.5 * canvas.height
        const size = Math.sin(time + i) * 2 + 2

        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(95, 138, 250, ${0.1 + Math.sin(time + i) * 0.05})`
        ctx.fill()
      }
    }

    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      if (variant === "glow") {
        drawGlowDivider()
      }
      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = canvas.offsetWidth * pixelRatio
      canvas.height = canvas.offsetHeight * pixelRatio
      ctx.scale(pixelRatio, pixelRatio)
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrame)
    }
  }, [variant])

  if (variant === "minimal") {
    return (
      <div className="relative h-px">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#5f8afa]/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#5f8afa]/10 to-transparent animate-glow" />
      </div>
    )
  }

  return (
    <div className="relative h-24">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ transform: position === "top" ? "rotate(180deg)" : "none" }}
      />
      <div
        className={`absolute inset-0 bg-gradient-to-b ${
          position === "top"
            ? "from-transparent to-[#0d0d1a] via-[#0d0d1a]/90"
            : "from-[#0d0d1a] to-transparent via-[#0d0d1a]/90"
        }`}
      />
      {/* Additional subtle gradient layers */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${
          position === "top" ? "from-[#5f8afa]/5 to-transparent" : "from-transparent to-[#5f8afa]/5"
        } opacity-50`}
      />
    </div>
  )
}

