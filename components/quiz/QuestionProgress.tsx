'use client'

interface QuestionProgressProps {
  current: number // 1-based
  total: number
}

export function QuestionProgress({ current, total }: QuestionProgressProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-medium text-white/50 tracking-widest uppercase">
        {current} / {total}
      </span>
      <div className="flex gap-1">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-0.5 rounded-full transition-all duration-500
              ${i < current ? 'bg-white w-6' : i === current - 1 ? 'bg-white/80 w-8' : 'bg-white/20 w-4'}
            `}
          />
        ))}
      </div>
    </div>
  )
}
