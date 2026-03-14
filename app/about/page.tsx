import Link from 'next/link'

const ARCHETYPES = [
  {
    key: 'Social Good',
    title: 'The Human Advocate',
    description:
      'You are drawn to the human side of every system. Your instinct is to listen, to understand, and to fight for what is right.',
  },
  {
    key: 'Innovation',
    title: 'The Systems Architect',
    description:
      'You see broken things as puzzles waiting to be solved. You are energized by building systems, products, and ideas that did not exist before.',
  },
  {
    key: 'Infrastructure',
    title: 'The Earth Steward',
    description:
      'You think in systems — natural, mechanical, and civic. You want to build things that last and protect what already exists.',
  },
  {
    key: 'Artistic',
    title: 'The Virtual Creator',
    description:
      'You see the world as a canvas. Whether through visuals, sound, story, or code, you make things that make people feel something.',
  },
  {
    key: 'Investigation',
    title: 'The Insight Hunter',
    description:
      'You are not satisfied with the surface. You dig, question, and analyze until the real answer emerges — then you share it.',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-stone-950 text-white">
      <div className="max-w-2xl mx-auto px-6 py-16">

        {/* Header */}
        <p className="text-xs tracking-[0.3em] uppercase text-white/30 font-medium mb-6">VibePath</p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.1] mb-4">
          The methodology,<br />
          <span className="text-white/50">no cap.</span>
        </h1>
        <p className="text-base text-white/40 leading-relaxed mb-16">
          Here&apos;s exactly how we figure out your path — and why it works.
        </p>

        {/* How the quiz works */}
        <section className="mb-14">
          <h2 className="text-xs tracking-[0.25em] uppercase text-white/30 font-medium mb-4">How the quiz works</h2>
          <div className="space-y-4 text-sm text-white/60 leading-relaxed">
            <p>
              Seven rapid-fire image questions. Each round you pick 3 images that resonate on gut instinct — no overthinking, no wrong answers.
            </p>
            <p>
              Every image you pick quietly tags one of five <span className="text-white/80">impact dimensions</span>: Social Good, Innovation, Infrastructure, Artistic, or Investigation.
            </p>
            <p>
              After the second question, your emerging dominant dimension starts to shape which images appear next. The quiz branches toward you — so by the end, the pattern is clear.
            </p>
          </div>
        </section>

        {/* The 5 archetypes */}
        <section className="mb-14">
          <h2 className="text-xs tracking-[0.25em] uppercase text-white/30 font-medium mb-6">The 5 archetypes</h2>
          <div className="space-y-6">
            {ARCHETYPES.map(({ key, title, description }) => (
              <div key={key} className="border-l border-white/10 pl-5">
                <p className="text-xs text-white/30 mb-1 font-medium">{key}</p>
                <p className="text-base text-white font-medium mb-1">{title}</p>
                <p className="text-sm text-white/50 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Theoretical foundation */}
        <section className="mb-14">
          <h2 className="text-xs tracking-[0.25em] uppercase text-white/30 font-medium mb-4">Theoretical foundation</h2>
          <div className="space-y-4 text-sm text-white/60 leading-relaxed">
            <p>
              The five archetypes are grounded in <span className="text-white/80">Holland&apos;s Theory of Career Choice</span> (RIASEC), one of the most widely validated frameworks in vocational psychology. Developed by psychologist John L. Holland in the 1950s, it proposes that people and work environments can be classified into six types: Realistic, Investigative, Artistic, Social, Enterprising, and Conventional.
            </p>
            <p>
              VibePath&apos;s dimensions map directly to five of these:
            </p>
            <div className="grid grid-cols-1 gap-2 mt-3 pl-2">
              {[
                { dim: 'Investigation', riasec: 'Investigative (I)', desc: 'analytical, intellectual, scientific' },
                { dim: 'Artistic', riasec: 'Artistic (A)', desc: 'creative, expressive, original' },
                { dim: 'Social Good', riasec: 'Social (S)', desc: 'helping, teaching, caregiving' },
                { dim: 'Innovation', riasec: 'Enterprising (E)', desc: 'leading, persuading, building ventures' },
                { dim: 'Infrastructure', riasec: 'Realistic (R)', desc: 'practical, hands-on, technical' },
              ].map(({ dim, riasec, desc }) => (
                <div key={dim} className="flex items-baseline gap-3">
                  <span className="text-white/80 font-medium w-28 shrink-0">{dim}</span>
                  <span className="text-white/40">→</span>
                  <span><span className="text-white/60">{riasec}</span> <span className="text-white/30">· {desc}</span></span>
                </div>
              ))}
            </div>
            <p className="mt-4">
              The same model underlies the <span className="text-white/80">Strong Interest Inventory®</span> and the <span className="text-white/80">O*NET Interest Profiler</span> (U.S. Department of Labor), both widely used career assessment tools. VibePath replaces self-report questions with image-based gut reactions to reduce social desirability bias — you respond to aesthetics, not abstractions.
            </p>
          </div>
          <div className="mt-6 space-y-2 text-xs text-white/25 leading-relaxed border-l border-white/8 pl-4">
            <p>Holland, J.L. (1997). <em>Making Vocational Choices: A Theory of Vocational Personalities and Work Environments</em> (3rd ed.). Psychological Assessment Resources.</p>
            <p>Gottfredson, G.D., &amp; Holland, J.L. (1996). <em>Dictionary of Holland Occupational Codes</em> (3rd ed.). Psychological Assessment Resources.</p>
            <p>National Center for O*NET Development. (2024). <em>O*NET Interest Profiler</em>. U.S. Department of Labor. onetcenter.org</p>
          </div>
        </section>

        {/* College fit logic */}
        <section className="mb-14">
          <h2 className="text-xs tracking-[0.25em] uppercase text-white/30 font-medium mb-4">College fit logic</h2>
          <div className="space-y-4 text-sm text-white/60 leading-relaxed">
            <p>
              We match your SAT composite score against each school&apos;s 25th and 75th percentile to classify it as an <span className="text-white/80">ultra-reach, reach, target, or safety</span>.
            </p>
            <p>
              No SAT? We fall back to the school&apos;s overall admission rate. GPA adjusts the result one tier up (3.7+) or down (below 2.5).
            </p>
            <p>
              College data comes from the <span className="text-white/80">U.S. Department of Education&apos;s College Scorecard</span> — a public federal dataset updated annually. Program matching uses the school&apos;s reported bachelor&apos;s degree offerings, filtered for your archetype.
            </p>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {['ultra-reach', 'reach', 'target', 'safety'].map((level) => {
              const styles: Record<string, string> = {
                'ultra-reach': 'bg-red-900/40 text-red-300 border border-red-700/40',
                'reach': 'bg-orange-900/40 text-orange-300 border border-orange-700/40',
                'target': 'bg-emerald-900/40 text-emerald-300 border border-emerald-700/40',
                'safety': 'bg-sky-900/40 text-sky-300 border border-sky-700/40',
              }
              return (
                <span key={level} className={`px-2.5 py-1 rounded-full text-xs font-medium ${styles[level]}`}>
                  {level.charAt(0).toUpperCase() + level.slice(1).replace('-', '-')}
                </span>
              )
            })}
          </div>
        </section>

        {/* Data & privacy */}
        <section className="mb-16">
          <h2 className="text-xs tracking-[0.25em] uppercase text-white/30 font-medium mb-4">Data &amp; privacy</h2>
          <div className="space-y-3 text-sm text-white/60 leading-relaxed">
            <p>Your quiz session is saved only in your <span className="text-white/80">browser&apos;s localStorage</span> — so you can revisit your Lookbook later. Nothing is sent to a server. We don&apos;t collect names, emails, or any personal info.</p>
            <p>Quiz and moodboard images are served from <span className="text-white/80">Unsplash</span> and <span className="text-white/80">Pexels</span> under their respective free-use licenses.</p>
          </div>
        </section>

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
