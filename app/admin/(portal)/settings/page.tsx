import { requireAdmin } from "@/lib/auth/session";
import { getSiteSettings } from "@/lib/data/queries";
import { updateSiteSettings } from "@/actions/admin-settings";
import { sendSmtpTestEmail } from "@/actions/test-email";
import { LocalImageField } from "@/components/admin/LocalImageField";
import { AdminActionNotice } from "@/components/admin/AdminActionNotice";
import { isEmailConfigured } from "@/lib/email/mailer";

type Props = { searchParams: Promise<{ smtp?: string; msg?: string; saved?: string; error?: string }> };

export default async function AdminSettingsPage({ searchParams }: Props) {
  await requireAdmin();
  const settings = await getSiteSettings();
  const params = await searchParams;
  const smtpReady = isEmailConfigured();

  return (
    <div>
      <h2 className="mb-6 text-3xl uppercase">Site Settings</h2>
      <AdminActionNotice saved={params.saved === "1"} error={params.error} />
      <form action={updateSiteSettings} className="max-w-3xl space-y-4">
        <Field label="Site Name" name="siteName" defaultValue={settings.siteName} />
        <Field label="Tagline" name="tagline" defaultValue={settings.tagline} />
        <Field label="Motto" name="motto" defaultValue={settings.motto} />
        <TextArea label="Mission" name="mission" defaultValue={settings.mission} />
        <TextArea label="Vision" name="vision" defaultValue={settings.vision} />
        <LocalImageField
          name="heroBackgroundImage"
          folder="pages"
          label="Hero Background Image"
          defaultValue={settings.heroBackgroundImage}
        />
        <Field label="Registration Deadline" name="registrationDeadline" defaultValue={settings.registrationDeadline} />
        <TextArea label="Registration Notice" name="registrationNotice" defaultValue={settings.registrationNotice} />
        <Field label="Donation URL" name="donationUrl" defaultValue={settings.donation.url} />
        <TextArea label="Mailing Instructions" name="mailingInstructions" defaultValue={settings.donation.mailingInstructions} />
        <div className="rounded-xl border border-white/10 p-4 space-y-3">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="announcementEnabled" defaultChecked={settings.announcementBar.enabled} />
            Enable announcement bar
          </label>
          <Field label="Announcement Text" name="announcementText" defaultValue={settings.announcementBar.text} />
          <Field label="Announcement Link" name="announcementLink" defaultValue={settings.announcementBar.link} />
        </div>
        <Field label="Contact Name" name="contactName" defaultValue={settings.contact.name} />
        <Field label="Contact Phone" name="contactPhone" defaultValue={settings.contact.phone} />
        <Field label="Contact Email" name="contactEmail" defaultValue={settings.contact.email} />
        <Field label="Service Area" name="serviceArea" defaultValue={settings.contact.serviceArea} />
        <Field label="Google Map Embed URL" name="mapEmbedUrl" defaultValue={settings.contact.mapEmbedUrl} />
        <button type="submit" className="rounded-lg bg-electric px-6 py-3 text-sm font-semibold uppercase">
          Save Settings
        </button>
      </form>
      <UploadPanel />
      <SmtpPanel configured={smtpReady} smtpStatus={params.smtp} smtpMessage={params.msg} />
    </div>
  );
}

function Field({ label, name, defaultValue }: { label: string; name: string; defaultValue?: string }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-steel">{label}</span>
      <input name={name} defaultValue={defaultValue} className="field" />
    </label>
  );
}

function TextArea({ label, name, defaultValue }: { label: string; name: string; defaultValue?: string }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-steel">{label}</span>
      <textarea name={name} defaultValue={defaultValue} rows={4} className="field" />
    </label>
  );
}

function UploadPanel() {
  return (
    <div className="mt-12 max-w-xl rounded-xl border border-white/10 p-6">
      <h3 className="text-xl uppercase">Media Upload</h3>
      <p className="mt-2 text-sm text-steel">
        Images are stored in MongoDB and served from <code className="text-white">/api/uploads/…</code> (works on
        Vercel). Upload an image, then click <strong className="text-white">Save Settings</strong> so the homepage and
        hero update.
      </p>
    </div>
  );
}

function SmtpPanel({
  configured,
  smtpStatus,
  smtpMessage,
}: {
  configured: boolean;
  smtpStatus?: string;
  smtpMessage?: string;
}) {
  return (
    <div className="mt-8 max-w-xl rounded-xl border border-white/10 p-6">
      <h3 className="text-xl uppercase">Email (SMTP)</h3>
      <p className="mt-2 text-sm text-steel">
        Configure <code className="text-white">SMTP_*</code> variables in <code className="text-white">.env.local</code>{" "}
        (Gmail: App Password on port 587). Notifications go to{" "}
        <code className="text-white">CONTACT_RECEIVER_EMAIL</code>.
      </p>
      <p className={`mt-3 text-sm ${configured ? "text-green-400" : "text-amber-400"}`}>
        Status: {configured ? "SMTP credentials detected" : "Not configured — emails will be skipped"}
      </p>
      {smtpStatus === "ok" && (
        <p className="mt-2 text-sm text-green-400">Test email sent successfully.</p>
      )}
      {smtpStatus === "missing" && (
        <p className="mt-2 text-sm text-amber-400">Add SMTP_USER and SMTP_PASSWORD before testing.</p>
      )}
      {smtpStatus === "error" && (
        <p className="mt-2 text-sm text-red-400">Test failed: {smtpMessage || "Unknown error"}</p>
      )}
      <form action={sendSmtpTestEmail} className="mt-4 flex flex-wrap gap-3">
        <input
          name="to"
          type="email"
          placeholder="Optional test recipient (default: CONTACT_RECEIVER)"
          className="field min-w-[240px] flex-1"
        />
        <button
          type="submit"
          disabled={!configured}
          className="rounded-lg bg-electric px-4 py-2 text-sm font-semibold uppercase disabled:opacity-40"
        >
          Send test email
        </button>
      </form>
    </div>
  );
}
