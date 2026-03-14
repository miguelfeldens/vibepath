export type Environment = 'Urban' | 'Lab' | 'Nature' | 'Remote' | 'Workshop' | 'Social'
export type Impact = 'Social_Good' | 'Innovation' | 'Infrastructure' | 'Artistic' | 'Investigation'
export type Skill = 'Analytical' | 'Creative' | 'Communicative' | 'Technical' | 'Physical'

export interface ImageTags {
  E: Environment
  I: Impact
  S: Skill
}

export interface QuizImage {
  id: string
  url: string
  alt: string
  tags: ImageTags
  pool: Impact
}

export interface Persona {
  title: string
  powerWords: [string, string, string]
  coverGradient: string
  accentColor: string
  description: string
  careers: string[]
  topCareer: { title: string; blurb: string; bullets: string[] }
}

export interface SessionResult {
  date: string
  topPersona: Impact
  topTags: Impact[]
  selectedImageIds: string[]
}

// Pool images keyed by phase+impact, e.g. "q1_Artistic", "q2_Innovation", "branch_Social_Good"
export type PoolImages = Record<string, QuizImage[]>

export type QuizAction =
  | { type: 'IMAGES_LOADED'; images: PoolImages }
  | { type: 'SELECT_IMAGE'; image: QuizImage; questionIndex: number }
  | { type: 'DESELECT_IMAGE'; id: string; questionIndex: number }
  | { type: 'NEXT_QUESTION'; selectedForQuestion: QuizImage[] }
  | { type: 'COMPLETE_QUIZ' }
  | { type: 'RESET' }

export interface QuizState {
  poolImages: PoolImages
  currentQuestion: number
  questionImages: QuizImage[][]
  currentSelections: QuizImage[]
  allSelections: QuizImage[]
  tagCounts: Record<Impact, number>
  branchPool: Impact | null
  isLoading: boolean
  isComplete: boolean
}
