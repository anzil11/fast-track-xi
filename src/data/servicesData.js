import trafficCountImg from '../img/services/Traffic Counte and Junction Surveys.jpeg';
import atcImg from '../img/services/automatictrafficcounts.jpeg';
import pedestrianImg from '../img/services/pedestrian.jpeg';
import cycleImg from '../img/services/Cycle and Active Travel Surveys.jpeg';
import householdImg from '../img/services/Household Surveys.jpeg';
import visitorImg from '../img/services/Visitor and Customer Interviews.jpeg';
import publictransport from '../img/services/publictransport.jpeg';


export const standardMethodology = [
  {
    step: '01',
    title: 'Agree the Brief',
    desc: 'We confirm the survey objectives, locations, dates, coverage and required outputs.'
  },
  {
    step: '02',
    title: 'Plan Fieldwork',
    desc: 'We prepare survey instructions, arrange staffing and equipment, and confirm access and site-specific safety arrangements.'
  },
  {
    step: '03',
    title: 'Collect and Check',
    desc: 'Our teams record information using the agreed method. Fieldwork checks and data reviews help identify missing records, inconsistencies and unusual conditions.'
  },
  {
    step: '04',
    title: 'Deliver Results',
    desc: 'We provide the agreed datasets and summaries, with notes explaining the survey coverage and any limitations.'
  }
];

