"use client"

import { useState, useEffect } from "react"
import { PlayCircle, Book, ChevronDown } from "lucide-react"
import Image from "next/image"
import PixelText from "./ui/pixel-text"
import ArcadeButton from "./ui/arcade-button"

export default function Header() {
  const [typedText, setTypedText] = useState("")
  const [activeGame, setActiveGame] = useState(0)
  const fullText = "Train. Compete. Earn_"

  const games = [
    {
      name: "Space Invaders",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Space%20Invaders%20GIF-7cvhOOUf1swvjAOyFMfudMEVmbxuyG.gif",
    },
  ]

  // Typing animation effect
  useEffect(() => {
    let currentIndex = 0
    let typingInterval: NodeJS.Timeout

    const typeText = () => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.substring(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typingInterval)
        setTimeout(() => {
          currentIndex = 0
          startTyping()
        }, 3000)
      }
    }

    const startTyping = () => {
      typingInterval = setInterval(typeText, 150)
    }

    startTyping()
    return () => clearInterval(typingInterval)
  }, [])

  return (
    <header className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#000014] to-[#00000A] pt-16">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-cyan-500/20 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 md:space-y-8">
            {/* Logo */}
            <h1 className="w-full">
              <div className="inline-flex flex-col">
                <PixelText
                  text="NEAR"
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-1 text-white"
                />
                <PixelText
                  text="Agent"
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-1 text-white"
                />
                <PixelText
                  text="Arcade"
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl bg-gradient-to-r from-[#5f8afa] via-purple-500 to-cyan-400 text-transparent bg-clip-text"
                />
              </div>
            </h1>

            {/* Value Proposition */}
            <div className="w-full space-y-6">
              {/* Animated Text */}
              <div className="inline-block">
                <div className="bg-black/30 backdrop-blur-sm border border-[#1a1b4b] px-4 py-2 rounded-lg">
                  <p className="text-lg sm:text-xl md:text-2xl font-mono text-green-400">{typedText}</p>
                </div>
              </div>

              {/* Value Proposition Text */}
              <p className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto lg:mx-0">
                Build and train AI agents that master classic arcade games using deep reinforcement learning. No ML
                experience required.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full sm:w-auto">
                <ArcadeButton
                  href="https://github.com/jbarnes850/agent-arcade"
                  className="w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  <PlayCircle className="w-5 h-5" />
                  Train Your First Agent
                </ArcadeButton>
                <ArcadeButton
                  href="https://tricky-week-fde.notion.site/Unlocking-the-Future-of-AI-Gaming-Building-Autonomous-Agents-with-NEAR-AI-Arcade-19e1bc9be8608013bdb8c57c2b525208?pvs=4"
                  variant="secondary"
                  className="w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  <Book className="w-5 h-5" />
                  Learn More
                </ArcadeButton>
              </div>
            </div>
          </div>

          {/* Right Column - Game Display */}
          <div className="relative w-full max-w-[320px] mx-auto lg:max-w-none">
            <div className="relative aspect-[3/4] w-full max-w-[320px] mx-auto">
              {/* Game Frame */}
              <div className="absolute inset-2 rounded-lg overflow-hidden bg-black border-2 border-purple-900/50">
                {/* Game Display */}
                <div className="relative w-full h-full">
                  <Image
                    src={games[activeGame].src || "/placeholder.svg"}
                    alt={games[activeGame].name}
                    fill
                    className="object-contain pixel-perfect"
                    unoptimized
                    priority
                  />

                  {/* Scanlines */}
                  <div className="absolute inset-0 bg-scanlines opacity-20" />

                  {/* Screen Glare */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
                </div>
              </div>

              {/* Progress Bar */}
              <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-1 h-32">
                <div className="h-full w-full bg-[#1a1b4b] rounded-full overflow-hidden">
                  <div className="w-full bg-[#5f8afa] h-3/5 transition-all duration-1000" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <div className="animate-bounce text-[#5f8afa] opacity-75">
            <ChevronDown className="h-6 w-6" />
          </div>
        </div>
      </div>
    </header>
  )
}

