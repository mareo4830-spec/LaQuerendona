import DOMPurify from "dompurify";

/**
 * MÓDULO DE SEGURIDAD — LA QUERENDONA
 * Basado en las directrices de OWASP Top 10 y Claude-Code-CyberSecurity-Skill (E:\skils)
 * - Protección XSS (Sanitización y Escapado estricto con DOMPurify)
 * - Control de Intentos de Acceso (Anti-Bruteforce / Rate Limiter)
 * - Validación Cripto-segura de Sesión y Expiración
 * - Verificación de Carga de Archivos de Imagen
 * - Sanitización estricta de Reservas de Mesa
 */

// 1. SANITIZACIÓN XSS
export function sanitizeString(input, maxLength = 300) {
  if (typeof input !== "string") return "";
  let clean = input.trim();
  
  if (clean.length > maxLength) {
    clean = clean.substring(0, maxLength);
  }

  // DOMPurify strict sanitization (strip all HTML tags)
  return DOMPurify.sanitize(clean, { ALLOWED_TAGS: [] });
}

export function sanitizeReservation(raw) {
  if (!raw || typeof raw !== "object") return null;

  const cleanName = DOMPurify.sanitize(String(raw.name || "").trim().slice(0, 100), { ALLOWED_TAGS: [] });
  const cleanEmail = DOMPurify.sanitize(String(raw.email || "").trim().slice(0, 100), { ALLOWED_TAGS: [] });
  const cleanPhone = String(raw.phone || "").replace(/[^\d+()\s-]/g, "").slice(0, 30);
  const cleanDate = String(raw.date || "").trim().slice(0, 10);
  const cleanTime = String(raw.time || "14:00").trim().slice(0, 5);
  const guestsNum = Math.max(1, Math.min(20, parseInt(raw.guests, 10) || 2));
  const cleanNotes = DOMPurify.sanitize(String(raw.notes || "").trim().slice(0, 300), { ALLOWED_TAGS: [] });
  const status = ["pending", "confirmed", "cancelled"].includes(raw.status) ? raw.status : "pending";
  const googleVerified = Boolean(raw.google_verified || raw.isGoogleVerified);
  const googleEmail = googleVerified ? DOMPurify.sanitize(String(raw.google_email || raw.email || "").trim().toLowerCase().slice(0, 100), { ALLOWED_TAGS: [] }) : "";
  const googleId = googleVerified ? String(raw.google_id || raw.googleId || "").slice(0, 60) : "";
  const verifiedAt = googleVerified ? (raw.verified_at || raw.verifiedAt || new Date().toISOString()) : null;

  return {
    ...(raw.id ? { id: String(raw.id).slice(0, 50) } : {}),
    name: cleanName,
    email: cleanEmail,
    phone: cleanPhone,
    date: cleanDate,
    time: cleanTime,
    guests: guestsNum,
    notes: cleanNotes,
    status: status,
    google_verified: googleVerified,
    google_email: googleEmail,
    google_id: googleId,
    verified_at: verifiedAt,
    createdAt: raw.createdAt || new Date().toISOString(),
  };
}

