"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import PixelText from "./ui/pixel-text"
import SectionDivider from "./section-divider"
import ScrollReveal from "./scroll-reveal"

export default function WhatIsSection() {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      title: "Observation",
      description: "The agent receives game frames as input, just like a human sees the game screen.",
      icon: "👁️",
    },
    {
      title: "Processing",
      description: "Neural networks analyze the game state to understand what's happening.",
      icon: "🧠",
    },
    {
      title: "Action",
      description: "The agent chooses the best move based on what it has learned.",
      icon: "🎮",
    },
    {
      title: "Learning",
      description: "Results are used to improve future decisions through reinforcement.",
      icon: "📈",
    },
  ]

  return (
    <section className="relative bg-[#0d0d1a]">
      <SectionDivider position="top" />

      <div className="max-w-6xl mx-auto px-4 py-20">
        <ScrollReveal>
          <PixelText text="AI AGENTS ON NEAR" className="text-3xl sm:text-4xl md:text-5xl text-center mb-16" />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side: Interactive visualization */}
          <ScrollReveal delay={0.2}>
            <div className="relative aspect-square bg-black/50 rounded-lg border border-[#1a1b4b] overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="text-6xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [1, 0.8, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  {steps[activeStep].icon}
                </motion.div>
              </div>

              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <motion.path
                  d="M20,50 C40,50 60,50 80,50"
                  stroke="rgba(95, 138, 250, 0.2)"
                  strokeWidth="0.5"
                  fill="none"
                  strokeDasharray="4 4"
                  animate={{
                    strokeDashoffset: [0, -8],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />
              </svg>
            </div>
          </ScrollReveal>

          {/* Right side: Explanation */}
          <ScrollReveal delay={0.4}>
            <div className="space-y-8">
              <div className="bg-black/30 p-6 rounded-lg border border-[#1a1b4b]">
                <h3 className="text-xl font-bold mb-4 text-[#5f8afa]">What is Agent Arcade?</h3>
                <p className="text-gray-300 leading-relaxed">
                  Agent Arcade is an open platform where you can train AI agents to master classic arcade games using
                  deep reinforcement learning. No prior machine learning experience needed - we handle the complexity
                  while you focus on the fun part.
                </p>
              </div>

              {/* Steps */}
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <button
                    key={index}
                    className={`w-full text-left p-4 rounded-lg transition-colors ${
                      activeStep === index
                        ? "bg-[#5f8afa]/10 border border-[#5f8afa]/30"
                        : "bg-black/30 border border-[#1a1b4b] hover:bg-[#5f8afa]/5"
                    }`}
                    onClick={() => setActiveStep(index)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{step.icon}</span>
                      <div>
                        <h4 className="font-bold text-[#5f8afa]">{step.title}</h4>
                        <p className="text-sm text-gray-400">{step.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <SectionDivider position="bottom" />
    </section>
  )
}

