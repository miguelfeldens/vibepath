import type { Impact, QuizImage, PoolImages, Environment, Skill } from '@/types'
import curatedData from './curated-images.json'

const UNSPLASH_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY
const PEXELS_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY

interface PoolConfig {
  query: string
  tags: { E: Environment; I: Impact; S: Skill }
}

// Short queries (2-4 words) perform best on both Unsplash and Pexels.
export const PHASE_CONFIGS: Record<string, Record<Impact, PoolConfig>> = {
  // Q1 — "What space calls to you?"
  q1: {
    Social_Good:   { query: 'street market community',      tags: { E: 'Social',   I: 'Social_Good',   S: 'Communicative' } },
    Innovation:    { query: 'office coworking interior',    tags: { E: 'Urban',    I: 'Innovation',    S: 'Technical'     } },
    Infrastructure:{ query: 'construction site crane',      tags: { E: 'Remote',   I: 'Infrastructure',S: 'Physical'      } },
    Artistic:      { query: 'art gallery interior',         tags: { E: 'Workshop', I: 'Artistic',       S: 'Creative'      } },
    Investigation: { query: 'library books shelves',        tags: { E: 'Lab',      I: 'Investigation', S: 'Analytical'    } },
  },

  // Q2 — "What kind of work lights you up?"
  q2: {
    Social_Good:   { query: 'teacher classroom students',   tags: { E: 'Social',   I: 'Social_Good',   S: 'Communicative' } },
    Innovation:    { query: 'programmer laptop code',       tags: { E: 'Urban',    I: 'Innovation',    S: 'Technical'     } },
    Infrastructure:{ query: 'engineer blueprint hardhat',   tags: { E: 'Workshop', I: 'Infrastructure',S: 'Physical'      } },
    Artistic:      { query: 'painter studio canvas',        tags: { E: 'Workshop', I: 'Artistic',       S: 'Creative'      } },
    Investigation: { query: 'scientist microscope lab',     tags: { E: 'Lab',      I: 'Investigation', S: 'Analytical'    } },
  },

  // Q3 — "Where do you see yourself making a difference?"
  q3: {
    Social_Good:   { query: 'classroom school interior',    tags: { E: 'Social',   I: 'Social_Good',   S: 'Communicative' } },
    Innovation:    { query: 'startup office computers',     tags: { E: 'Urban',    I: 'Innovation',    S: 'Technical'     } },
    Infrastructure:{ query: 'hospital interior clinic',     tags: { E: 'Remote',   I: 'Infrastructure',S: 'Physical'      } },
    Artistic:      { query: 'theater stage auditorium',     tags: { E: 'Workshop', I: 'Artistic',       S: 'Creative'      } },
    Investigation: { query: 'research laboratory science',  tags: { E: 'Lab',      I: 'Investigation', S: 'Analytical'    } },
  },

  // Q4 — "What challenge energizes you?"
  q4: {
    Social_Good:   { query: 'meeting debate discussion',    tags: { E: 'Social',   I: 'Social_Good',   S: 'Communicative' } },
    Innovation:    { query: 'brainstorm whiteboard team',   tags: { E: 'Urban',    I: 'Innovation',    S: 'Technical'     } },
    Infrastructure:{ query: 'workers construction hardhat', tags: { E: 'Remote',   I: 'Infrastructure',S: 'Physical'      } },
    Artistic:      { query: 'musician rehearsal stage',     tags: { E: 'Workshop', I: 'Artistic',       S: 'Creative'      } },
    Investigation: { query: 'data analysis charts',         tags: { E: 'Lab',      I: 'Investigation', S: 'Analytical'    } },
  },

  // Q5 — "Who do you want around you?" — always people
  q5: {
    Social_Good:   { query: 'diverse friends laughing',     tags: { E: 'Social',   I: 'Social_Good',   S: 'Communicative' } },
    Innovation:    { query: 'team meeting office',          tags: { E: 'Urban',    I: 'Innovation',    S: 'Technical'     } },
    Infrastructure:{ query: 'workers crew construction',    tags: { E: 'Workshop', I: 'Infrastructure',S: 'Physical'      } },
    Artistic:      { query: 'musicians band studio',        tags: { E: 'Workshop', I: 'Artistic',       S: 'Creative'      } },
    Investigation: { query: 'students study group',         tags: { E: 'Lab',      I: 'Investigation', S: 'Analytical'    } },
  },

  // Q6 — "What does success feel like?"
  q6: {
    Social_Good:   { query: 'graduation ceremony diploma',  tags: { E: 'Social',   I: 'Social_Good',   S: 'Communicative' } },
    Innovation:    { query: 'team celebrating success',     tags: { E: 'Urban',    I: 'Innovation',    S: 'Technical'     } },
    Infrastructure:{ query: 'bridge architecture landmark', tags: { E: 'Remote',   I: 'Infrastructure',S: 'Physical'      } },
    Artistic:      { query: 'concert performer crowd',      tags: { E: 'Workshop', I: 'Artistic',       S: 'Creative'      } },
    Investigation: { query: 'scientist discovery research', tags: { E: 'Lab',      I: 'Investigation', S: 'Analytical'    } },
  },

  // Q7 — "Where does your future unfold?"
  q7: {
    Social_Good:   { query: 'city street neighborhood',     tags: { E: 'Social',   I: 'Social_Good',   S: 'Communicative' } },
    Innovation:    { query: 'city skyline modern office',   tags: { E: 'Urban',    I: 'Innovation',    S: 'Technical'     } },
    Infrastructure:{ query: 'solar panels wind energy',     tags: { E: 'Nature',   I: 'Infrastructure',S: 'Physical'      } },
    Artistic:      { query: 'street art murals colorful',   tags: { E: 'Workshop', I: 'Artistic',       S: 'Creative'      } },
    Investigation: { query: 'university campus buildings',  tags: { E: 'Lab',      I: 'Investigation', S: 'Analytical'    } },
  },

  // Branch — lookbook moodboard supplemental (set 1: people & purpose)
  branch: {
    Social_Good:   { query: 'community volunteering people',tags: { E: 'Social',   I: 'Social_Good',   S: 'Communicative' } },
    Innovation:    { query: 'technology digital future',    tags: { E: 'Urban',    I: 'Innovation',    S: 'Technical'     } },
    Infrastructure:{ query: 'bridge steel architecture',    tags: { E: 'Nature',   I: 'Infrastructure',S: 'Physical'      } },
    Artistic:      { query: 'creative studio design',       tags: { E: 'Workshop', I: 'Artistic',       S: 'Creative'      } },
    Investigation: { query: 'laboratory science research',  tags: { E: 'Lab',      I: 'Investigation', S: 'Analytical'    } },
  },

  // Branch2 — lookbook moodboard supplemental (set 2: success & aspiration)
  branch2: {
    Social_Good:   { query: 'nonprofit social impact work', tags: { E: 'Social',   I: 'Social_Good',   S: 'Communicative' } },
    Innovation:    { query: 'startup entrepreneur office',  tags: { E: 'Urban',    I: 'Innovation',    S: 'Technical'     } },
    Infrastructure:{ query: 'urban planning city design',   tags: { E: 'Urban',    I: 'Infrastructure',S: 'Physical'      } },
    Artistic:      { query: 'art exhibition gallery opening',tags: { E: 'Workshop', I: 'Artistic',      S: 'Creative'      } },
    Investigation: { query: 'data analysis charts science', tags: { E: 'Lab',      I: 'Investigation', S: 'Analytical'    } },
  },

  // Branch3 — lookbook moodboard supplemental (set 3: place & aesthetic)
  branch3: {
    Social_Good:   { query: 'city park neighborhood street',tags: { E: 'Social',   I: 'Social_Good',   S: 'Communicative' } },
    Innovation:    { query: 'modern tech campus aerial',    tags: { E: 'Urban',    I: 'Innovation',    S: 'Technical'     } },
    Infrastructure:{ query: 'construction engineering site',tags: { E: 'Remote',   I: 'Infrastructure',S: 'Physical'      } },
    Artistic:      { query: 'bohemian creative workspace',  tags: { E: 'Workshop', I: 'Artistic',       S: 'Creative'      } },
    Investigation: { query: 'university campus library',    tags: { E: 'Lab',      I: 'Investigation', S: 'Analytical'    } },
  },
}

