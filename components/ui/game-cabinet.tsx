"use client"

import { useState, useRef, useEffect } from "react"

interface GameDimensions {
  width: number
  height: number
}

interface GameProps {
  id: string
  title: string
  description: string
  difficulty: string
  imageUrl: string
  dimensions?: GameDimensions
  color: string
  isComingSoon?: boolean
}

interface GameCabinetProps {
  game: GameProps
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
}

export default function GameCabinet({ game, isHovered, onHover, onLeave }: GameCabinetProps) {
  const [isLoading, setIsLoading] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const imageRef = useRef<HTMLImageElement>()

  useEffect(() => {
    if (!game.dimensions || game.isComingSoon) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set up the canvas with the correct pixel ratio
    const pixelRatio = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()

    canvas.width = rect.width * pixelRatio
    canvas.height = rect.height * pixelRatio
    ctx.scale(pixelRatio, pixelRatio)

    // Load the game image
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = game.imageUrl
    imageRef.current = img

    img.onload = () => {
      setIsLoading(false)

      const drawFrame = () => {
        if (!canvas || !ctx || !img) return

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Calculate the scaling to maintain pixel aspect ratio
        const scale = Math.min(canvas.width / game.dimensions.width, canvas.height / game.dimensions.height)

        const scaledWidth = game.dimensions.width * scale
        const scaledHeight = game.dimensions.height * scale
        const x = (canvas.width - scaledWidth) / 2
        const y = (canvas.height - scaledHeight) / 2

        // Draw the game frame
        ctx.imageSmoothingEnabled = false
        ctx.drawImage(img, x, y, scaledWidth, scaledHeight)

        // Add scanlines effect
        ctx.fillStyle = "rgba(0, 0, 0, 0.2)"
        for (let i = 0; i < canvas.height; i += 2) {
          ctx.fillRect(0, i, canvas.width, 1)
        }

        // Add CRT vignette effect
        const gradient = ctx.createRadialGradient(
          canvas.width / 2,
          canvas.height / 2,
          0,
          canvas.width / 2,
          canvas.height / 2,
          canvas.width / 1.5,
        )
        gradient.addColorStop(0, "rgba(0, 0, 0, 0)")
        gradient.addColorStop(1, "rgba(0, 0, 0, 0.4)")
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        animationRef.current = requestAnimationFrame(drawFrame)
      }

      drawFrame()
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [game])

  return (
    <div className="relative group" onMouseEnter={onHover} onMouseLeave={onLeave}>
      <div
        className={`bg-gray-800 rounded-t-lg overflow-hidden transition-transform duration-300 ${
          isHovered ? "transform scale-105" : ""
        }`}
        style={{
          borderTop: `8px solid ${game.color}`,
          borderLeft: `4px solid ${game.color}`,
          borderRight: `4px solid ${game.color}`,
        }}
      >
        {/* Cabinet top */}
        <div className="h-6 bg-gray-900 flex items-center justify-center">
          <div className="w-16 h-2 bg-gray-700 rounded-full"></div>
        </div>

        {/* Game screen */}
        <div className="relative aspect-[4/3] bg-black overflow-hidden">
          {game.isComingSoon ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl animate-pulse">?</div>
            </div>
          ) : (
            <>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-t-transparent border-cyan-500 rounded-full animate-spin"></div>
                </div>
              )}

              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{
                  opacity: isLoading ? 0 : 1,
                  transition: "opacity 0.3s ease-in-out",
                }}
              />

              {/* Screen glare effect */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </>
          )}

          {/* Game title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-70">
            <h3 className="text-center font-bold text-sm" style={{ color: game.color }}>
              {game.title}
            </h3>
          </div>
        </div>

        {/* Cabinet controls */}
        <div className="p-4 bg-gray-900">
          <p className="text-xs text-gray-300 mb-2">{game.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-xs px-2 py-1 rounded-full bg-gray-800" style={{ color: game.color }}>
              {game.difficulty}
            </span>

            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Cabinet stand */}
      <div
        className="h-6 bg-gray-900 rounded-b-lg transition-transform duration-300"
        style={{
          borderBottom: `8px solid ${game.color}`,
          borderLeft: `4px solid ${game.color}`,
          borderRight: `4px solid ${game.color}`,
          transform: isHovered ? "scaleX(0.95) translateY(4px)" : "scaleX(1) translateY(0)",
        }}
      ></div>
    </div>
  )
}

