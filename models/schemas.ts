import { Schema, models, model, type Model } from "mongoose";

export interface IAdminUser {
  _id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: "super_admin" | "editor";
}

const AdminUserSchema = new Schema<IAdminUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, enum: ["super_admin", "editor"], default: "editor" },
  },
  { timestamps: true }
);

export const AdminUser: Model<IAdminUser> =
  models.AdminUser || model<IAdminUser>("AdminUser", AdminUserSchema);

export interface ISiteSettings {
  _id: string;
  siteName: string;
  tagline: string;
  motto: string;
  mission: string;
  vision: string;
  announcementBar: { enabled: boolean; text: string; link?: string };
  contact: {
    name: string;
    phone: string;
    email: string;
    serviceArea: string;
    address?: string;
    mapEmbedUrl?: string;
  };
  social: { facebook?: string; instagram?: string; twitter?: string };
  donation: { url: string; mailingInstructions?: string; levels: number[] };
  registrationDeadline: string;
  registrationNotice: string;
  seo: { defaultTitle: string; defaultDescription: string; ogImage?: string };
  branding: { primaryColor: string; accentColor: string };
  footerColumns: { title: string; links: { label: string; href: string }[] }[];
  navigation: { label: string; href: string; children?: { label: string; href: string }[] }[];
  heroBackgroundImage?: string;
  stats?: { label: string; value: number; suffix?: string }[];
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    siteName: String,
    tagline: String,
    motto: String,
    mission: String,
    vision: String,
    announcementBar: {
      enabled: { type: Boolean, default: true },
      text: String,
      link: String,
    },
    contact: {
      name: String,
      phone: String,
      email: String,
      serviceArea: String,
      address: String,
      mapEmbedUrl: String,
    },
    social: { facebook: String, instagram: String, twitter: String },
    donation: { url: String, mailingInstructions: String, levels: [Number] },
    registrationDeadline: String,
    registrationNotice: String,
    seo: { defaultTitle: String, defaultDescription: String, ogImage: String },
    branding: { primaryColor: String, accentColor: String },
    footerColumns: [{ title: String, links: [{ label: String, href: String }] }],
    navigation: [
      { label: String, href: String, children: [{ label: String, href: String }] },
    ],
    heroBackgroundImage: String,
    stats: [{ label: String, value: Number, suffix: String }],
  },
  { timestamps: true }
);

export const SiteSettings: Model<ISiteSettings> =
  models.SiteSettings || model<ISiteSettings>("SiteSettings", SiteSettingsSchema);

export interface IPage {
  slug: string;
  title: string;
  description: string;
  hero: {
    eyebrow?: string;
    heading: string;
    subheading?: string;
    image?: string;
    imageAlt?: string;
    ctaPrimary?: { label: string; href: string };
    ctaSecondary?: { label: string; href: string };
  };
  seo: { title?: string; description?: string; canonical?: string };
  published: boolean;
}

const PageSchema = new Schema<IPage>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: String,
    description: String,
    hero: {
      eyebrow: String,
      heading: String,
      subheading: String,
      image: String,
      imageAlt: String,
      ctaPrimary: { label: String, href: String },
      ctaSecondary: { label: String, href: String },
    },
    seo: { title: String, description: String, canonical: String },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Page: Model<IPage> = models.Page || model<IPage>("Page", PageSchema);

export interface IPageSection {
  pageSlug: string;
  key: string;
  type: string;
  title?: string;
  subtitle?: string;
  content?: string;
  data?: Record<string, unknown>;
  image?: string;
  imageAlt?: string;
  order: number;
  visible: boolean;
}

const PageSectionSchema = new Schema<IPageSection>(
  {
    pageSlug: { type: String, required: true, index: true },
    key: { type: String, required: true },
    type: String,
    title: String,
    subtitle: String,
    content: String,
    data: Schema.Types.Mixed,
    image: String,
    imageAlt: String,
    order: { type: Number, default: 0 },
    visible: { type: Boolean, default: true },
  },
  { timestamps: true }
);

PageSectionSchema.index({ pageSlug: 1, key: 1 }, { unique: true });

export const PageSection: Model<IPageSection> =
  models.PageSection || model<IPageSection>("PageSection", PageSectionSchema);

export interface IProgram {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  ageRange?: string;
  skillLevel?: string;
  schedule?: string;
  location?: string;
  price?: string;
  registrationLink?: string;
  featured: boolean;
  active: boolean;
  order: number;
}

