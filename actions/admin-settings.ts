"use server";

import { redirect } from "next/navigation";
import { connectDB, isDbConfigured } from "@/lib/db/mongodb";
import { SiteSettings, ActivityLog, type ISiteSettings } from "@/models/schemas";
import { requireAdmin } from "@/lib/auth/session";
import { defaultSiteSettings } from "@/lib/data/defaults";
import { revalidatePublicSite } from "@/lib/revalidate/public-site";

async function log(userId: string, userEmail: string, action: string) {
  if (!isDbConfigured()) return;
  await ActivityLog.create({ userId, userEmail, action });
}

function leanSettings(doc: unknown): ISiteSettings {
  return JSON.parse(JSON.stringify(doc)) as ISiteSettings;
}

export async function updateSiteSettings(formData: FormData): Promise<void> {
  const session = await requireAdmin();
  if (!isDbConfigured()) {
    redirect("/admin/settings?error=db");
  }

  await connectDB();
  const existingDoc = await SiteSettings.findOne().lean();
  const existing = existingDoc ? leanSettings(existingDoc) : defaultSiteSettings;

  const heroFromForm = String(formData.get("heroBackgroundImage") ?? "").trim();

  const payload: Omit<ISiteSettings, "_id"> = {
    siteName: String(formData.get("siteName") || existing.siteName),
    tagline: String(formData.get("tagline") || existing.tagline),
    motto: String(formData.get("motto") || existing.motto),
    mission: String(formData.get("mission") || existing.mission),
    vision: String(formData.get("vision") || existing.vision),
    heroBackgroundImage:
      heroFromForm || existing.heroBackgroundImage || defaultSiteSettings.heroBackgroundImage,
    registrationDeadline: String(formData.get("registrationDeadline") || existing.registrationDeadline),
    registrationNotice: String(formData.get("registrationNotice") || existing.registrationNotice),
    announcementBar: {
      enabled: formData.get("announcementEnabled") === "on",
      text: String(formData.get("announcementText") || ""),
      link: String(formData.get("announcementLink") || ""),
    },
    contact: {
      name: String(formData.get("contactName") || existing.contact.name),
      phone: String(formData.get("contactPhone") || existing.contact.phone),
      email: String(formData.get("contactEmail") || existing.contact.email),
      serviceArea: String(formData.get("serviceArea") || existing.contact.serviceArea),
      mapEmbedUrl: String(formData.get("mapEmbedUrl") || existing.contact.mapEmbedUrl || ""),
    },
    donation: {
      url: String(formData.get("donationUrl") || existing.donation.url),
      mailingInstructions: String(
        formData.get("mailingInstructions") || existing.donation.mailingInstructions || ""
      ),
      levels: existing.donation.levels?.length ? existing.donation.levels : defaultSiteSettings.donation.levels,
    },
    navigation: existing.navigation?.length ? existing.navigation : defaultSiteSettings.navigation,
    footerColumns: existing.footerColumns?.length ? existing.footerColumns : defaultSiteSettings.footerColumns,
    seo: existing.seo || defaultSiteSettings.seo,
    branding: existing.branding || defaultSiteSettings.branding,
    stats: existing.stats?.length ? existing.stats : defaultSiteSettings.stats,
    social: existing.social || defaultSiteSettings.social,
  };

  await SiteSettings.findOneAndUpdate({}, payload, { upsert: true, new: true });
  await log(session.user.id, session.user.email || "", "Updated site settings");
  revalidatePublicSite();
  redirect("/admin/settings?saved=1");
}

export async function uploadMediaAction() {
  return { ok: false, error: "Use POST /api/upload with multipart form while signed in." };
}