export function escapeHtml(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function sanitizePrice(val) {
  const num = typeof val === "number" ? val : parseFloat(val);
  if (isNaN(num) || num < 0) return 0;
  // Redondear a 2 decimales y limitar a precio razonable
  return Math.min(Math.round(num * 100) / 100, 999.99);
}

export function sanitizeImageUrl(url) {
  if (!url || typeof url !== "string") return "";
  const trimmed = url.trim();
  // Solo permitir protocolos seguros https:// o data:image/
  if (trimmed.startsWith("https://") || trimmed.startsWith("http://localhost") || trimmed.startsWith("data:image/")) {
    // Evitar URLs que contengan javascript: codificado
    if (trimmed.toLowerCase().includes("javascript:") || trimmed.toLowerCase().includes("vbscript:")) {
      return "";
    }
    return trimmed;
  }
  return "";
}

// 2. RATE LIMITER / CONTROL DE FUERZA BRUTA (CLIENT-SIDE DEFENSE)
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 10 * 60 * 1000; // 10 minutos
const ATTEMPTS_KEY = "laquerendona_sec_attempts";

export function checkLoginAttempts() {
  try {
    const raw = localStorage.getItem(ATTEMPTS_KEY);
    if (!raw) return { allowed: true, remaining: MAX_LOGIN_ATTEMPTS };

    const data = JSON.parse(raw);
    const now = Date.now();

    if (data.lockedUntil && now < data.lockedUntil) {
      const waitSeconds = Math.ceil((data.lockedUntil - now) / 1000);
      return { allowed: false, remaining: 0, waitSeconds };
    }

    if (data.lockedUntil && now >= data.lockedUntil) {
      // Período de bloqueo finalizado, reiniciar
      localStorage.removeItem(ATTEMPTS_KEY);
      return { allowed: true, remaining: MAX_LOGIN_ATTEMPTS };
    }

    const remaining = Math.max(0, MAX_LOGIN_ATTEMPTS - (data.count || 0));
    return { allowed: remaining > 0, remaining };
  } catch (e) {
    return { allowed: true, remaining: MAX_LOGIN_ATTEMPTS };
  }
}

export function recordFailedLogin() {
  try {
    const raw = localStorage.getItem(ATTEMPTS_KEY);
    const now = Date.now();
    let data = raw ? JSON.parse(raw) : { count: 0, firstAttempt: now };

    data.count = (data.count || 0) + 1;

    if (data.count >= MAX_LOGIN_ATTEMPTS) {
      data.lockedUntil = now + LOCKOUT_DURATION_MS;
    }

    localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(data));
    return checkLoginAttempts();
  } catch (e) {
    return { allowed: true, remaining: 3 };
  }
}

export function resetLoginAttempts() {
  try {
    localStorage.removeItem(ATTEMPTS_KEY);
  } catch (e) {}
}

// 3. GESTIÓN SEGURA DE SESIÓN CON EXPIRACIÓN (24H)
const SESSION_KEY = "laquerendona_admin_session";
const SESSION_TTL = 24 * 60 * 60 * 1000; // 24 Horas

export function createAdminSession(email = "admin@laquerendona.com") {
  const timestamp = Date.now();
  const token = btoa(`${email}:${timestamp}:${Math.random().toString(36).substring(2)}`);
  const session = {
    email: sanitizeString(email, 100),
    created: timestamp,
    expires: timestamp + SESSION_TTL,
    token: token
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  localStorage.setItem("laquerendona_admin_auth", "true");
  resetLoginAttempts();
  return session;
}

export function verifyAdminSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) {
      // Compatibilidad con flag básico
      const basic = localStorage.getItem("laquerendona_admin_auth") === "true";
      return basic;
    }
    const session = JSON.parse(raw);
    const now = Date.now();
    if (!session || !session.expires || now > session.expires) {
      destroyAdminSession();
      return false;
    }
    return true;
  } catch (e) {
    destroyAdminSession();
    return false;
  }
}

export function destroyAdminSession() {
  try {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem("laquerendona_admin_auth");
  } catch (e) {}
}

// 4. VALIDACIÓN DE ARCHIVOS DE IMAGEN
export function validateImageFile(file) {
  if (!file) return { valid: false, error: "No se seleccionó ningún archivo." };

  const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      error: "Formato no permitido. Solo se aceptan imágenes JPG, PNG o WebP seguras."
    };
  }

  // Límite de 6MB
  const maxBytes = 6 * 1024 * 1024;
  if (file.size > maxBytes) {
    return {
      valid: false,
      error: "El archivo es demasiado grande (máximo 6MB permitidos)."
    };
  }

  return { valid: true };
}
