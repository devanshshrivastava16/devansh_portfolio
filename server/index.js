import "dotenv/config";
import express from "express";
import cors from "cors";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PORTFOLIO_CONTEXT } from "./portfolioContext.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LIMIT_FILE = path.join(__dirname, "rate-limits.json");
const DAILY_LIMIT = 3;

// ── persistent device rate-limit store ─────────────────
let limits = {};
try {
  limits = JSON.parse(fs.readFileSync(LIMIT_FILE, "utf8"));
} catch {
  limits = {};
}
const saveLimits = () => fs.writeFileSync(LIMIT_FILE, JSON.stringify(limits, null, 2));

const dayKey = () => new Date().toISOString().slice(0, 10); // reset daily

function remainingFor(deviceId) {
  const rec = limits[deviceId];
  if (!rec || rec.day !== dayKey()) return DAILY_LIMIT;
  return Math.max(0, DAILY_LIMIT - rec.count);
}
function consume(deviceId) {
  const rec = limits[deviceId];
  if (!rec || rec.day !== dayKey()) limits[deviceId] = { day: dayKey(), count: 1 };
  else rec.count += 1;
  saveLimits();
  return remainingFor(deviceId);
}

// ── app ────────────────────────────────────────────────
const app = express();
app.use(cors());
app.use(express.json({ limit: "10kb" }));

if (!process.env.GEMINI_API_KEY) {
  console.warn("⚠ GEMINI_API_KEY not set — /api/chat will return 503");
}
const genAI = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

app.post("/api/chat", async (req, res) => {
  // device identifier: client-supplied header (validated), else IP
  const deviceId = String(req.headers["x-device-id"] || req.ip || "unknown")
    .slice(0, 64)
    .replace(/[^a-zA-Z0-9:_\-.]/g, "");

  const message = typeof req.body?.message === "string" ? req.body.message.trim() : "";
  if (!message) return res.status(400).json({ error: "Message is required." });
  if (message.length > 500)
    return res.status(400).json({ error: "Message too long (max 500 characters)." });

  const remaining = remainingFor(deviceId);
  if (remaining <= 0) {
    return res.status(429).json({
      error: `Daily limit reached (${DAILY_LIMIT} messages per device). Please come back tomorrow or email devanshshri16@gmail.com.`,
      remaining: 0,
    });
  }

  if (!genAI) {
    return res.status(503).json({ error: "AI is not configured on this server (missing GEMINI_API_KEY).", remaining });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite" });
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: message }] }],
      systemInstruction: { parts: [{ text: PORTFOLIO_CONTEXT }] },
    });
    const reply = result.response.text().trim();
    const left = consume(deviceId);
    res.json({ reply, remaining: left });
  } catch (err) {
    console.error("Gemini error:", err.message);
    res.status(502).json({ error: "The AI service is unavailable right now. Try again later.", remaining });
  }
});

app.get("/api/health", (_req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✦ portfolio AI server on http://localhost:${PORT}`));
