import type {
  IProgram,
  IPricingPlan,
  ICoach,
  ITestimonial,
  IBlogPost,
  IFAQ,
  IEvent,
  IAchievement,
} from "@/models/schemas";
import { programImageByIndex, siteImages } from "@/lib/data/site-images";

export const defaultPrograms: IProgram[] = [
  {
    slug: "aau-basketball",
    title: "AAU Basketball",
    shortDescription: "Competitive travel teams representing Central PA Lions on the AAU circuit.",
    fullDescription:
      "Our AAU program challenges student-athletes with high-level competition, structured practice plans, and team-first culture. Athletes develop court IQ, conditioning, and leadership while competing regionally and nationally.",
    ageRange: "Grades 3–12",
    skillLevel: "Intermediate to Elite",
    schedule: "Seasonal — practices and tournament weekends",
    location: "Central Pennsylvania",
    registrationLink: "/register",
    featured: true,
    active: true,
    order: 0,
    featuredImage: programImageByIndex(0),
    featuredImageAlt: "Lions AAU competition",
  },
  {
    slug: "travel-teams",
    title: "Travel Teams",
    shortDescription: "Dedicated travel squads with focused development and tournament play.",
    fullDescription:
      "Travel teams emphasize skill progression, defensive discipline, and competitive reps. Coaches invest in each player's growth on and off the court.",
    ageRange: "Grades 4–12",
    skillLevel: "All levels",
    schedule: "Weekly practices + travel events",
    location: "Centre County & region",
    registrationLink: "/register",
    featured: true,
    active: true,
    order: 1,
    featuredImage: programImageByIndex(1),
  },
  {
    slug: "basketball-camps",
    title: "Basketball Camps",
    shortDescription: "High-energy camps blending fundamentals, competition, and fun.",
    fullDescription:
      "Camps introduce younger athletes to Lions culture while sharpening skills for experienced players through stations, small-sided games, and character talks.",
    ageRange: "Grades K–8",
    skillLevel: "All levels",
    schedule: "Seasonal sessions",
    location: "Central PA",
    registrationLink: "/register",
    featured: false,
    active: true,
    order: 2,
    featuredImage: programImageByIndex(2),
  },
  {
    slug: "shooting-clinics",
    title: "Shooting Clinics",
    shortDescription: "Focused shooting mechanics, footwork, and game-speed repetitions.",
    fullDescription:
      "Clinics break down form, balance, and decision-making to help athletes become confident shooters under pressure.",
    ageRange: "Grades 3–12",
    skillLevel: "All levels",
    schedule: "Clinic dates announced seasonally",
    location: "Central PA",
    registrationLink: "/register",
    featured: false,
    active: true,
    order: 3,
    featuredImage: programImageByIndex(3),
  },
  {
    slug: "skill-development",
    title: "Individual Skill Development",
    shortDescription: "Personalized training plans for ball handling, finishing, and IQ.",
    fullDescription:
      "One-on-one sessions target specific growth areas with measurable goals and film review when available.",
    ageRange: "Grades 5–12",
    skillLevel: "All levels",
    schedule: "By appointment",
    location: "Central PA",
    registrationLink: "/register",
    featured: false,
    active: true,
    order: 4,
    featuredImage: programImageByIndex(4),
  },
  {
    slug: "small-group-training",
    title: "Small Group Training",
    shortDescription: "Train with 3–6 athletes for competitive reps and accountability.",
    fullDescription:
      "Small groups mirror game situations while allowing coaches to give detailed feedback every rep.",
    ageRange: "Grades 4–12",
    skillLevel: "Intermediate+",
    schedule: "Weekly blocks",
    location: "Central PA",
    registrationLink: "/register",
    featured: false,
    active: true,
    order: 5,
    featuredImage: programImageByIndex(5),
  },
  {
    slug: "competitive-team-training",
    title: "Competitive Team Training",
    shortDescription: "Team concepts, defensive schemes, and execution at game speed.",
    fullDescription:
      "Rostered teams work on spacing, communication, and situational basketball to prepare for meaningful competition.",
    ageRange: "Grades 6–12",
    skillLevel: "Travel / AAU",
    schedule: "Team calendar",
    location: "Central PA",
    registrationLink: "/register",
    featured: false,
    active: true,
    order: 6,
    featuredImage: programImageByIndex(6),
  },
  {
    slug: "youth-development",
    title: "Youth Development Programs",
    shortDescription: "Foundational skills and love for the game for younger Lions.",
    fullDescription:
      "Age-appropriate drills, movement literacy, and positive coaching help K–5 athletes build confidence and habits early.",
    ageRange: "Grades K–5",
    skillLevel: "Beginner",
    schedule: "Seasonal",
    location: "Central PA",
    registrationLink: "/register",
    featured: false,
    active: true,
    order: 7,
    featuredImage: programImageByIndex(7),
  },
  {
    slug: "character-leadership",
    title: "Character & Leadership Coaching",
    shortDescription: "Leadership, academics, and accountability alongside basketball.",
    fullDescription:
      "Athletes learn that attitude and effort matter in classrooms, homes, and communities—not just on the court.",
    ageRange: "Grades 3–12",
    skillLevel: "All",
    schedule: "Integrated in all programs",
    location: "Central PA",
    registrationLink: "/register",
    featured: false,
    active: true,
    order: 8,
    featuredImage: siteImages.lockerRoom,
  },
];

