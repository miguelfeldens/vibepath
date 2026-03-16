'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MISSIONS, ECONOMICS_OPTIONS, type Economics } from '@/lib/deepdive'

interface Props {
  accentColor: string
  mission: string | null
  economics: Economics | null
  onMissionChange: (m: string) => void
  onEconomicsChange: (e: Economics) => void
}

export function MissionMarket({ accentColor, mission, economics, onMissionChange, onEconomicsChange }: Props) {
  const [showOther, setShowOther] = useState(false)
  const [otherInput, setOtherInput] = useState('')

  const isCustom = mission !== null && !MISSIONS.includes(mission as (typeof MISSIONS)[number])

  function handleOtherSubmit() {
    const val = otherInput.trim()
    if (!val) return
    onMissionChange(val)
    setShowOther(false)
  }

  return (
    <div className="space-y-10">
      {/* Mission */}
      <div className="space-y-4">
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-white/30 font-medium mb-1">
            global side quest
          </p>
          <p className="text-base text-white/40">what do you want your work to actually change?</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {MISSIONS.map((m) => {
            const active = mission === m
            return (
              <motion.button
                key={m}
                onClick={() => { onMissionChange(m); setShowOther(false) }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-200"
                style={
                  active
                    ? { backgroundColor: accentColor + '25', borderColor: accentColor, color: accentColor }
                    : { backgroundColor: 'transparent', borderColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)' }
                }
              >
                {m}
              </motion.button>
            )
          })}

          {/* Custom / Other chip */}
          {isCustom && !showOther ? (
            <motion.button
              onClick={() => { setShowOther(true); setOtherInput(mission ?? '') }}
              whileHover={{ scale: 1.03 }}
              className="px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-200"
              style={{ backgroundColor: accentColor + '25', borderColor: accentColor, color: accentColor }}
            >
              {mission} ✕
            </motion.button>
          ) : !showOther ? (
            <motion.button
              onClick={() => setShowOther(true)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-3 py-1.5 rounded-full text-sm font-medium border border-dashed border-white/20 text-white/30 hover:text-white/50 hover:border-white/30 transition-all duration-200"
            >
              + other
            </motion.button>
          ) : null}
        </div>

        {/* Other input */}
        <AnimatePresence>
          {showOther && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="flex items-center gap-2"
            >
              <input
                autoFocus
                type="text"
                value={otherInput}
                onChange={(e) => setOtherInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleOtherSubmit() }}
                placeholder="your mission..."
                maxLength={40}
                className="bg-transparent border border-white/20 rounded-lg px-3 py-1.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/40 w-48"
              />
              <button
                onClick={handleOtherSubmit}
                className="text-sm font-medium transition-colors"
                style={{ color: accentColor }}
              >
                add
              </button>
              <button
                onClick={() => { setShowOther(false); setOtherInput('') }}
                className="text-sm text-white/25 hover:text-white/50 transition-colors"
              >
                cancel
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Economics */}
      <div className="space-y-4">
        <div>
          <h3
            className="text-2xl sm:text-3xl font-semibold text-white mb-2"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            how are we funding this?
          </h3>
          <p className="text-base text-white/40">pick the energy that fits how you want to move.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {ECONOMICS_OPTIONS.map(({ key, label, sub, desc }) => {
            const active = economics === key
            return (
              <motion.button
                key={key}
                onClick={() => onEconomicsChange(key)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="text-left p-4 rounded-xl border transition-all duration-200"
                style={
                  active
                    ? { backgroundColor: accentColor + '15', borderColor: accentColor + '70' }
                    : { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)' }
                }
              >
                <p
                  className="text-sm font-bold tracking-[0.05em] mb-0.5"
                  style={{ color: active ? accentColor : 'rgba(255,255,255,0.6)' }}
                >
                  {label}
                </p>
                <p className="text-xs text-white/30 mb-2">{sub}</p>
                <p className="text-xs text-white/40 leading-relaxed">{desc}</p>
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
