import type { Impact } from '@/types'

// ─── Power Words ──────────────────────────────────────────────────────────────

export const POWER_WORDS: Record<Impact, [string, string, string, string, string]> = {
  Social_Good:    ['CHAMPION', 'CONNECT',  'HEAL',      'ADVOCATE', 'PROTECT'],
  Innovation:     ['BUILD',    'DISRUPT',  'DESIGN',    'SOLVE',    'LAUNCH'],
  Infrastructure: ['ENGINEER', 'SUSTAIN',  'RESTORE',   'CONSTRUCT','FORTIFY'],
  Artistic:       ['CREATE',   'EXPRESS',  'CRAFT',     'ENVISION', 'TRANSFORM'],
  Investigation:  ['DECODE',   'ANALYZE',  'EXPOSE',    'QUESTION', 'DISCOVER'],
}

// ─── Missions ─────────────────────────────────────────────────────────────────

export const MISSIONS = [
  'Mental Health',
  'Climate Tech',
  'Systemic Justice',
  'Education Equity',
  'Economic Access',
  'Housing Access',
  'Public Health',
  'Urban Innovation',
  'Food Security',
  'Clean Energy',
  'Criminal Reform',
  'Ocean & Wildlife',
  'Digital Equity',
  'Immigration',
  'Civic Tech',
  'Arts & Culture',
  'Early Childhood',
  'Addiction Recovery',
  'Disability Rights',
  'Animal Welfare',
] as const

export type Mission = string

// ─── Economics ────────────────────────────────────────────────────────────────

export type Economics = 'stable' | 'growth' | 'risk'

export const ECONOMICS_OPTIONS: { key: Economics; label: string; sub: string; desc: string }[] = [
  {
    key: 'stable',
    label: 'Steady Foundation',
    sub: 'Low-Stress / Stable',
    desc: 'A clear path, predictable income, room to do good work without the chaos.',
  },
  {
    key: 'growth',
    label: 'Build Something Real',
    sub: 'Growth / Mission-Driven',
    desc: 'You want to grow something meaningful — impact over comfort, but not reckless.',
  },
  {
    key: 'risk',
    label: 'Founder Energy',
    sub: 'High-Stakes / All-In',
    desc: 'You thrive in uncertainty. You want to bet on yourself and build from zero.',
  },
]

// ─── Manifesto Templates ──────────────────────────────────────────────────────
// 15 combinations: 5 personas × 3 economics
// Each template is a function receiving (personaTitle, top, middle, mission, economicsKey)

type ManifestoFn = (
  personaTitle: string,
  top: string,
  middle: string,
  mission: string,
  economics: Economics,
) => string

