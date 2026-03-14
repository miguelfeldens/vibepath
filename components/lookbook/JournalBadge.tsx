'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getPersistentInterests, getSessionCount } from '@/lib/journal'
import type { Impact } from '@/types'

const IMPACT_LABELS: Record<Impact, string> = {
  Social_Good: 'Social Good',
  Innovation: 'Innovation',
  Infrastructure: 'Infrastructure',
  Artistic: 'Creativity',
  Investigation: 'Investigation',
}

export function JournalBadge() {
  const [interests, setInterests] = useState<Impact[]>([])
  const [sessionCount, setSessionCount] = useState(0)

  useEffect(() => {
    setInterests(getPersistentInterests())
    setSessionCount(getSessionCount())
  }, [])

  if (sessionCount < 2 || interests.length === 0) return null

  return (
    <AnimatePresence>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-stone-900 border-t border-white/5 px-8 py-10"
      >
        <p className="text-xs tracking-[0.3em] uppercase text-white/30 font-medium mb-4">
          Living journal
        </p>
        <div className="flex items-start gap-4 p-5 rounded-xl bg-white/5 border border-white/10">
          <div className="mt-0.5 w-2 h-2 rounded-full bg-green-400 flex-shrink-0 animate-pulse" />
          <div>
            <p className="text-sm text-white/80 leading-relaxed">
              Across{' '}
              <span className="text-white font-semibold">{sessionCount} sessions</span>, your
              gut keeps coming back to{' '}
              {interests.map((interest, i) => (
                <span key={interest}>
                  <span className="text-white font-semibold">{IMPACT_LABELS[interest]}</span>
                  {i < interests.length - 1 ? ' and ' : ''}
                </span>
              ))}
              . That&apos;s not a coincidence.
            </p>
          </div>
        </div>
      </motion.section>
    </AnimatePresence>
  )
}
