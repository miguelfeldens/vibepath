'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fetchColleges, US_STATES, STATE_NAMES, PERSONA_PROGRAMS, ALL_PROGRAMS, type CollegeResult, type FitLevel } from '@/lib/college-api'
import { MISSION_TO_MAJOR } from '@/lib/deepdive'
import { GA } from '@/lib/analytics'
import type { Impact } from '@/types'

const BMAC_URL = 'https://buymeacoffee.com/miguelfeldens'

const FIT_STYLES: Record<FitLevel, { label: string; className: string }> = {
  'ultra-reach': { label: 'Ultra-reach', className: 'bg-red-900/40 text-red-300 border border-red-700/40' },
  'reach':       { label: 'Reach',       className: 'bg-orange-900/40 text-orange-300 border border-orange-700/40' },
  'target':      { label: 'Target',      className: 'bg-emerald-900/40 text-emerald-300 border border-emerald-700/40' },
  'safety':      { label: 'Safety',      className: 'bg-sky-900/40 text-sky-300 border border-sky-700/40' },
  'unknown':     { label: 'Unknown',     className: 'bg-stone-800 text-white/40 border border-white/10' },
}

type Step = 'cta' | 'modal' | 'form' | 'results'

interface Props {
  personaKey: Impact
  ikigaiMission?: string
}

