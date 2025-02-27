"use client"

import { useEffect, useRef } from "react"

export default function ArcadeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Animation variables
    let frame = 0
    const gridSize = 100
    const perspectiveOffset = canvas.height * 0.7

    // Particle system
    const particles: Array<{
      x: number
      y: number
      size: number
      speed: number
      color: string
    }> = []

    // Initialize particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.2,
        color: `rgba(95, 138, 241, ${Math.random() * 0.5 + 0.2})`,
      })
    }

    const drawFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create a rich gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "rgba(0, 0, 20, 1)")
      gradient.addColorStop(0.5, "rgba(13, 13, 26, 0.95)")
      gradient.addColorStop(1, "rgba(0, 0, 10, 0.9)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw perspective grid with depth effect
      ctx.strokeStyle = "rgba(99, 102, 241, 0.1)"
      ctx.lineWidth = 1

      // Vertical lines with perspective and movement
      for (let x = 0; x <= canvas.width * 2; x += gridSize) {
        const offset = (frame * 0.5) % gridSize
        ctx.beginPath()
        ctx.moveTo(x - offset, 0)
        const targetX = canvas.width / 2 + (x - canvas.width / 2) * 0.5
        const targetY = perspectiveOffset
        ctx.lineTo(targetX, targetY)

        // Add depth fade
        const gradient = ctx.createLinearGradient(x - offset, 0, targetX, targetY)
        gradient.addColorStop(0, "rgba(99, 102, 241, 0.1)")
        gradient.addColorStop(1, "rgba(99, 102, 241, 0.05)")
        ctx.strokeStyle = gradient
        ctx.stroke()
      }

      // Horizontal lines with perspective and glow
      for (let y = 0; y <= perspectiveOffset; y += gridSize) {
        const progress = y / perspectiveOffset
        const width = canvas.width * (1 - progress * 0.5)
        const xOffset = (canvas.width - width) / 2

        ctx.beginPath()
        ctx.moveTo(xOffset, y)
        ctx.lineTo(xOffset + width, y)

        // Add horizontal line glow
        const gradient = ctx.createLinearGradient(xOffset, y, xOffset + width, y)
        gradient.addColorStop(0, "rgba(99, 102, 241, 0.05)")
        gradient.addColorStop(0.5, "rgba(99, 102, 241, 0.1)")
        gradient.addColorStop(1, "rgba(99, 102, 241, 0.05)")
        ctx.strokeStyle = gradient
        ctx.stroke()
      }

      // Update and draw particles
      particles.forEach((particle) => {
        particle.y += particle.speed
        if (particle.y > canvas.height) {
          particle.y = 0
          particle.x = Math.random() * canvas.width
        }

        // Create particle glow effect
        const glow = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 2)
        glow.addColorStop(0, particle.color)
        glow.addColorStop(1, "rgba(95, 138, 241, 0)")

        ctx.beginPath()
        ctx.fillStyle = glow
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2)
        ctx.fill()
      })

      // Add subtle glow effects
      const glowCount = 3
      for (let i = 0; i < glowCount; i++) {
        const x = canvas.width / 2 + Math.cos(frame * 0.02 + i * ((Math.PI * 2) / glowCount)) * 200
        const y = canvas.height / 2 + Math.sin(frame * 0.02 + i * ((Math.PI * 2) / glowCount)) * 100

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 300)
        gradient.addColorStop(0, `rgba(${i * 50}, 102, 241, 0.05)`)
        gradient.addColorStop(0.5, `rgba(${i * 50}, 102, 241, 0.02)`)
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      // Add scanlines with varying opacity
      ctx.fillStyle = "rgba(255, 255, 255, 0.02)"
      for (let y = 0; y < canvas.height; y += 4) {
        const opacity = 0.02 + Math.sin(y * 0.01 + frame * 0.01) * 0.01
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
        ctx.fillRect(0, y, canvas.width, 1)
      }

      frame++
      requestAnimationFrame(drawFrame)
    }

    drawFrame()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} />
  )
}

