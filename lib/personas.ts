import type { Impact, Persona, QuizImage } from '@/types'

export const PERSONAS: Record<Impact, Persona> = {
  Social_Good: {
    title: 'The Human Advocate',
    powerWords: ['Empathetic', 'Just', 'Persuasive'],
    coverGradient: 'from-rose-900 via-rose-800 to-stone-900',
    accentColor: '#F9A8D4',
    description:
      'You are drawn to the human side of every system. Your instinct is to listen, to understand, and to fight for what is right.',
    careers: [
      'Social Worker',
      'Public Policy Analyst',
      'Nonprofit Director',
      'School Counselor',
      'Community Organizer',
      'Human Rights Lawyer',
      'Public Health Coordinator',
      'Family Therapist',
      'Urban Planner',
      'Grant Writer',
      'Child Welfare Specialist',
      'Mediator',
      'Legislative Aide',
      'Immigration Advocate',
      'Healthcare Navigator',
    ],
    topCareer: {
      title: 'Social Worker',
      blurb:
        'Social workers help individuals and families navigate life\'s hardest moments — mental health crises, housing instability, abuse recovery. Every day looks different: case management, home visits, court advocacy, and crisis response.',
      bullets: [
        'Connect at-risk youth with counseling and school support programs',
        'Advocate for policy changes in child welfare and housing systems',
        'Coordinate services for families in under-resourced communities',
        'Partner with hospitals to support patients during medical crises',
        'Run community mental health outreach through nonprofits and clinics',
      ],
    },
  },

  Innovation: {
    title: 'The Systems Architect',
    powerWords: ['Strategic', 'Scalable', 'Visionary'],
    coverGradient: 'from-violet-900 via-indigo-900 to-stone-900',
    accentColor: '#A78BFA',
    description:
      'You see patterns where others see chaos. You build systems that scale, products that matter, and futures that don\'t exist yet.',
    careers: [
      'Product Manager',
      'Software Engineer',
      'Data Scientist',
      'AI Engineer',
      'Startup Founder',
      'Systems Architect',
      'UX Researcher',
      'Cybersecurity Engineer',
      'Technical Program Manager',
      'Venture Analyst',
      'Platform Engineer',
      'Growth Strategist',
      'DevOps Engineer',
      'Business Intelligence Lead',
      'CTO',
    ],
    topCareer: {
      title: 'Product Manager',
      blurb:
        'Product managers are the bridge between user needs and what gets built. A typical day involves talking to customers, prioritizing features with engineers, reviewing usage metrics, and making calls about what to build next.',
      bullets: [
        'Define the roadmap for a consumer app used by millions',
        'Run sprint planning sessions with engineering and design teams',
        'Analyze user behavior data to improve feature adoption',
        'Interview customers to uncover unmet needs and pain points',
        'Launch products at startups, tech companies, or established brands',
      ],
    },
  },

  Infrastructure: {
    title: 'The Earth Steward',
    powerWords: ['Sustainable', 'Grounded', 'Protective'],
    coverGradient: 'from-emerald-900 via-green-900 to-stone-900',
    accentColor: '#6EE7B7',
    description:
      'You build the world people live in. From bridges to ecosystems — you care about what lasts, what holds, and what protects.',
    careers: [
      'Civil Engineer',
      'Environmental Scientist',
      'Urban Planner',
      'Structural Engineer',
      'Water Resources Engineer',
      'Renewable Energy Engineer',
      'Conservation Biologist',
      'Climate Scientist',
      'Sustainability Consultant',
      'Landscape Architect',
      'Hydrologist',
      'Transportation Planner',
      'Geotechnical Engineer',
      'Environmental Policy Advisor',
      'Public Works Director',
    ],
    topCareer: {
      title: 'Civil Engineer',
      blurb:
        'Civil engineers design and build the physical world — roads, bridges, water systems, and public buildings. Work moves between office design and field inspection, balancing technical precision with real-world constraints.',
      bullets: [
        'Design stormwater drainage systems for a growing city neighborhood',
        'Inspect bridge structural integrity after severe weather events',
        'Plan road networks and utilities for new residential developments',
        'Engineer water treatment facilities serving tens of thousands of residents',
        'Manage construction timelines and budgets on public infrastructure projects',
      ],
    },
  },

  Artistic: {
    title: 'The Virtual Creator',
    powerWords: ['Immersive', 'Aesthetic', 'Original'],
    coverGradient: 'from-amber-900 via-orange-900 to-stone-900',
    accentColor: '#FCD34D',
    description:
      'You don\'t just make things look good — you make people feel something. Your work starts conversations and opens worlds.',
    careers: [
      'UX Designer',
      'Brand Strategist',
      'Motion Designer',
      'Game Designer',
      'Film Director',
      'Art Director',
      'Creative Director',
      'Illustrator',
      'Spatial Designer',
      'Animator',
      'Copywriter',
      'Museum Curator',
      'Architect',
      'Fashion Designer',
      'Multimedia Artist',
    ],
    topCareer: {
      title: 'UX Designer',
      blurb:
        'UX designers shape how people experience digital products. A day might include user interviews, wireframing new flows, reviewing prototypes with developers, and running usability tests to find where people get stuck.',
      bullets: [
        'Design the onboarding flow for a mobile banking or health app',
        'Create wireframes and interactive prototypes in Figma for engineering handoff',
        'Conduct user research interviews to identify friction and unmet needs',
        'Improve accessibility for apps used by people with visual or motor disabilities',
        'Work across tech companies, agencies, nonprofits, and in-house creative teams',
      ],
    },
  },

  Investigation: {
    title: 'The Insight Hunter',
    powerWords: ['Methodical', 'Curious', 'Rigorous'],
    coverGradient: 'from-sky-900 via-blue-900 to-stone-900',
    accentColor: '#7DD3FC',
    description:
      'You want to know *why*. You dig until you find it — the root cause, the pattern, the truth hiding in the data.',
    careers: [
      'Research Scientist',
      'Data Analyst',
      'Investigative Journalist',
      'Forensic Scientist',
      'Epidemiologist',
      'Intelligence Analyst',
      'Market Researcher',
      'Statistician',
      'Clinical Psychologist',
      'Biomedical Researcher',
      'Financial Analyst',
      'Behavioral Economist',
      'Policy Researcher',
      'Archaeologist',
      'Cryptographer',
    ],
    topCareer: {
      title: 'Research Scientist',
      blurb:
        'Research scientists spend their days designing experiments, collecting data, and working to answer questions no one has answered before. The work requires patience, precision, and comfort with uncertainty.',
      bullets: [
        'Conduct clinical trials testing new cancer treatment protocols',
        'Analyze genomic data to identify markers for inherited diseases',
        'Publish findings in peer-reviewed journals read by scientists worldwide',
        'Apply for grants to fund multi-year research projects',
        'Collaborate across universities, hospitals, and pharmaceutical companies',
      ],
    },
  },
}

