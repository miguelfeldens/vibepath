'use client'

import { useEffect, useRef, useState } from 'react'

const RADIUS = 28
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

interface TimerRingProps {
  duration: number // seconds
  onExpire: () => void
  isActive: boolean
}

export function TimerRing({ duration, onExpire, isActive }: TimerRingProps) {
  const [timeLeft, setTimeLeft] = useState(duration)
  const onExpireRef = useRef(onExpire)
  onExpireRef.current = onExpire

  useEffect(() => {
    setTimeLeft(duration)
  }, [duration])

  useEffect(() => {
    if (!isActive) return
    if (timeLeft <= 0) {
      onExpireRef.current()
      return
    }

    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(id)
          onExpireRef.current()
          return 0
        }
        return t - 1
      })
    }, 1000)

    return () => clearInterval(id)
  }, [isActive, timeLeft])

  const progress = timeLeft / duration
  const dashOffset = CIRCUMFERENCE * (1 - progress)

  const color =
    timeLeft <= 5
      ? '#EF4444' // red-500
      : timeLeft <= 10
        ? '#F59E0B' // amber-500
        : '#FFFFFF'

  return (
    <div className="relative flex items-center justify-center w-16 h-16">
      <svg width="64" height="64" className="-rotate-90">
        {/* Background ring */}
        <circle
          cx="32"
          cy="32"
          r={RADIUS}
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="3"
        />
        {/* Progress ring */}
        <circle
          cx="32"
          cy="32"
          r={RADIUS}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          style={{ transition: 'stroke-dashoffset 0.9s linear, stroke 0.3s ease' }}
        />
      </svg>
      <span
        className="absolute text-sm font-bold tabular-nums"
        style={{ color }}
      >
        {timeLeft}
      </span>
    </div>
  )
}
