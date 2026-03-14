'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useQuiz } from '@/context/QuizContext'
import { QuizCarousel } from '@/components/quiz/QuizCarousel'
import { fetchAllPools } from '@/lib/unsplash'

export default function QuizPage() {
  const { state, dispatch } = useQuiz()
  const router = useRouter()

  useEffect(() => {
    if (state.isComplete) {
      router.push('/lookbook')
      return
    }

    if (!state.isLoading) return

    fetchAllPools()
      .then((images) => {
        dispatch({ type: 'IMAGES_LOADED', images })
      })
      .catch((err) => {
        console.error('Failed to load images:', err)
        // Still dispatch with empty pools so the UI doesn't hang
        dispatch({
          type: 'IMAGES_LOADED',
          images: {
            Social_Good: [],
            Innovation: [],
            Infrastructure: [],
            Artistic: [],
            Investigation: [],
          },
        })
      })
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps

  if (state.isLoading) {
    return (
      <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center gap-6">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-white/40 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
        <p className="text-sm text-white/30 tracking-wide">Curating your vibe...</p>
      </div>
    )
  }

  return <QuizCarousel />
}
