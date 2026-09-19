"use server";

import { z } from "zod";
import { connectDB, isDbConfigured } from "@/lib/db/mongodb";
import {
  Registration,
  ContactMessage,
  NewsletterSubscriber,
  Testimonial,
} from "@/models/schemas";
import {
  sendEmail,
  getContactReceiver,
  isEmailConfigured,
} from "@/lib/email/mailer";
import {
  registrationEmailBody,
  contactEmailBody,
  testimonialEmailBody,
  newsletterEmailBody,
} from "@/lib/email/templates";
import { revalidatePath } from "next/cache";

import type { SendEmailResult } from "@/lib/email/mailer";

function emailFailedMessage(result: SendEmailResult): string | null {
  if (result.ok) return null;
  if ("skipped" in result && result.skipped) return null;
  return "error" in result ? result.error : "Email failed";
}

const registrationSchema = z.object({
  parentName: z.string().min(2),
  parentEmail: z.string().email(),
  parentPhone: z.string().min(7),
  athleteName: z.string().min(2),
  athleteDob: z.string().min(4),
  grade: z.string().min(1),
  gender: z.string().optional(),
  school: z.string().optional(),
  programInterest: z.string().min(2),
  experienceLevel: z.string().optional(),
  preferredSession: z.string().optional(),
  medicalNotes: z.string().optional(),
  emergencyContact: z.string().min(2),
  emergencyPhone: z.string().min(7),
  message: z.string().optional(),
  consent: z.literal(true),
});

export async function submitRegistration(data: unknown) {
  const parsed = registrationSchema.safeParse(data);
  if (!parsed.success) {
    return { ok: false as const, error: "Please complete all required fields." };
  }

  if (isDbConfigured()) {
    await connectDB();
    await Registration.create(parsed.data);
  }

  const emailResult = await sendEmail({
    to: getContactReceiver(),
    subject: `[Lions] Registration inquiry — ${parsed.data.athleteName}`,
    preheader: `New inquiry from ${parsed.data.parentName}`,
    title: "Registration Inquiry",
    replyTo: parsed.data.parentEmail,
    html: registrationEmailBody(parsed.data as unknown as Record<string, unknown>),
  });

  const emailError = emailFailedMessage(emailResult);
  if (emailError && isEmailConfigured()) {
    return {
      ok: false as const,
      error: "Your inquiry was saved, but we could not send the notification email. Please call the academy directly.",
    };
  }

  revalidatePath("/admin/registrations");
  return { ok: true as const };
}

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(3),
  inquiryType: z.string().min(2),
  message: z.string().min(10),
});

export async function submitContact(data: unknown) {
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return { ok: false as const, error: "Invalid contact form submission." };
  }

  if (isDbConfigured()) {
    await connectDB();
    await ContactMessage.create(parsed.data);
  }

  const emailResult = await sendEmail({
    to: getContactReceiver(),
    subject: `[Lions] Contact — ${parsed.data.subject}`,
    preheader: `Message from ${parsed.data.name}`,
    title: "Contact Form",
    replyTo: parsed.data.email,
    html: contactEmailBody(parsed.data),
  });

  const emailError = emailFailedMessage(emailResult);
  if (emailError && isEmailConfigured()) {
    return { ok: false as const, error: "Message saved, but email failed to send. Please try calling us." };
  }

  revalidatePath("/admin/messages");
  return { ok: true as const };
}

const newsletterSchema = z.object({ email: z.string().email() });

export async function submitNewsletter(data: unknown) {
  const parsed = newsletterSchema.safeParse(data);
  if (!parsed.success) return { ok: false as const, error: "Enter a valid email." };

  if (isDbConfigured()) {
    await connectDB();
    await NewsletterSubscriber.updateOne(
      { email: parsed.data.email.toLowerCase() },
      { email: parsed.data.email.toLowerCase(), active: true },
      { upsert: true }
    );
  }

  await sendEmail({
    subject: "[Lions] New newsletter subscriber",
    title: "Newsletter",
    html: newsletterEmailBody(parsed.data.email),
  });

  revalidatePath("/admin/newsletter");
  return { ok: true as const };
}

const testimonialSchema = z.object({
  name: z.string().min(2),
  relationship: z.string().min(2),
  type: z.enum(["parent", "athlete", "alumni"]),
  content: z.string().min(20),
  rating: z.coerce.number().min(1).max(5),
});

export async function submitTestimonial(data: unknown) {
  const parsed = testimonialSchema.safeParse(data);
  if (!parsed.success) return { ok: false as const, error: "Please share a bit more detail." };

  if (isDbConfigured()) {
    await connectDB();
    await Testimonial.create({ ...parsed.data, approved: false, featured: false, order: 999 });
  }

  await sendEmail({
    subject: "[Lions] Testimonial pending approval",
    title: "New Testimonial",
    html: testimonialEmailBody(parsed.data),
  });

  revalidatePath("/admin/testimonials");
  return { ok: true as const, message: "Thank you! Your testimonial will appear after staff approval." };
}
