import { ReplitConnectors } from "@replit/connectors-sdk";
import { Router, type IRouter } from "express";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const recipient = "afnesuniv@gmail.com";
const sender = "Afnes Taha Portfolio <onboarding@resend.dev>";
const maxNameLength = 120;
const maxEmailLength = 254;
const maxMessageLength = 4000;

function readText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
    .replaceAll("\n", "<br />");
}

router.post("/contact", async (req, res) => {
  const name = readText(req.body?.name);
  const email = readText(req.body?.email);
  const message = readText(req.body?.message);
  const website = readText(req.body?.website);

  if (website) {
    return res.status(400).json({ message: "Unable to send this message." });
  }

  if (!name || name.length > maxNameLength) {
    return res.status(400).json({ message: "Please enter your name." });
  }

  if (!email || email.length > maxEmailLength || !isEmail(email)) {
    return res.status(400).json({ message: "Please enter a valid email address." });
  }

  if (!message || message.length > maxMessageLength) {
    return res.status(400).json({ message: "Please enter a message under 4,000 characters." });
  }

  const subject = `New portfolio inquiry from ${name}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    "",
    message,
  ].join("\n");
  const html = `
    <h2>New portfolio inquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <hr />
    <p>${escapeHtml(message)}</p>
  `;

  try {
    const connectors = new ReplitConnectors();
    const response = await connectors.proxy("resend", "/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: email,
        subject,
        text,
        html,
      }),
    });

    if (!response.ok) {
      logger.error({ status: response.status }, "Resend rejected contact email");
      return res.status(502).json({
        message: "Your note could not be sent right now. Please try again or email me directly.",
      });
    }

    return res.status(201).json({ status: "sent" });
  } catch (error) {
    logger.error({ err: error }, "Contact email delivery failed");
    return res.status(500).json({
      message: "Your note could not be sent right now. Please try again or email me directly.",
    });
  }
});

export default router;