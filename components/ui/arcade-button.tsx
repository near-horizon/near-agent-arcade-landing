import type React from "react"
interface ArcadeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: "primary" | "secondary"
  className?: string
  href?: string
}

export default function ArcadeButton({
  children,
  variant = "primary",
  className = "",
  href,
  ...props
}: ArcadeButtonProps) {
  const baseStyles =
    "relative px-8 py-3 font-bold text-white rounded-lg transition-all duration-200 overflow-hidden group transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0d0d1a] focus:ring-[#5f8afa]"
  const variantStyles = {
    primary: "bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900",
    secondary: "bg-gradient-to-r from-cyan-600 to-cyan-800 hover:from-cyan-700 hover:to-cyan-900",
  }

  const content = (
    <>
      {/* Glow effect */}
      <div className="absolute inset-0 opacity-50 group-hover:opacity-70 transition-opacity">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-cyan-400 blur-lg" />
      </div>

      {/* Button content */}
      <div className="relative z-10 flex items-center justify-center gap-2">{children}</div>

      {/* Bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Top highlight */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/20" />

      {/* Hover effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-cyan-400/10 to-purple-400/0 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-100%] group-hover:translate-x-[100%] duration-1000" />
    </>
  )

  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {content}
    </a>
  ) : (
    <button className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
      {content}
    </button>
  )
}

