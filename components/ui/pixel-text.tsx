interface PixelTextProps {
  text: string
  className?: string
}

export default function PixelText({ text, className = "" }: PixelTextProps) {
  return <h2 className={`font-pixel tracking-wider ${className}`}>{text}</h2>
}

