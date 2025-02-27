"use client"

import { motion } from "framer-motion"

interface LoadingStateProps {
  text?: string
}

export default function LoadingState({ text = "Loading..." }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
      {/* Arcade-style loading animation */}
      <div className="relative w-16 h-16">
        <motion.div
          className="absolute inset-0 border-4 border-[#5f8afa] rounded-lg"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 180, 270, 360],
            borderRadius: ["10%", "20%", "10%"],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute inset-2 bg-[#5f8afa]/20"
          animate={{
            scale: [1, 0.8, 1],
            rotate: [0, -90, -180, -270, -360],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      {/* Loading text with typing effect */}
      <div className="font-mono text-[#5f8afa]">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          {text}
        </motion.span>
      </div>
    </div>
  )
}

