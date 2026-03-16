'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export interface Stack {
  top: string | null
  middle: string | null
  bottom: string | null
}

interface Props {
  words: string[]
  accentColor: string
  onChange: (stack: Stack) => void
}

const SLOTS: { key: keyof Stack; label: string; weight: string }[] = [
  { key: 'top',    label: 'TOP',    weight: '50%' },
  { key: 'middle', label: 'MIDDLE', weight: '30%' },
  { key: 'bottom', label: 'BOTTOM', weight: '20%' },
]

export function PowerWordStack({ words: initialWords, accentColor, onChange }: Props) {
  const [pool, setPool] = useState<string[]>(initialWords)
  const [stack, setStack] = useState<Stack>({ top: null, middle: null, bottom: null })
  const [customInput, setCustomInput] = useState('')
  const [showCustom, setShowCustom] = useState(false)
  const [dragging, setDragging] = useState<string | null>(null)

  const slotRefs = {
    top:    useRef<HTMLDivElement>(null),
    middle: useRef<HTMLDivElement>(null),
    bottom: useRef<HTMLDivElement>(null),
  }

  function assignToSlot(word: string, slot: keyof Stack) {
    const prev = stack[slot]
    const newStack = { ...stack, [slot]: word }
    const newPool = pool.filter((w) => w !== word)
    if (prev) newPool.push(prev)
    setStack(newStack)
    setPool(newPool)
    onChange(newStack)
  }

  function removeFromSlot(slot: keyof Stack) {
    const word = stack[slot]
    if (!word) return
    const newStack = { ...stack, [slot]: null }
    setStack(newStack)
    setPool((p) => [...p, word])
    onChange(newStack)
  }

  function getNearestSlot(x: number, y: number): keyof Stack | null {
    let best: keyof Stack | null = null
    let bestDist = 120 // max snap distance in px
    for (const { key } of SLOTS) {
      const el = slotRefs[key].current
      if (!el) continue
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2)
      if (dist < bestDist) { bestDist = dist; best = key }
    }
    return best
  }

  function handleAddCustom() {
    const w = customInput.trim().toUpperCase()
    if (!w) return
    setPool((p) => [...p, w])
    setCustomInput('')
    setShowCustom(false)
  }

  return (
    <div className="space-y-8">
      {/* Slot targets */}
      <div className="space-y-3">
        {SLOTS.map(({ key, label, weight }) => (
          <div key={key} ref={slotRefs[key]} className="relative">
            <motion.div
              className="flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors"
              style={{
                borderColor: stack[key] ? accentColor + '60' : 'rgba(255,255,255,0.1)',
                backgroundColor: stack[key] ? accentColor + '12' : 'rgba(255,255,255,0.03)',
              }}
              animate={{ scale: dragging ? 1.01 : 1 }}
              transition={{ duration: 0.15 }}
            >
              <div className="flex flex-col shrink-0 w-16">
                <span className="text-xs font-bold tracking-[0.15em] text-white/40">
                  {label}
                </span>
                <span className="text-[10px] text-white/25 tracking-wide">{weight}</span>
              </div>

              <div className="flex-1 min-h-[28px] flex items-center">
                <AnimatePresence mode="wait">
                  {stack[key] ? (
                    <motion.div
                      key={stack[key]}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2"
                    >
                      <span
                        className="text-sm font-bold tracking-[0.12em]"
                        style={{ color: accentColor }}
                      >
                        {stack[key]}
                      </span>
                    </motion.div>
                  ) : (
                    <motion.span
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-xs text-white/20 italic"
                    >
                      drag a word here
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {stack[key] && (
                <button
                  onClick={() => removeFromSlot(key)}
                  className="text-white/25 hover:text-white/60 transition-colors text-xs shrink-0"
                  aria-label={`Remove ${stack[key]} from ${label}`}
                >
                  ✕
                </button>
              )}
            </motion.div>
          </div>
        ))}
      </div>

      {/* Word pool */}
      <div className="space-y-3">
        <p className="text-xs tracking-[0.3em] uppercase text-white/30 font-medium">your words</p>
        <div className="flex flex-wrap gap-2">
          <AnimatePresence>
            {pool.map((word) => (
              <motion.div
                key={word}
                layout
                drag
                dragSnapToOrigin
                dragElastic={0.3}
                dragTransition={{ bounceStiffness: 400, bounceDamping: 30 }}
                onDragStart={() => setDragging(word)}
                onDragEnd={(_, info) => {
                  setDragging(null)
                  const { point } = info
                  const nearest = getNearestSlot(point.x, point.y)
                  if (nearest) assignToSlot(word, nearest)
                }}
                onClick={() => {
                  const firstEmpty = SLOTS.find((s) => !stack[s.key])
                  if (firstEmpty) assignToSlot(word, firstEmpty.key)
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                style={{ touchAction: 'none' }}
                className="cursor-grab active:cursor-grabbing select-none"
                whileDrag={{ scale: 1.1, zIndex: 50 }}
                whileHover={{ scale: 1.04 }}
              >
                <div
                  className="px-4 py-2 rounded-full border text-xs font-bold tracking-[0.12em] transition-colors"
                  style={{
                    borderColor: accentColor + '50',
                    color: accentColor,
                    backgroundColor: accentColor + '10',
                  }}
                >
                  {word}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Also tap-to-assign shortcut: clicking a chip assigns it to first open slot */}
          {/* (drag is primary, but tap fills next empty slot) */}
        </div>

        {pool.length > 0 && (
          <p className="text-[10px] text-white/20 italic">
            drag to a slot — or tap a word to auto-assign
          </p>
        )}
      </div>

      {/* Custom word input */}
      <div>
        {!showCustom ? (
          <button
            onClick={() => setShowCustom(true)}
            className="text-xs text-white/30 hover:text-white/60 transition-colors border border-white/10 hover:border-white/20 rounded-full px-3 py-1.5"
          >
            + add your own word
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2"
          >
            <input
              autoFocus
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value.toUpperCase())}
              onKeyDown={(e) => { if (e.key === 'Enter') handleAddCustom() }}
              placeholder="YOUR WORD"
              maxLength={20}
              className="bg-transparent border border-white/20 rounded-lg px-3 py-1.5 text-xs font-bold tracking-[0.12em] text-white placeholder-white/20 focus:outline-none focus:border-white/40 w-40"
            />
            <button
              onClick={handleAddCustom}
              className="text-xs text-white/40 hover:text-white/80 transition-colors"
            >
              add
            </button>
            <button
              onClick={() => { setShowCustom(false); setCustomInput('') }}
              className="text-xs text-white/25 hover:text-white/50 transition-colors"
            >
              cancel
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
