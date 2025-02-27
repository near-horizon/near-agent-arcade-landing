"use client"

import { useEffect, useRef } from "react"

interface AgentVisualizerProps {
  className?: string
  gameId: string
}

export default function AgentVisualizer({ className = "", gameId }: AgentVisualizerProps) {
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

    let frame = 0
    const nodeCount = 20
    const nodes: { x: number; y: number; vx: number; vy: number }[] = []

    // Initialize nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw nodes
      ctx.strokeStyle = "rgba(0, 255, 255, 0.2)"
      ctx.lineWidth = 1

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]

        // Update position
        node.x += node.vx
        node.y += node.vy

        // Bounce off walls
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j]
          const dx = other.x - node.x
          const dy = other.y - node.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 50) {
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(other.x, other.y)
            ctx.stroke()
          }
        }

        // Draw node
        ctx.beginPath()
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(0, 255, 255, 0.5)"
        ctx.fill()
      }

      frame++
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      // Cleanup
    }
  }, [])

  return <canvas ref={canvasRef} className={`${className} opacity-30`} />
}

