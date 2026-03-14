import type { Impact, SessionResult } from '@/types'

const STORAGE_KEY = 'vibepath_sessions'
const MAX_SESSIONS = 10

export function saveSession(result: SessionResult): void {
  if (typeof window === 'undefined') return
  const existing = getSessions()
  const updated = [result, ...existing].slice(0, MAX_SESSIONS)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
}

export function getSessions(): SessionResult[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as SessionResult[]
  } catch {
    return []
  }
}

export function getPersistentInterests(): Impact[] {
  const sessions = getSessions()
  if (sessions.length < 2) return []

  const allTags = sessions.flatMap((s) => s.topTags)
  const unique = [...new Set(allTags)] as Impact[]

  return unique.filter((tag) => {
    const count = allTags.filter((t) => t === tag).length
    return count / sessions.length >= 0.5
  })
}

export function getSessionCount(): number {
  return getSessions().length
}
