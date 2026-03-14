import Link from 'next/link'

const SECTIONS = [
  {
    heading: 'AI makes mistakes',
    body: 'VibePath uses algorithmic persona matching — not licensed career counseling. Your results are a starting point for reflection, not a diagnosis or a prescription. Talk to a school counselor, mentor, or trusted adult before making major decisions about your future.',
  },
  {
    heading: 'No data collected',
    body: "We don't ask for your name, email, or any personal information. Your quiz results are saved only in your browser's localStorage so you can revisit your Lookbook. Clearing your browser data removes them entirely. Nothing is sent to our servers.",
  },
  {
    heading: 'College data',
    body: "College information comes from the U.S. Department of Education's College Scorecard — a public federal dataset. Admission rates, SAT ranges, and program offerings may not reflect the most recent admissions cycle. Always verify directly with the school.",
  },
  {
    heading: 'Images',
    body: 'Quiz and moodboard images are served from Unsplash and Pexels under their respective free-use licenses. We do not own or host these images.',
  },
  {
    heading: 'General',
    body: 'VibePath is an independent tool built for exploration and self-reflection. It is not affiliated with any college, university, government agency, or professional counseling body.',
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-stone-950 text-white">
      <div className="max-w-2xl mx-auto px-6 py-16">

        {/* Header */}
        <p className="text-xs tracking-[0.3em] uppercase text-white/30 font-medium mb-6">VibePath</p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.1] mb-4">
          Heads up.
        </h1>
        <p className="text-base text-white/40 leading-relaxed mb-16">
          Plain language. No legal gibberish. Just the things you should know before you dive in.
        </p>

        {/* Sections */}
        <div className="space-y-10 mb-16">
          {SECTIONS.map(({ heading, body }) => (
            <div key={heading} className="border-t border-white/8 pt-8">
              <h2 className="text-sm font-semibold text-white mb-3">{heading}</h2>
              <p className="text-sm text-white/50 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        {/* Back link */}
        <Link
          href="/"
          className="text-sm text-white/30 hover:text-white/60 transition-colors"
        >
          ← Back to VibePath
        </Link>

        <p className="mt-12 text-xs text-white/20">by Miguel Feldens</p>
      </div>
    </div>
  )
}
