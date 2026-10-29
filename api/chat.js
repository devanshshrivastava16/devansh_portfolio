import { GoogleGenerativeAI } from "@google/generative-ai";
import { PORTFOLIO_CONTEXT } from "../server/portfolioContext.js";

const DAILY_LIMIT = 3;

// serverless: per-instance in-memory rate limiting (resets per cold start)
const limits = {};
const dayKey = () => new Date().toISOString().slice(0, 10);
function remainingFor(id) {
  const rec = limits[id];
  if (!rec || rec.day !== dayKey()) return DAILY_LIMIT;
  return Math.max(0, DAILY_LIMIT - rec.count);
}
function consume(id) {
  const rec = limits[id];
  if (!rec || rec.day !== dayKey()) limits[id] = { day: dayKey(), count: 1 };
  else rec.count += 1;
  return remainingFor(id);
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-device-id");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });

  const deviceId = String(req.headers["x-device-id"] || "unknown").slice(0, 64).replace(/[^a-zA-Z0-9:_\-.]/g, "");
  const message = typeof req.body?.message === "string" ? req.body.message.trim() : "";
  if (!message) return res.status(400).json({ error: "Message is required." });
  if (message.length > 500) return res.status(400).json({ error: "Message too long (max 500 characters)." });

  const remaining = remainingFor(deviceId);
  if (remaining <= 0)
    return res.status(429).json({
      error: `Daily limit reached (${DAILY_LIMIT} messages per device). Please come back tomorrow or email devanshshri16@gmail.com.`,
      remaining: 0,
    });

  if (!process.env.GEMINI_API_KEY)
    return res.status(503).json({ error: "AI is not configured (missing GEMINI_API_KEY).", remaining });

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite" });
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: message }] }],
      systemInstruction: { parts: [{ text: PORTFOLIO_CONTEXT }] },
    });
    const reply = result.response.text().trim();
    const left = consume(deviceId);
    res.status(200).json({ reply, remaining: left });
  } catch (err) {
    console.error("Gemini error:", err.message);
    res.status(502).json({ error: "The AI service is unavailable right now. Try again later.", remaining });
  }
}
