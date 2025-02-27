"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import PixelText from "./ui/pixel-text"
import SectionDivider from "./section-divider"
import GameCard from "./ui/game-card"

export default function GamesSection() {
  const [hoveredGame, setHoveredGame] = useState<string | null>(null)

  const games = [
    {
      id: "pong",
      title: "Pong",
      description: "Simple paddle vs paddle",
      difficulty: "Beginner Friendly",
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Pong%20GIF%20-%20ALE%20Documentation-hKiAD0UbirUVgBLMbfosiaYBFjMVJB.gif",
      color: "#4ade80",
      trainingTime: "~1 hour",
    },
    {
      id: "space-invaders",
      title: "Space Invaders",
      description: "Defend Earth from aliens",
      difficulty: "Intermediate",
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Space%20Invaders%20GIF-7cvhOOUf1swvjAOyFMfudMEVmbxuyG.gif",
      color: "#60a5fa",
      trainingTime: "~2 hours",
    },
    {
      id: "river-raid",
      title: "River Raid",
      description: "Control jet, manage fuel, destroy enemies",
      difficulty: "Advanced",
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Riverraid%20GIF-JDIAizFJssClomVPi4uiCoZOCr6FGh.gif",
      color: "#f472b6",
      trainingTime: "~3 hours",
    },
    {
      id: "coming-soon",
      title: "Coming Soon",
      description: "Mystery game",
      difficulty: "???",
      imageUrl:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='210' viewBox='0 0 160 210'%3E%3Cstyle%3E@keyframes pulse%7B0%25%7Bopacity:0.3%7D50%25%7Bopacity:0.7%7D100%25%7Bopacity:0.3%7D%7D.pulse%7Banimation:pulse 2s infinite%7D%3C/style%3E%3Crect width='160' height='210' fill='%23000'/%3E%3Ctext x='80' y='105' fontFamily='monospace' fontSize='48' fill='%23fbbf24' textAnchor='middle' class='pulse'%3E%3F%3C/text%3E%3Cpath d='M60 140 L100 140' stroke='%23fbbf24' strokeWidth='2' strokeDasharray='4 4' class='pulse'/%3E%3Ccircle cx='50' cy='160' r='3' fill='%23fbbf24' class='pulse'/%3E%3Ccircle cx='110' cy='160' r='3' fill='%23fbbf24' class='pulse'/%3E%3C/svg%3E",
      color: "#fbbf24",
      isComingSoon: true,
    },
  ]

  return (
    <section className="relative py-20 px-4 bg-[#0d0d1a]" id="games">
      <SectionDivider position="top" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <PixelText text="AVAILABLE GAMES" className="text-3xl sm:text-4xl md:text-5xl text-center mb-16" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {games.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              isHovered={hoveredGame === game.id}
              onHover={() => setHoveredGame(game.id)}
              onLeave={() => setHoveredGame(null)}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <motion.p
            className="text-[#5f8afa] font-mono text-sm"
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            More games coming soon! <span className="animate-blink">_</span>
          </motion.p>
        </motion.div>
      </div>

      <SectionDivider position="bottom" />
    </section>
  )
}

