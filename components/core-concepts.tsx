"use client"

import { Gamepad2, Brain, Trophy, Timer } from "lucide-react"
import PixelText from "./ui/pixel-text"
import SectionDivider from "./section-divider"
import ScrollReveal from "./scroll-reveal"

export default function CoreConcepts() {
  const concepts = [
    {
      icon: <Gamepad2 className="w-6 h-6" />,
      title: "Learn by Playing",
      description: "Your AI agent learns through actual gameplay, just like a human player would.",
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Neural Networks",
      description: "Powered by deep learning to process game frames and make intelligent decisions.",
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Score Optimization",
      description: "Agents learn to maximize their score through reinforcement learning.",
    },
    {
      icon: <Timer className="w-6 h-6" />,
      title: "Rapid Training",
      description: "Watch your agent evolve from random moves to expert gameplay in hours.",
    },
  ]

  return (
    <section className="relative py-20 px-4 bg-[#0d0d1a]" id="core-concepts">
      <SectionDivider position="top" />

      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <PixelText text="CORE CONCEPTS" className="text-3xl sm:text-4xl md:text-5xl text-center mb-16" />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {concepts.map((concept, index) => (
            <ScrollReveal key={concept.title} delay={index * 0.1}>
              <div className="bg-black/30 border border-[#1a1b4b] rounded-lg p-6 hover:border-[#5f8afa]/30 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-[#5f8afa]/10 text-[#5f8afa]">{concept.icon}</div>
                  <h3 className="text-xl font-bold text-white">{concept.title}</h3>
                </div>
                <p className="text-gray-400 leading-relaxed">{concept.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <SectionDivider position="bottom" />
    </section>
  )
}

