import nodemailer, { type Transporter } from "nodemailer";
import { getSmtpConfig, getContactReceiver, isEmailConfigured } from "@/lib/email/smtp-config";
import { buildBrandedEmail } from "@/lib/email/templates";

let transporterPromise: Promise<Transporter> | null = null;

async function getTransporter(): Promise<Transporter> {
  const config = getSmtpConfig();
  if (!config) {
    throw new Error("SMTP is not configured");
  }

  if (!transporterPromise) {
    transporterPromise = (async () => {
      const transporter = nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: config.secure,
        auth: config.auth,
        requireTLS: !config.secure && config.port === 587,
        tls: {
          minVersion: "TLSv1.2",
          rejectUnauthorized: process.env.SMTP_TLS_REJECT_UNAUTHORIZED !== "false",
        },
      });
      await transporter.verify();
      return transporter;
    })();
  }

  return transporterPromise;
}

export type SendEmailResult =
  | { ok: true }
  | { ok: false; skipped: true }
  | { ok: false; error: string };

export async function sendEmail(options: {
  to?: string;
  subject: string;
  preheader?: string;
  title?: string;
  html: string;
  text?: string;
  replyTo?: string;
}): Promise<SendEmailResult> {
  const config = getSmtpConfig();
  if (!config) {
    console.warn("[email] SMTP not configured — skipping:", options.subject);
    return { ok: false, skipped: true };
  }

  const to = options.to || getContactReceiver();

  try {
    const transporter = await getTransporter();
    const wrapped = buildBrandedEmail({
      preheader: options.preheader || options.subject,
      title: options.title || options.subject,
      bodyHtml: options.html,
    });

    await transporter.sendMail({
      from: config.from,
      to,
      subject: options.subject,
      html: wrapped.html,
      text: options.text || wrapped.text,
      replyTo: options.replyTo,
    });

    return { ok: true };
  } catch (err) {
    transporterPromise = null;
    const message = err instanceof Error ? err.message : "Unknown SMTP error";
    console.error("[email] Send failed:", message);
    return { ok: false, error: message };
  }
}

export async function sendTestEmail(to?: string): Promise<SendEmailResult> {
  return sendEmail({
    to: to || getContactReceiver(),
    subject: "Central PA Lions — SMTP test",
    preheader: "If you received this, SMTP is working.",
    title: "SMTP Test",
    html: `<p style="margin:0;color:#FFFFFF;">Your SMTP configuration is working correctly.</p>
<p style="margin-top:12px;color:#AEB4C2;">Sent at ${new Date().toISOString()}</p>`,
  });
}

export { getContactReceiver, isEmailConfigured };
