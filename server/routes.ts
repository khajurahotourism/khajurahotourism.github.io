import type { Express } from "express";
import type { Server } from "http";
import { randomUUID } from "crypto";
import { z } from "zod";
import nodemailer from "nodemailer";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(320),
  phoneCountryCode: z.string().trim().regex(/^\+\d{1,4}$/),
  phoneNumber: z.string().trim().regex(/^\d{6,15}$/),
  subject: z.string().trim().min(1).max(200),
  message: z.string().trim().min(1).max(5000),
});

const subscribeSchema = z.object({
  email: z.string().trim().email().max(320),
});

const translateSchema = z.object({
  targetLanguage: z.string().trim().min(2).max(20),
  texts: z.array(z.string().min(1).max(5000)).min(1).max(60),
});

type ContactEntry = z.infer<typeof contactSchema> & {
  id: string;
  createdAt: string;
};

type SubscriberEntry = {
  id: string;
  email: string;
  createdAt: string;
};

const contactMessages: ContactEntry[] = [];
const subscribers: SubscriberEntry[] = [];
const translationCache = new Map<string, string>();

const CONTACT_RECEIVER_EMAIL = "khajurahocityoftemple@gmail.com";

function zodIssuesToMessage(error: z.ZodError): string {
  return error.issues.map((issue) => issue.message).join("; ");
}

function parseGoogleTranslationResponse(payload: unknown): string | null {
  if (!Array.isArray(payload) || !Array.isArray(payload[0])) {
    return null;
  }

  const chunks = payload[0] as unknown[];
  const translated = chunks
    .map((chunk) => {
      if (!Array.isArray(chunk)) return "";
      return typeof chunk[0] === "string" ? chunk[0] : "";
    })
    .join("")
    .trim();

  return translated.length > 0 ? translated : null;
}

async function translateText(
  text: string,
  targetLanguage: string,
): Promise<string | null> {
  const cacheKey = `${targetLanguage}::${text}`;
  const cached = translationCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const endpoint =
    `https://translate.googleapis.com/translate_a/single` +
    `?client=gtx&sl=en&tl=${encodeURIComponent(targetLanguage)}` +
    `&dt=t&q=${encodeURIComponent(text)}`;

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as unknown;
    const translated = parseGoogleTranslationResponse(payload);
    if (!translated) {
      return null;
    }

    translationCache.set(cacheKey, translated);
    return translated;
  } catch {
    return null;
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express,
): Promise<Server> {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT ?? "587");
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFrom = process.env.SMTP_FROM ?? smtpUser ?? CONTACT_RECEIVER_EMAIL;

  const mailTransporter =
    smtpHost && smtpUser && smtpPass
      ? nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        })
      : null;

  app.get("/api/health", (_req, res) => {
    res.json({
      ok: true,
      smtpConfigured: Boolean(mailTransporter),
    });
  });

  app.post("/api/translate", async (req, res) => {
    const parsed = translateSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: zodIssuesToMessage(parsed.error),
      });
    }

    const { targetLanguage, texts } = parsed.data;
    const translatedTexts: string[] = [];

    for (const text of texts) {
      const translated = await translateText(text, targetLanguage);
      translatedTexts.push(translated ?? text);
    }

    return res.json({
      translations: translatedTexts,
    });
  });

  app.post("/api/contact", async (req, res) => {
    const parsed = contactSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: zodIssuesToMessage(parsed.error),
      });
    }

    const entry: ContactEntry = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      ...parsed.data,
    };
    contactMessages.push(entry);

    if (!mailTransporter) {
      return res.status(500).json({
        message:
          "Email delivery is not configured on server. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and optional SMTP_FROM.",
      });
    }

    const fullPhone = `${entry.phoneCountryCode} ${entry.phoneNumber}`;
    const subject = `[Khajuraho Contact] ${entry.subject}`;
    const textBody = [
      "New message received from Khajuraho website contact form.",
      "",
      `Name: ${entry.name}`,
      `Email: ${entry.email}`,
      `Phone: ${fullPhone}`,
      `Subject: ${entry.subject}`,
      "",
      "Message:",
      entry.message,
      "",
      `Submitted At (UTC): ${entry.createdAt}`,
      `Message ID: ${entry.id}`,
    ].join("\n");

    const htmlBody = `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${entry.name}</p>
      <p><strong>Email:</strong> ${entry.email}</p>
      <p><strong>Phone:</strong> ${fullPhone}</p>
      <p><strong>Subject:</strong> ${entry.subject}</p>
      <p><strong>Message:</strong><br/>${entry.message.replace(/\n/g, "<br/>")}</p>
      <hr/>
      <p><strong>Submitted At (UTC):</strong> ${entry.createdAt}</p>
      <p><strong>Message ID:</strong> ${entry.id}</p>
    `;

    try {
      await mailTransporter.sendMail({
        from: smtpFrom,
        to: CONTACT_RECEIVER_EMAIL,
        replyTo: entry.email,
        subject,
        text: textBody,
        html: htmlBody,
      });
    } catch {
      return res.status(502).json({
        message: "Message saved, but email delivery failed. Check SMTP configuration.",
      });
    }

    return res.status(201).json({
      ok: true,
      id: entry.id,
    });
  });

  app.post("/api/subscribe", (req, res) => {
    const parsed = subscribeSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: zodIssuesToMessage(parsed.error),
      });
    }

    const normalizedEmail = parsed.data.email.toLowerCase();
    const alreadySubscribed = subscribers.some(
      (entry) => entry.email === normalizedEmail,
    );

    if (!alreadySubscribed) {
      subscribers.push({
        id: randomUUID(),
        email: normalizedEmail,
        createdAt: new Date().toISOString(),
      });
    }

    return res.status(201).json({
      ok: true,
      alreadySubscribed,
    });
  });

  app.get("/api/admin/messages", (_req, res) => {
    res.json({
      count: contactMessages.length,
      items: contactMessages,
    });
  });

  app.get("/api/admin/subscribers", (_req, res) => {
    res.json({
      count: subscribers.length,
      items: subscribers,
    });
  });

  return httpServer;
}
