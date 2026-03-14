'use client'

import { motion } from 'framer-motion'
import type { Persona } from '@/types'

interface LookbookHeroProps {
  persona: Persona
  isReturning: boolean
}

export function LookbookHero({ persona, isReturning }: LookbookHeroProps) {
  return (
    <section
      className={`lookbook-section relative min-h-screen flex flex-col justify-end px-8 pb-16 pt-24 bg-gradient-to-br ${persona.coverGradient} overflow-hidden`}
    >
      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* VibePath label */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="absolute top-8 left-8 text-xs tracking-[0.3em] uppercase text-white/30 font-medium"
      >
        VibePath · Identity Lookbook
      </motion.p>

      {isReturning && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute top-8 right-8 px-3 py-1 rounded-full bg-white/10 text-white/60 text-xs font-medium backdrop-blur-sm"
        >
          Welcome back
        </motion.div>
      )}

      {/* Persona title */}
      <div className="max-w-2xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-sm font-medium tracking-[0.2em] uppercase mb-3"
          style={{ color: persona.accentColor }}
        >
          Your identity
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05] text-white mb-6"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          {persona.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-base sm:text-lg text-white/60 leading-relaxed max-w-lg"
        >
          {persona.description}
        </motion.p>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 right-8 flex flex-col items-center gap-1 text-white/20"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
        />
      </motion.div>
    </section>
  )
}
