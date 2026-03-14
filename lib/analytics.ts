// GA4 event helpers — gtag is injected via <Script> in app/layout.tsx
declare function gtag(...args: unknown[]): void

function track(event: string, params?: Record<string, unknown>) {
  if (typeof gtag === 'undefined') return
  gtag('event', event, params)
}

export const GA = {
  /** Fired once when the lookbook mounts — marks a completed quiz */
  surveyComplete: (personaKey: string) =>
    track('survey_complete', { persona: personaKey }),

  /** Fired when college search results load */
  collegeSearch: (personaKey: string, resultCount: number) =>
    track('college_search', { persona: personaKey, results: resultCount }),

  /** Fired when user clicks a school's "Visit →" link */
  collegeClick: (schoolName: string) =>
    track('college_click', { school: schoolName }),

  /** Fired when user clicks the donation / BMAC link */
  donationClick: () =>
    track('donation_click'),
}
