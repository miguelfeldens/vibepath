import type { Impact } from '@/types'

export const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DC','DE','FL','GA','HI','ID','IL','IN',
  'IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH',
  'NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT',
  'VT','VA','WA','WV','WI','WY',
]

export const STATE_NAMES: Record<string, string> = {
  AL:'Alabama', AK:'Alaska', AZ:'Arizona', AR:'Arkansas', CA:'California',
  CO:'Colorado', CT:'Connecticut', DC:'Washington D.C.', DE:'Delaware',
  FL:'Florida', GA:'Georgia', HI:'Hawaii', ID:'Idaho', IL:'Illinois',
  IN:'Indiana', IA:'Iowa', KS:'Kansas', KY:'Kentucky', LA:'Louisiana',
  ME:'Maine', MD:'Maryland', MA:'Massachusetts', MI:'Michigan', MN:'Minnesota',
  MS:'Mississippi', MO:'Missouri', MT:'Montana', NE:'Nebraska', NV:'Nevada',
  NH:'New Hampshire', NJ:'New Jersey', NM:'New Mexico', NY:'New York',
  NC:'North Carolina', ND:'North Dakota', OH:'Ohio', OK:'Oklahoma', OR:'Oregon',
  PA:'Pennsylvania', RI:'Rhode Island', SC:'South Carolina', SD:'South Dakota',
  TN:'Tennessee', TX:'Texas', UT:'Utah', VT:'Vermont', VA:'Virginia',
  WA:'Washington', WV:'West Virginia', WI:'Wisconsin', WY:'Wyoming',
}

// Maps persona → { API field suffix → readable label }
// Field format: latest.academics.program.bachelors.{suffix}
// Values are 0 or 1 (whether school offers bachelor's in that area)
export const PERSONA_PROGRAMS: Record<Impact, Record<string, string>> = {
  Social_Good: {
    public_administration_social_service: 'Social Work / Public Policy',
    social_science: 'Sociology / Social Sciences',
    education: 'Education',
    health: 'Public Health',
    psychology: 'Psychology',
  },
  Innovation: {
    computer: 'Computer Science / IT',
    engineering: 'Engineering',
    business_marketing: 'Business / Entrepreneurship',
  },
  Infrastructure: {
    engineering: 'Engineering',
    architecture: 'Architecture',
    biological: 'Environmental / Biological Sciences',
    physical_science: 'Physical Sciences',
  },
  Artistic: {
    visual_performing: 'Fine Arts / Music / Film',
    english: 'Creative Writing / English',
    architecture: 'Architecture / Design',
    communication: 'Communications / Media',
  },
  Investigation: {
    biological: 'Biology / Life Sciences',
    physical_science: 'Chemistry / Physics',
    mathematics: 'Statistics / Mathematics',
    psychology: 'Psychology',
    communication: 'Journalism / Communications',
  },
}

// All bachelor's program fields available in the College Scorecard API
export const ALL_PROGRAMS: Record<string, string> = {
  agriculture: 'Agriculture & Natural Resources',
  architecture: 'Architecture & Design',
  biological: 'Biology & Life Sciences',
  business_marketing: 'Business & Marketing',
  communication: 'Communications & Journalism',
  computer: 'Computer Science & IT',
  education: 'Education',
  engineering: 'Engineering',
  english: 'English & Creative Writing',
  ethnic_cultural_gender: 'Ethnic, Cultural & Gender Studies',
  health: 'Health & Public Health',
  history: 'History',
  humanities: 'Humanities',
  language: 'Foreign Languages & Linguistics',
  legal: 'Legal Studies / Pre-Law',
  library: 'Library Science',
  mathematics: 'Mathematics & Statistics',
  mechanic_repair_technology: 'Mechanics & Repair Technology',
  military: 'Military Sciences',
  multidiscipline: 'Interdisciplinary Studies',
  parks_recreation_fitness: 'Parks, Recreation & Fitness',
  philosophy_religious: 'Philosophy & Religious Studies',
  physical_science: 'Physical Sciences (Chemistry, Physics)',
  precision_production: 'Precision Production',
  psychology: 'Psychology',
  public_administration_social_service: 'Public Administration & Social Work',
  resources: 'Natural Resources & Conservation',
  science_technology: 'Science Technology',
  security_law_enforcement: 'Criminal Justice & Security',
  social_science: 'Social Sciences (Sociology, Anthropology)',
  theology_religious_vocation: 'Theology & Religious Studies',
  transportation: 'Transportation & Logistics',
  visual_performing: 'Visual & Performing Arts',
}

