"use server";

import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/session";
import { sendTestEmail, isEmailConfigured } from "@/lib/email/mailer";

export async function sendSmtpTestEmail(formData: FormData): Promise<void> {
  await requireAdmin();

  if (!isEmailConfigured()) {
    redirect("/admin/settings?smtp=missing");
  }

  const to = String(formData.get("to") || "").trim();
  const result = await sendTestEmail(to || undefined);

  if (result.ok) {
    redirect("/admin/settings?smtp=ok");
  }

  const message = "error" in result ? result.error : "unknown";
  redirect(`/admin/settings?smtp=error&msg=${encodeURIComponent(message)}`);
}
