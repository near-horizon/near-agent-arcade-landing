"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { AlertTriangle, RefreshCw } from "lucide-react"

interface ErrorBoundaryProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[400px] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-black/30 border border-red-500/30 rounded-lg p-6 text-center"
      >
        <div className="flex justify-center mb-4">
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "mirror",
            }}
          >
            <AlertTriangle className="w-12 h-12 text-red-500" />
          </motion.div>
        </div>

        <h2 className="text-xl font-bold text-red-500 mb-2">Something went wrong!</h2>

        <p className="text-gray-400 mb-6">{error.message || "An unexpected error occurred. Please try again."}</p>

        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-500 rounded-lg transition-colors"
        >
          <RefreshCw size={16} />
          Try Again
        </button>

        <p className="mt-4 text-xs text-gray-500">
          If the problem persists, please contact support or try again later.
        </p>
      </motion.div>
    </div>
  )
}

