'use client'

import { motion } from 'framer-motion'
import type { Persona } from '@/types'

// Vary size/opacity to give the cloud a natural hierarchy
const CLOUD_STYLES = [
  'text-base font-semibold text-white/90',
  'text-sm font-medium text-white/70',
  'text-sm font-normal text-white/55',
  'text-xs font-medium text-white/60',
  'text-base font-medium text-white/75',
  'text-xs font-normal text-white/45',
  'text-sm font-semibold text-white/80',
  'text-xs font-medium text-white/50',
  'text-sm font-normal text-white/65',
  'text-xs font-normal text-white/40',
  'text-base font-normal text-white/60',
  'text-xs font-medium text-white/55',
  'text-sm font-normal text-white/50',
  'text-xs font-normal text-white/45',
  'text-xs font-medium text-white/40',
]

interface StudentStoriesSectionProps {
  persona: Persona
}

export function StudentStoriesSection({ persona }: StudentStoriesSectionProps) {
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
        className="text-2xl sm:text-3xl font-semibold text-white mb-10"
        style={{ fontFamily: 'var(--font-playfair)' }}
      >
        Careers that match your energy
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex flex-wrap gap-x-5 gap-y-3 mb-16"
      >
        {persona.careers.map((career, i) => (
          <span
            key={career}
            className={`${CLOUD_STYLES[i % CLOUD_STYLES.length]} leading-snug`}
          >
            {career}
          </span>
        ))}
      </motion.div>

      {/* Day in the life */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="rounded-2xl bg-stone-900 border border-white/5 px-7 py-8"
      >
        <p className="text-xs tracking-[0.25em] uppercase text-white/30 font-medium mb-1">
          A day in the life
        </p>
        <h3 className="text-xl font-semibold text-white mb-4">
          {persona.topCareer.title}
        </h3>
        <p className="text-sm text-white/65 leading-relaxed mb-6">
          {persona.topCareer.blurb}
        </p>
        <ul className="space-y-2.5">
          {persona.topCareer.bullets.map((bullet, i) => (
            <li key={i} className="flex gap-3 text-sm text-white/50 leading-snug">
              <span className="mt-2 shrink-0 w-1 h-1 rounded-full bg-white/25" />
              {bullet}
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  )
}
