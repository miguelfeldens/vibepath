import type { Impact, QuizImage, PoolImages } from '@/types'
import { poolKey } from '@/lib/unsplash'

const IMPACTS: Impact[] = [
  'Social_Good',
  'Innovation',
  'Infrastructure',
  'Artistic',
  'Investigation',
]

// Every question now has its own Unsplash phase with a tailored query set
const PHASE_MAP: Record<number, string> = {
  0: 'q1', // "What space calls to you?"
  1: 'q2', // "What kind of work lights you up?"
  2: 'q3', // "Where do you see yourself making a difference?"
  3: 'q4', // "What challenge energizes you?"
  4: 'q5', // "Who do you want around you?"
  5: 'q6', // "What does success feel like?"
  6: 'q7', // "Where does your future unfold?"
}

function phaseForQuestion(index: number): string {
  return PHASE_MAP[index] ?? 'branch'
}

export function getTopImpact(tagCounts: Record<Impact, number>): Impact | null {
  const sorted = (Object.entries(tagCounts) as [Impact, number][]).sort((a, b) => b[1] - a[1])
  if (sorted[0][1] === 0) return null
  return sorted[0][0]
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function pickUnused(pool: QuizImage[], usedIds: Set<string>, count: number): QuizImage[] {
  return shuffle(pool.filter((img) => !usedIds.has(img.id))).slice(0, count)
}

export function buildQuestionImages(
  allImages: PoolImages,
  questionIndex: number,
  branchPool: Impact | null,
  usedIds: Set<string>
): QuizImage[] {
  const addUsed = (imgs: QuizImage[]) => imgs.forEach((img) => usedIds.add(img.id))
  const phase = phaseForQuestion(questionIndex)

  // Q1, Q2, Q5: balanced — 1 image from each of the 5 impact pools for this phase
  if (questionIndex < 2 || questionIndex === 4) {
    const shuffledImpacts = shuffle(IMPACTS)
    const cards: QuizImage[] = []

    for (const impact of shuffledImpacts) {
      const pool = allImages[poolKey(phase, impact)] ?? []
      const picked = pickUnused(pool, usedIds, 1)
      addUsed(picked)
      cards.push(...picked)
    }

    return shuffle(cards).slice(0, 5)
  }

  // Q3, Q4, Q6, Q7: dominant-weighted — up to 3 from dominant, fill rest from others to reach 5
  const dominant = branchPool ?? IMPACTS[0]
  const others = shuffle(IMPACTS.filter((i) => i !== dominant))

  const dominantPicks = pickUnused(allImages[poolKey(phase, dominant)] ?? [], usedIds, 3)
  addUsed(dominantPicks)

  const need = 5 - dominantPicks.length
  const otherPicks: QuizImage[] = []
  for (const impact of others) {
    if (otherPicks.length >= need) break
    const picked = pickUnused(allImages[poolKey(phase, impact)] ?? [], usedIds, 1)
    addUsed(picked)
    otherPicks.push(...picked)
  }

  return shuffle([...dominantPicks, ...otherPicks]).slice(0, 5)
}

export function buildInitialTagCounts(): Record<Impact, number> {
  return {
    Social_Good: 0,
    Innovation: 0,
    Infrastructure: 0,
    Artistic: 0,
    Investigation: 0,
  }
}

export const QUESTION_PROMPTS = [
  'What space calls to you?',
  'What kind of work lights you up?',
  'Where do you see yourself making a difference?',
  'What challenge energizes you?',
  'Who do you want around you?',
  'What does success feel like?',
  'Where does your future unfold?',
]
