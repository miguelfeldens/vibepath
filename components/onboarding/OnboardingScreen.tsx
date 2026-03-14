'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const STEPS = [
  { num: '01', label: 'pick images that hit different' },
  { num: '02', label: 'unlock your Identity Lookbook' },
  { num: '03', label: 'find colleges that match your energy' },
]

export function OnboardingScreen() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-stone-950 text-white flex flex-col items-center justify-center px-6">
      {/* Background grain texture */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center max-w-lg w-full"
      >
        {/* Wordmark */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-[0.18em] uppercase mb-4"
        >
          VibePath
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="text-base sm:text-lg text-white/45 mb-10"
        >
          discover what you&apos;re actually built to do.
        </motion.p>

        {/* 3-step mini flow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="flex flex-col gap-2 mb-10 max-w-xs mx-auto text-left"
        >
          {STEPS.map(({ num, label }, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
              className="flex items-center gap-3"
            >
              <span className="text-xs font-mono text-white/20 w-5 shrink-0">{num}</span>
              <span className="text-sm text-white/60">{label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => router.push('/quiz')}
          className="px-8 py-4 bg-white text-black rounded-full text-base font-semibold
            hover:bg-white/90 transition-colors shadow-2xl shadow-white/10"
        >
          Start the vibe check →
        </motion.button>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          className="mt-6 text-xs text-white/20"
        >
          No account needed · No data stored · AI-assisted, not AI-decided
        </motion.p>

        {/* Footer nav */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-12 flex items-center justify-center gap-4 text-xs"
        >
          <Link href="/about" className="text-white/25 hover:text-white/50 transition-colors">
            About
          </Link>
          <span className="text-white/15">·</span>
          <Link href="/terms" className="text-white/25 hover:text-white/50 transition-colors">
            Terms
          </Link>
          <span className="text-white/15">·</span>
          <span className="text-white/20">by Miguel Feldens</span>
        </motion.div>
      </motion.div>
    </div>
  )
}
