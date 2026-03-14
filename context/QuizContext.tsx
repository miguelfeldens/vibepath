'use client'

import React, { createContext, useContext, useReducer } from 'react'
import type { Impact, PoolImages, QuizAction, QuizImage, QuizState } from '@/types'
import { buildInitialTagCounts, buildQuestionImages, getTopImpact, QUESTION_PROMPTS } from '@/lib/branching'

const TOTAL_QUESTIONS = 7

function createInitialState(): QuizState {
  return {
    poolImages: {},
    currentQuestion: 0,
    questionImages: [],
    currentSelections: [],
    allSelections: [],
    tagCounts: buildInitialTagCounts(),
    branchPool: null,
    isLoading: true,
    isComplete: false,
  }
}

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'IMAGES_LOADED': {
      const usedIds = new Set<string>()
      const questionImages: QuizImage[][] = []

      // Pre-build Q1 and Q2 with their phase-specific pools
      for (let i = 0; i < 2; i++) {
        const imgs = buildQuestionImages(action.images, i, null, usedIds)
        questionImages.push(imgs)
      }

      return {
        ...state,
        poolImages: action.images,
        questionImages,
        isLoading: false,
      }
    }

    case 'SELECT_IMAGE': {
      let currentSelections = [...state.currentSelections]
      if (currentSelections.length >= 3) {
        currentSelections = currentSelections.slice(1)
      }
      currentSelections = [...currentSelections, action.image]
      return { ...state, currentSelections }
    }

    case 'DESELECT_IMAGE': {
      const currentSelections = state.currentSelections.filter((img) => img.id !== action.id)
      return { ...state, currentSelections }
    }

    case 'NEXT_QUESTION': {
      const newAllSelections = [...state.allSelections, ...action.selectedForQuestion]

      const newTagCounts = { ...state.tagCounts }
      action.selectedForQuestion.forEach((img) => {
        newTagCounts[img.tags.I]++
      })

      const nextQ = state.currentQuestion + 1

      let branchPool = state.branchPool
      if (state.currentQuestion === 1) {
        branchPool = getTopImpact(newTagCounts)
      }

      let questionImages = [...state.questionImages]
      if (nextQ >= 2 && nextQ < TOTAL_QUESTIONS && questionImages.length <= nextQ) {
        const usedIds = new Set(newAllSelections.map((img) => img.id))
        questionImages.flat().forEach((img) => usedIds.add(img.id))

        const newImgs = buildQuestionImages(state.poolImages, nextQ, branchPool, usedIds)
        questionImages = [...questionImages, newImgs]
      }

      const isComplete = nextQ >= TOTAL_QUESTIONS

      return {
        ...state,
        allSelections: newAllSelections,
        tagCounts: newTagCounts,
        branchPool,
        currentQuestion: nextQ,
        questionImages,
        currentSelections: [],
        isComplete,
      }
    }

    case 'COMPLETE_QUIZ':
      return { ...state, isComplete: true }

    case 'RESET':
      return createInitialState()

    default:
      return state
  }
}

interface QuizContextValue {
  state: QuizState
  dispatch: React.Dispatch<QuizAction>
  currentQuestionImages: QuizImage[]
  currentPrompt: string
  totalQuestions: number
}

const QuizContext = createContext<QuizContextValue | null>(null)

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(quizReducer, undefined, createInitialState)

  const currentQuestionImages = state.questionImages[state.currentQuestion] ?? []
  const currentPrompt = QUESTION_PROMPTS[state.currentQuestion] ?? ''

  return (
    <QuizContext.Provider
      value={{ state, dispatch, currentQuestionImages, currentPrompt, totalQuestions: TOTAL_QUESTIONS }}
    >
      {children}
    </QuizContext.Provider>
  )
}

export function useQuiz() {
  const ctx = useContext(QuizContext)
  if (!ctx) throw new Error('useQuiz must be used within QuizProvider')
  return ctx
}
