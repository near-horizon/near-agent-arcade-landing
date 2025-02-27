import Header from "@/components/header"
import WhatIsSection from "@/components/what-is-section"
import GamesSection from "@/components/games-section"
import QuickStart from "@/components/quick-start"
import CallToAction from "@/components/call-to-action"
import Footer from "@/components/footer"
import ArcadeBackground from "@/components/arcade-background"
import ScrollToTop from "@/components/scroll-to-top"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#0d0d1a] to-[#0d0d1a] text-white relative overflow-hidden">
      <ArcadeBackground />
      <div className="relative z-10">
        <Header />
        <main className="relative">
          <WhatIsSection />
          <GamesSection />
          <QuickStart />
          <CallToAction />
        </main>
        <Footer />
      </div>
      <ScrollToTop />
    </div>
  )
}

