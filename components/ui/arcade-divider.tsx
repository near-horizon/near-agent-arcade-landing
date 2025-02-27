interface ArcadeDividerProps {
  position: "top" | "bottom"
}

export default function ArcadeDivider({ position }: ArcadeDividerProps) {
  return (
    <div className={`absolute ${position === "top" ? "top-0" : "bottom-0"} left-0 right-0 h-4 overflow-hidden`}>
      <div className="w-full h-full flex">
        {Array(20)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className={`flex-1 ${position === "top" ? "bg-gradient-to-b" : "bg-gradient-to-t"} from-purple-600 to-transparent`}
              style={{
                height: position === "top" ? "100%" : "100%",
                clipPath:
                  position === "top"
                    ? `polygon(${i % 2 === 0 ? "0% 0%, 100% 0%, 100% 100%, 0% 0%" : "0% 0%, 100% 0%, 100% 0%, 0% 100%"})`
                    : `polygon(${i % 2 === 0 ? "0% 100%, 100% 100%, 100% 0%, 0% 100%" : "0% 100%, 100% 100%, 100% 100%, 0% 0%"})`,
              }}
            />
          ))}
      </div>
    </div>
  )
}

