import type { ISiteSettings } from "@/models/schemas";
import { siteImages } from "@/lib/data/site-images";

export const defaultSiteSettings: ISiteSettings = {
  _id: "default",
  siteName: "TJ Anderson's Central PA Lions Academy",
  tagline: "Serving Central PA from Centre County",
  motto: "ONE TEAM. ONE GOAL. ONE PURPOSE.",
  mission:
    "Our mission is to build fundamentally sound, high-IQ athletes through intentional skill development, competitive training, and character-based coaching — preparing every Lion to excel on the court and succeed beyond it.",
  vision:
    "Our vision is to build an excellent youth basketball program in Central PA. We are committed to investing in athletics, academics, character, teamwork, and leadership while competing with class.",
  announcementBar: {
    enabled: true,
    text: "2026–2027 Tryout Registration Now Open",
    link: "/register",
  },
  contact: {
    name: "TJ Anderson",
    phone: "814-500-8613",
    email: "tjandersty@gmail.com",
    serviceArea: "Central Pennsylvania — Centre County and surrounding communities",
  },
  social: {
    facebook: "https://www.facebook.com/share/1BmctvmxTA/?mibextid=wwXIfr",
    instagram: "https://instagram.com/centralpalions",
    twitter: "https://twitter.com/CentralPALions",
  },
  donation: {
    url: "https://www.centralpalions.com/donate",
    mailingInstructions: "Contact the academy for mailing instructions for offline donations.",
    levels: [25, 50, 75, 100, 150, 250, 500, 1000],
  },
  registrationDeadline: "February 28, 2027",
  registrationNotice:
    "The registration fee is non-refundable and is due upon enrollment in the program and no later than February 28, 2027.",
  seo: {
    defaultTitle: "Central PA Lions Academy | Youth Basketball in Central PA",
    defaultDescription:
      "TJ Anderson's Central PA Lions Academy develops K–12 student-athletes through AAU basketball, camps, clinics, and character-based coaching.",
    ogImage: "/images/arena-tunnel.jpg",
  },
  branding: { primaryColor: "#10176F", accentColor: "#2436D8" },
  heroBackgroundImage: siteImages.hero,
  stats: [
    { label: "Years of Development", value: 14, suffix: "+" },
    { label: "Programs Offered", value: 9 },
    { label: "Grades Served", value: 13, suffix: " K–12" },
    { label: "Community Focus", value: 100, suffix: "%" },
  ],
  navigation: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Programs", href: "/programs" },
    { label: "Pricing", href: "/pricing" },
    { label: "Team", href: "/team" },
    { label: "News", href: "/news" },
    {
      label: "More",
      href: "#",
      children: [
        { label: "Testimonials", href: "/testimonials" },
        { label: "FAQ", href: "/faq" },
        { label: "Support", href: "/donate" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ],
  footerColumns: [
    {
      title: "Academy",
      links: [
        { label: "About", href: "/about" },
        { label: "Programs", href: "/programs" },
        { label: "Pricing", href: "/pricing" },
        { label: "Register", href: "/register" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "News", href: "/news" },
        { label: "FAQ", href: "/faq" },
        { label: "Testimonials", href: "/testimonials" },
        { label: "Support", href: "/donate" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ],
};