const ProgramSchema = new Schema<IProgram>(
  {
    slug: { type: String, unique: true, required: true, index: true },
    title: { type: String, required: true },
    shortDescription: String,
    fullDescription: String,
    featuredImage: String,
    featuredImageAlt: String,
    ageRange: String,
    skillLevel: String,
    schedule: String,
    location: String,
    price: String,
    registrationLink: String,
    featured: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Program: Model<IProgram> =
  models.Program || model<IProgram>("Program", ProgramSchema);

export interface IPricingPlan {
  name: string;
  price: number;
  description: string;
  features: string[];
  order: number;
  active: boolean;
}

const PricingPlanSchema = new Schema<IPricingPlan>(
  {
    name: String,
    price: Number,
    description: String,
    features: [String],
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const PricingPlan: Model<IPricingPlan> =
  models.PricingPlan || model<IPricingPlan>("PricingPlan", PricingPlanSchema);

export interface ICoach {
  name: string;
  title: string;
  bio: string;
  credentials?: string;
  experience?: string;
  photo?: string;
  photoAlt?: string;
  social?: { facebook?: string; instagram?: string; twitter?: string };
  featured: boolean;
  order: number;
  published: boolean;
}

const CoachSchema = new Schema<ICoach>(
  {
    name: String,
    title: String,
    bio: String,
    credentials: String,
    experience: String,
    photo: String,
    photoAlt: String,
    social: { facebook: String, instagram: String, twitter: String },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Coach: Model<ICoach> = models.Coach || model<ICoach>("Coach", CoachSchema);

export interface ITestimonial {
  _id?: string;
  name: string;
  relationship: string;
  type: "parent" | "athlete" | "alumni";
  content: string;
  rating: number;
  image?: string;
  videoUrl?: string;
  featured: boolean;
  approved: boolean;
  order: number;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name: String,
    relationship: String,
    type: { type: String, enum: ["parent", "athlete", "alumni"], default: "parent" },
    content: String,
    rating: { type: Number, min: 1, max: 5, default: 5 },
    image: String,
    videoUrl: String,
    featured: { type: Boolean, default: false },
    approved: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Testimonial: Model<ITestimonial> =
  models.Testimonial || model<ITestimonial>("Testimonial", TestimonialSchema);

export interface IBlogCategory {
  name: string;
  slug: string;
  order: number;
}

const BlogCategorySchema = new Schema<IBlogCategory>(
  { name: String, slug: { type: String, unique: true, index: true }, order: { type: Number, default: 0 } },
  { timestamps: true }
);

export const BlogCategory: Model<IBlogCategory> =
  models.BlogCategory || model<IBlogCategory>("BlogCategory", BlogCategorySchema);

export interface IBlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  categorySlug?: string;
  author: string;
  published: boolean;
  featured: boolean;
  publishedAt?: Date;
  seo?: { title?: string; description?: string };
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: String,
    slug: { type: String, unique: true, index: true },
    excerpt: String,
    content: String,
    featuredImage: String,
    featuredImageAlt: String,
    categorySlug: String,
    author: String,
    published: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
    publishedAt: Date,
    seo: { title: String, description: String },
  },
  { timestamps: true }
);

export const BlogPost: Model<IBlogPost> =
  models.BlogPost || model<IBlogPost>("BlogPost", BlogPostSchema);

export interface IFAQCategory {
  name: string;
  slug: string;
  order: number;
}

const FAQCategorySchema = new Schema<IFAQCategory>(
  { name: String, slug: { type: String, unique: true }, order: { type: Number, default: 0 } },
  { timestamps: true }
);

export const FAQCategory: Model<IFAQCategory> =
  models.FAQCategory || model<IFAQCategory>("FAQCategory", FAQCategorySchema);

export interface IFAQ {
  question: string;
  answer: string;
  categorySlug: string;
  order: number;
  visible: boolean;
}

const FAQSchema = new Schema<IFAQ>(
  {
    question: String,
    answer: String,
    categorySlug: { type: String, index: true },
    order: { type: Number, default: 0 },
    visible: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const FAQ: Model<IFAQ> = models.FAQ || model<IFAQ>("FAQ", FAQSchema);

export interface IEvent {
  title: string;
  slug: string;
  description: string;
  date: Date;
  endDate?: Date;
  location?: string;
  type: "tryout" | "tournament" | "camp" | "general";
  featured: boolean;
  published: boolean;
  registrationLink?: string;
}

const EventSchema = new Schema<IEvent>(
  {
    title: String,
    slug: { type: String, unique: true },
    description: String,
    date: Date,
    endDate: Date,
    location: String,
    type: { type: String, enum: ["tryout", "tournament", "camp", "general"], default: "general" },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
    registrationLink: String,
  },
  { timestamps: true }
);

export const Event: Model<IEvent> = models.Event || model<IEvent>("Event", EventSchema);

export interface IAchievement {
  title: string;
  year?: string;
  description?: string;
  order: number;
  published: boolean;
}

const AchievementSchema = new Schema<IAchievement>(
  {
    title: String,
    year: String,
    description: String,
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Achievement: Model<IAchievement> =
  models.Achievement || model<IAchievement>("Achievement", AchievementSchema);

export interface IGalleryAlbum {
  title: string;
  slug: string;
  description?: string;
  coverImage?: string;
  order: number;
  published: boolean;
}

const GalleryAlbumSchema = new Schema<IGalleryAlbum>(
  {
    title: String,
    slug: { type: String, unique: true },
    description: String,
    coverImage: String,
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const GalleryAlbum: Model<IGalleryAlbum> =
  models.GalleryAlbum || model<IGalleryAlbum>("GalleryAlbum", GalleryAlbumSchema);

export interface IGalleryImage {
  albumSlug: string;
  url: string;
  alt?: string;
  order: number;
}

const GalleryImageSchema = new Schema<IGalleryImage>(
  {
    albumSlug: { type: String, index: true },
    url: String,
    alt: String,
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const GalleryImage: Model<IGalleryImage> =
  models.GalleryImage || model<IGalleryImage>("GalleryImage", GalleryImageSchema);

export interface ISponsor {
  name: string;
  logo?: string;
  url?: string;
  order: number;
  published: boolean;
}

const SponsorSchema = new Schema<ISponsor>(
  {
    name: String,
    logo: String,
    url: String,
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Sponsor: Model<ISponsor> =
  models.Sponsor || model<ISponsor>("Sponsor", SponsorSchema);

export interface IRegistration {
  _id?: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  athleteName: string;
  athleteDob: string;
  grade: string;
  gender?: string;
  school?: string;
  programInterest: string;
  experienceLevel?: string;
  preferredSession?: string;
  medicalNotes?: string;
  emergencyContact: string;
  emergencyPhone: string;
  message?: string;
  consent: boolean;
  status: "new" | "reviewing" | "contacted" | "enrolled" | "declined";
  adminNotes?: string;
}

const RegistrationSchema = new Schema<IRegistration>(
  {
    parentName: String,
    parentEmail: String,
    parentPhone: String,
    athleteName: String,
    athleteDob: String,
    grade: String,
    gender: String,
    school: String,
    programInterest: String,
    experienceLevel: String,
    preferredSession: String,
    medicalNotes: String,
    emergencyContact: String,
    emergencyPhone: String,
    message: String,
    consent: Boolean,
    status: {
      type: String,
      enum: ["new", "reviewing", "contacted", "enrolled", "declined"],
      default: "new",
    },
    adminNotes: String,
  },
  { timestamps: true }
);

export const Registration: Model<IRegistration> =
  models.Registration || model<IRegistration>("Registration", RegistrationSchema);

export interface IContactMessage {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  inquiryType: string;
  message: string;
  read: boolean;
}

const ContactMessageSchema = new Schema<IContactMessage>(
  {
    name: String,
    email: String,
    phone: String,
    subject: String,
    inquiryType: String,
    message: String,
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const ContactMessage: Model<IContactMessage> =
  models.ContactMessage || model<IContactMessage>("ContactMessage", ContactMessageSchema);

export interface INewsletterSubscriber {
  email: string;
  active: boolean;
}

const NewsletterSubscriberSchema = new Schema<INewsletterSubscriber>(
  {
    email: { type: String, unique: true, lowercase: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const NewsletterSubscriber: Model<INewsletterSubscriber> =
  models.NewsletterSubscriber ||
  model<INewsletterSubscriber>("NewsletterSubscriber", NewsletterSubscriberSchema);

export interface IMediaAsset {
  url: string;
  publicId?: string;
  alt?: string;
  width?: number;
  height?: number;
  bytes?: number;
  folder?: string;
}

const MediaAssetSchema = new Schema<IMediaAsset>(
  {
    url: String,
    publicId: String,
    alt: String,
    width: Number,
    height: Number,
    bytes: Number,
    folder: String,
  },
  { timestamps: true }
);

export const MediaAsset: Model<IMediaAsset> =
  models.MediaAsset || model<IMediaAsset>("MediaAsset", MediaAssetSchema);

export interface IStoredUpload {
  folder: string;
  filename: string;
  mimeType: string;
  size: number;
  data: Buffer;
}

const StoredUploadSchema = new Schema<IStoredUpload>(
  {
    folder: { type: String, required: true, index: true },
    filename: { type: String, required: true, index: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    data: { type: Buffer, required: true },
  },
  { timestamps: true }
);

StoredUploadSchema.index({ folder: 1, filename: 1 }, { unique: true });

export const StoredUpload: Model<IStoredUpload> =
  models.StoredUpload || model<IStoredUpload>("StoredUpload", StoredUploadSchema);

export interface IActivityLog {
  userId: string;
  userEmail: string;
  action: string;
  entity?: string;
  entityId?: string;
  details?: string;
}

const ActivityLogSchema = new Schema<IActivityLog>(
  {
    userId: String,
    userEmail: String,
    action: String,
    entity: String,
    entityId: String,
    details: String,
  },
  { timestamps: true }
);

export const ActivityLog: Model<IActivityLog> =
  models.ActivityLog || model<IActivityLog>("ActivityLog", ActivityLogSchema);
