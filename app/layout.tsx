import type React from "react"
import type { Metadata } from "next"
import { Inter, Press_Start_2P } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], display: "swap" })
const pixelFont = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
  display: "swap",
})

export const metadata: Metadata = {
  title: "NEAR Agent Arcade",
  description:
    "Train AI agents to play classic games using deep reinforcement learning and compete for NEAR token rewards",
  openGraph: {
    title: "NEAR Agent Arcade",
    description: "Train AI agents to master classic arcade games using deep reinforcement learning",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
  },
  metadataBase: new URL("https://agent-arcade.near.org"),
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  themeColor: "#0d0d1a",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} ${pixelFont.variable} antialiased`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}



import './globals.css'