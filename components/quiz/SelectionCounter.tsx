'use client'

interface SelectionCounterProps {
  count: number
  max: number
}

export function SelectionCounter({ count, max }: SelectionCounterProps) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full transition-all duration-200
            ${i < count ? 'bg-white scale-110' : 'bg-white/25'}
          `}
        />
      ))}
      <span className="ml-1 text-xs text-white/60 font-medium">
        {count === 0 ? 'Pick up to 3' : count === max ? 'Max selected' : `${max - count} more`}
      </span>
    </div>
  )
}
