"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-black/50 border border-[#5f8afa]/30 backdrop-blur-sm text-[#5f8afa] hover:bg-[#5f8afa]/20 transition-colors focus:outline-none focus:ring-2 focus:ring-[#5f8afa] focus:ring-offset-2 focus:ring-offset-[#0d0d1a] group"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 transform group-hover:translate-y-[-2px] transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