export const defaultPricing: IPricingPlan[] = [
  {
    name: "Individual Athlete",
    price: 400,
    description: "One athlete enrollment for the season.",
    features: [
      "Program placement evaluation",
      "Coached practices & team development",
      "Character and leadership curriculum",
      "Academy communication & updates",
    ],
    order: 0,
    active: true,
  },
  {
    name: "Two-Person Family",
    price: 700,
    description: "Save when two athletes from the same household enroll.",
    features: [
      "Both athletes evaluated for placement",
      "Family-friendly scheduling support",
      "Shared academy resources",
      "Priority registration support",
    ],
    order: 1,
    active: true,
  },
  {
    name: "Three-Person Family",
    price: 1050,
    description: "Maximum family value for three enrolled athletes.",
    features: [
      "Three athlete placements",
      "Coordinated team communication",
      "Leadership development for all athletes",
      "Best per-athlete savings",
    ],
    order: 2,
    active: true,
  },
];

export const defaultCoaches: ICoach[] = [
  {
    name: "TJ Anderson",
    title: "Founder, CEO & Head Coach",
    bio: "TJ Anderson leads the Central PA Lions with a player-first philosophy rooted in discipline, development, and community impact.",
    credentials: "Program founder and head coach",
    experience: "Youth basketball leadership since 2011",
    featured: true,
    order: 0,
    published: true,
    photo: siteImages.benchGear,
    photoAlt: "TJ Anderson coaching",
  },
  {
    name: "Alan Robinson",
    title: "Boys' Coach",
    bio: "Coach Robinson emphasizes fundamentals, defensive effort, and respect for the game in every practice.",
    experience: "Experienced boys' development coach",
    featured: true,
    order: 1,
    published: true,
    photo: siteImages.trainingCourt,
  },
  {
    name: "Bryan Kulick",
    title: "Boys' Coach",
    bio: "Coach Kulick helps athletes compete with confidence while building habits that translate beyond basketball.",
    experience: "Competitive boys' training background",
    featured: true,
    order: 2,
    published: true,
    photo: siteImages.lockerRoom,
  },
];

