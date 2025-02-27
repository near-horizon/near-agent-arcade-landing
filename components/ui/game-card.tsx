"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Info } from "lucide-react"
import ArcadeButton from "./arcade-button"

interface GameCardProps {
  game: {
    id: string
    title: string
    description: string
    difficulty: string
    imageUrl: string
    color: string
    trainingTime?: string
    isComingSoon?: boolean
  }
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
}

export default function GameCard({ game, isHovered, onHover, onLeave }: GameCardProps) {
  return (
    <motion.div
      className="relative group"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className={`relative bg-black rounded-lg overflow-hidden transition-all duration-300`}
        style={{
          borderTop: `4px solid ${game.color}`,
          borderLeft: `2px solid ${game.color}`,
          borderRight: `2px solid ${game.color}`,
          borderBottom: `4px solid ${game.color}`,
          boxShadow: isHovered ? `0 0 20px ${game.color}20` : "none",
        }}
      >
        {/* Game Preview */}
        <div className="relative aspect-[4/3] bg-black">
          <Image
            src={game.imageUrl || "/placeholder.svg"}
            alt={game.title}
            fill
            className="object-contain transition-all duration-300 pixel-perfect"
            unoptimized={!game.isComingSoon}
          />

          {/* Scanlines */}
          <div className="absolute inset-0 bg-scanlines opacity-20 pointer-events-none" />

          {/* Screen Glare */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Game Info Overlay */}
          <div className="absolute inset-x-0 bottom-0 p-3 bg-black/80 backdrop-blur-sm">
            <h3 className="text-lg font-bold" style={{ color: game.color }}>
              {game.title}
            </h3>
            <p className="text-sm text-gray-300 mt-1">{game.description}</p>
          </div>
        </div>

        {/* Game Details */}
        <div className="p-4 bg-black/50">
          <div className="flex items-center justify-between">
            <motion.span
              className="inline-flex items-center px-2 py-1 rounded-full text-xs"
              style={{ backgroundColor: `${game.color}20`, color: game.color }}
              whileHover={{ scale: 1.05 }}
            >
              {game.difficulty}
            </motion.span>

            {game.trainingTime && (
              <div className="flex items-center gap-1">
                <Info size={12} className="text-gray-400" />
                <span className="text-xs text-gray-400">{game.trainingTime}</span>
              </div>
            )}
          </div>
        </div>

        {/* Hover Info */}
        {isHovered && !game.isComingSoon && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-black/90 backdrop-blur-sm"
          >
            <p className="text-gray-300 text-sm mb-4">
              Train an AI agent to master {game.title} using deep reinforcement learning.
            </p>
            <ArcadeButton href="https://github.com/jbarnes850/agent-arcade" variant="secondary" className="text-sm">
              Start Training
            </ArcadeButton>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

