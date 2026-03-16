'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Persona, CareerDetail } from '@/types'

// Vary size/opacity to give the cloud a natural hierarchy
const CLOUD_STYLES = [
  'text-base font-semibold',
  'text-sm font-medium',
  'text-sm font-normal',
  'text-xs font-medium',
  'text-base font-medium',
  'text-xs font-normal',
  'text-sm font-semibold',
  'text-xs font-medium',
  'text-sm font-normal',
  'text-xs font-normal',
  'text-base font-normal',
  'text-xs font-medium',
  'text-sm font-normal',
  'text-xs font-normal',
  'text-xs font-medium',
]

const CLOUD_OPACITIES = [
  'text-white/90',
  'text-white/70',
  'text-white/55',
  'text-white/60',
  'text-white/75',
  'text-white/45',
  'text-white/80',
  'text-white/50',
  'text-white/65',
  'text-white/40',
  'text-white/60',
  'text-white/55',
  'text-white/50',
  'text-white/45',
  'text-white/40',
]

interface StudentStoriesSectionProps {
  persona: Persona
}

export function StudentStoriesSection({ persona }: StudentStoriesSectionProps) {
  const [selectedCareer, setSelectedCareer] = useState<CareerDetail>(persona.careers[0])

  return (
    <section className="lookbook-section bg-stone-950 px-8 py-20">
      {/* Career cloud */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-xs tracking-[0.3em] uppercase text-white/30 font-medium mb-3"
      >
        Where your vibe could take you
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="text-2xl sm:text-3xl font-semibold text-white mb-3"
        style={{ fontFamily: 'var(--font-playfair)' }}
      >
        Careers that match your energy
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="text-xs text-white/30 mb-8"
      >
        Tap any career to see a day in the life ↓
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex flex-wrap gap-x-5 gap-y-3 mb-10"
      >
        {persona.careers.map((career, i) => {
          const isActive = career.title === selectedCareer.title
          return (
            <button
              key={career.title}
              type="button"
              onClick={() => setSelectedCareer(career)}
              className={`leading-snug transition-all duration-150 text-left
                ${CLOUD_STYLES[i % CLOUD_STYLES.length]}
                ${isActive
                  ? 'text-white underline underline-offset-2 decoration-white/60'
                  : `${CLOUD_OPACITIES[i % CLOUD_OPACITIES.length]} hover:text-white/80`
                }`}
            >
              {career.title}
            </button>
          )
        })}
      </motion.div>

      {/* Day in the life */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="rounded-2xl bg-stone-900 border border-white/5 px-7 py-8 overflow-hidden"
      >
        <p className="text-xs tracking-[0.25em] uppercase text-white/30 font-medium mb-1">
          A day in the life
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCareer.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-xl font-semibold text-white mb-4 mt-1">
              {selectedCareer.title}
            </h3>
            <p className="text-sm text-white/65 leading-relaxed mb-6">
              {selectedCareer.blurb}
            </p>
            <ul className="space-y-2.5">
              {selectedCareer.bullets.map((bullet, i) => (
                <li key={i} className="flex gap-3 text-sm text-white/50 leading-snug">
                  <span className="mt-2 shrink-0 w-1 h-1 rounded-full bg-white/25" />
                  {bullet}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
