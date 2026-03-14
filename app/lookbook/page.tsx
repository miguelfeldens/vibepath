'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useQuiz } from '@/context/QuizContext'
import { LookbookHero } from '@/components/lookbook/LookbookHero'
import { PowerWordsSection } from '@/components/lookbook/PowerWordsSection'
import { MoodboardSection } from '@/components/lookbook/MoodboardSection'
import { StudentStoriesSection } from '@/components/lookbook/StudentStoriesSection'
import { JournalBadge } from '@/components/lookbook/JournalBadge'
import { PrintButton } from '@/components/lookbook/PrintButton'
import { CollegeFinderSection } from '@/components/lookbook/CollegeFinderSection'
import { PERSONAS, computePersona, getMoodboardImages } from '@/lib/personas'
import { saveSession } from '@/lib/journal'
import { GA } from '@/lib/analytics'

export default function LookbookPage() {
  const { state } = useQuiz()
  const router = useRouter()

  const { allSelections, tagCounts, poolImages } = state

  useEffect(() => {
    if (allSelections.length === 0) {
      router.replace('/')
    }
  }, [allSelections.length, router])

  const personaKey = allSelections.length > 0 ? computePersona(allSelections) : null
  const persona = personaKey ? PERSONAS[personaKey] : null
  const moodboardImages = personaKey
    ? getMoodboardImages(allSelections, poolImages, personaKey, 12)
    : []

  useEffect(() => {
    if (!personaKey || allSelections.length === 0) return

    const topTags = (Object.entries(tagCounts) as [import('@/types').Impact, number][])
      .filter(([, count]) => count > 0)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2)
      .map(([tag]) => tag)

    saveSession({
      date: new Date().toISOString(),
      topPersona: personaKey,
      topTags,
      selectedImageIds: allSelections.map((img) => img.id),
    })
    GA.surveyComplete(personaKey)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (!persona || !personaKey) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center">
        <div className="text-white/30 text-sm">Preparing your lookbook...</div>
      </div>
    )
  }

  return (
    <main className="bg-stone-950">
      <LookbookHero persona={persona} isReturning={false} />
      <PowerWordsSection persona={persona} />
      <MoodboardSection images={moodboardImages} />
      <StudentStoriesSection persona={persona} />
      <JournalBadge />
      <CollegeFinderSection personaKey={personaKey} />

      {/* T&C — print only, renders as last page of PDF */}
      <div className="print-only bg-stone-950 text-white px-12 py-16 min-h-screen">
        <p className="text-xs tracking-[0.3em] uppercase text-white/40 font-medium mb-10">VibePath — Terms &amp; Conditions</p>
        <div className="space-y-8 max-w-lg">
          <div>
            <h3 className="text-sm font-semibold text-white mb-2">AI makes mistakes</h3>
            <p className="text-sm text-white/60 leading-relaxed">VibePath uses algorithmic persona matching — not licensed career counseling. Your results are a starting point for reflection, not a diagnosis or a prescription. Talk to a school counselor, mentor, or trusted adult before making major decisions about your future.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-2">No data collected</h3>
            <p className="text-sm text-white/60 leading-relaxed">We don&apos;t ask for your name, email, or any personal information. Your quiz results are saved only in your browser&apos;s localStorage. Nothing is sent to our servers.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-2">College data</h3>
            <p className="text-sm text-white/60 leading-relaxed">College information comes from the U.S. Department of Education&apos;s College Scorecard — a public federal dataset. Admission rates and SAT ranges may not reflect the most recent admissions cycle. Always verify directly with the school.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-2">Images</h3>
            <p className="text-sm text-white/60 leading-relaxed">Quiz and moodboard images are served from Unsplash and Pexels under their respective free-use licenses.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-2">General</h3>
            <p className="text-sm text-white/60 leading-relaxed">VibePath is an independent tool built for exploration and self-reflection. It is not affiliated with any college, university, government agency, or professional counseling body.</p>
          </div>
        </div>
        <p className="mt-16 text-xs text-white/20">vibepath.app · {new Date().getFullYear()} · by Miguel Feldens</p>
      </div>

      {/* Footer CTA */}
      <section className="no-print px-8 py-16 text-center border-t border-white/5 bg-stone-950">
        <p className="text-sm text-white/30 mb-6">Save or explore more</p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <PrintButton />
          <a
            href="/quiz"
            className="inline-block px-6 py-3 rounded-full border border-white/20 text-sm font-medium
              text-white/70 hover:bg-white/5 hover:text-white transition-all duration-200"
          >
            Retake the vibe check
          </a>
        </div>
      </section>

      {/* Signature */}
      <div className="px-8 py-6 text-center bg-stone-950 border-t border-white/5">
        <p className="text-xs text-white/20">by Miguel Feldens</p>
      </div>
    </main>
  )
}