const BASE_FIELDS = [
  'id',
  'school.name',
  'school.state',
  'school.school_url',
  'school.locale',
  'school.ownership',
  'school.degrees_awarded.highest',
  'school.hbcu',
  'school.women_only',
  'school.men_only',
  'school.religious_affiliation',
  'latest.student.size',
  'latest.admissions.sat_scores.25th_percentile.critical_reading',
  'latest.admissions.sat_scores.25th_percentile.mathematics',
  'latest.admissions.sat_scores.75th_percentile.critical_reading',
  'latest.admissions.sat_scores.75th_percentile.mathematics',
  'latest.admissions.admission_rate.overall',
  'latest.student.retention_rate.four_year.full_time',
  'latest.completion.completion_rate_4yr_150nt',
  'latest.cost.avg_net_price.public',
  'latest.cost.avg_net_price.private',
  'latest.aid.pell_grant_rate',
]

export type FitLevel = 'ultra-reach' | 'reach' | 'target' | 'safety' | 'unknown'

export interface CollegeResult {
  id: number
  name: string
  state: string
  url: string
  admissionRate: number | null
  sat25: number | null
  sat75: number | null
  netPrice: number | null
  pellRate: number | null
  isCommunity: boolean
  matchingMajors: string[]
  fitLevel: FitLevel
  vibe: string
}

export interface FetchCollegesParams {
  personaKey: Impact
  state: string | null
  sat: string
  gpaUnweighted: string
  locale: 'urban' | 'rural' | 'any'
  majorKey?: string  // if set, filter to this specific program only
  institutionType: 'public' | 'private' | 'community' | 'any'
  maxCost: number | null
  highAid: boolean
}