export function CollegeFinderSection({ personaKey, ikigaiMission }: Props) {
  const programs = PERSONA_PROGRAMS[personaKey]
  const programEntries = Object.entries(programs) // [suffix, label][]
  const defaultMajorKey = programEntries[0][0]

  const allProgramsRecord = ALL_PROGRAMS as Record<string, string>
  const ikigaiMajorKey = ikigaiMission ? MISSION_TO_MAJOR[ikigaiMission] : undefined
  const ikigaiMajorValid = !!(ikigaiMajorKey && allProgramsRecord[ikigaiMajorKey])

  const [step, setStep] = useState<Step>('cta')
  const [states, setStates] = useState<string[]>([])
  const [gpaW, setGpaW] = useState('')
  const [gpaU, setGpaU] = useState('')
  const [sat, setSat] = useState('')
  const [locale, setLocale] = useState<'urban' | 'rural' | 'any'>('any')
  const [selectedMajorKey, setSelectedMajorKey] = useState<string>(defaultMajorKey)

  // When ikigai mission is set, pre-select the matched major
  useEffect(() => {
    if (ikigaiMajorValid && ikigaiMajorKey) {
      setSelectedMajorKey(ikigaiMajorKey)
    }
  }, [ikigaiMajorKey, ikigaiMajorValid])
  const [results, setResults] = useState<CollegeResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function toggleState(s: string) {
    setStates((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : prev.length < 3 ? [...prev, s] : prev
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const data = await fetchColleges({
        personaKey,
        states,
        sat,
        gpaUnweighted: gpaU,
        locale,
        majorKey: selectedMajorKey === 'any' ? undefined : selectedMajorKey,
      })
      setResults(data)
      setStep('results')
      GA.collegeSearch(personaKey, data.length)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className={`${step !== 'results' ? 'no-print' : 'print-page-break'} border-t border-white/5 bg-stone-950`}>

      {/* Step: CTA */}
      {step === 'cta' && (
        <div className="px-8 py-14 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-white/30 font-medium mb-3">Next step</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-3" style={{ fontFamily: 'var(--font-playfair)' }}>
            Find colleges that match your vibe
          </h2>
          <p className="text-sm text-white/40 mb-8 max-w-md mx-auto">
            We&apos;ll search real institutions offering programs that align with your identity — filtered by location and matched to your profile.
          </p>
          <button
            onClick={() => setStep('modal')}
            className="px-7 py-3 rounded-full bg-white text-stone-950 text-sm font-semibold
              hover:bg-white/90 active:scale-95 transition-all duration-200"
          >
            Explore colleges →
          </button>
        </div>
      )}

      {/* Step: Donation modal */}
      <AnimatePresence>
        {step === 'modal' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-stone-900 border border-white/10 rounded-2xl px-8 py-10 max-w-sm w-full text-center"
            >
              <p className="text-2xl mb-3">☕</p>
              <h3 className="text-lg font-semibold text-white mb-2">Did VibePath help?</h3>
              <p className="text-sm text-white/50 mb-8 leading-relaxed">
                It&apos;s free — but if it was useful, buying me a coffee keeps it that way for everyone.
              </p>
              <a
                href={BMAC_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => { GA.donationClick(); setStep('form') }}
                className="block w-full py-3 rounded-full bg-amber-500 hover:bg-amber-400
                  text-stone-950 text-sm font-semibold transition-all duration-200 active:scale-95 mb-3"
              >
                Buy me a coffee ☕
              </a>
              <button
                onClick={() => setStep('form')}
                className="text-xs text-white/30 hover:text-white/50 transition-colors duration-200"
              >
                Skip, show me colleges →
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step: Search form */}
      {(step === 'form' || step === 'results') && (
        <div className="px-8 py-12">
          {step === 'form' && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-xs tracking-[0.3em] uppercase text-white/30 font-medium mb-2">College finder</p>
              <h2 className="text-2xl font-semibold text-white mb-8" style={{ fontFamily: 'var(--font-playfair)' }}>
                Tell us a bit about yourself
              </h2>
              <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">

                {/* Major selection */}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-3">
                    Preferred major
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {[
                      { key: 'any', label: 'Any', ikigai: false },
                      // Ikigai-matched major, if not already in persona defaults
                      ...(ikigaiMajorValid && ikigaiMajorKey && !programEntries.some(([k]) => k === ikigaiMajorKey)
                        ? [{ key: ikigaiMajorKey, label: allProgramsRecord[ikigaiMajorKey], ikigai: true }]
                        : []),
                      ...programEntries.map(([key, label]) => ({ key, label, ikigai: key === ikigaiMajorKey })),
                    ].map(({ key, label, ikigai }) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setSelectedMajorKey(key)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-150
                          ${selectedMajorKey === key
                            ? 'bg-white text-stone-950'
                            : 'bg-stone-800 text-white/50 hover:bg-stone-700 hover:text-white/70'
                          }`}
                      >
                        {label}
                        {ikigai && <span className="ml-1.5 text-[10px] opacity-50">✦ ikigai</span>}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-white/30">or pick any field:</span>
                    <select
                      value={Object.keys(ALL_PROGRAMS).includes(selectedMajorKey) && !programEntries.some(([k]) => k === selectedMajorKey) ? selectedMajorKey : ''}
                      onChange={(e) => { if (e.target.value) setSelectedMajorKey(e.target.value) }}
                      className="bg-stone-800 border border-white/10 text-white/60 text-xs rounded-lg px-3 py-1.5
                        focus:outline-none focus:border-white/30 cursor-pointer"
                    >
                      <option value="">— browse all majors —</option>
                      {Object.entries(ALL_PROGRAMS)
                        .sort(([, a], [, b]) => a.localeCompare(b))
                        .map(([key, label]) => (
                          <option key={key} value={key}>{label}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>

                {/* State selection */}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-3">
                    Preferred states <span className="text-white/30 font-normal">(pick up to 3)</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {US_STATES.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggleState(s)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150
                          ${states.includes(s)
                            ? 'bg-white text-stone-950'
                            : 'bg-stone-800 text-white/50 hover:bg-stone-700 hover:text-white/70'
                          }
                          ${!states.includes(s) && states.length >= 3 ? 'opacity-30 cursor-not-allowed' : ''}
                        `}
                        title={STATE_NAMES[s]}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* GPA */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Weighted GPA <span className="text-white/30 font-normal">(optional)</span>
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="5"
                      placeholder="e.g. 3.8"
                      value={gpaW}
                      onChange={(e) => setGpaW(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-stone-800 border border-white/10 text-white
                        text-sm placeholder:text-white/20 focus:outline-none focus:border-white/30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Unweighted GPA <span className="text-white/30 font-normal">(optional)</span>
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="4"
                      placeholder="e.g. 3.5"
                      value={gpaU}
                      onChange={(e) => setGpaU(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-stone-800 border border-white/10 text-white
                        text-sm placeholder:text-white/20 focus:outline-none focus:border-white/30"
                    />
                  </div>
                </div>

                {/* SAT */}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    SAT score <span className="text-white/30 font-normal">(optional — used to estimate fit level)</span>
                  </label>
                  <input
                    type="number"
                    min="400"
                    max="1600"
                    placeholder="e.g. 1200"
                    value={sat}
                    onChange={(e) => setSat(e.target.value)}
                    className="w-full max-w-xs px-4 py-2.5 rounded-xl bg-stone-800 border border-white/10 text-white
                      text-sm placeholder:text-white/20 focus:outline-none focus:border-white/30"
                  />
                </div>

                {/* Urban / Rural */}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-3">Campus setting</label>
                  <div className="flex gap-2">
                    {(['any', 'urban', 'rural'] as const).map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setLocale(opt)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-150
                          ${locale === opt
                            ? 'bg-white text-stone-950'
                            : 'bg-stone-800 text-white/50 hover:bg-stone-700 hover:text-white/70'
                          }`}
                      >
                        {opt === 'any' ? 'Any' : opt === 'urban' ? 'Urban / City' : 'Suburban / Rural'}
                      </button>
                    ))}
                  </div>
                </div>

                {error && (
                  <p className="text-sm text-red-400">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className={`px-7 py-3 rounded-full text-sm font-semibold transition-all duration-200
                    ${loading
                      ? 'bg-white/10 text-white/30 cursor-not-allowed'
                      : 'bg-white text-stone-950 hover:bg-white/90 active:scale-95'
                    }`}
                >
                  {loading ? 'Searching...' : 'Find my colleges →'}
                </button>
              </form>
            </motion.div>
          )}

          {/* Step: Results */}
          {step === 'results' && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div>
                  <p className="text-xs tracking-[0.3em] uppercase text-white/30 font-medium mb-1">Results</p>
                  <h2 className="text-2xl font-semibold text-white" style={{ fontFamily: 'var(--font-playfair)' }}>
                    {results.length > 0 ? `${results.length} colleges found` : 'No results found'}
                  </h2>
                </div>
                <button
                  onClick={() => { setStep('form'); setResults([]) }}
                  className="no-print text-xs text-white/30 hover:text-white/60 transition-colors border border-white/10
                    px-4 py-2 rounded-full"
                >
                  Adjust search
                </button>
              </div>

              {results.length === 0 ? (
                <p className="text-sm text-white/40">
                  No colleges matched your filters. Try selecting more states or removing the campus setting filter.
                </p>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-white/10">
                  <table className="w-full text-sm bg-stone-950">
                    <thead>
                      <tr className="border-b border-white/10 bg-stone-900/60">
                        <th className="text-left px-4 py-3 text-white/40 font-medium">Institution</th>
                        <th className="text-left px-4 py-3 text-white/40 font-medium">State</th>
                        <th className="text-left px-4 py-3 text-white/40 font-medium">Matching Majors</th>
                        <th className="text-left px-4 py-3 text-white/40 font-medium">Website</th>
                        <th className="text-left px-4 py-3 text-white/40 font-medium">Fit Level</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((r, i) => {
                        const fit = FIT_STYLES[r.fitLevel]
                        return (
                          <tr
                            key={r.id}
                            className={`border-b border-white/5 ${i % 2 === 0 ? 'bg-stone-950' : 'bg-stone-900/30'}`}
                          >
                            <td className="px-4 py-3">
                              <span className="text-white font-medium block">{r.name}</span>
                              {r.vibe && (
                                <span className="text-xs text-white/30 mt-0.5 block leading-snug">{r.vibe}</span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-white/50">{r.state}</td>
                            <td className="px-4 py-3 text-white/60">
                              {r.matchingMajors.length > 0
                                ? r.matchingMajors.join(', ')
                                : <span className="text-white/20">—</span>
                              }
                            </td>
                            <td className="px-4 py-3">
                              {r.url ? (
                                <a
                                  href={r.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={() => GA.collegeClick(r.name)}
                                  className="text-white/40 hover:text-white transition-colors underline underline-offset-2"
                                >
                                  Visit →
                                </a>
                              ) : (
                                <span className="text-white/20">—</span>
                              )}
                            </td>
                            <td className="px-4 py-3">
                              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${fit.className}`}>
                                {fit.label}
                              </span>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}
        </div>
      )}
    </section>
  )
}
