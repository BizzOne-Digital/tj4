import { readFileSync } from "fs";
import { resolve } from "path";
import { sendTestEmail, isEmailConfigured } from "../lib/email/mailer";

function loadEnvLocal() {
  const path = resolve(process.cwd(), ".env.local");
  const content = readFileSync(path, "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    process.env[key] = val;
  }
}

async function main() {
  loadEnvLocal();

  if (!isEmailConfigured()) {
    console.error("SMTP is not configured. Set SMTP_USER and SMTP_PASSWORD in .env.local");
    process.exit(1);
  }

  const to = process.env.CONTACT_RECEIVER_EMAIL || process.env.SMTP_USER;
  console.log(`Sending SMTP test email to ${to}...`);

  const result = await sendTestEmail(to);

  if (result.ok) {
    console.log("SMTP test succeeded. Check the inbox (and spam folder).");
    return;
  }

  if ("skipped" in result && result.skipped) {
    console.error("Email was skipped — configuration missing.");
    process.exit(1);
  }

  console.error("SMTP test failed:", "error" in result ? result.error : "unknown error");
  process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