export const defaultTestimonials: ITestimonial[] = [
  {
    name: "Michelle & David Hartley",
    relationship: "Parents of 7th grade travel player",
    type: "parent",
    content:
      "We moved to Centre County not knowing many families in youth sports. The Lions welcomed our daughter immediately. Coaches hold kids accountable without tearing them down—her footwork, confidence, and grades all improved in the same season.",
    rating: 5,
    featured: true,
    approved: true,
    order: 0,
  },
  {
    name: "Jennifer Torres",
    relationship: "Parent of AAU athlete",
    type: "parent",
    content:
      "TJ and his staff communicate better than any club we have been part of. We always know practice times, tournament weekends, and what our son should be working on at home. The attitude-and-effort message is not a slogan here—it is how they coach every day.",
    rating: 5,
    featured: true,
    approved: true,
    order: 1,
  },
  {
    name: "Ethan Walsh",
    relationship: "11th grade Lions guard",
    type: "athlete",
    content:
      "I have played travel ball since fourth grade. Central PA Lions is the first place that pushed me on defense and decision-making as much as scoring. Film, reps, and honest feedback made me a starter on my high school team.",
    rating: 5,
    featured: true,
    approved: true,
    order: 2,
  },
  {
    name: "Angela Brooks",
    relationship: "Parent of two enrolled athletes",
    type: "parent",
    content:
      "With two kids in the program, the family registration option was a relief. More importantly, both children are taught the same standards: respect the coach, respect classmates, and compete hard. That consistency matters in our house.",
    rating: 5,
    featured: true,
    approved: true,
    order: 3,
  },
  {
    name: "Noah Patterson",
    relationship: "8th grade skill-development athlete",
    type: "athlete",
    content:
      "The shooting clinics and small-group sessions fixed habits I did not even know I had. Coaches break things down so you can actually apply them in games, not just look good in drills.",
    rating: 5,
    featured: false,
    approved: true,
    order: 4,
  },
  {
    name: "Karen & Mike Sullivan",
    relationship: "Parents of first-year camper",
    type: "parent",
    content:
      "Our son was nervous before his first Lions camp. By the second day he was asking to come back for travel tryouts. The environment is competitive but never toxic—exactly what we wanted for a young athlete.",
    rating: 5,
    featured: false,
    approved: true,
    order: 5,
  },
  {
    name: "Darius Coleman",
    relationship: "Lions alumni (college freshman)",
    type: "alumni",
    content:
      "I credit Lions practices for preparing me for high school varsity and club in college. The leadership talks stuck with me more than any trophy. I still text Coach Anderson when I need advice.",
    rating: 5,
    featured: false,
    approved: true,
    order: 6,
  },
  {
    name: "Lisa Nguyen",
    relationship: "Parent of youth development athlete",
    type: "parent",
    content:
      "Our daughter is in elementary school, so we cared about fundamentals and fun—not pressure. The youth development staff kept her engaged, taught real skills, and made sure she left every session proud of her effort.",
    rating: 5,
    featured: false,
    approved: true,
    order: 7,
  },
];

export const defaultBlogPosts: IBlogPost[] = [
  {
    title: "2026–2027 Tryout Registration Opens",
    slug: "2026-2027-tryout-registration",
    excerpt: "Registration is open for student-athletes interested in Lions AAU and travel teams.",
    content:
      "<p>Central PA Lions Academy is accepting registration inquiries for the upcoming season. Complete the registration form and our staff will follow up with next steps.</p>",
    categorySlug: "tryouts",
    author: "Central PA Lions Staff",
    published: true,
    featured: true,
    publishedAt: new Date("2026-01-15"),
  },
  {
    title: "Attitude & Effort: Leading On and Off the Court",
    slug: "attitude-and-effort",
    excerpt: "How Lions culture builds habits that last beyond game day.",
    content:
      "<p>Excellence is a habit. Our athletes learn that preparation, discipline, and respect create confidence in every environment.</p>",
    categorySlug: "player-development",
    author: "TJ Anderson",
    published: true,
    featured: false,
    publishedAt: new Date("2025-11-01"),
  },
];