const IMPACTS: Impact[] = ['Social_Good', 'Innovation', 'Infrastructure', 'Artistic', 'Investigation']
const PHASES = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'branch', 'branch2', 'branch3'] as const

// Pool key format: "${phase}_${impact}" e.g. "q1_Artistic"
export function poolKey(phase: string, impact: Impact): string {
  return `${phase}_${impact}`
}

interface UnsplashPhoto {
  id: string
  urls: { regular: string }
  alt_description: string | null
  description: string | null
}

interface PexelsPhoto {
  id: number
  src: { large2x: string; large: string }
  alt: string
}

async function fetchFromUnsplash(query: string, count: number): Promise<{ id: string; url: string; alt: string }[]> {
  if (!UNSPLASH_KEY) return []
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape`,
      { headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` } }
    )
    if (!res.ok) return []
    const data = await res.json()
    return (data.results ?? []).map((p: UnsplashPhoto) => ({
      id: p.id,
      url: p.urls.regular,
      alt: p.alt_description ?? p.description ?? query,
    }))
  } catch {
    return []
  }
}

async function fetchFromPexels(query: string, count: number): Promise<{ id: string; url: string; alt: string }[]> {
  if (!PEXELS_KEY || PEXELS_KEY === 'your_pexels_api_key_here') return []
  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape`,
      { headers: { Authorization: PEXELS_KEY } }
    )
    if (!res.ok) return []
    const data = await res.json()
    return (data.photos ?? []).map((p: PexelsPhoto) => ({
      id: `pexels_${p.id}`,
      url: p.src.large2x || p.src.large,
      alt: p.alt || query,
    }))
  } catch {
    return []
  }
}

async function fetchPhasePool(phase: string, impact: Impact): Promise<QuizImage[]> {
  const key = poolKey(phase, impact)

  // Curated images take priority — no API call needed
  const curated = (curatedData as Record<string, QuizImage[]>)[key]
  if (curated?.length) return curated

  const cacheKey = `vibepath_${key}`
  if (typeof window !== 'undefined') {
    const cached = sessionStorage.getItem(cacheKey)
    if (cached) return JSON.parse(cached) as QuizImage[]
  }

  const config = PHASE_CONFIGS[phase][impact]
  const needed = 30

  // Try Unsplash first, fill remaining from Pexels
  const unsplashRaw = await fetchFromUnsplash(config.query, needed)
  const pexelsRaw = unsplashRaw.length < needed
    ? await fetchFromPexels(config.query, needed - unsplashRaw.length)
    : []

  const combined = [...unsplashRaw, ...pexelsRaw]
  if (combined.length === 0) return []

  const images: QuizImage[] = combined.map(p => ({
    id: p.id,
    url: p.url,
    alt: p.alt,
    tags: config.tags,
    pool: impact,
  }))

  if (typeof window !== 'undefined') {
    sessionStorage.setItem(cacheKey, JSON.stringify(images))
  }

  return images
}

export async function fetchAllPools(): Promise<PoolImages> {
  const entries = await Promise.all(
    PHASES.flatMap((phase) =>
      IMPACTS.map(async (impact) => {
        const images = await fetchPhasePool(phase, impact)
        return [poolKey(phase, impact), images] as [string, QuizImage[]]
      })
    )
  )
  return Object.fromEntries(entries)
}
