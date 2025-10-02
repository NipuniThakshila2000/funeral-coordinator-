import { Resend } from "resend";

let resend: Resend | null = null;

export async function sendCoordinatorEmail(subject: string, html: string) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn("RESEND_API_KEY not set; skipping email send.");
    return;
  }

  if (!resend) {
    resend = new Resend(apiKey);
  }

  await resend.emails.send({
    from: process.env.SITE_EMAIL_FROM || "support@example.com",
    to: ["coordinator@yourdomain.com"],
    subject,
    html,
  });
}
