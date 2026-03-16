import type { Impact, Persona, QuizImage } from '@/types'

export const PERSONAS: Record<Impact, Persona> = {
  Social_Good: {
    title: 'The Human Advocate',
    powerWords: ['Empathetic', 'Just', 'Persuasive'],
    coverGradient: 'from-rose-900 via-rose-800 to-stone-900',
    accentColor: '#F9A8D4',
    description:
      'You tend to gravitate toward the human side of systems — listening, understanding, and advocating for what feels right.',
    careers: [
      {
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
      {
        title: 'Public Policy Analyst',
        blurb:
          'Public policy analysts research social problems and evaluate government programs to shape better laws and spending decisions. The work turns data and community input into recommendations that land on a legislator\'s desk.',
        bullets: [
          'Analyze legislation and draft policy briefs for elected officials',
          'Evaluate the effectiveness of existing social programs using data',
          'Conduct stakeholder interviews to understand community needs',
          'Model budget impacts of proposed policy changes',
          'Work in think tanks, government agencies, or nonprofit advocacy orgs',
        ],
      },
      {
        title: 'Nonprofit Director',
        blurb:
          'Nonprofit directors lead organizations built around a mission rather than profit — managing staff, securing funding, and ensuring programs actually help people. You\'re part executive, part fundraiser, part community leader.',
        bullets: [
          'Develop annual budgets and oversee program delivery across departments',
          'Build relationships with major donors, foundations, and government funders',
          'Hire and develop staff in a mission-driven organizational culture',
          'Report program outcomes to board members and grant-makers',
          'Represent the organization at community events and in the media',
        ],
      },
      {
        title: 'School Counselor',
        blurb:
          'School counselors support students academically, emotionally, and socially — helping them navigate everything from college applications to mental health crises. Every student\'s challenge is different, and so is every day.',
        bullets: [
          'Meet one-on-one with students dealing with anxiety, family stress, or academic struggles',
          'Guide seniors through college applications, financial aid, and career planning',
          'Develop school-wide programs around mental health and social-emotional learning',
          'Coordinate referrals to outside therapists, tutors, and community resources',
          'Collaborate with teachers and administrators on student support plans',
        ],
      },
      {
        title: 'Community Organizer',
        blurb:
          'Community organizers mobilize residents around shared problems — building power from the ground up to push for real change. The work is deeply relational: listening, building trust, and turning frustration into collective action.',
        bullets: [
          'Knock on doors and host community meetings to identify local priorities',
          'Recruit and train volunteer leaders to run campaigns independently',
          'Negotiate with city officials or employers on behalf of organized residents',
          'Plan rallies, press conferences, and public actions that generate media attention',
          'Work for labor unions, housing justice groups, or environmental advocacy orgs',
        ],
      },
      {
        title: 'Human Rights Lawyer',
        blurb:
          'Human rights lawyers represent people whose basic rights have been violated — by governments, corporations, or institutions. The work is slow, emotionally demanding, and essential.',
        bullets: [
          'File lawsuits challenging unlawful deportations or police misconduct',
          'Represent asylum seekers in immigration court proceedings',
          'Document human rights abuses for international tribunals and NGOs',
          'Draft legal briefs and argue cases before appellate courts',
          'Work for organizations like the ACLU, Amnesty International, or legal aid societies',
        ],
      },
      {
        title: 'Public Health Coordinator',
        blurb:
          'Public health coordinators design and manage programs that prevent disease and improve community health outcomes. This role sits at the intersection of data, policy, and direct community outreach.',
        bullets: [
          'Coordinate vaccination campaigns or disease surveillance programs',
          'Analyze health data to identify disparities across zip codes or demographics',
          'Develop health education materials for specific communities',
          'Partner with clinics, schools, and local organizations on prevention programs',
          'Report findings to state or federal health departments',
        ],
      },
      {
        title: 'Family Therapist',
        blurb:
          'Family therapists help couples and families work through conflict, trauma, addiction, and communication breakdowns. Sessions require deep listening, careful questioning, and the ability to hold space for multiple truths at once.',
        bullets: [
          'Conduct weekly therapy sessions with couples navigating conflict or loss',
          'Facilitate family sessions after a child\'s mental health hospitalization',
          'Use evidence-based approaches like CBT, DBT, or attachment theory',
          'Maintain detailed case notes and coordinate with psychiatrists or schools',
          'Work in private practice, community mental health centers, or hospitals',
        ],
      },
      {
        title: 'Urban Planner',
        blurb:
          'Urban planners shape how cities grow — deciding where housing, transit, parks, and businesses go. The job blends data analysis, policy, community engagement, and design thinking.',
        bullets: [
          'Review development proposals for zoning compliance and community impact',
          'Facilitate public meetings to gather resident feedback on neighborhood plans',
          'Analyze demographic and land-use data to inform long-range city plans',
          'Draft environmental impact reports for major infrastructure projects',
          'Coordinate between developers, city agencies, and community advocates',
        ],
      },
      {
        title: 'Grant Writer',
        blurb:
          'Grant writers secure the funding that keeps nonprofits and public programs running — researching opportunities, crafting compelling narratives, and managing reporting requirements. Strong writing and deadline discipline are everything.',
        bullets: [
          'Research foundation and government grant opportunities for your organization',
          'Write funding proposals that connect program data with funder priorities',
          'Track deadlines and manage multi-grant portfolios simultaneously',
          'Compile outcome reports demonstrating program impact to funders',
          'Collaborate with program staff to translate their work into compelling stories',
        ],
      },
      {
        title: 'Child Welfare Specialist',
        blurb:
          'Child welfare specialists investigate abuse and neglect, work with families in crisis, and make difficult decisions about child safety. It\'s emotionally demanding work with high stakes and real consequences.',
        bullets: [
          'Investigate reports of child abuse or neglect through home visits and interviews',
          'Develop safety plans with families to keep children in the home when possible',
          'Coordinate foster care placements and monitor children in out-of-home care',
          'Testify in family court proceedings on behalf of children\'s best interests',
          'Connect families with substance abuse treatment, housing, and parenting support',
        ],
      },
      {
        title: 'Mediator',
        blurb:
          'Mediators help disputing parties reach agreement without going to court — working in divorce cases, workplace conflicts, community disputes, and business negotiations. Neutrality and structured communication are your tools.',
        bullets: [
          'Facilitate divorce mediation sessions covering custody, assets, and parenting plans',
          'Mediate workplace conflicts between employees and management',
          'Help neighbors or community groups resolve land-use and boundary disputes',
          'Draft settlement agreements that both parties sign and can enforce',
          'Work in private practice, court systems, or restorative justice programs',
        ],
      },
      {
        title: 'Legislative Aide',
        blurb:
          'Legislative aides support elected officials by researching policy, managing constituent relations, and drafting legislation. You\'re the behind-the-scenes engine that makes government work.',
        bullets: [
          'Research and summarize complex policy issues for a lawmaker\'s consideration',
          'Respond to constituent emails and calls about local and state issues',
          'Draft amendments, resolutions, and floor speeches for your legislator',
          'Attend committee hearings and brief your boss on key developments',
          'Build relationships with lobbyists, advocates, and agency staff',
        ],
      },
      {
        title: 'Immigration Advocate',
        blurb:
          'Immigration advocates help people navigate one of the most complex bureaucratic systems in the U.S. — asylum claims, visa applications, deportation defense, and citizenship. This work can determine whether a family stays together.',
        bullets: [
          'Assist clients in completing visa and asylum applications accurately',
          'Accompany clients to USCIS interviews and immigration court hearings',
          'Know Your Rights presentations at community centers and churches',
          'Coordinate legal representation for unaccompanied minors in removal proceedings',
          'Work for legal aid societies, immigrant rights orgs, or law school clinics',
        ],
      },
      {
        title: 'Healthcare Navigator',
        blurb:
          'Healthcare navigators help patients understand their insurance options, access care, and manage the paperwork maze of the American health system. You\'re the bridge between people and the care they need.',
        bullets: [
          'Guide uninsured individuals through Medicaid or marketplace enrollment',
          'Connect patients with free clinics, prescription assistance, and specialist referrals',
          'Help seniors navigate Medicare options and prescription drug plans',
          'Work with hospital billing departments to resolve coverage disputes',
          'Operate in community health centers, hospitals, and nonprofit health advocacy orgs',
        ],
      },
    ],
  },

  Innovation: {
    title: 'The Systems Architect',
    powerWords: ['Strategic', 'Scalable', 'Visionary'],
    coverGradient: 'from-violet-900 via-indigo-900 to-stone-900',
    accentColor: '#A78BFA',
    description:
      'You tend to spot patterns where others see chaos — and you\'re energized by building things that didn\'t exist before.',
    careers: [
      {
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
      {
        title: 'Software Engineer',
        blurb:
          'Software engineers design, build, and maintain the code that powers apps, platforms, and infrastructure. The work ranges from writing features to debugging production outages to reviewing a teammate\'s pull request.',
        bullets: [
          'Build new product features in React, Python, Go, or whatever the stack requires',
          'Review code, catch bugs, and ensure quality before shipping to production',
          'Debug and fix issues affecting live users — sometimes at 2 AM',
          'Collaborate with product and design teams to spec out new features',
          'Work across web, mobile, backend, or embedded systems depending on specialization',
        ],
      },
      {
        title: 'Data Scientist',
        blurb:
          'Data scientists extract meaning from massive datasets — building models, running experiments, and translating statistical findings into business decisions. The job sits at the intersection of math, code, and communication.',
        bullets: [
          'Build machine learning models that predict user churn or product recommendations',
          'Design and analyze A/B tests to measure feature impact',
          'Clean and transform messy raw data into usable training sets',
          'Present findings to non-technical stakeholders with clear visualizations',
          'Work in tech, finance, healthcare, retail, or any data-rich industry',
        ],
      },
      {
        title: 'AI Engineer',
        blurb:
          'AI engineers build the systems that make machine learning work in production — from training pipelines to inference APIs. They\'re part researcher, part software engineer, and deeply focused on making models actually useful.',
        bullets: [
          'Fine-tune large language models for specific business applications',
          'Build scalable ML pipelines that process millions of data points daily',
          'Evaluate model performance and reduce hallucinations or bias in outputs',
          'Deploy AI features behind production APIs that millions of users hit',
          'Work at AI labs, enterprise software companies, or fast-moving startups',
        ],
      },
      {
        title: 'Startup Founder',
        blurb:
          'Startup founders build something from nothing — identifying a real problem, assembling a team, and convincing investors and customers to believe before proof exists. Most days are chaotic; the good ones feel electric.',
        bullets: [
          'Define the product vision and make fast decisions with incomplete information',
          'Pitch to venture capitalists and angel investors for seed and Series A funding',
          'Hire your first employees and establish the culture from day one',
          'Talk to customers constantly to validate that you\'re building the right thing',
          'Navigate legal, financial, and operational complexity with a tiny team',
        ],
      },
      {
        title: 'Systems Architect',
        blurb:
          'Systems architects design the high-level structure of complex software and infrastructure — making the decisions that determine how everything connects, scales, and stays reliable. They think in systems, trade-offs, and edge cases.',
        bullets: [
          'Design distributed architectures that handle millions of concurrent users',
          'Evaluate and select technology stacks for new platforms',
          'Define API contracts between services in a microservices ecosystem',
          'Review existing systems for performance bottlenecks and single points of failure',
          'Document architecture decisions and mentor engineers on design patterns',
        ],
      },
      {
        title: 'UX Researcher',
        blurb:
          'UX researchers study how real people interact with products — running studies, analyzing behavior, and translating human insight into design direction. Their findings save teams from building the wrong thing.',
        bullets: [
          'Design and facilitate user interviews, usability tests, and diary studies',
          'Synthesize qualitative findings into actionable insights for product teams',
          'Run quantitative surveys and analyze behavioral data alongside qualitative research',
          'Build research repositories so insights can be reused across teams',
          'Advocate for the user in product roadmap decisions',
        ],
      },
      {
        title: 'Cybersecurity Engineer',
        blurb:
          'Cybersecurity engineers protect systems, networks, and data from attackers — building defenses, hunting for vulnerabilities, and responding when things go wrong. The threat landscape evolves daily, and so does the job.',
        bullets: [
          'Conduct penetration tests to find vulnerabilities before attackers do',
          'Monitor security alerts and investigate suspicious activity in real time',
          'Build automated threat detection systems using SIEM platforms',
          'Respond to incidents — contain breaches, assess damage, restore systems',
          'Work in enterprise security teams, government agencies, or as a consultant',
        ],
      },
      {
        title: 'Technical Program Manager',
        blurb:
          'Technical Program Managers (TPMs) coordinate large, complex engineering projects across multiple teams — tracking dependencies, managing timelines, and clearing blockers so engineers can ship. They speak both tech and business.',
        bullets: [
          'Build and maintain project plans spanning multiple engineering teams',
          'Run cross-functional syncs and hold teams accountable to milestones',
          'Identify risks early and escalate blockers before they delay launches',
          'Write technical specs and ensure alignment between product, engineering, and ops',
          'Work at large tech companies managing platform launches or infrastructure migrations',
        ],
      },
      {
        title: 'Venture Analyst',
        blurb:
          'Venture analysts evaluate startups for investment — analyzing markets, auditing financials, and recommending which bets a fund should make. You need strong opinions, fast pattern recognition, and genuine curiosity about new ideas.',
        bullets: [
          'Source and evaluate early-stage startup pitch decks across target sectors',
          'Build financial models to assess startup valuations and return scenarios',
          'Conduct market research and competitive landscape analysis',
          'Prepare investment memos for the partnership to review',
          'Support portfolio companies with recruiting, strategy, and follow-on fundraising',
        ],
      },
      {
        title: 'Platform Engineer',
        blurb:
          'Platform engineers build the internal tools, infrastructure, and developer experience that allow product engineers to ship faster and more reliably. They\'re the invisible foundation every product team stands on.',
        bullets: [
          'Build and maintain CI/CD pipelines that deploy code safely to production',
          'Design internal developer platforms with self-service provisioning',
          'Manage Kubernetes clusters and container orchestration at scale',
          'Reduce on-call burden by improving system reliability and observability',
          'Work at tech companies where engineering velocity is a strategic priority',
        ],
      },
      {
        title: 'Growth Strategist',
        blurb:
          'Growth strategists design and run experiments to scale user acquisition, retention, and revenue. The job is intensely data-driven — you\'re always testing something, learning from it, and iterating fast.',
        bullets: [
          'Run A/B tests on onboarding flows, pricing pages, and email campaigns',
          'Analyze funnel data to identify where users drop off and why',
          'Design referral programs, viral loops, and retention mechanics',
          'Collaborate with product, marketing, and engineering to implement growth ideas',
          'Work at consumer apps, SaaS companies, or growth-stage startups',
        ],
      },
      {
        title: 'DevOps Engineer',
        blurb:
          'DevOps engineers bridge development and operations — building the automation, monitoring, and infrastructure that keep software running reliably. They\'re the ones who get paged when production goes down.',
        bullets: [
          'Automate infrastructure provisioning using Terraform or Pulumi',
          'Set up alerting and dashboards so teams know before users do when something breaks',
          'Optimize cloud spend by right-sizing resources and eliminating waste',
          'Respond to production incidents and write post-mortems to prevent recurrence',
          'Work across any company that deploys software — from startups to enterprises',
        ],
      },
      {
        title: 'Business Intelligence Lead',
        blurb:
          'BI leads build the data infrastructure and dashboards that help organizations understand their own performance — translating raw data into the metrics leadership actually uses to make decisions.',
        bullets: [
          'Design and maintain data warehouses that aggregate metrics across systems',
          'Build executive dashboards tracking revenue, retention, and operational KPIs',
          'Work with analysts to define consistent metric definitions across teams',
          'Automate reporting pipelines that run without manual intervention',
          'Partner with finance, operations, and product to turn data questions into answers',
        ],
      },
      {
        title: 'CTO',
        blurb:
          'CTOs set the technical vision for a company, make foundational architecture decisions, and build the engineering culture. At startups they\'re often still writing code; at scale they\'re mostly in rooms making strategic calls.',
        bullets: [
          'Define the multi-year technology roadmap and system architecture direction',
          'Hire and develop VP-level engineering and technical leadership',
          'Represent technology strategy to the board, investors, and enterprise customers',
          'Make buy-vs-build decisions on core infrastructure and tooling',
          'Balance technical debt, reliability, and innovation across a large engineering org',
        ],
      },
    ],
  },

  Infrastructure: {
    title: 'The Earth Steward',
    powerWords: ['Sustainable', 'Grounded', 'Protective'],
    coverGradient: 'from-emerald-900 via-green-900 to-stone-900',
    accentColor: '#6EE7B7',
    description:
      'You\'re drawn to building things that last — from infrastructure to ecosystems, you care deeply about what holds the world together.',
    careers: [
      {
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
      {
        title: 'Environmental Scientist',
        blurb:
          'Environmental scientists study how human activity affects natural systems — conducting fieldwork, analyzing samples, and informing the regulations and cleanup efforts that protect public health and ecosystems.',
        bullets: [
          'Collect soil, water, and air samples at contaminated industrial sites',
          'Analyze data to determine whether pollutant levels exceed regulatory limits',
          'Write environmental impact assessments for new development projects',
          'Work with regulators and companies on remediation plans for Superfund sites',
          'Conduct wildlife surveys to assess ecosystem health before and after disturbance',
        ],
      },
      {
        title: 'Urban Planner',
        blurb:
          'Urban planners shape how cities grow — deciding where housing, transit, parks, and businesses go. The job blends data analysis, policy, community engagement, and design thinking.',
        bullets: [
          'Review development proposals for zoning compliance and community impact',
          'Facilitate public meetings to gather resident feedback on neighborhood plans',
          'Analyze demographic and land-use data to inform long-range city plans',
          'Draft environmental impact reports for major infrastructure projects',
          'Coordinate between developers, city agencies, and community advocates',
        ],
      },
      {
        title: 'Structural Engineer',
        blurb:
          'Structural engineers ensure that buildings and infrastructure can carry their loads without collapsing — calculating forces, selecting materials, and reviewing construction drawings with exacting precision.',
        bullets: [
          'Design steel and concrete structural systems for high-rise buildings',
          'Perform seismic analysis to ensure buildings can withstand earthquakes',
          'Review contractor shop drawings and respond to RFIs during construction',
          'Inspect existing structures for damage, deterioration, or code compliance',
          'Work on bridges, stadiums, hospitals, and residential or commercial buildings',
        ],
      },
      {
        title: 'Water Resources Engineer',
        blurb:
          'Water resources engineers manage one of the most fundamental necessities — designing systems that supply, treat, and distribute water while protecting watersheds from flooding and contamination.',
        bullets: [
          'Design water distribution networks for new residential or industrial developments',
          'Model floodplains using hydraulic software to predict storm event impacts',
          'Engineer wetland restoration projects that reduce downstream flood risk',
          'Evaluate dam safety and develop emergency action plans',
          'Work for municipal utilities, federal agencies, or environmental consulting firms',
        ],
      },
      {
        title: 'Renewable Energy Engineer',
        blurb:
          'Renewable energy engineers design solar, wind, hydro, and battery storage systems that replace fossil fuels. The work combines electrical engineering, project management, and a long-term view of how energy systems need to change.',
        bullets: [
          'Design utility-scale solar arrays and calculate energy production projections',
          'Evaluate wind turbine placement using terrain and wind data modeling',
          'Spec battery storage systems that balance grid supply and demand',
          'Manage construction of renewable energy projects from permitting to commissioning',
          'Work for developers, utilities, independent power producers, or consulting firms',
        ],
      },
      {
        title: 'Conservation Biologist',
        blurb:
          'Conservation biologists work to protect species and ecosystems from extinction and degradation — conducting field research, advising land managers, and designing restoration programs that give wildlife a fighting chance.',
        bullets: [
          'Survey threatened species populations in the field and track population trends',
          'Design habitat corridors that allow wildlife to move between fragmented landscapes',
          'Advise government agencies on land management and endangered species protections',
          'Manage invasive species removal and native ecosystem restoration projects',
          'Publish research and contribute to conservation planning at regional or national scale',
        ],
      },
      {
        title: 'Climate Scientist',
        blurb:
          'Climate scientists study how and why Earth\'s climate is changing — analyzing historical data, running models, and communicating what the science means for human and natural systems. The stakes are civilizational.',
        bullets: [
          'Run global climate models to project temperature and precipitation changes',
          'Analyze ice cores, ocean sediment, and satellite data to reconstruct past climates',
          'Assess regional climate risks for policymakers, insurers, and infrastructure planners',
          'Publish peer-reviewed research and contribute to IPCC assessment reports',
          'Work at universities, national labs, NOAA, NASA, or international research centers',
        ],
      },
      {
        title: 'Sustainability Consultant',
        blurb:
          'Sustainability consultants help organizations reduce their environmental footprint — measuring emissions, identifying efficiency opportunities, and building the strategy and reporting that increasingly investors and regulators require.',
        bullets: [
          'Conduct greenhouse gas inventories for corporate clients across scopes 1, 2, and 3',
          'Develop science-based emissions reduction targets aligned with the Paris Agreement',
          'Advise on LEED certification, zero-waste programs, and sustainable procurement',
          'Build ESG disclosures and sustainability reports for publicly traded companies',
          'Work at consulting firms, in-house corporate sustainability teams, or NGOs',
        ],
      },
      {
        title: 'Landscape Architect',
        blurb:
          'Landscape architects design outdoor spaces — parks, campuses, waterfronts, streetscapes, and ecological restoration areas — balancing beauty, function, ecology, and human experience.',
        bullets: [
          'Design public plazas and park systems that serve diverse urban communities',
          'Develop stormwater management plans integrated into green infrastructure design',
          'Create site plans and construction documents for built landscape projects',
          'Work with ecologists and engineers to restore wetlands and riparian corridors',
          'Collaborate with architects and planners on mixed-use development master plans',
        ],
      },
      {
        title: 'Hydrologist',
        blurb:
          'Hydrologists study the movement and distribution of water — tracking how rain becomes runoff, how aquifers recharge, and how droughts and floods will intensify as the climate shifts.',
        bullets: [
          'Monitor stream gauge networks and analyze flow data for water rights disputes',
          'Model aquifer depletion rates and develop sustainable groundwater withdrawal plans',
          'Assess drought risk for agricultural regions using precipitation trend analysis',
          'Conduct field surveys of springs, wetlands, and streamflow in remote areas',
          'Work for USGS, state water agencies, environmental consulting firms, or irrigation districts',
        ],
      },
      {
        title: 'Transportation Planner',
        blurb:
          'Transportation planners design the systems that move people — road networks, transit lines, bike infrastructure, and freight corridors — using data, community input, and long-range modeling to reduce congestion and emissions.',
        bullets: [
          'Model traffic impacts of proposed developments using transportation demand software',
          'Plan bus rapid transit corridors and transit-oriented development zones',
          'Evaluate bike network gaps and design connected protected lane infrastructure',
          'Coordinate environmental review for highway expansion or transit projects',
          'Work for regional planning agencies, departments of transportation, or transit authorities',
        ],
      },
      {
        title: 'Geotechnical Engineer',
        blurb:
          'Geotechnical engineers investigate the soil and rock beneath construction sites to determine whether the ground can safely support what\'s being built — preventing the kind of failures that make news.',
        bullets: [
          'Conduct subsurface investigations with borings and lab testing of soil samples',
          'Analyze bearing capacity and settlement risk for foundation design',
          'Evaluate slope stability for hillside developments and earthen dams',
          'Develop recommendations for pile foundations, retaining walls, and site grading',
          'Work on infrastructure projects including buildings, bridges, landfills, and tunnels',
        ],
      },
      {
        title: 'Environmental Policy Advisor',
        blurb:
          'Environmental policy advisors shape the rules that govern how land, air, water, and natural resources are managed — working inside government, for advocacy groups, or as consultants to translate science into law.',
        bullets: [
          'Draft regulations under the Clean Air Act, Clean Water Act, or NEPA',
          'Advise legislators on the scientific basis for proposed environmental bills',
          'Analyze proposed rules for their economic and ecological impacts',
          'Represent government or NGO clients in regulatory proceedings and comment periods',
          'Work at EPA, state environmental agencies, environmental law firms, or advocacy orgs',
        ],
      },
      {
        title: 'Public Works Director',
        blurb:
          'Public works directors oversee the infrastructure that keeps municipalities functioning — roads, water systems, waste management, and public facilities — managing large teams, large budgets, and the public\'s expectation that everything just works.',
        bullets: [
          'Manage capital improvement programs for roads, bridges, and utility systems',
          'Oversee operations of water treatment and wastewater treatment facilities',
          'Coordinate emergency response for infrastructure failures during storms or disasters',
          'Present infrastructure funding needs to city councils and county boards',
          'Supervise hundreds of field and administrative staff across multiple divisions',
        ],
      },
    ],
  },

  Artistic: {
    title: 'The Virtual Creator',
    powerWords: ['Immersive', 'Aesthetic', 'Original'],
    coverGradient: 'from-amber-900 via-orange-900 to-stone-900',
    accentColor: '#FCD34D',
    description:
      'You\'re not just interested in making things look good — you want them to mean something. Your instinct is to start conversations and open worlds.',
    careers: [
      {
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
      {
        title: 'Brand Strategist',
        blurb:
          'Brand strategists define how a company presents itself to the world — crafting the positioning, messaging, and visual identity that make a brand recognizable and resonant. The work is part psychology, part storytelling, part business.',
        bullets: [
          'Conduct competitive audits and audience research to define brand positioning',
          'Write brand guidelines covering voice, tone, visual identity, and messaging pillars',
          'Lead naming workshops and tagline development for new products or companies',
          'Collaborate with creative directors to ensure campaigns stay on-brand',
          'Work at branding agencies, in-house marketing teams, or as an independent consultant',
        ],
      },
      {
        title: 'Motion Designer',
        blurb:
          'Motion designers bring static visuals to life — creating animations for apps, broadcast titles, social content, and brand campaigns. The job sits between graphic design and filmmaking, with code increasingly in the mix.',
        bullets: [
          'Animate UI transitions and micro-interactions for mobile and web products',
          'Design title sequences and motion graphics for broadcast or streaming content',
          'Create social media animations and short-form video content for brand campaigns',
          'Collaborate with sound designers to sync audio with visual timing',
          'Work in After Effects, Cinema 4D, Lottie, or emerging real-time tools like Cavalry',
        ],
      },
      {
        title: 'Game Designer',
        blurb:
          'Game designers create the systems, mechanics, and worlds that players inhabit. The job requires understanding what makes interaction fun, what creates flow, and how rules and rewards shape human behavior.',
        bullets: [
          'Design core game loops, progression systems, and difficulty curves',
          'Write and balance in-game economies, item rarity, and reward structures',
          'Prototype new mechanics and playtest with real users to validate ideas',
          'Collaborate with artists, engineers, and narrative writers on game features',
          'Work in AAA studios, indie teams, mobile game companies, or VR/AR startups',
        ],
      },
      {
        title: 'Film Director',
        blurb:
          'Film directors translate a script into a visual experience — guiding actors, collaborating with cinematographers, and making thousands of creative decisions that determine whether a film lands. Pre-production, production, and post are all distinctly different jobs.',
        bullets: [
          'Develop shot lists and storyboards with cinematographers during pre-production',
          'Direct actors through emotional scenes and multiple takes on set',
          'Collaborate with editors in post to find the final rhythm of a film',
          'Oversee sound design, color grading, and visual effects passes',
          'Work across narrative film, documentary, commercial, music video, or episodic TV',
        ],
      },
      {
        title: 'Art Director',
        blurb:
          'Art directors lead the visual language of creative projects — overseeing photography, design, and layout to ensure everything communicates the intended feeling. They direct creatives without doing all the creating themselves.',
        bullets: [
          'Define the visual concept for ad campaigns, editorial spreads, or brand campaigns',
          'Direct photo and video shoots — briefing photographers on lighting, props, and framing',
          'Review and give feedback on design work from junior creatives',
          'Collaborate with copywriters to ensure visual and verbal ideas are integrated',
          'Work in advertising agencies, fashion, publishing, film, or in-house brand studios',
        ],
      },
      {
        title: 'Creative Director',
        blurb:
          'Creative directors set the vision for an entire creative department — managing teams, approving work, pitching ideas to clients, and ensuring every output connects back to the brand strategy. The job is leadership as much as creativity.',
        bullets: [
          'Set the creative strategy and visual direction for major client campaigns',
          'Manage a team of designers, writers, and art directors',
          'Present creative concepts to senior clients and win approval',
          'Review and approve every piece of work before it goes out the door',
          'Work at ad agencies, design studios, media companies, or leading consumer brands',
        ],
      },
      {
        title: 'Illustrator',
        blurb:
          'Illustrators create original images for books, editorial, advertising, packaging, games, and digital media. The work ranges from editorial cartoons to fully realized character systems — and increasingly, the best illustrators build their own audiences.',
        bullets: [
          'Create editorial illustrations for magazine covers, op-eds, and book covers',
          'Develop character designs, icons, and visual systems for games or apps',
          'Illustrate children\'s books from initial sketch through final painted artwork',
          'Build a distinct visual style that gets licensed across products and brands',
          'Work on commission for publishers, brands, and agencies, or sell art independently',
        ],
      },
      {
        title: 'Spatial Designer',
        blurb:
          'Spatial designers shape physical environments — from retail stores and museum exhibitions to experiential installations and branded spaces. The goal is to make people feel something the moment they walk in.',
        bullets: [
          'Design pop-up retail environments and brand activations for consumer companies',
          'Plan museum exhibition layouts that guide visitor flow and emotional experience',
          'Develop 3D renderings and physical prototypes to present concepts to clients',
          'Oversee fabrication vendors and installation teams on-site',
          'Work at design studios, architecture firms, event agencies, or in-house brand teams',
        ],
      },
      {
        title: 'Animator',
        blurb:
          'Animators breathe life into characters and worlds — working in 2D or 3D across film, television, games, and digital media. The craft requires technical precision, artistic sensibility, and a deep understanding of movement and timing.',
        bullets: [
          'Animate character performances for animated feature films or TV series',
          'Create 3D visual effects sequences for live-action films and commercials',
          'Develop character rigs and motion libraries for game engines',
          'Collaborate with directors and supervisors on shot reviews and revisions',
          'Work at animation studios, VFX houses, game companies, or streaming services',
        ],
      },
      {
        title: 'Copywriter',
        blurb:
          'Copywriters use language to persuade, engage, and sell — writing ads, brand campaigns, product descriptions, emails, and everything in between. The best copywriters understand human psychology as much as grammar.',
        bullets: [
          'Write headline concepts and body copy for advertising campaigns',
          'Develop product naming and launch messaging for new brands',
          'Craft email sequences that nurture leads through a sales funnel',
          'Collaborate with art directors to develop integrated creative concepts',
          'Work at advertising agencies, in-house brand teams, or as a freelance writer',
        ],
      },
      {
        title: 'Museum Curator',
        blurb:
          'Museum curators build and interpret collections — acquiring works, designing exhibitions, conducting research, and creating the interpretive frameworks that help the public understand what they\'re looking at and why it matters.',
        bullets: [
          'Research and acquire artworks, artifacts, or scientific specimens for the collection',
          'Develop exhibition concepts and write interpretive labels and catalog essays',
          'Coordinate with designers, educators, and conservators on exhibition production',
          'Build relationships with artists, collectors, and institutions globally',
          'Work at art museums, natural history museums, history museums, or cultural centers',
        ],
      },
      {
        title: 'Architect',
        blurb:
          'Architects design buildings — shaping how people move through space, how light enters a room, and how a structure relates to its environment and community. The work moves from concept sketch to construction site over years.',
        bullets: [
          'Develop building designs from programming through schematic and design development phases',
          'Produce construction documents used by contractors to build the project',
          'Navigate zoning, building codes, and permitting with local authorities',
          'Conduct site visits and respond to questions during the construction process',
          'Work on residential, commercial, civic, or mixed-use buildings across scales',
        ],
      },
      {
        title: 'Fashion Designer',
        blurb:
          'Fashion designers create clothing and accessories — developing seasonal collections, selecting fabrics, directing fittings, and building the visual identity that makes a brand recognizable on a rack or runway.',
        bullets: [
          'Sketch and develop concepts for a seasonal collection around a theme or mood',
          'Source fabrics and trims from mills and vendors domestically and internationally',
          'Oversee sample development and make corrections through multiple fitting rounds',
          'Present collections to buyers, press, and retail partners',
          'Work at fashion houses, sportswear brands, fast fashion retailers, or independently',
        ],
      },
      {
        title: 'Multimedia Artist',
        blurb:
          'Multimedia artists work across mediums — video, sound, installation, digital, and physical — to create experiences that don\'t fit into any single category. The work is often experimental, often conceptual, and always personal.',
        bullets: [
          'Create immersive video installations for gallery exhibitions or public spaces',
          'Develop interactive digital experiences that respond to viewer participation',
          'Combine photography, text, sound, and code into layered narrative works',
          'Apply for artist residencies, grants, and commissions to fund independent projects',
          'Collaborate with technologists, composers, architects, and other artists on hybrid work',
        ],
      },
    ],
  },

  Investigation: {
    title: 'The Insight Hunter',
    powerWords: ['Methodical', 'Curious', 'Rigorous'],
    coverGradient: 'from-sky-900 via-blue-900 to-stone-900',
    accentColor: '#7DD3FC',
    description:
      'You tend to ask *why* — and keep digging until you find it. The root cause, the pattern, the truth hiding in the data.',
    careers: [
      {
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
      {
        title: 'Data Analyst',
        blurb:
          'Data analysts transform raw numbers into actionable insight — querying databases, building dashboards, and answering the business questions that drive decisions. The job rewards structured thinking and clear communication.',
        bullets: [
          'Write SQL queries to extract and clean data from production databases',
          'Build dashboards tracking KPIs for marketing, operations, or product teams',
          'Identify trends and anomalies in historical data and present findings to stakeholders',
          'Run cohort analyses to understand how user behavior changes over time',
          'Work in tech, finance, healthcare, retail, or any data-driven industry',
        ],
      },
      {
        title: 'Investigative Journalist',
        blurb:
          'Investigative journalists dig into stories that powerful people don\'t want told — following documents, sources, and data trails for months or years to expose corruption, abuse, or systemic failure. The work changes things.',
        bullets: [
          'File public records requests and analyze government documents for evidence of wrongdoing',
          'Cultivate confidential sources and protect their identities through secure communications',
          'Build and analyze databases to identify patterns in public records at scale',
          'Write long-form narratives that translate complex findings for general audiences',
          'Work at newspapers, digital media outlets, nonprofits like ProPublica, or as a freelancer',
        ],
      },
      {
        title: 'Forensic Scientist',
        blurb:
          'Forensic scientists analyze physical evidence from crime scenes — DNA, fingerprints, toxicology, digital traces — and translate their findings into expert testimony that can determine innocence or guilt in court.',
        bullets: [
          'Process biological samples for DNA extraction and comparison against criminal databases',
          'Analyze fingerprint evidence using automated identification systems',
          'Conduct toxicological analysis on blood, urine, and tissue samples',
          'Write detailed laboratory reports and prepare to testify as an expert witness',
          'Work in government crime labs, medical examiners\' offices, or private forensic firms',
        ],
      },
      {
        title: 'Epidemiologist',
        blurb:
          'Epidemiologists study how diseases spread through populations — identifying risk factors, tracking outbreaks, and designing the interventions that prevent the next pandemic. Their work sits at the intersection of biology, statistics, and public health.',
        bullets: [
          'Design and conduct surveillance studies to track disease incidence and spread',
          'Analyze large health datasets using statistical software to identify risk factors',
          'Investigate disease clusters and outbreak sources through contact tracing',
          'Publish research that informs clinical guidelines and public health policy',
          'Work at the CDC, WHO, state health departments, academic institutions, or pharma companies',
        ],
      },
      {
        title: 'Intelligence Analyst',
        blurb:
          'Intelligence analysts collect, evaluate, and synthesize information to help government and military decision-makers understand threats and opportunities. The work requires rigor, skepticism, and the ability to communicate under uncertainty.',
        bullets: [
          'Collect and assess open-source and classified intelligence on foreign actors or threats',
          'Produce finished intelligence products — memos, briefings, and assessments — for senior leaders',
          'Evaluate the reliability of sources and the confidence level of findings',
          'Track geopolitical trends and develop predictive assessments of likely futures',
          'Work at CIA, DIA, NSA, FBI, DHS, or supporting defense contractors',
        ],
      },
      {
        title: 'Market Researcher',
        blurb:
          'Market researchers help organizations understand their customers, their competitors, and the forces shaping their industry — using surveys, focus groups, and data analysis to reduce uncertainty in high-stakes decisions.',
        bullets: [
          'Design quantitative surveys and conduct statistical analysis of consumer attitudes',
          'Facilitate focus groups and in-depth interviews to explore customer motivations',
          'Synthesize competitive intelligence and industry trend data into strategic reports',
          'Present findings to brand, product, and executive teams with clear recommendations',
          'Work at market research firms, in-house insights teams, or strategy consulting firms',
        ],
      },
      {
        title: 'Statistician',
        blurb:
          'Statisticians design studies, analyze data, and build the mathematical frameworks that determine whether findings are real or noise. The role appears in every field where rigorous evidence matters — from clinical trials to economic policy.',
        bullets: [
          'Design randomized controlled trials and calculate appropriate sample sizes',
          'Apply regression, Bayesian inference, and machine learning to answer research questions',
          'Review statistical methodology in clinical trial protocols for FDA submissions',
          'Develop models that forecast economic indicators or public health outcomes',
          'Work in pharma, government agencies, academic research, insurance, or tech',
        ],
      },
      {
        title: 'Clinical Psychologist',
        blurb:
          'Clinical psychologists assess and treat mental health conditions — conducting evaluations, providing evidence-based therapy, and in research roles, advancing the science of how the mind works and breaks down.',
        bullets: [
          'Administer psychological assessments to diagnose cognitive, emotional, or behavioral disorders',
          'Provide individual therapy using CBT, DBT, or other evidence-based modalities',
          'Develop treatment plans and coordinate care with psychiatrists and social workers',
          'Conduct research on the effectiveness of psychological interventions',
          'Work in private practice, hospitals, university counseling centers, or VA facilities',
        ],
      },
      {
        title: 'Biomedical Researcher',
        blurb:
          'Biomedical researchers work at the frontier of medicine — studying the biological mechanisms behind disease and testing the interventions that might one day become treatments. The work is painstaking, slow, and occasionally world-changing.',
        bullets: [
          'Design and conduct laboratory experiments on cell lines, animal models, or human samples',
          'Analyze molecular and genetic data to understand disease pathways',
          'Write research grant proposals to the NIH and other funding bodies',
          'Collaborate with clinicians to translate laboratory findings into clinical trials',
          'Work at universities, research hospitals, biotech companies, or pharma giants',
        ],
      },
      {
        title: 'Financial Analyst',
        blurb:
          'Financial analysts evaluate investments, model company performance, and produce the analysis that drives capital allocation decisions. The work requires quantitative rigor, market intuition, and the ability to tell a story with numbers.',
        bullets: [
          'Build discounted cash flow and comparable company models to value businesses',
          'Produce equity research reports covering public companies for institutional investors',
          'Analyze financial statements and identify red flags in balance sheets and cash flows',
          'Track macroeconomic and sector trends to contextualize company performance',
          'Work at investment banks, asset managers, hedge funds, or corporate finance departments',
        ],
      },
      {
        title: 'Behavioral Economist',
        blurb:
          'Behavioral economists study how real people make decisions — often irrationally — and use those insights to design better policies, products, and defaults. The field sits at the intersection of psychology, economics, and design.',
        bullets: [
          'Design field experiments to test how choice architecture affects decision-making',
          'Analyze large administrative datasets to identify behavioral patterns at scale',
          'Advise governments on "nudge" policy interventions in savings, health, and taxation',
          'Collaborate with product teams to apply behavioral insights to UX and pricing design',
          'Work at think tanks, consulting firms, central banks, tech companies, or universities',
        ],
      },
      {
        title: 'Policy Researcher',
        blurb:
          'Policy researchers produce the evidence base behind government decisions — evaluating what works, what doesn\'t, and what the data says about the consequences of proposed laws and programs.',
        bullets: [
          'Conduct literature reviews synthesizing research on education, health, or housing policy',
          'Evaluate the effectiveness of government programs using quasi-experimental methods',
          'Produce accessible policy briefs and reports for legislators and the public',
          'Collaborate with advocacy organizations to translate research into campaign materials',
          'Work at think tanks like Brookings, RAND, or Urban Institute, or in government agencies',
        ],
      },
      {
        title: 'Archaeologist',
        blurb:
          'Archaeologists recover and interpret physical evidence of past human societies — conducting fieldwork, analyzing artifacts, and reconstructing the stories of people who left no written record. Every dig is a puzzle with missing pieces.',
        bullets: [
          'Lead excavation teams at historical or prehistoric sites using systematic field methods',
          'Catalog, photograph, and analyze artifacts recovered from dig sites',
          'Apply radiocarbon dating, soil analysis, and remote sensing to interpret findings',
          'Write site reports and publish research in academic journals',
          'Work for universities, government cultural resource agencies, or CRM firms on development projects',
        ],
      },
      {
        title: 'Cryptographer',
        blurb:
          'Cryptographers design and analyze the mathematical systems that protect digital information — from the encryption in your messaging app to the protocols securing financial transactions. The work is deeply mathematical and increasingly consequential.',
        bullets: [
          'Design cryptographic protocols for secure communication and data storage',
          'Analyze existing systems for vulnerabilities using theoretical and practical attacks',
          'Implement cryptographic algorithms in software with a focus on side-channel resistance',
          'Research post-quantum cryptography to prepare for next-generation computing threats',
          'Work at security firms, academic institutions, government agencies, or tech companies',
        ],
      },
    ],
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

  // Fill remaining slots from all branch pools for the dominant persona
  const branchPool = [
    ...(poolImages[`branch_${personaKey}`] ?? []),
    ...(poolImages[`branch2_${personaKey}`] ?? []),
    ...(poolImages[`branch3_${personaKey}`] ?? []),
  ]
  const extras = branchPool
    .filter((img) => !seen.has(img.id))
    .slice(0, targetCount - unique.length)

  return [...unique, ...extras]
}