export function computePersona(selectedImages: QuizImage[]): Impact {
  const counts: Record<Impact, number> = {
    Social_Good: 0,
    Innovation: 0,
    Infrastructure: 0,
    Artistic: 0,
    Investigation: 0,
  }
  selectedImages.forEach((img) => {
    counts[img.tags.I]++
  })
  const sorted = (Object.entries(counts) as [Impact, number][]).sort((a, b) => b[1] - a[1])
  return sorted[0][0]
}

export function getMoodboardImages(
  allSelections: QuizImage[],
  poolImages: import('@/types').PoolImages,
  personaKey: Impact,
  targetCount = 12
): QuizImage[] {
  // Deduplicate user selections, preserving order (most recent last)
  const seen = new Set<string>()
  const unique: QuizImage[] = []
  for (let i = allSelections.length - 1; i >= 0; i--) {
    const img = allSelections[i]
    if (!seen.has(img.id)) {
      seen.add(img.id)
      unique.unshift(img)
    }
  }

  if (unique.length >= targetCount) return unique.slice(-targetCount)

  // Fill remaining slots from the branch pool for the dominant persona
  const branchPool = poolImages[`branch_${personaKey}`] ?? []
  const extras = branchPool
    .filter((img) => !seen.has(img.id))
    .slice(0, targetCount - unique.length)

  return [...unique, ...extras]
}
