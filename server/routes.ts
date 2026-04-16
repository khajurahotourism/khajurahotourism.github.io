import type { Express } from "express";
import type { Server } from "http";
import { randomUUID } from "crypto";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(320),
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
  app.get("/api/health", (_req, res) => {
    res.json({ ok: true });
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

  app.post("/api/contact", (req, res) => {
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