const MANIFESTO_TEMPLATES: Record<Impact, Record<Economics, ManifestoFn>> = {
  Social_Good: {
    stable: (t, top, mid, mission) =>
      `You're not just looking for a job — you're a ${t} who shows up where it counts. You're at your best when you ${top.toLowerCase()} to shift the tide on ${mission}, and you need a path that lets you ${mid.toLowerCase()} without burning out.`,
    growth: (t, top, mid, mission) =>
      `You're a ${t} with a scorecard that goes beyond salary. You're wired to ${top.toLowerCase()} and build real change around ${mission} — and you need a path that lets you ${mid.toLowerCase()} while the work actually scales.`,
    risk: (t, top, mid, mission) =>
      `You're a ${t} who bets on people first. Most would call ${mission} a cause — you see it as a system to redesign from scratch. You need the freedom to ${top.toLowerCase()}, ${mid.toLowerCase()}, and move fast when it matters.`,
  },
  Innovation: {
    stable: (t, top, mid, mission) =>
      `You're a ${t} — someone who sees broken systems and can't help but fix them. You want to ${top.toLowerCase()} in the space where ${mission} meets technology, and you need a foundation stable enough to let you ${mid.toLowerCase()} without second-guessing every move.`,
    growth: (t, top, mid, mission) =>
      `You're a ${t} who thinks in products, not problems. Your angle on ${mission} isn't abstract — you want to ${top.toLowerCase()} something real and watch it grow. You need a path that rewards you for being the person who ${mid.toLowerCase()}s first.`,
    risk: (t, top, mid, mission) =>
      `You're a ${t} who finds comfort boring. ${mission} isn't a cause to you — it's a market waiting for someone bold enough to ${top.toLowerCase()} the right thing. You need a path with enough room to ${mid.toLowerCase()}, fail, and go again.`,
  },
  Infrastructure: {
    stable: (t, top, mid, mission) =>
      `You're a ${t} — the person everyone counts on to make things actually work. You want to ${top.toLowerCase()} systems that tackle ${mission} for the long haul, and you need a path with real stakes and real craft, where you can ${mid.toLowerCase()} without reinventing the wheel every week.`,
    growth: (t, top, mid, mission) =>
      `You're a ${t} who builds things that last. ${mission} is exactly the kind of problem that needs your hands on it — you want to ${top.toLowerCase()} something durable, and grow into a role where ${mid.toLowerCase()}ing is part of the job description.`,
    risk: (t, top, mid, mission) =>
      `You're a ${t} who sees opportunity where others see complexity. ${mission} needs people who can ${top.toLowerCase()} from the ground up — and you've got the grit to ${mid.toLowerCase()} through the hard parts and still ship something solid.`,
  },
  Artistic: {
    stable: (t, top, mid, mission) =>
      `You're a ${t} — you don't just make things, you make people feel things. You want to ${top.toLowerCase()} work that speaks to ${mission} in a way that sticks, and you need a path that lets you ${mid.toLowerCase()} with enough breathing room to stay original.`,
    growth: (t, top, mid, mission) =>
      `You're a ${t} with a vision that's bigger than any single piece. You want to ${top.toLowerCase()} at the intersection of ${mission} and culture, and you need a path that lets your work ${mid.toLowerCase()} into something with real reach.`,
    risk: (t, top, mid, mission) =>
      `You're a ${t} who trusts the work. ${mission} is your canvas — you want to ${top.toLowerCase()} something that cuts through the noise, and you're willing to ${mid.toLowerCase()} on the edge of what's been done before to get there.`,
  },
  Investigation: {
    stable: (t, top, mid, mission) =>
      `You're a ${t} — you don't accept "that's just how it is." You want to ${top.toLowerCase()} the truth behind ${mission} and turn it into something people can act on. You need a path stable enough to let you ${mid.toLowerCase()} without pressure to rush the answer.`,
    growth: (t, top, mid, mission) =>
      `You're a ${t} who follows the question wherever it leads. ${mission} is full of gaps that need someone to ${top.toLowerCase()} what's really happening — and you want a path that grows with your ability to ${mid.toLowerCase()} insights that actually change things.`,
    risk: (t, top, mid, mission) =>
      `You're a ${t} who's not afraid of what the data says. You want to ${top.toLowerCase()} into ${mission} in ways that make people uncomfortable — and you need a path with enough independence to ${mid.toLowerCase()} without asking permission.`,
  },
}

// ─── Mission → College Major Mapping ──────────────────────────────────────────
// Maps each mission to the best-matching College Scorecard program key

export const MISSION_TO_MAJOR: Record<string, string> = {
  'Mental Health':       'psychology',
  'Climate Tech':        'environmental',
  'Systemic Justice':    'public_administration_social_service',
  'Education Equity':    'education',
  'Economic Access':     'public_administration_social_service',
  'Housing Access':      'architecture',
  'Public Health':       'health',
  'Urban Innovation':    'architecture',
  'Food Security':       'biological',
  'Clean Energy':        'engineering',
  'Criminal Reform':     'public_administration_social_service',
  'Ocean & Wildlife':    'biological',
  'Digital Equity':      'computer',
  'Immigration':         'public_administration_social_service',
  'Civic Tech':          'computer',
  'Arts & Culture':      'visual_performing',
  'Early Childhood':     'education',
  'Addiction Recovery':  'psychology',
  'Disability Rights':   'social_science',
  'Animal Welfare':      'biological',
}

// ─── Generate Manifesto ───────────────────────────────────────────────────────

export function generateManifesto(
  personaKey: Impact,
  personaTitle: string,
  top: string,
  middle: string,
  mission: string,
  economics: Economics,
): string {
  return MANIFESTO_TEMPLATES[personaKey][economics](personaTitle, top, middle, mission, economics)
}