export const defaultFaqs: IFAQ[] = [
  {
    question: "Who is eligible to join Central PA Lions Academy?",
    answer:
      "We serve student-athletes in grades K–12 across Central Pennsylvania, with a strong presence in Centre County and surrounding communities. Final team or program placement depends on age, skill level, roster space, and coach evaluation—not every athlete is placed on the same team in the same season.",
    categorySlug: "eligibility",
    order: 0,
    visible: true,
  },
  {
    question: "How do I register for the 2026–2027 season?",
    answer:
      "Start with the registration inquiry at centralpalions.com/register. Share athlete information, program interest, and contact details. Our staff reviews each submission and follows up with tryout dates, team options, and enrollment steps. Registration is open now for the upcoming season.",
    categorySlug: "registration",
    order: 1,
    visible: true,
  },
  {
    question: "What is the registration deadline and fee policy?",
    answer:
      "Registration fees are due upon enrollment and no later than February 28, 2027. Fees are non-refundable once an athlete is placed in a program. Current individual and family pricing is listed on the Pricing page ($400 individual; $700 for two athletes; $1,050 for three from the same household).",
    categorySlug: "payments",
    order: 2,
    visible: true,
  },
  {
    question: "What is the difference between AAU, travel teams, and camps?",
    answer:
      "AAU teams represent the Lions on the AAU circuit with tournament-focused schedules. Travel teams emphasize seasonal league and tournament play with weekly practices. Camps and clinics are shorter, high-rep sessions focused on fundamentals, shooting, or youth introduction. All programs share the same character and development standards.",
    categorySlug: "programs",
    order: 3,
    visible: true,
  },
  {
    question: "Are tryouts required for every program?",
    answer:
      "Competitive teams (AAU and travel) typically require evaluation or tryout sessions so coaches can place athletes appropriately. Camps, clinics, and some development offerings may not require tryouts. When you submit a registration inquiry, we tell you exactly what is required for your athlete’s age and program interest.",
    categorySlug: "programs",
    order: 4,
    visible: true,
  },
  {
    question: "Where and when are practices held?",
    answer:
      "Practice and event locations vary by team and season but are centered in Central Pennsylvania (Centre County area). Schedules are shared after placement. Tournament weekends and travel events are communicated well in advance so families can plan.",
    categorySlug: "travel",
    order: 5,
    visible: true,
  },
  {
    question: "Does registration include uniforms and tournament travel?",
    answer:
      "The season registration fee covers academy programming, coached practices, and core team development as described on the Pricing page. Uniforms, additional gear, and tournament travel expenses may be separate depending on team level—we outline expectations during enrollment so there are no surprises.",
    categorySlug: "payments",
    order: 6,
    visible: true,
  },
  {
    question: "Can siblings enroll with a family discount?",
    answer:
      "Yes. We offer reduced total registration for two- and three-athlete households enrolling in the same season. Select the appropriate family plan when you complete enrollment with our staff after your registration inquiry is reviewed.",
    categorySlug: "payments",
    order: 7,
    visible: true,
  },
  {
    question: "What if my child is new to organized basketball?",
    answer:
      "We welcome beginners in youth development, camps, and some clinic settings. Coaches focus on footwork, ball handling, and confidence before pushing advanced concepts. Competitive travel and AAU placements expect prior playing experience or strong evaluation results—we help you find the right starting point.",
    categorySlug: "eligibility",
    order: 8,
    visible: true,
  },
  {
    question: "How does the academy support academics and character?",
    answer:
      "Lions culture is built on attitude, effort, and accountability on and off the court. Coaches reinforce classroom responsibility, respectful communication, and leadership habits. Development is not limited to game-day performance.",
    categorySlug: "programs",
    order: 9,
    visible: true,
  },
  {
    question: "How do I contact a coach about my athlete’s placement?",
    answer:
      "Call 814-500-8613, email tjandersty@gmail.com, or use the Contact page. Include your athlete’s name, grade, experience level, and programs you are interested in. We respond as quickly as possible during active registration periods.",
    categorySlug: "registration",
    order: 10,
    visible: true,
  },
  {
    question: "Can parents submit a testimonial about their experience?",
    answer:
      "Yes. Visit the Testimonials page and share your family’s story using the submission form. Submissions are reviewed before they appear publicly so we can keep the page accurate and appropriate for families.",
    categorySlug: "registration",
    order: 11,
    visible: true,
  },
];

export const defaultEvents: IEvent[] = [
  {
    title: "Season Tryout Sessions",
    slug: "season-tryouts",
    description: "Open evaluations for prospective Lions athletes. Register online to reserve your spot.",
    date: new Date("2026-03-01"),
    location: "Central Pennsylvania",
    type: "tryout",
    featured: true,
    published: true,
    registrationLink: "/register",
  },
];

export const defaultAchievements: IAchievement[] = [
  {
    title: "Committed to Central PA Youth Development",
    year: "2011–Present",
    description: "Evolving from Huntingdon Cats to Central PA Lions with community-first leadership.",
    order: 0,
    published: true,
  },
  {
    title: "Character-Driven Competitive Culture",
    description: "Athletes trained to compete with class and lead with purpose.",
    order: 1,
    published: true,
  },
];
