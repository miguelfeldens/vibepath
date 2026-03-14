'use client'

import { motion } from 'framer-motion'
import type { Persona } from '@/types'

interface PowerWordsSectionProps {
  persona: Persona
}

export function PowerWordsSection({ persona }: PowerWordsSectionProps) {
  return (
    <section className="lookbook-section bg-stone-950 px-8 py-20">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-xs tracking-[0.3em] uppercase text-white/30 font-medium mb-12"
      >
        Your power words
      </motion.p>

      <div className="flex flex-col gap-4">
        {persona.powerWords.map((word, i) => (
          <motion.div
            key={word}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.6, ease: 'easeOut' }}
            className="flex items-baseline gap-4"
          >
            <span className="text-xs text-white/20 w-4 font-mono">{String(i + 1).padStart(2, '0')}</span>
            <span
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              {word}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
        className="mt-12 h-px origin-left"
        style={{ backgroundColor: persona.accentColor, opacity: 0.4 }}
      />
    </section>
  )
}