export const servicesData = [
  {
    id: 'parking-surveys',
    image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=600&q=70',
    slug: 'parking-surveys',
    title: 'Parking Surveys',
    shortTitle: 'Parking Analytics',
    tagline: 'Understand parking demand, occupancy and length of stay.',
    heroTag: 'On-Street & Off-Street Demand',
    summary: 'We carry out on-street and off-street parking surveys to show where vehicles park, how busy an area becomes and how parking use changes over time.',
    fullDescription: 'We carry out on-street and off-street parking surveys to show where vehicles park, how busy an area becomes and how parking use changes over time.\n\nSurvey coverage, timing and recording methods are agreed around your project. Where a planning authority specifies a particular methodology, this is reviewed when preparing the survey brief.',
    accentColor: '#fbbf24', // amber
    gradient: 'from-amber-500/20 via-yellow-500/10 to-transparent',
    borderGlow: 'hover:border-amber-400/50 hover:shadow-[0_0_30px_rgba(251,191,36,0.3)]',
    icon: 'Car',
    badge: 'Demand & Occupancy',
    quoteButtonText: 'Request a Parking Survey Quote',
    featureBoxes: [
      { title: 'On-Street & Off-Street', desc: 'Comprehensive site coverage' },
      { title: 'Repeat Parking Beats', desc: 'Systematic observation rounds' },
      { title: 'Occupancy & Length of Stay', desc: 'Turnover and duration analysis' },
      { title: 'Project-Specific Coverage', desc: 'Tailored to planning briefs' }
    ],
    stats: [
      { value: 'On-Street & Off-Street' },
      { value: 'Repeat Parking Beats' },
      { value: 'Occupancy & Length of Stay' },
      { value: 'Project-Specific Coverage' }
    ],
    featuresTitle: 'What We Can Record',
    featuresBadge: 'PARKING SURVEY SCOPE',
    features: [
      'Parking occupancy through repeated survey rounds.',
      'Parking capacity, marked bays and visible restrictions.',
      'Vehicle arrivals and departures at car park access points.',
      'Length of stay and vehicle turnover through repeat observations.',
      'Use of loading areas, accessible bays and EV charging bays.',
      'Vehicles parked outside marked spaces or obstructing access.'
    ],
    deliverablesTitle: 'Your Survey Results',
    deliverablesBadge: 'SURVEY OUTPUTS',
    deliverablesDesc: 'Comprehensive parking analysis delivered in agreed formats for planning and design.',
    deliverables: [
      'Parking accumulation and occupancy tables.',
      'Parking stress calculations against the agreed capacity.',
      'Length-of-stay and turnover summaries where included.',
      'A parking inventory and annotated survey plan.',
      'Charts showing demand by location and time.',
      'Fieldwork notes covering restrictions, suspended bays and unusual conditions.'
    ],
    methodology: standardMethodology,
    useCases: [
      'Residential & commercial planning application submissions',
      'Town centre and Controlled Parking Zone (CPZ) reviews',
      'Hospital, education and retail park parking assessments',
      'Kerbside loading, accessible bay and EV charge point planning',
      'Overstay, turnover and duration-of-stay evaluations'
    ]
  },
  {
    id: 'public-transport-surveys',
    image: publictransport,
    slug: 'public-transport-surveys',
    title: 'Public Transport Surveys',
    shortTitle: 'Transit Intelligence',
    tagline: 'Passenger counts and interviews across transport networks.',
    heroTag: 'Bus, Rail & Tram Networks',
    summary: 'We collect passenger and service information on bus, rail and tram networks, at stations, stops and interchanges. Surveys are planned around the routes, services and time periods you need to understand, with access arrangements agreed before fieldwork.',
    fullDescription: 'We collect passenger and service information on bus, rail and tram networks, at stations, stops and interchanges. Surveys are planned around the routes, services and time periods you need to understand, with access arrangements agreed before fieldwork.',
    accentColor: '#a855f7', // purple
    gradient: 'from-purple-500/20 via-indigo-500/10 to-transparent',
    borderGlow: 'hover:border-purple-400/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]',
    icon: 'Train',
    badge: 'Passenger & Network Data',
    quoteButtonText: 'Request a Public Transport Survey Quote',
    featureBoxes: [
      { title: 'Bus, Rail & Tram', desc: 'Multimodal transit networks' },
      { title: 'Onboard & Station Surveys', desc: 'Platforms, stops & interchanges' },
      { title: 'Passenger Counts & Interviews', desc: 'Passenger numbers and interview responses.' },
      { title: 'Service-Level Results', desc: 'Results by route, service and time.' }
    ],
    stats: [
      { value: 'Bus, Rail & Tram' },
      { value: 'Onboard & Station Surveys' },
      { value: 'Passenger Counts & Interviews' },
      { value: 'Service-Level Results' }
    ],
    featuresTitle: 'What We Can Record',
    featuresBadge: 'PUBLIC TRANSPORT SCOPE',
    features: [
      'Passengers boarding and alighting by stop or station.',
      'Passenger loads at agreed points along a route.',
      'Station entrance, exit and interchange movements.',
      'Vehicle arrival, departure and dwell times.',
      'Passenger journey details and feedback through interviews.',
      'Ticket-use information through authorised surveys using the client’s agreed procedures.'
    ],
    deliverablesTitle: 'Your Survey Results',
    deliverablesBadge: 'SURVEY OUTPUTS',
    deliverablesDesc: 'Detailed service-level passenger data and reporting for transit planning.',
    deliverables: [
      'Boarding and alighting tables by service and location.',
      'Passenger load profiles along surveyed routes.',
      'Summaries of observed timings and service intervals.',
      'Cleaned interview responses and summary tables.',
      'Fieldwork logs recording disruption and coverage.'
    ],
    methodology: standardMethodology,
    useCases: [
      'Bus Service Improvement Plans (BSIP) & Route Optimisation',
      'Railway station modernisation & interchange concourse flow',
      'Light rail, tram and suburban transit load monitoring',
      'Passenger travel satisfaction, trip purpose and ticketing reviews',
      'Service frequency, timetable adherence and dwell time studies'
    ]
  },
  {
    id: 'pedestrian-counts',
    image: pedestrianImg,
    slug: 'pedestrian-counts',
    title: 'Pedestrian Counts',
    shortTitle: 'Pedestrian Flow',
    tagline: 'Understand how people move through your site.',
    heroTag: 'Footfall & Pedestrian Movement',
    summary: 'We count pedestrian movements at agreed locations and times to show how footfall changes throughout the day. Surveys can cover high streets, station entrances, pedestrian crossings, shopping areas and development sites.',
    fullDescription: 'We count pedestrian movements at agreed locations and times to show how footfall changes throughout the day. Surveys can cover high streets, station entrances, pedestrian crossings, shopping areas and development sites.\n\nResults can be broken down by direction, counting point and time interval, helping you identify busy periods and understand how different routes are used.',
    accentColor: '#38bdf8', // sky/cyan
    gradient: 'from-cyan-500/20 via-sky-500/10 to-transparent',
    borderGlow: 'hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(56,189,248,0.3)]',
    icon: 'Users',
    badge: 'Directional & Peak Data',
    quoteButtonText: 'Request a Pedestrian Survey Quote',
    featureBoxes: [
      { title: 'Directional Counts', desc: 'Movement in each direction' },
      { title: 'Agreed Time Intervals', desc: 'Tailored intervals to your brief' },
      { title: 'Peak-Period Summaries', desc: 'Identify busy footfall periods' },
      { title: 'Excel & CSV Results', desc: 'Clear, formatted data delivery' }
    ],
    stats: [
      { value: 'Directional Counts' },
      { value: 'Agreed Time Intervals' },
      { value: 'Peak-Period Summaries' },
      { value: 'Excel & CSV Results' }
    ],
    featuresTitle: 'What We Can Record',
    featuresBadge: 'PEDESTRIAN SURVEY SCOPE',
    features: [
      'Pedestrian volumes at entrances, exits and agreed counting points.',
      'Movement in each direction.',
      'Crossing movements and observed route choices.',
      'Peak periods and changes in footfall throughout the survey.',
      'Queues and waiting activity where included in the brief.',
      'Before-and-after counts for changes to streets or public spaces.'
    ],
    deliverablesTitle: 'Your Survey Results',
    deliverablesBadge: 'SURVEY OUTPUTS',
    deliverablesDesc: 'Delivered in clear, accessible formats agreed prior to fieldwork deployment.',
    deliverables: [
      'Counts by location, direction and agreed time interval.',
      'Hourly totals and peak-period summaries.',
      'Charts comparing footfall across locations and times.',
      'Annotated plans showing counting points and observed movements.',
      'Notes on weather, obstructions and unusual activity.'
    ],
    methodology: standardMethodology,
    useCases: [
      'High streets, shopping areas & retail centres',
      'Station entrances, transit hubs & transport interchanges',
      'Pedestrian crossings & junction safety schemes',
      'Development sites & town planning proposals',
      'Before-and-after counts for street space transformations'
    ]
  },
  {
    id: 'market-research',
    image: visitorImg,
    slug: 'market-research',
    title: 'Visitor & Customer Interviews',
    shortTitle: 'Visitor & Customer Interviews',
    tagline: 'Practical fieldwork to understand visitors and their experiences.',
    heroTag: 'Visitor & Customer Fieldwork',
    summary: 'We conduct face-to-face interviews at shopping areas, events, town centres and other agreed venues. Working to the client’s questionnaire and sample requirements, our teams gather feedback about visits, travel, satisfaction and customer experiences.',
    fullDescription: 'We conduct face-to-face interviews at shopping areas, events, town centres and other agreed venues. Working to the client’s questionnaire and sample requirements, our teams gather feedback about visits, travel, satisfaction and customer experiences.',
    accentColor: '#f97316', // orange
    gradient: 'from-orange-500/20 via-amber-500/10 to-transparent',
    borderGlow: 'hover:border-orange-400/50 hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]',
    icon: 'TrendingUp',
    badge: 'Visitor & Venue Fieldwork',
    quoteButtonText: 'Discuss Your Research Fieldwork',
    featureBoxes: [
      { title: 'Visitor & Customer Feedback', desc: 'Direct visitor experiences & satisfaction' },
      { title: 'Face-to-Face Fieldwork', desc: 'On-site interviews at agreed venues' },
      { title: 'Agreed Sample Targets', desc: 'Interview targets agreed by location and respondent group.' },
      { title: 'Clear Response Summaries', desc: 'Cleaned datasets, tables & key findings' }
    ],
    stats: [
      { value: 'Visitor & Customer Feedback' },
      { value: 'Face-to-Face Fieldwork' },
      { value: 'Agreed Sample Targets' },
      { value: 'Clear Response Summaries' }
    ],
    featuresTitle: 'What We Can Record',
    featuresBadge: 'INTERVIEW & FIELDWORK SCOPE',
    features: [
      'Visitor origins and reasons for visiting.',
      'Visit frequency and reported length of stay.',
      'Travel and parking choices.',
      'Customer satisfaction and experiences.',
      'Reported spending and use of local facilities.',
      'Responses to proposed improvements, services or concepts.'
    ],
    deliverablesTitle: 'Your Survey Results',
    deliverablesBadge: 'SURVEY OUTPUTS',
    deliverablesDesc: 'Actionable visitor intelligence and customer feedback presented in clear client reporting formats.',
    deliverables: [
      'A cleaned interview dataset.',
      'Interview totals against agreed sample targets.',
      'Response summaries and comparison tables.',
      'Charts showing key findings.',
      'A summary of open-ended comments where included.'
    ],
    methodology: standardMethodology,
    useCases: [
      'Town centre, high street & BID visitor perception surveys',
      'Shopping centre and retail destination customer feedback',
      'Festivals, sporting events & cultural venue attendee surveys',
      'Public realm improvements & local facility usage evaluations',
      'Service satisfaction and proposed concept feedback studies'
    ]
  },
  {
    id: 'household-surveys',
    image: householdImg,
    slug: 'household-surveys',
    title: 'Household Surveys',
    shortTitle: 'Household Surveys',
    tagline: 'Understand everyday journeys and local travel needs.',
    heroTag: 'Everyday Travel & Community Needs',
    summary: 'Household surveys collect information about residents’ journeys, transport choices and access to services. Projects may involve an interview, a travel diary or follow-up questions, depending on the client’s research objectives.',
    fullDescription: 'Household surveys collect information about residents’ journeys, transport choices and access to services. Projects may involve an interview, a travel diary or follow-up questions, depending on the client’s research objectives.\n\nWe can support household recruitment and fieldwork using an agreed questionnaire, sampling plan and participant information.',
    accentColor: '#ec4899', // pink
    gradient: 'from-pink-500/20 via-rose-500/10 to-transparent',
    borderGlow: 'hover:border-pink-400/50 hover:shadow-[0_0_30px_rgba(236,72,153,0.3)]',
    icon: 'Home',
    badge: 'Residents & Travel Diaries',
    quoteButtonText: 'Discuss a Household Survey',
    featureBoxes: [
      { title: 'Resident Interviews', desc: 'Direct household engagement' },
      { title: 'Travel Diaries', desc: 'Detailed multi-day journey logs' },
      { title: 'Agreed Sampling Plans', desc: 'Targeted geographic & demographic scope' },
      { title: 'Household & Journey Data', desc: 'Cleaned records & category tables' }
    ],
    stats: [
      { value: 'Resident Interviews' },
      { value: 'Travel Diaries' },
      { value: 'Agreed Sampling Plans' },
      { value: 'Household & Journey Data' }
    ],
    featuresTitle: 'What We Can Record',
    featuresBadge: 'HOUSEHOLD SURVEY SCOPE',
    features: [
      'Household vehicle ownership and access to transport.',
      'Journeys to work, education, shopping and leisure.',
      'Travel modes, journey frequency and reported travel times.',
      'Parking arrangements and cycle storage.',
      'Experiences of local public transport.',
      'Barriers to walking, cycling and using public transport.'
    ],
    deliverablesTitle: 'Your Survey Results',
    deliverablesBadge: 'SURVEY OUTPUTS',
    deliverablesDesc: 'Structured resident travel data and insight for policy, planning and infrastructure.',
    deliverables: [
      'Cleaned household and journey records.',
      'Participation and diary-completion summaries.',
      'Tables showing travel modes and journey purposes.',
      'Breakdowns using the agreed respondent categories.',
      'Fieldwork notes and clearly recorded limitations.'
    ],
    methodology: standardMethodology,
    useCases: [
      'Local Transport Plans (LTP) and community travel demand studies',
      'Residential development masterplans and planning statements',
      'Active travel barriers and micro-mobility uptake evaluations',
      'Public transport connectivity and rural access reviews',
      'Community infrastructure and sustainable travel planning'
    ]
  },
  {
    id: 'cycle-count-surveys',
    image: cycleImg,
    slug: 'cycle-count-surveys',
    title: 'Cycle & Active Travel Surveys',
    shortTitle: 'Active Travel & Cycles',
    tagline: 'Measure how cycling routes and shared spaces are used.',
    heroTag: 'Cycling & Active Travel',
    summary: 'We record cycle and other agreed active travel movements on roads, cycle routes, shared-use paths and junctions. Surveys can establish existing use or compare activity before and after a scheme is introduced.',
    fullDescription: 'We record cycle and other agreed active travel movements on roads, cycle routes, shared-use paths and junctions. Surveys can establish existing use or compare activity before and after a scheme is introduced.\n\nCounting locations, time intervals and classifications are agreed before fieldwork, taking account of what can be reliably observed.',
    accentColor: '#22c55e', // emerald/green
    gradient: 'from-green-500/20 via-emerald-500/10 to-transparent',
    borderGlow: 'hover:border-green-400/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]',
    icon: 'Bike',
    badge: 'Active Travel & Corridors',
    quoteButtonText: 'Request an Active Travel Survey Quote',
    featureBoxes: [
      { title: 'Directional Counts', desc: 'Volumes by direction and time' },
      { title: 'Agreed Classifications', desc: 'Pedal cycles, cargo bikes & observable categories' },
      { title: 'Junction Movements', desc: 'Cyclist movements by junction approach and direction.' },
      { title: 'Before-and-After Surveys', desc: 'Scheme impact & comparative evidence' }
    ],
    stats: [
      { value: 'Directional Counts' },
      { value: 'Agreed Classifications' },
      { value: 'Junction Movements' },
      { value: 'Before-and-After Surveys' }
    ],
    featuresTitle: 'What We Can Record',
    featuresBadge: 'ACTIVE TRAVEL SCOPE',
    features: [
      'Cycle volumes by direction and time.',
      'Cyclist turning movements at junctions.',
      'Use of cycle lanes and shared-use paths.',
      'Cargo cycles, e-scooters and other agreed categories where identifiable.',
      'Cycle parking occupancy.',
      'Comparable counts before and after infrastructure changes.'
    ],
    deliverablesTitle: 'Your Survey Results',
    deliverablesBadge: 'SURVEY OUTPUTS',
    deliverablesDesc: 'Robust evidence on cycleway, corridor and active travel scheme utilisation.',
    deliverables: [
      'Counts by location, direction and agreed classification.',
      'Hourly totals and peak-period summaries.',
      'Junction turning-movement diagrams.',
      'Cycle parking occupancy tables where included.',
      'Comparison charts with weather and fieldwork notes.'
    ],
    methodology: standardMethodology,
    useCases: [
      'Cycle lane, superhighway and shared-use path utilisation',
      'Junction movement counts to support the client\'s safety and design assessments.',
      'Before-and-after monitoring for active travel and traffic schemes',
      'Cycle parking and hub capacity demand studies',
      'Active Travel England (ATE) and local transport funding evaluations'
    ]
  },
  {
    id: 'automatic-traffic-counts',
    image: atcImg,
    slug: 'automatic-traffic-counts',
    title: 'Automatic Traffic Counts (ATC)',
    shortTitle: 'Automatic Traffic Counts',
    tagline: 'Continuous, high-precision vehicle volume, speed, and classification monitoring powered by MetroCount® technology.',
    heroTag: 'MetroCount® RSU Vehicle Telemetry',
    summary: 'Continuous 24/7 vehicle volume, speed and classification data collection deployed across the UK using certified MetroCount® Roadside Units (RSU) and precision pneumatic tubes.',
    fullDescription: 'Continuous, high-precision vehicle volume, speed, and classification monitoring powered by MetroCount® technology.\n\nOur Automatic Traffic Counts (ATC) deploy certified MetroCount® MC5600 and MC5900 series Roadside Units (RSU) utilising the "Store Every Axle" principle—time-stamping every single axle impact down to less than 1 millisecond. This enables exhaustive post-survey analysis, audit-ready data verification, and full compliance with UK Scheme F, COBA, and Euro standards for 7-day, 14-day, 28-day, or extended multi-month monitoring.',
    accentColor: '#0284c7', // vibrant sky blue
    gradient: 'from-blue-500/20 via-sky-500/10 to-transparent',
    borderGlow: 'hover:border-sky-400/50 hover:shadow-[0_0_30px_rgba(2,132,199,0.3)]',
    icon: 'Activity',
    badge: 'MetroCount® MC5600/MC5900',
    quoteButtonText: 'Request an ATC Survey Quote',
    featureBoxes: [
      { title: 'MetroCount® MC5600 / MC5900', desc: 'Certified Roadside Units (RSU)' },
      { title: 'Store Every Axle', desc: 'Time-stamped to <1 millisecond' },
      { title: 'UK Scheme F & COBA', desc: 'Euro 6/12 standard classification' },
      { title: 'Speed & Volume Analytics', desc: 'Mean, Median, Pace & 85th %ile speeds' }
    ],
    stats: [
      { value: 'MetroCount® MC5600 / MC5900' },
      { value: 'Store Every Axle (<1ms)' },
      { value: 'UK Scheme F & COBA' },
      { value: '7, 14 & 28-Day Durations' }
    ],
    featuresTitle: 'Key Technical Specifications',
    featuresBadge: 'ATC SURVEY SPECIFICATIONS',
    features: [
      'Technology: MetroCount® MC5600 / MC5900 Series Roadside Units (RSU).',
      'Data Principle: "Store Every Axle" (time-stamped down to <1 millisecond).',
      'Classification: UK Scheme F, COBA, and Euro 6/12 standards.',
      'Speed Analytics: Mean, Median, Pace, and 85th Percentile Speeds.',
      'Survey Duration: 7-day, 14-day, 28-day, or extended multi-month monitoring.',
      'Continuous 24/7 directional volume, headway, and wheelbase data logging.'
    ],
    deliverablesTitle: 'Your ATC Survey Deliverables',
    deliverablesBadge: 'DATA DELIVERABLES',
    deliverablesDesc: 'Clean, validated datasets formatted for UK transport planning and simulation software.',
    deliverables: [
      'Raw time-stamped axle event logs (.MTE / .TXT) for independent audit.',
      'Classified volume tables by 15-minute, hourly, and daily intervals.',
      'Speed distribution reports: Mean, Median, Pace, and 85th Percentile Speeds.',
      'Directional split and flow profile graphs over the full monitoring period.',
      'Comprehensive survey installation plan, site photographs, and calibration logs.'
    ],
    methodology: standardMethodology,
    useCases: [
      'Transport Assessments (TA) and Environmental Impact Statements (EIA)',
      'Speed limit compliance, traffic calming, and road safety assessments',
      'Speed-related planning requirements and visibility splay design',
      'Pavement engineering, axle load evaluations, and heavy vehicle tracking',
      'Long-term seasonal traffic flow monitoring and trend analysis'
    ]
  },
  {
    id: 'traffic-counts-junction-surveys',
    image: trafficCountImg,
    slug: 'traffic-counts-junction-surveys',
    title: 'Traffic Counts & Junction Surveys',
    shortTitle: 'Traffic & Junctions',
    tagline: 'Understand vehicle movements and traffic patterns.',
    heroTag: 'Vehicle Movements & Junction Flows',
    summary: 'We carry out classified traffic counts on roads, at junctions and at site access points. Surveys record the number and types of vehicles travelling through an agreed area, with results broken down by direction, movement and time interval.',
    fullDescription: 'We carry out classified traffic counts on roads, at junctions and at site access points. Surveys record the number and types of vehicles travelling through an agreed area, with results broken down by direction, movement and time interval.',
    accentColor: '#0284c7', // vibrant sky blue
    gradient: 'from-blue-500/20 via-sky-500/10 to-transparent',
    borderGlow: 'hover:border-sky-400/50 hover:shadow-[0_0_30px_rgba(2,132,199,0.3)]',
    icon: 'Car',
    badge: 'Classified & Turning Data',
    quoteButtonText: 'Request a Traffic Survey Quote',
    featureBoxes: [
      { title: 'Classified Vehicle Counts', desc: 'Flows by vehicle class and time' },
      { title: 'Junction Turning Movements', desc: 'Left-turn, ahead and right-turn tracking' },
      { title: 'Site Access Surveys', desc: 'Entrance and exit flow observations' },
      { title: 'Peak-Period Analysis', desc: 'Hourly totals and peak-period summaries' }
    ],
    stats: [
      { value: 'Classified Vehicle Counts' },
      { value: 'Junction Turning Movements' },
      { value: 'Site Access Surveys' },
      { value: 'Peak-Period Analysis' }
    ],
    featuresTitle: 'What We Can Record',
    featuresBadge: 'TRAFFIC SURVEY SCOPE',
    features: [
      'Classified vehicle flows.',
      'Left-turn, ahead and right-turn movements.',
      'Site entrance and exit movements.',
      'Queue lengths at agreed observation times.',
      'Vehicle occupancy where visibility allows.',
      'Pedestrian and cycle movements alongside traffic counts.'
    ],
    deliverablesTitle: 'Your Survey Results',
    deliverablesBadge: 'SURVEY OUTPUTS',
    deliverablesDesc: 'Classified count tables, turning-movement diagrams and peak-period summaries ready for transport planning.',
    deliverables: [
      'Classified count tables.',
      'Junction turning-movement diagrams.',
      'Hourly totals and peak-period summaries.',
      'Queue observations where included.',
      'A survey location plan and fieldwork notes.'
    ],
    methodology: standardMethodology,
    useCases: [
      'Junction capacity assessments & LinSig / Arcady / Picady modelling',
      'Transport Assessments (TA) & Transport Statements (TS)',
      'New commercial and residential site access appraisals',
      'Traffic signal design, roundabout upgrades & junction improvement schemes',
      'Congestion monitoring & peak-period corridor studies'
    ]
  }
];
