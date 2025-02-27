"use client"

import type { FC } from "react"
import { useState } from "react"
import Link from "next/link"
import { Github, ExternalLink, Star } from "lucide-react"
import SectionDivider from "./section-divider"

const Footer: FC = () => {
  const [showEasterEgg, setShowEasterEgg] = useState(false)

  const libraries = [
    {
      name: "Stable Baselines3",
      description: "Reliable implementations of reinforcement learning algorithms",
      url: "https://github.com/DLR-RM/stable-baselines3",
      stars: "9.9k",
      tech: "PyTorch",
    },
    {
      name: "Gymnasium",
      description: "A standard API for reinforcement learning environments",
      url: "https://github.com/Farama-Foundation/Gymnasium",
      stars: "3.8k",
      tech: "Python",
    },
    {
      name: "Arcade Learning Environment",
      description: "Platform for AI research on Atari 2600 games",
      url: "https://github.com/Farama-Foundation/Arcade-Learning-Environment",
      stars: "1.2k",
      tech: "C++",
    },
  ]

  return (
    <footer className="relative bg-[#0d0d1a]">
      <SectionDivider position="top" variant="minimal" />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Project Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">NEAR Agent Arcade</h3>
            <p className="text-sm text-gray-400">
              An open platform for training AI game agents using deep reinforcement learning on the NEAR blockchain.
            </p>
            <div className="flex items-center space-x-4">
              <Link
                href="https://github.com/jbarnes850/agent-arcade"
                className="flex items-center gap-2 text-[#5f8afa] hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </Link>
              <div className="h-4 w-px bg-gray-800" />
              <Link
                href="https://near.org"
                className="text-[#5f8afa] text-sm hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Built on NEAR
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="https://github.com/jbarnes850/agent-arcade/tree/main/docs"
                  className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2"
                >
                  Documentation
                  <ExternalLink size={12} />
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/jbarnes850/agent-arcade"
                  className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2"
                >
                  GitHub Repository
                  <ExternalLink size={12} />
                </Link>
              </li>
              <li>
                <Link
                  href="https://tricky-week-fde.notion.site/Unlocking-the-Future-of-AI-Gaming-Building-Autonomous-Agents-with-NEAR-AI-Arcade-19e1bc9be8608013bdb8c57c2b525208?pvs=4"
                  className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tutorials
                  <ExternalLink size={12} />
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-gray-400 hover:text-white transition-colors">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Core Libraries */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Powered By</h3>
            <div className="space-y-3">
              {libraries.map((lib) => (
                <Link
                  key={lib.name}
                  href={lib.url}
                  className="block p-3 bg-black/30 rounded-lg border border-[#1a1b4b] hover:border-[#5f8afa]/30 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-[#5f8afa] font-medium">{lib.name}</h4>
                      <p className="text-xs text-gray-400 mt-1">{lib.description}</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="px-2 py-1 rounded-full bg-black/30">{lib.tech}</span>
                      <div className="flex items-center gap-1">
                        <Star size={12} />
                        {lib.stars}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} NEAR Agent Arcade. Released under the MIT License.
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Easter egg */}
      <div
        className="absolute bottom-4 right-4 w-6 h-6 cursor-pointer opacity-30 hover:opacity-100 transition-opacity"
        onClick={() => setShowEasterEgg(!showEasterEgg)}
      >
        <div className={`space-invader ${showEasterEgg ? "animate-bounce" : ""}`}>
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

