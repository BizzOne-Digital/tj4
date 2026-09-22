import type { ISiteSettings } from "@/models/schemas";
import { siteImages } from "@/lib/data/site-images";
import { driveManifest } from "@/lib/images/drive-assets";

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
    email: "contact@centralpalions.com",
    serviceArea: "Serving Central PA from Centre County",
    address: "7410 Sportsman Road, Alexandria, PA 16611",
  },
  social: {
    facebook: "https://www.facebook.com/share/1BmctvmxTA/?mibextid=wwXIfr",
    instagram: "https://instagram.com/centralpalions",
    twitter: "https://twitter.com/CentralPALions",
  },
  donation: {
    url: "https://centralpalions.square.site/",
    mailingInstructions:
      "Make a check or money order payable to Central PA Lions and mail to: Central PA Lions, 7410 Sportsman Road, Alexandria, PA 16611. For corporate sponsorships, email contact@centralpalions.com.",
    levels: [25, 50, 75, 100, 150, 250, 500, 1000],
  },
  registrationDeadline: "February 28, 2027",
  registrationNotice:
    "The registration fee is non-refundable and is due upon enrollment in the program and no later than February 28, 2027. As a team, we will be conducting fundraisers for our program. The fundraiser opt-out fee is a $200 non-refundable fee for student-athletes to participate in the program. Pay securely at centralpalions.square.site or mail a check payable to Central PA Lions to 7410 Sportsman Road, Alexandria, PA 16611.",
  seo: {
    defaultTitle: "Central PA Lions Academy | Youth Basketball in Central PA",
    defaultDescription:
      "TJ Anderson's Central PA Lions Academy develops K–12 student-athletes through AAU basketball, camps, clinics, and character-based coaching.",
    ogImage: "/images/arena-tunnel.jpg",
  },
  branding: { primaryColor: "#10176F", accentColor: "#2436D8" },
  heroBackgroundImage: driveManifest.welcomeHero || siteImages.hero,
  stats: [
    { label: "Years of Development", value: 14, suffix: "+" },
    { label: "Programs Offered", value: 9 },
    { label: "Grades Served", value: 13, suffix: " K–12" },
    { label: "Community Focus", value: 100, suffix: "%" },
  ],
  navigation: [
    { label: "Schedule", href: "/schedule" },
    { label: "Coaches", href: "/team" },
    { label: "About", href: "/about" },
    { label: "Join", href: "/register" },
    { label: "Gear Store", href: "/gear" },
    {
      label: "Meet the Lions",
      href: "/meet-the-lions",
      children: [
        { label: "All Seasons", href: "/meet-the-lions" },
        { label: "2025–26", href: "/meet-the-lions/2025-26" },
        { label: "2024–25", href: "/meet-the-lions/2024-25" },
        { label: "2023–24", href: "/meet-the-lions/2023-24" },
        { label: "2022–23", href: "/meet-the-lions/2022-23" },
        { label: "2021–22", href: "/meet-the-lions/2021-22" },
        { label: "2020–21", href: "/meet-the-lions/2020-21" },
      ],
    },
    {
      label: "More",
      href: "#",
      children: [
        { label: "Tryouts", href: "/tryouts" },
        { label: "Programs", href: "/programs" },
        { label: "Cash Bash Event", href: "/cash-bash" },
        { label: "Fundraising", href: "/fundraising" },
        { label: "Championship Teams", href: "/championships" },
        { label: "Articles through the years", href: "/articles" },
        { label: "Alumni", href: "/alumni" },
        { label: "Pricing", href: "/pricing" },
        { label: "Contact Us", href: "/contact" },
        { label: "News", href: "/news" },
        { label: "FAQ", href: "/faq" },
        { label: "Testimonials", href: "/testimonials" },
      ],
    },
  ],
  footerColumns: [
    {
      title: "Academy",
      links: [
        { label: "About", href: "/about" },
        { label: "Meet the Coaches", href: "/team" },
        { label: "Programs", href: "/programs" },
        { label: "Join Our Team", href: "/register" },
        { label: "Gear Store", href: "/gear" },
      ],
    },
    {
      title: "Season",
      links: [
        { label: "Schedule", href: "/schedule" },
        { label: "Tryouts", href: "/tryouts" },
        { label: "Meet the Lions", href: "/meet-the-lions" },
        { label: "Championship Teams", href: "/championships" },
        { label: "Articles through the years", href: "/articles" },
        { label: "Alumni", href: "/alumni" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Cash Bash Event", href: "/cash-bash" },
        { label: "Fundraising", href: "/fundraising" },
        { label: "Donate", href: "/donate" },
        { label: "Pricing", href: "/pricing" },
        { label: "Contact Us", href: "/contact" },
      ],
    },
  ],
};
