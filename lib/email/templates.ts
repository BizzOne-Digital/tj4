export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildBrandedEmail(options: {
  preheader: string;
  title: string;
  bodyHtml: string;
}): { html: string; text: string } {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const preheader = escapeHtml(options.preheader);
  const title = escapeHtml(options.title);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#080B2A;font-family:Arial,Helvetica,sans-serif;color:#F1F3F6;">
  <div style="display:none;max-height:0;overflow:hidden;">${preheader}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#080B2A;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#15171D;border:1px solid rgba(255,255,255,0.1);border-radius:12px;overflow:hidden;">
          <tr>
            <td style="padding:24px 28px;background:linear-gradient(135deg,#10176F,#2436D8);">
              <p style="margin:0;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.85);">Central PA Lions Academy</p>
              <h1 style="margin:8px 0 0;font-size:22px;color:#FFFFFF;text-transform:uppercase;">${title}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:28px;font-size:15px;line-height:1.6;color:#AEB4C2;">
              ${options.bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:16px 28px 24px;border-top:1px solid rgba(255,255,255,0.08);font-size:12px;color:#AEB4C2;">
              <a href="${escapeHtml(siteUrl)}" style="color:#2436D8;text-decoration:none;">centralpalions.com</a>
              · ONE TEAM. ONE GOAL. ONE PURPOSE.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = `${options.title}\n\n${options.preheader}\n\n${siteUrl}`;

  return { html, text };
}

export function registrationEmailBody(data: Record<string, unknown>): string {
  const rows = Object.entries(data)
    .map(
      ([key, val]) =>
        `<tr><td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:#AEB4C2;width:40%;vertical-align:top;">${escapeHtml(key)}</td><td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:#FFFFFF;">${escapeHtml(String(val ?? ""))}</td></tr>`
    )
    .join("");

  return `<p style="margin:0 0 16px;color:#FFFFFF;">A new registration inquiry was submitted on the website.</p>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0">${rows}</table>`;
}

export function contactEmailBody(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  inquiryType: string;
  message: string;
}): string {
  return `<p style="margin:0 0 16px;color:#FFFFFF;">New contact form message</p>
<p><strong style="color:#FFFFFF;">From:</strong> ${escapeHtml(data.name)} &lt;${escapeHtml(data.email)}&gt;</p>
${data.phone ? `<p><strong style="color:#FFFFFF;">Phone:</strong> ${escapeHtml(data.phone)}</p>` : ""}
<p><strong style="color:#FFFFFF;">Type:</strong> ${escapeHtml(data.inquiryType)}</p>
<p><strong style="color:#FFFFFF;">Subject:</strong> ${escapeHtml(data.subject)}</p>
<p style="margin-top:16px;padding:16px;background:rgba(255,255,255,0.05);border-radius:8px;color:#F1F3F6;">${escapeHtml(data.message).replace(/\n/g, "<br />")}</p>`;
}

export function testimonialEmailBody(data: {
  name: string;
  relationship: string;
  type: string;
  content: string;
  rating: number;
}): string {
  return `<p style="margin:0 0 16px;color:#FFFFFF;">New testimonial awaiting approval in admin.</p>
<p><strong style="color:#FFFFFF;">Name:</strong> ${escapeHtml(data.name)}</p>
<p><strong style="color:#FFFFFF;">Relationship:</strong> ${escapeHtml(data.relationship)}</p>
<p><strong style="color:#FFFFFF;">Type:</strong> ${escapeHtml(data.type)}</p>
<p><strong style="color:#FFFFFF;">Rating:</strong> ${data.rating}/5</p>
<p style="margin-top:16px;padding:16px;background:rgba(255,255,255,0.05);border-radius:8px;">${escapeHtml(data.content)}</p>`;
}

export function newsletterEmailBody(email: string): string {
  return `<p style="margin:0;color:#FFFFFF;">New newsletter subscriber:</p>
<p style="margin-top:8px;font-size:18px;color:#2436D8;">${escapeHtml(email)}</p>`;
}
