'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Impact } from '@/types'
import { POWER_WORDS, ECONOMICS_OPTIONS, generateManifesto, type Economics } from '@/lib/deepdive'
import { PERSONAS } from '@/lib/personas'
import { IkigaiVenn } from './IkigaiVenn'
import { PowerWordStack, type Stack } from './PowerWordStack'
import { MissionMarket } from './MissionMarket'
import { LifeHypothesis } from './LifeHypothesis'
import { GA } from '@/lib/analytics'

type Step = 'entry' | 'stack' | 'mission' | 'hypothesis'

interface Props {
  personaKey: Impact
  onComplete?: (mission: string, manifesto: string) => void
  onReset?: () => void
}

const SECTION_TRANSITION = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -8 },
  transition: { duration: 0.4, ease: 'easeOut' as const },
}

export function DeepDiveSection({ personaKey, onComplete, onReset }: Props) {
  const persona = PERSONAS[personaKey]
  const accentColor = persona.accentColor
  const words = POWER_WORDS[personaKey]

  const [step, setStep] = useState<Step>('entry')
  const [stack, setStack] = useState<Stack>({ top: null, middle: null, bottom: null })
  const [mission, setMission] = useState<string | null>(null)
  const [economics, setEconomics] = useState<Economics | null>(null)

  function handleRedo() {
    setStep('entry')
    setStack({ top: null, middle: null, bottom: null })
    setMission(null)
    setEconomics(null)
    onReset?.()
  }

  const stackComplete = !!(stack.top && stack.middle && stack.bottom)
  const missionComplete = !!mission
  const economicsComplete = !!economics
  const step2Complete = missionComplete && economicsComplete

  const manifesto =
    stackComplete && step2Complete
      ? generateManifesto(personaKey, persona.title, stack.top!, stack.middle!, mission!, economics!)
      : ''

  const economicsLabel = economics
    ? ECONOMICS_OPTIONS.find((o) => o.key === economics)?.label ?? ''
    : ''

  return (
    <section className="lookbook-section border-t border-white/5 bg-stone-950 px-8 py-20">
      <div className="space-y-12">

        {/* Header — always visible once past entry */}
        {step !== 'entry' && (
          <motion.div {...SECTION_TRANSITION}>
            <p className="text-xs tracking-[0.3em] uppercase text-white/30 font-medium mb-3">
              deep dive
            </p>
            <h2
              className="text-4xl sm:text-5xl font-semibold tracking-tight text-white"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              The &lsquo;why&rsquo; behind the vibe.
            </h2>
          </motion.div>
        )}

        <AnimatePresence mode="wait">

          {/* ── Step 0: Entry ─────────────────────────────────────────────────── */}
          {step === 'entry' && (
            <motion.div key="entry" {...SECTION_TRANSITION}>
              <div
                className="rounded-2xl border p-8 sm:p-10 space-y-5"
                style={{
                  backgroundColor: accentColor + '0A',
                  borderColor: accentColor + '25',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div className="space-y-3">
                  <p className="text-xs tracking-[0.3em] uppercase text-white/30 font-medium">
                    level 2
                  </p>
                  <h3
                    className="text-3xl sm:text-4xl font-semibold text-white leading-tight"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    vibes check out.
                    <br />
                    <span className="text-white/50 font-normal">ready to go deeper?</span>
                  </h3>
                  <p className="text-base text-white/40 leading-relaxed">
                    you know your vibe. now let&apos;s find the <em>why</em> behind it — the purpose that makes it hit different.
                  </p>

                  {/* Ikigai definition */}
                  <div className="pt-2 border-t border-white/8">
                    <p className="text-xs text-white/25 leading-relaxed">
                      <span className="text-white/45 font-medium">ikigai</span>
                      {' '}(ee-kee-guy) — japanese concept for &ldquo;your reason to get up in the morning.&rdquo; it&apos;s the overlap between what you love, what you&apos;re good at, what the world needs, and what pays. this is yours.
                    </p>
                  </div>
                </div>
                <motion.button
                  onClick={() => { setStep('stack'); GA.deepDiveStep('stack') }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-full text-sm font-semibold tracking-wide text-black transition-all duration-200"
                  style={{ backgroundColor: accentColor }}
                >
                  Level Up →
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ── Steps 1-3 ─────────────────────────────────────────────────────── */}
          {step !== 'entry' && (
            <motion.div key="content" {...SECTION_TRANSITION} className="space-y-12">

              {/* Venn — visible in steps 1 & 2 only */}
              {(step === 'stack' || step === 'mission') && (
                <IkigaiVenn
                  passionDone={stackComplete}
                  missionDone={missionComplete}
                  vocationDone={economicsComplete}
                  accentColor={accentColor}
                />
              )}

              {/* ── Step 1: Power Word Stack ───────────────────────────────────── */}
              {(step === 'stack' || step === 'mission' || step === 'hypothesis') && (
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      {step === 'stack' && (
                        <p className="text-xs tracking-[0.3em] uppercase text-white/30 font-medium mb-2">
                          step 01
                        </p>
                      )}
                      <h3
                        className="text-2xl sm:text-3xl font-semibold text-white mb-2"
                        style={{ fontFamily: 'var(--font-playfair)' }}
                      >
                        what&apos;s your flex?
                      </h3>
                      <p className="text-base text-white/40">drag your top 3 into the stack — order matters.</p>
                    </div>
                    {step !== 'stack' && stackComplete && (
                      <span className="text-xs text-white/25 mt-1">✓ locked in</span>
                    )}
                  </div>

                  {step === 'stack' ? (
                    <>
                      <PowerWordStack
                        words={[...words]}
                        accentColor={accentColor}
                        onChange={setStack}
                      />
                      <AnimatePresence>
                        {stackComplete && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <button
                              onClick={() => { setStep('mission'); GA.deepDiveStep('mission') }}
                              className="mt-4 px-6 py-3 rounded-full text-sm font-semibold tracking-wide text-black transition-all duration-200"
                              style={{ backgroundColor: accentColor }}
                            >
                              Locked In →
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    /* Compact stack summary in later steps */
                    <div className="flex flex-wrap gap-2">
                      {[stack.top, stack.middle, stack.bottom].filter(Boolean).map((w, i) => (
                        <span
                          key={w}
                          className="px-3 py-1.5 rounded-full text-xs font-bold tracking-[0.1em] border"
                          style={{ borderColor: accentColor + '40', color: accentColor, backgroundColor: accentColor + '10' }}
                        >
                          {i + 1}. {w}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ── Step 2: Mission & Market ───────────────────────────────────── */}
              {(step === 'mission' || step === 'hypothesis') && (
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      {step === 'mission' && (
                        <p className="text-xs tracking-[0.3em] uppercase text-white/30 font-medium mb-2">
                          step 02
                        </p>
                      )}
                      <h3
                        className="text-2xl sm:text-3xl font-semibold text-white"
                        style={{ fontFamily: 'var(--font-playfair)' }}
                      >
                        mission &amp; market
                      </h3>
                    </div>
                    {step === 'hypothesis' && step2Complete && (
                      <span className="text-xs text-white/25 mt-1">✓ locked in</span>
                    )}
                  </div>

                  {step === 'mission' ? (
                    <>
                      <MissionMarket
                        accentColor={accentColor}
                        mission={mission}
                        economics={economics}
                        onMissionChange={setMission}
                        onEconomicsChange={setEconomics}
                      />
                      <AnimatePresence>
                        {step2Complete && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <button
                              onClick={() => {
                                setStep('hypothesis')
                                GA.deepDiveStep('hypothesis')
                                GA.deepDiveComplete(personaKey)
                                onComplete?.(mission!, manifesto)
                              }}
                              className="mt-4 px-6 py-3 rounded-full text-sm font-semibold tracking-wide text-black transition-all duration-200"
                              style={{ backgroundColor: accentColor }}
                            >
                              Setting the Course →
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    /* Compact summary in step 3 */
                    <div className="flex flex-wrap gap-2 text-xs text-white/40">
                      <span className="px-3 py-1.5 rounded-full border border-white/10">{mission}</span>
                      <span className="px-3 py-1.5 rounded-full border border-white/10">{economicsLabel}</span>
                    </div>
                  )}
                </div>
              )}

              {/* ── Step 3: Life Hypothesis ────────────────────────────────────── */}
              {step === 'hypothesis' && manifesto && (
                <div className="space-y-2">
                  <p className="text-xs tracking-[0.3em] uppercase text-white/30 font-medium">
                    your life hypothesis
                  </p>
                  <LifeHypothesis
                    manifesto={manifesto}
                    top={stack.top!}
                    middle={stack.middle!}
                    bottom={stack.bottom!}
                    mission={mission!}
                    economicsLabel={economicsLabel}
                    accentColor={accentColor}
                  />
                  <button
                    onClick={handleRedo}
                    className="mt-6 text-xs text-white/25 hover:text-white/50 transition-colors underline underline-offset-2"
                  >
                    redo the deep dive
                  </button>
                </div>
              )}

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
