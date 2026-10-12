export const servicesData = [
  {
    id: 'pedestrian-counts',
    slug: 'pedestrian-counts',
    title: 'Pedestrian Counts',
    shortTitle: 'Pedestrian Flow',
    tagline: 'Precision Footfall Intelligence & High-Density Flow Analytics',
    heroTag: 'Urban Mobility & Foot Traffic',
    summary: 'High-accuracy pedestrian counting, bi-directional flow tracking, and heat mapping for urban planners, retail developers, and junction improvement initiatives.',
    fullDescription: 'An accurate and reliable pedestrian count survey provides invaluable data regarding foot traffic volume, directional density, peak travel hours, and pedestrian movement dynamics across public spaces. Utilizing advanced high-definition video analytics, manual tally precision, and thermal imaging, Fast Track Surveys captures intricate footfall patterns. This data is critical for analyzing sidewalk capacity, entrance design, junction safety improvements, retail valuation, and public infrastructure developments.',
    accentColor: '#38bdf8', // sky/cyan
    gradient: 'from-cyan-500/20 via-sky-500/10 to-transparent',
    borderGlow: 'hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(56,189,248,0.3)]',
    icon: 'Users',
    badge: 'High Accuracy ±99.2%',
    stats: [
      { label: 'Detection Accuracy', value: '99.4%' },
      { label: 'Turnaround Time', value: '24-48 hrs' },
      { label: 'Peak Hour Tracking', value: '15-min intervals' },
      { label: 'Multi-directional Channels', value: 'Up to 16 gates' }
    ],
    features: [
      'Bi-directional & Multi-gate Counting with sub-minute interval tracking',
      'AI-assisted Optical Recognition and Quality Assured Manual Verification',
      'Sidewalk & Crosswalk Capacity Assessment (Highway Capacity Manual / DfT standards)',
      'Pedestrian Density Heatmaps & Flow Velocity Analysis',
      'Desire Line Mapping and Junction Conflict Hotspot Identification',
      'Special Event & Transit Interchange Footfall Influx Modeling'
    ],
    methodology: [
      {
        step: '01',
        title: 'Site Reconnaissance & Gate Calibration',
        desc: 'Our surveyors survey the site layout to establish optimal high-definition camera viewpoints and unobstructed counting cordons.'
      },
      {
        step: '02',
        title: 'Synchronized Multi-point Recording',
        desc: 'Automated ultra-low latency optical units and accredited field observers record simultaneous movements across all target access corridors.'
      },
      {
        step: '03',
        title: 'Classified Stratification & QA Audit',
        desc: 'Footfall is classified into demographics, transit directions, and mobility assistance profiles with 100% independent verification audits.'
      },
      {
        step: '04',
        title: 'Analytical Reporting & CAD/GIS Integration',
        desc: 'Delivery of interactive dashboard summaries, raw CSV telemetry, visual flow charts, and GIS compatible mapping layers.'
      }
    ],
    useCases: [
      'High Street & Shopping Centre Footfall Audits',
      'Transport Interchange & Railway Station Modernization',
      'Local Authority Pedestrianization & Low Traffic Neighborhood (LTN) Schemes',
      'Commercial Property & Billboard Visibility Valuations',
      'Public Safety, Evacuation Capacity & School Street Schemes'
    ],
    deliverables: [
      '15-Minute & Hourly Classified Summary Tables (Excel/CSV)',
      'Peak Hour Flow Graphs & Directional Proportion Diagrams',
      'GIS-mapped Heatmap Overlays & Pedestrian Movement Density Maps',
      'Full Technical Interpretation Report with Statistical Findings'
    ]
  },
  {
    id: 'parking-surveys',
    slug: 'parking-surveys',
    title: 'Parking Surveys',
    shortTitle: 'Parking Analytics',
    tagline: 'Comprehensive Parking Stress, Duration of Stay & Beat Surveys',
    heroTag: 'Asset & Capacity Management',
    summary: 'Precise on-street and off-street parking beat surveys, occupancy index tracking, parking stress assessments (Lambeth Methodology compliant), and revenue modeling.',
    fullDescription: 'Fast Track Surveys implements rigorous data collection methodologies to deliver exhaustive insight into parking utilization trends across municipal, retail, and private parking assets. We quantify parking stress, turnover rates, duration of stay, and compliance with Controlled Parking Zones (CPZ). Our detailed data empowers local authorities, developers, and asset managers to mitigate parking overflow, justify planning applications, and optimize tariff structures.',
    accentColor: '#fbbf24', // amber
    gradient: 'from-amber-500/20 via-yellow-500/10 to-transparent',
    borderGlow: 'hover:border-amber-400/50 hover:shadow-[0_0_30px_rgba(251,191,36,0.3)]',
    icon: 'Car',
    badge: 'Lambeth Methodology',
    stats: [
      { label: 'Stress Index Precision', value: '100% Certified' },
      { label: 'Survey Frequencies', value: '15 to 60 min beats' },
      { label: 'Night & Day Coverage', value: '24/7 Deployment' },
      { label: 'Capacity Evaluated', value: '10,000+ Bays' }
    ],
    features: [
      'Lambeth Methodology compliant parking stress surveys for planning submissions',
      'Duration of stay (turnover) tracking using license plate / vehicle matching telemetry',
      'On-street vs Off-street capacity, restrictions (Single/Double Yellow, Pay & Display, Disabled, EV)',
      'Illegal & opportunistic parking hazard identification',
      'Tariff yield optimization and financial turnover modeling',
      'Controlled Parking Zone (CPZ) implementation & revision impact studies'
    ],
    methodology: [
      {
        step: '01',
        title: 'Kerbside Inventory & Bay Mapping',
        desc: 'Complete geospatial mapping of all available kerbside space, restriction types, dropped kerbs, and designated parking bays.'
      },
      {
        step: '02',
        title: 'Timed Beat Patrols & Automated Capture',
        desc: 'Accredited surveyors conduct recurring timed patrol beats recording vehicle presence, registration tails, and restriction compliance.'
      },
      {
        step: '03',
        title: 'Occupancy & Stress Calculations',
        desc: 'Computation of instantaneous parking stress percentages across designated survey zones during critical peak and baseline intervals.'
      },
      {
        step: '04',
        title: 'Planning Compliant Reporting Pack',
        desc: 'Production of formal Transport Assessment / Statement appendices ready for local planning authority scrutiny.'
      }
    ],
    useCases: [
      'Residential & Commercial Planning Application Submissions',
      'Town Centre Masterplanning & Controlled Parking Zone (CPZ) Reviews',
      'Hospital, University & Airport Parking Capacity Rationalization',
      'EV Charging Hub Location & Demand Analysis',
      'Retail Park Tariff Structuring and Overstay Enforcement Planning'
    ],
    deliverables: [
      'Lambeth Methodology Parking Stress Calculation Matrices',
      'Duration of Stay & Vehicle Turnover Distribution Charts',
      'Kerbside Restriction GIS Spatial Layer & Bay Inventory',
      'Formal Planning Statement Parking Annex'
    ]
  },
  {
    id: 'public-transport-surveys',
    slug: 'public-transport-surveys',
    title: 'Public Transport Surveys',
    shortTitle: 'Transit Intelligence',
    tagline: 'Multimodal Transit Passenger Counts, Origin-Destination & Boarding Analytics',
    heroTag: 'Rail, Bus & Airport Hubs',
    summary: 'Multi-modal transit monitoring across bus networks, railway termini, light rail, and airport interchanges to evaluate passenger flow, interchange latency, and service reliability.',
    fullDescription: 'Fast Track Surveys collects effective, multi-dimensional public transport intelligence spanning bus routes, train stations, tram networks, and major airport interchanges. By combining electronic passenger counts, high-resolution video surveillance, and on-board observer counts, we supply transit authorities and network operators with actionable intelligence to eliminate bottlenecks, re-allocate fleet frequency, and elevate commuter passenger experiences.',
    accentColor: '#a855f7', // purple
    gradient: 'from-purple-500/20 via-indigo-500/10 to-transparent',
    borderGlow: 'hover:border-purple-400/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]',
    icon: 'Train',
    badge: 'Multimodal Certified',
    stats: [
      { label: 'Fleet Coverage', value: 'Bus, Rail & Air' },
      { label: 'On-Time Telemetry', value: 'Sub-second sync' },
      { label: 'Passenger Flow QA', value: 'Dual verification' },
      { label: 'Network Reach', value: 'UK Nationwide' }
    ],
    features: [
      'On-board passenger boarding and alighting counts by stop and station',
      'Platform passenger density & dwell time optimization studies',
      'Intermodal transfer duration and walking time audits between rail, bus, and metro',
      'Transit route frequency, load factor, and passenger crowding analysis',
      'Service punctuality, schedule adherence, and headway regularity auditing',
      'Video-based station interchange gate count audits'
    ],
    methodology: [
      {
        step: '01',
        title: 'Transit Network & Timetable Alignment',
        desc: 'Integration with transit operator schedules and station layouts to design targeted sampling plans across operational hours.'
      },
      {
        step: '02',
        title: 'Station & Onboard Telemetry Deployment',
        desc: 'Coordinated field teams and optical equipment positioned across platforms, station concourses, and onboard rolling stock.'
      },
      {
        step: '03',
        title: 'Dwell Time & Flow Rate Data Ingestion',
        desc: 'Real-time classification of passenger movements, transfer friction points, and vehicle occupancy levels.'
      },
      {
        step: '04',
        title: 'Capacity & Scheduling Analytics',
        desc: 'Synthesis of data into operational insight reports designed for TfL, DfT, and private transport concessionaires.'
      }
    ],
    useCases: [
      'Bus Service Improvement Plans (BSIP) & Route Optimization',
      'Railway Station Modernization & Concourse Flow Management',
      'Airport Terminal Shuttle & Intermodal Transit Planning',
      'Franchise Bid Modeling & Passenger Demand Forecasting',
      'Transit Fare Policy & Ticket Barrier Efficiency Analysis'
    ],
    deliverables: [
      'Boarding/Alighting matrices by route, stop, and time-slice',
      'Station Platform Density & Concourse Heatmaps',
      'Transfer Delay & Schedule Variance Analytical Reports',
      'Executive Summary Deck for Transport Authorities'
    ]
  },
  {
    id: 'pedestrian-road-side-interview-surveys',
    slug: 'pedestrian-road-side-interview-surveys',
    title: 'Pedestrian Roadside Interview Surveys',
    shortTitle: 'Roadside Interviews (RSI)',
    tagline: 'In-Depth Origin-Destination, Travel Motivation & Trip Purpose Surveys',
    heroTag: 'Behavioral & Origin-Destination',
    summary: 'Direct face-to-face pedestrian and roadside intercept interviews capturing trip purpose, origin-destination matrices, modal shift willingness, and demographic insights.',
    fullDescription: 'Understanding the underlying motivation of pedestrians and commuters is essential for impactful infrastructure and urban regeneration schemes. Through safe, structured, and ethical roadside and pedestrian interviews, Fast Track Surveys captures vital qualitative and quantitative behavioral data. We unearth trip origins, destinations, journey purposes, modal choice reasons, and public sentiment toward prospective transport alterations.',
    accentColor: '#10b981', // emerald
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    borderGlow: 'hover:border-emerald-400/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]',
    icon: 'MessageSquareText',
    badge: 'MRS Code Compliant',
    stats: [
      { label: 'Response Rate', value: 'High Engagement' },
      { label: 'Safety Compliance', value: 'Chapter 8 Street Works' },
      { label: 'Data Quality', value: 'GPS & Time stamped' },
      { label: 'Sample Reach', value: 'Statistically Significant' }
    ],
    features: [
      'Trip Origin-Destination (O-D) matrix generation with full postcode zoning',
      'Detailed journey purpose capture (Work, Retail, Education, Leisure, Freight)',
      'Attitudinal surveys regarding proposed road schemes, clean air zones, and LTNs',
      'Trained interviewers certified in health & safety and public engagement etiquette',
      'Digital tablet capture with real-time validation and geolocation stamping',
      'Bespoke questionnaire logic branching tailored to specific client hypotheses'
    ],
    methodology: [
      {
        step: '01',
        title: 'Survey Instrument & Questionnaire Design',
        desc: 'Collaborative development of statistically sound questionnaires with skip-logic and demographic stratification.'
      },
      {
        step: '02',
        title: 'Safety Risk Assessment & Permitting',
        desc: 'Procuring highway authority approvals and enacting rigorous Chapter 8 safety protocols for on-street interviewers.'
      },
      {
        step: '03',
        title: 'Digitized Fieldwork Execution',
        desc: 'Uniformed, trained interviewers engage the public using encrypted tablet devices with instant data validation.'
      },
      {
        step: '04',
        title: 'Origin-Destination Matrix Synthesis',
        desc: 'Raw responses are cleaned, geocoded to Census Output Areas / Transport Zones, and compiled into modeling datasets.'
      }
    ],
    useCases: [
      'Strategic Transport Model Calibration (SATURN, VISUM, VISSIM)',
      'Clean Air Zone (CAZ) & Low Emission Zone Perception Studies',
      'Major Highway Bypass & Bridge Scheme Justification',
      'Public Realm Regeneration & Pedestrian Street Design Consultation',
      'Retail Catchment & Commuter Spend Pattern Analysis'
    ],
    deliverables: [
      'Origin-Destination Zonal Flow Matrices (CSV/Excel format)',
      'Cross-tabulated Demographic & Behavioral Data Tables',
      'Geospatial Desire Line Maps with GIS Shapefiles',
      'Comprehensive Statistical & Qualitative Evaluation Report'
    ]
  },
  {
    id: 'household-surveys',
    slug: 'household-surveys',
    title: 'Household Surveys',
    shortTitle: 'Household Mobility',
    tagline: 'Comprehensive Residential Travel Diaries & Demographic Research',
    heroTag: 'Community Travel Behavior',
    summary: 'Meticulous door-to-door, digital, and hybrid household travel diary surveys adhering strictly to the Market Research Society (MRS) Code of Conduct.',
    fullDescription: 'Household surveys provide a deep, granular understanding of household travel behavior, vehicle ownership patterns, active travel readiness, and public service accessibility. Fast Track Surveys deploys meticulously trained, vetted interviewers backed by robust digital survey portals. We strictly abide by the Market Research Society (MRS) Code of Conduct, ensuring minimal intrusion, absolute respondent safety, and pristine data fidelity.',
    accentColor: '#ec4899', // pink
    gradient: 'from-pink-500/20 via-rose-500/10 to-transparent',
    borderGlow: 'hover:border-pink-400/50 hover:shadow-[0_0_30px_rgba(236,72,153,0.3)]',
    icon: 'Home',
    badge: '100% GDPR & MRS Audited',
    stats: [
      { label: 'Household Coverage', value: 'Custom Sample Sizes' },
      { label: 'Confidentiality', value: 'Strict GDPR Protocol' },
      { label: 'Completion Rate', value: 'Industry Leading' },
      { label: 'Survey Modes', value: 'In-person / Online / Phone' }
    ],
    features: [
      'Comprehensive multi-day household travel diaries for all household members',
      'Vehicle ownership, EV charging intentions, and parking behavior analysis',
      'School run and daily commute modal split research',
      'Public transport accessibility and satisfaction profiling',
      'Public consultation for major infrastructure developments and local plans',
      'Stratified random sampling across targeted demographic and socioeconomic segments'
    ],
    methodology: [
      {
        step: '01',
        title: 'Sampling Frame & Demographics Target',
        desc: 'Establishment of representative sample quotas based on Census data, postcode sectors, and socioeconomic strata.'
      },
      {
        step: '02',
        title: 'Advance Notification & Community Trust',
        desc: 'Distribution of official introductory letters to build resident rapport and maximize legitimate participation rates.'
      },
      {
        step: '03',
        title: 'Multi-Channel Diary Collection',
        desc: 'Conducting in-depth face-to-face visits, telephone follow-ups, and secured web-based travel diary submissions.'
      },
      {
        step: '04',
        title: 'Weighted Statistical Analysis',
        desc: 'Data normalization, non-response weighting, and demographic cross-referencing to produce actionable policy evidence.'
      }
    ],
    useCases: [
      'Local Transport Plan (LTP) Evidence Base Development',
      'Major Residential Masterplan Travel Demand Forecasting',
      'Active Travel & Micro-mobility Uptake Assessment',
      'Social Welfare, Rural Transport & Connectivity Studies',
      'Community Infrastructure Levy (CIL) Investment Justification'
    ],
    deliverables: [
      'Comprehensive Cleaned Household Dataset (SPSS, CSV, Excel)',
      'Travel Diary Modal Split Summaries and Journey Distance Distributions',
      'Cross-tabulated Socioeconomic Correlation Matrices',
      'Executive Policy Insights Presentation & Final Written Report'
    ]
  },
  {
    id: 'cycle-count-surveys',
    slug: 'cycle-count-surveys',
    title: 'Cycle Count Surveys',
    shortTitle: 'Active Travel & Cycles',
    tagline: 'Active Mobility Telemetry, Cycleway Volume & Micro-Mobility Tracking',
    heroTag: 'DfT Aligned Active Travel',
    summary: 'Classified cycle counts, e-scooter and cargo bike monitoring, travel duration analysis, and cycle infrastructure utilization data aligned with DfT national guidelines.',
    fullDescription: 'Cycling and micromobility have experienced explosive growth across the UK, with the Department for Transport reporting sustained surges in pedal cycle traffic. Fast Track Surveys provides specialized active travel data solutions to help highway authorities, urban designers, and cycling advocates validate infrastructure investments. We conduct classified bicycle, e-bike, cargo bike, and e-scooter counts alongside origin-destination and parking dwell studies.',
    accentColor: '#22c55e', // emerald/green
    gradient: 'from-green-500/20 via-emerald-500/10 to-transparent',
    borderGlow: 'hover:border-green-400/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]',
    icon: 'Bike',
    badge: 'DfT 2020+ Standard',
    stats: [
      { label: 'Active Travel Growth', value: '+45.7% Benchmarks' },
      { label: 'Classified Modes', value: 'Bikes, E-Bikes, Cargo, Scooters' },
      { label: 'Video AI Validation', value: 'High Fidelity' },
      { label: 'Temporal Precision', value: 'Continuous 24/7' }
    ],
    features: [
      'Classified counts: Standard bikes, e-bikes, cargo cycles, shared bikes, and e-scooters',
      'Segregated cycle superhighway & shared-use path volume auditing',
      'Junction turning movements and cyclist turning safety conflict studies',
      'Cycle parking occupancy, duration of stay, and security utilization surveys',
      'Before-and-after monitoring for Low Traffic Neighborhoods (LTN) and active corridors',
      'Weather-correlated longitudinal cycle traffic analytics'
    ],
    methodology: [
      {
        step: '01',
        title: 'Active Corridor Telemetry Setup',
        desc: 'Mounting weather-shielded optical sensors and thermal detection arrays along key commuter corridors and cycle networks.'
      },
      {
        step: '02',
        title: 'Classified Optical & Manual Telemetry',
        desc: 'Continuous classification of micro-mobility types, directionality, helmet use, and speed profiles.'
      },
      {
        step: '03',
        title: 'Weather & Seasonal Normalization',
        desc: 'Factoring weather station data, temperature, and daylight variations to calibrate annual average daily cycle traffic (AADCT).'
      },
      {
        step: '04',
        title: 'Active Travel Scheme Evaluation',
        desc: 'Generation of clear visual dashboards and scheme impact metrics for funding bids (Active Travel England / Levelling Up).'
      }
    ],
    useCases: [
      'Active Travel England (ATE) Grant Applications & Justification',
      'Cycle Superhighway & Quietway Infrastructure Scheme Monitoring',
      'Micromobility & Shared E-Scooter Trial Evaluations',
      'School Streets & Commuter Corridor Active Travel Validation',
      'Cycle Parking Facility Demand & Optimization Studies'
    ],
    deliverables: [
      'Classified Cycle Count Interval Reports with Peak Hour Indicators',
      'Directional Turning Movement Diagrams (Junction Flow Diagrams)',
      'Cyclist Origin-Destination & Route Choice Mapping',
      'Active Travel Infrastructure Impact Assessment Report'
    ]
  },
  {
    id: 'market-research',
    slug: 'market-research',
    title: 'Market Research & Intercepts',
    shortTitle: 'Market Research',
    tagline: 'High-Impact Consumer Behavior, Retail Footfall & Focus Intercepts',
    heroTag: 'Commercial & Consumer Insights',
    summary: 'Targeted market research across shopping centers, sporting arenas, transit hubs, and high streets to power commercial strategy and product positioning.',
    fullDescription: 'Fast Track Surveys maximizes focus group coverage and public sentiment capture across every strategic commercial environment imaginable. From prime high street corridors and shopping malls to major sporting arenas and transit hubs, our field executives execute structured face-to-face interviews, digital questionnaires, and brand perception studies. We deliver clean, unbiased market intelligence that drives lucrative marketing, retail positioning, and operational enhancements.',
    accentColor: '#f97316', // orange
    gradient: 'from-orange-500/20 via-amber-500/10 to-transparent',
    borderGlow: 'hover:border-orange-400/50 hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]',
    icon: 'TrendingUp',
    badge: 'High Reach Sampling',
    stats: [
      { label: 'Venue Types', value: 'Retail, Arenas, Transit' },
      { label: 'Interviewer Pool', value: 'UK-Wide Accredited' },
      { label: 'Data Integrity', value: 'Double Blind QA' },
      { label: 'Insights Speed', value: 'Live Stream Data' }
    ],
    features: [
      'On-street, shopping center, and event venue consumer intercept interviews',
      'Customer demographic profiling, visitor catchment, and dwell time analysis',
      'Brand awareness, advertising recall, and concept testing in real-world retail settings',
      'Shopper spend propensity, basket analysis, and cross-shopping habits',
      'Mystery shopping and customer service experience benchmarking',
      'Multi-channel survey integration: Tablet CAPI, QR-code, SMS, and telephone CATI'
    ],
    methodology: [
      {
        step: '01',
        title: 'Target Cohort & Location Strategy',
        desc: 'Pinpointing high-value intercept zones across retail clusters, transit terminals, and entertainment complexes.'
      },
      {
        step: '02',
        title: 'Engaging Interviewer Deployment',
        desc: 'Professional, charismatic interview teams trained to maximize response engagement and representative sampling.'
      },
      {
        step: '03',
        title: 'Real-Time Cloud Data Synchronization',
        desc: 'Immediate tablet-to-cloud ingestion allowing live monitoring of sample quotas and data consistency.'
      },
      {
        step: '04',
        title: 'Strategic Insights & Commercial Advisory',
        desc: 'Translation of complex statistical consumer metrics into sharp commercial recommendations and executive visuals.'
      }
    ],
    useCases: [
      'Retail Mall Redevelopment & Tenant Mix Optimization',
      'Stadium & Arena Event-Day Attendee Experience Audits',
      'Product Launch Perception & Competitive Brand Benchmarking',
      'Local High Street Regeneration Feasibility Studies',
      'Transit Retail & Passenger Commercial Spend Maximization'
    ],
    deliverables: [
      'Executive Commercial Insights Presentation (PowerPoint/PDF)',
      'Fully Segmented Raw Data Tables with Statistical Cross-Tabs',
      'Visual Infographics & Consumer Sentiment Word-Clouds',
      'Actionable Business Strategy Recommendations Document'
    ]
  }
];
