'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useQuiz } from '@/context/QuizContext'
import { ImageCard } from './ImageCard'
import { TimerRing } from './TimerRing'
import { QuestionProgress } from './QuestionProgress'
import { SelectionCounter } from './SelectionCounter'
import type { QuizImage } from '@/types'

const TIMER_SECONDS = 30

export function QuizCarousel() {
  const { state, dispatch, currentQuestionImages, currentPrompt, totalQuestions } = useQuiz()
  const router = useRouter()
  const [timerKey, setTimerKey] = useState(0)
  const [timerActive, setTimerActive] = useState(true)
  const hasAdvancedRef = useRef(false)

  const currentSelections = state.currentSelections
  const currentQ = state.currentQuestion

  const handleAdvance = useCallback(() => {
    if (hasAdvancedRef.current) return
    hasAdvancedRef.current = true
    setTimerActive(false)

    dispatch({ type: 'NEXT_QUESTION', selectedForQuestion: currentSelections })

    if (currentQ + 1 >= totalQuestions) {
      router.push('/lookbook')
    }
  }, [currentSelections, currentQ, totalQuestions, dispatch, router])

  // Reset on new question
  useEffect(() => {
    hasAdvancedRef.current = false
    setTimerKey((k) => k + 1)
    setTimerActive(true)
  }, [currentQ])

  // Redirect if complete
  useEffect(() => {
    if (state.isComplete) {
      router.push('/lookbook')
    }
  }, [state.isComplete, router])

  const handleToggle = useCallback(
    (image: QuizImage) => {
      const isSelected = currentSelections.some((img) => img.id === image.id)
      if (isSelected) {
        dispatch({ type: 'DESELECT_IMAGE', id: image.id, questionIndex: currentQ })
      } else {
        dispatch({ type: 'SELECT_IMAGE', image, questionIndex: currentQ })
      }
    },
    [currentSelections, currentQ, dispatch]
  )

  return (
    <div className="h-dvh overflow-hidden bg-stone-950 text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-4 pb-3">
        <QuestionProgress current={currentQ + 1} total={totalQuestions} />
        <TimerRing
          key={timerKey}
          duration={TIMER_SECONDS}
          onExpire={handleAdvance}
          isActive={timerActive}
        />
      </div>

      {/* Question prompt */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`prompt-${currentQ}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="px-6 pb-3"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{currentPrompt}</h2>
          <p className="text-sm text-white/40 mt-1">Pick up to 3 images that feel right</p>
        </motion.div>
      </AnimatePresence>

      {/* Image grid */}
      <div className="flex-1 min-h-0 px-4 pb-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={`grid-${currentQ}`}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-2 sm:grid-cols-3 grid-rows-3 sm:grid-rows-2 gap-3 h-full"
          >
            {currentQuestionImages.map((image) => {
              const selIdx = currentSelections.findIndex((s) => s.id === image.id)
              return (
                <ImageCard
                  key={image.id}
                  image={image}
                  isSelected={selIdx !== -1}
                  selectionOrder={selIdx !== -1 ? selIdx + 1 : null}
                  onToggle={handleToggle}
                />
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
        <SelectionCounter count={currentSelections.length} max={3} />
        <button
          onClick={handleAdvance}
          disabled={currentSelections.length === 0}
          className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200
            ${currentSelections.length > 0
              ? 'bg-white text-black hover:bg-white/90 active:scale-95'
              : 'bg-white/10 text-white/30 cursor-not-allowed'
            }
          `}
        >
          {currentQ + 1 === totalQuestions ? 'See my vibe →' : 'Next →'}
        </button>
      </div>
    </div>
  )
}