function computeFitLevel(
  admissionRate: number | null,
  sat25: number | null,
  sat75: number | null,
  userSat: number | null,
  gpa: number | null,
): FitLevel {
  // Ultra-reach: highly selective regardless of scores
  if (admissionRate !== null && admissionRate < 0.10) return 'ultra-reach'

  let level: FitLevel = 'unknown'

  if (userSat !== null && sat25 !== null && sat75 !== null) {
    if (userSat < sat25) level = 'reach'
    else if (userSat <= sat75) level = 'target'
    else level = 'safety'
  } else if (admissionRate !== null) {
    if (admissionRate < 0.25) level = 'reach'
    else if (admissionRate < 0.60) level = 'target'
    else level = 'safety'
  }

  // GPA modifier: strong GPA boosts one tier, weak GPA drops one tier
  if (gpa !== null) {
    const order: FitLevel[] = ['ultra-reach', 'reach', 'target', 'safety']
    const idx = order.indexOf(level) // -1 when level is 'unknown'
    if (idx !== -1) {
      if (gpa >= 3.7 && idx < order.length - 1) {
        level = order[idx + 1] // boost one tier
      } else if (gpa < 2.5 && idx > 0) {
        level = order[idx - 1] // drop one tier
      }
    }
  }

  return level
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function generateVibe(raw: any): string {
  const size: number = raw['latest.student.size']
  const sizeLabel = !size ? null : size < 2500 ? 'small' : size < 12000 ? 'mid-size' : 'large'

  const ownership: number = raw['school.ownership']
  const ownershipLabel = ownership === 1 ? 'public' : ownership === 2 ? 'private' : null

  const locale: number = raw['school.locale']
  let localeLabel: string | null = null
  if (locale >= 11 && locale <= 13) localeLabel = 'city campus'
  else if (locale >= 21 && locale <= 23) localeLabel = 'suburban campus'
  else if (locale >= 31 && locale <= 33) localeLabel = 'small-town campus'
  else if (locale >= 41 && locale <= 43) localeLabel = 'rural campus'

  const rate: number = raw['latest.admissions.admission_rate.overall']
  let selectivity: string | null = null
  if (rate != null) {
    if (rate < 0.15) selectivity = 'highly selective'
    else if (rate < 0.35) selectivity = 'selective'
    else if (rate < 0.6) selectivity = 'moderately selective'
    else selectivity = 'accessible admissions'
  }

  // Identity badges
  const identityParts: string[] = []
  if (raw['school.hbcu'] === 1) identityParts.push('HBCU')
  if (raw['school.women_only'] === 1) identityParts.push("women's college")
  if (raw['school.men_only'] === 1) identityParts.push("men's college")
  if (raw['school.religious_affiliation'] && raw['school.religious_affiliation'] !== 0) identityParts.push('faith-based')

  // Retention & graduation
  const retention: number | null = raw['latest.student.retention_rate.four_year.full_time'] ?? null
  const retentionLabel = retention != null ? `${Math.round(retention * 100)}% return rate` : null

  const gradRate: number | null = raw['latest.completion.completion_rate_4yr_150nt'] ?? null
  const gradLabel = gradRate != null ? `${Math.round(gradRate * 100)}% grad rate` : null

  // Cost (whichever field is populated)
  const netPublic: number | null = raw['latest.cost.avg_net_price.public'] ?? null
  const netPrivate: number | null = raw['latest.cost.avg_net_price.private'] ?? null
  const netPrice = netPublic ?? netPrivate
  const netPriceLabel = netPrice != null
    ? `~$${Math.round(netPrice / 1000)}k avg net price`
    : null

  // Aid accessibility
  const pellRate: number | null = raw['latest.aid.pell_grant_rate'] ?? null
  let pellLabel: string | null = null
  if (pellRate != null) {
    if (pellRate >= 0.40) pellLabel = 'high aid availability'
    else if (pellRate >= 0.25) pellLabel = 'moderate aid'
  }

  const parts: string[] = []
  if (sizeLabel && ownershipLabel) parts.push(`${sizeLabel} ${ownershipLabel}`)
  else if (sizeLabel) parts.push(sizeLabel)
  else if (ownershipLabel) parts.push(ownershipLabel)
  if (localeLabel) parts.push(localeLabel)
  if (selectivity) parts.push(selectivity)
  parts.push(...identityParts)
  if (retentionLabel) parts.push(retentionLabel)
  if (gradLabel) parts.push(gradLabel)
  if (netPriceLabel) parts.push(netPriceLabel)
  if (pellLabel) parts.push(pellLabel)

  return parts.join(' · ').slice(0, 300)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseSchool(raw: any, personaKey: Impact, userSat: number | null, gpa: number | null, activeProgramKeys: string[]): CollegeResult {
  const sat25r = raw['latest.admissions.sat_scores.25th_percentile.critical_reading'] ?? null
  const sat25m = raw['latest.admissions.sat_scores.25th_percentile.mathematics'] ?? null
  const sat75r = raw['latest.admissions.sat_scores.75th_percentile.critical_reading'] ?? null
  const sat75m = raw['latest.admissions.sat_scores.75th_percentile.mathematics'] ?? null
  const sat25 = sat25r !== null && sat25m !== null ? sat25r + sat25m : null
  const sat75 = sat75r !== null && sat75m !== null ? sat75r + sat75m : null
  const admissionRate = raw['latest.admissions.admission_rate.overall'] ?? null
  const url: string = raw['school.school_url'] ?? ''

  // Detect which programs this school actually offers (scoped to active keys)
  const personaPrograms = PERSONA_PROGRAMS[personaKey]
  const matchingMajors = activeProgramKeys
    .filter((suffix) => raw[`latest.academics.program.bachelors.${suffix}`] === 1)
    .map((suffix) => personaPrograms[suffix] ?? ALL_PROGRAMS[suffix] ?? suffix)

  const netPublic: number | null = raw['latest.cost.avg_net_price.public'] ?? null
  const netPrivate: number | null = raw['latest.cost.avg_net_price.private'] ?? null
  const netPrice = netPublic ?? netPrivate
  const pellRate: number | null = raw['latest.aid.pell_grant_rate'] ?? null
  const isCommunity = raw['school.degrees_awarded.highest'] === 2

  return {
    id: raw.id,
    name: raw['school.name'] ?? 'Unknown',
    state: raw['school.state'] ?? '',
    url: url.startsWith('http') ? url : url ? `https://${url}` : '',
    admissionRate,
    sat25,
    sat75,
    netPrice,
    pellRate,
    isCommunity,
    matchingMajors,
    fitLevel: computeFitLevel(admissionRate, sat25, sat75, userSat, gpa),
    vibe: generateVibe(raw),
  }
}

export async function fetchColleges(params: FetchCollegesParams): Promise<CollegeResult[]> {
  const key = process.env.NEXT_PUBLIC_COLLEGE_SCORECARD_KEY
  if (!key) throw new Error('NEXT_PUBLIC_COLLEGE_SCORECARD_KEY is not set')

  const userSat = params.sat ? parseInt(params.sat, 10) : null
  const gpa = params.gpaUnweighted ? parseFloat(params.gpaUnweighted) : null

  const programs = PERSONA_PROGRAMS[params.personaKey]
  // If a specific major is selected, only request/filter by that field
  const activeProgramKeys = params.majorKey
    ? [params.majorKey]
    : Object.keys(programs)
  const programFields = activeProgramKeys.map(
    (suffix) => `latest.academics.program.bachelors.${suffix}`
  )
  const fields = [...BASE_FIELDS, ...programFields].join(',')

  const query = new URLSearchParams({
    api_key: key,
    fields,
    per_page: '200', // fetch more so filtering still yields ~50
  })

  if (params.state) {
    query.set('school.state', params.state)
  }
  if (params.locale === 'urban') {
    query.set('school.locale', '11,12,13')
  } else if (params.locale === 'rural') {
    query.set('school.locale', '21,22,23,31,32,33,41,42,43')
  }
  // Filter by institution type via API where possible
  if (params.institutionType === 'public') {
    query.set('school.ownership', '1')
  } else if (params.institutionType === 'private') {
    query.set('school.ownership', '2,3')
  }
  // Community colleges are filtered client-side via school.degrees_awarded.highest === 2

  const res = await fetch(
    `https://api.data.gov/ed/collegescorecard/v1/schools?${query.toString()}`
  )
  if (!res.ok) throw new Error(`API error ${res.status} — check your College Scorecard key`)

  const json = await res.json()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const all: CollegeResult[] = (json.results ?? []).map((raw: any) =>
    parseSchool(raw, params.personaKey, userSat, gpa, activeProgramKeys)
  )

  // Keep only schools that offer at least one relevant program
  let filtered = all.filter((r) => r.matchingMajors.length > 0)

  // Community college filter (client-side — highest degree = Associate's)
  if (params.institutionType === 'community') {
    filtered = filtered.filter((r) => r.isCommunity)
  }

  // Cost filter (client-side)
  if (params.maxCost !== null) {
    filtered = filtered.filter((r) => r.netPrice !== null && r.netPrice <= params.maxCost!)
  }

  // High aid filter (client-side — Pell grant rate ≥ 40%)
  if (params.highAid) {
    filtered = filtered.filter((r) => r.pellRate !== null && r.pellRate >= 0.40)
  }

  // Sort: ultra-reach → reach → target → safety → unknown
  const order: FitLevel[] = ['ultra-reach', 'reach', 'target', 'safety', 'unknown']
  return filtered
    .sort((a, b) => order.indexOf(a.fitLevel) - order.indexOf(b.fitLevel))
    .slice(0, 50)
}
