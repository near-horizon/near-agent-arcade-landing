"use client"

import { useState } from "react"
import { ArrowRight, Github } from "lucide-react"
import PixelText from "./ui/pixel-text"
import ArcadeButton from "./ui/arcade-button"
import ArcadeDivider from "./ui/arcade-divider"

export default function CallToAction() {
  const [isHovered, setIsHovered] = useState(false)

  const highScores = [
    { name: "DQN-MASTER", score: 21500 },
    { name: "NEURAL-KING", score: 19800 },
    { name: "DEEP-PLAYER", score: 17200 },
    { name: "RL-WIZARD", score: 15900 },
    { name: "Q-LEARNER", score: 14700 },
  ]

  return (
    <section className="relative py-20 px-4 bg-gray-950">
      <ArcadeDivider position="top" />

      <div className="max-w-6xl mx-auto relative">
        {/* Background high score board */}
        <div className="absolute inset-0 flex justify-end opacity-20 pointer-events-none">
          <div className="bg-black p-4 rounded-lg border border-purple-500 w-64">
            <h4 className="text-center text-purple-400 font-mono mb-2">HIGH SCORES</h4>
            <div className="space-y-1">
              {highScores.map((score, index) => (
                <div key={index} className="flex justify-between text-xs font-mono">
                  <span>{score.name}</span>
                  <span>{score.score}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center relative z-10">
          <PixelText
            text="READY PLAYER ONE?"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-16 animate-pulse-slow"
          />

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="relative">
              <ArcadeButton
                href="https://github.com/jbarnes850/agent-arcade"
                className="bg-purple-600 hover:bg-purple-700 border-purple-800 px-8 flex items-center gap-2"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <Github size={20} />
                FORK ON GITHUB
              </ArcadeButton>

              {/* Animated arrow */}
              <div
                className={`absolute -right-16 top-1/2 transform -translate-y-1/2 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
              >
                <ArrowRight size={24} className="text-purple-400 animate-bounce-x" />
              </div>
            </div>

            <ArcadeButton
              href="https://github.com/jbarnes850/agent-arcade/blob/main/docs/adding-games.md"
              className="bg-cyan-600 hover:bg-cyan-700 border-cyan-800 px-8"
            >
              ADD A NEW GAME
            </ArcadeButton>
          </div>
        </div>
      </div>

      <ArcadeDivider position="bottom" />
    </section>
  )
}

