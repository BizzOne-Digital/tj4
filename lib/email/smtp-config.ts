export type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  auth: { user: string; pass: string };
  from: string;
};

/**
 * Resolves SMTP settings from env.
 * Gmail shortcut: set SMTP_USER + SMTP_PASSWORD (App Password) — host defaults to smtp.gmail.com.
 * Legacy: GMAIL_USER + GMAIL_APP_PASSWORD still work.
 */
export function getSmtpConfig(): SmtpConfig | null {
  const user = process.env.SMTP_USER?.trim() || process.env.GMAIL_USER?.trim();
  const pass = process.env.SMTP_PASSWORD?.trim() || process.env.GMAIL_APP_PASSWORD?.trim();

  if (!user || !pass) {
    return null;
  }

  const host =
    process.env.SMTP_HOST?.trim() ||
    (process.env.GMAIL_USER || process.env.SMTP_USER ? "smtp.gmail.com" : "");

  if (!host) {
    return null;
  }

  const port = Number(process.env.SMTP_PORT || (process.env.SMTP_SECURE === "true" ? 465 : 587));
  const secure =
    process.env.SMTP_SECURE === "true" || (process.env.SMTP_SECURE !== "false" && port === 465);

  const from =
    process.env.SMTP_FROM?.trim() || `Central PA Lions Academy <${user}>`;

  return {
    host,
    port,
    secure,
    auth: { user, pass },
    from,
  };
}

export function isEmailConfigured(): boolean {
  return getSmtpConfig() !== null;
}

export function getContactReceiver(): string {
  return process.env.CONTACT_RECEIVER_EMAIL?.trim() || "tjandersty@gmail.com";
}
