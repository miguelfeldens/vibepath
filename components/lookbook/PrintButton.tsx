'use client'

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black
        text-sm font-semibold hover:bg-white/90 active:scale-95 transition-all duration-200"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
        <path d="M2.5 9.5H1.5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H11.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <rect x="2.5" y="7.5" width="9" height="5" rx="0.5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M2.5 4.5V1.5h9v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
      Save as PDF
    </button>
  )
}
