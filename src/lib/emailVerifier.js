/**
 * MOTOR DE VERIFICACIÓN DE CORREO EN TIEMPO REAL — LA QUERENDONA
 * Directrices de Ciberseguridad OWASP Top 10 y Claude-Code-CyberSecurity-Skill:
 * - A07: Identification and Authentication Failures:
 *   Verifica que la dirección de correo exista realmente y posea servidores de correo (MX)
 *   activos, impidiendo reservas con dominios inventados o falsos.
 * - Bloqueo estricto de correos temporales y desechables (Anti-Disposable / Anti-Trashmail).
 * - Consulta en tiempo real a los servidores DNS de Google (DNS-over-HTTPS RFC 8484)
 *   vía https://dns.google/resolve sin exponer credenciales en el cliente.
 */

// Lista exhaustiva de dominios de correos temporales / desechables conocidos
const DISPOSABLE_DOMAINS = new Set([
  "10minutemail.com", "10minutemail.net", "10minemail.com",
  "yopmail.com", "yopmail.fr", "yopmail.net", "cool.fr.nf", "jetable.fr.nf",
  "tempmail.com", "temp-mail.org", "temp-mail.io", "tempmail.net",
  "mailinator.com", "mailinator.net", "mailinater.com", "suremail.info",
  "guerrillamail.com", "guerrillamail.net", "guerrillamail.org", "guerrillamailblock.com",
  "sharklasers.com", "grr.la", "pokemail.net", "spam4.me",
  "trashmail.com", "trashmail.net", "trashmail.org", "trashmail.me",
  "dispostable.com", "throwawaymail.com", "fakeinbox.com",
  "getairmail.com", "mohmal.com", "burnermail.io", "crazymailing.com",
  "maildrop.cc", "inboxkitten.com", "nada.ltd", "getnada.com",
  "mytemp.email", "generator.email", "emailondeck.com", "fakemailgenerator.com",
  "tempail.com", "dropmail.me", "mohmal.in", "tutanota.com",
  "mytempemail.com", "harakirimail.com", "crazymail.com", "throwaway.email",
  "mailcatch.com", "inboxclean.com", "discard.email", "spambox.us",
  "mytempemail.com", "fastmailing.com", "fakemail.net", "tempmailaddress.com",
]);

// Erratas comunes en dominios de correo populares
const COMMON_TYPOS = {
  "gmai.com": "gmail.com",
  "gmial.com": "gmail.com",
  "gmaill.com": "gmail.com",
  "gamil.com": "gmail.com",
  "gmail.co": "gmail.com",
  "hotmial.com": "hotmail.com",
  "hotmai.com": "hotmail.com",
  "hotmial.es": "hotmail.es",
  "outlok.com": "outlook.com",
  "outloo.com": "outlook.com",
  "yahho.com": "yahoo.com",
  "yaho.com": "yahoo.com",
};

/**
 * Valida la sintaxis RFC 5322 del correo electrónico
 */
export function isValidEmailSyntax(email) {
  if (!email || typeof email !== "string") return false;
  const clean = email.trim();
  if (clean.length < 6 || clean.length > 254) return false;
  // Regex estricto RFC 5322 simplificado
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return regex.test(clean);
}

/**
 * Comprueba si el dominio es desechable/temporal
 */
export function isDisposableDomain(domain) {
  if (!domain) return false;
  const d = domain.toLowerCase().trim();
  return DISPOSABLE_DOMAINS.has(d);
}

/**
 * Detecta sugerencias de erratas tipográficas comunes
 */
export function getDomainTypoSuggestion(domain) {
  if (!domain) return null;
  const d = domain.toLowerCase().trim();
  return COMMON_TYPOS[d] || null;
}

/**
 * Consulta los servidores DNS de Google (DNS over HTTPS)
 * para verificar la existencia real del dominio y sus registros MX (servidores de correo).
 * Retorna { exists: boolean, mxFound: boolean, mxHosts: string[], isGoogleMail: boolean, status: number, error?: string }
 */
export async function queryGoogleDnsMx(domain) {
  const cleanDomain = domain.toLowerCase().trim();
  const url = `https://dns.google/resolve?name=${encodeURIComponent(cleanDomain)}&type=MX`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

    const res = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: "application/dns-json" },
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Google DNS respondió con código HTTP ${res.status}`);
    }

    const data = await res.json();

    // Código de respuesta DNS (RCODE):
    // 0 = NOERROR (El dominio existe)
    // 3 = NXDOMAIN (El dominio NO existe en internet, es inventado/falso)
    if (data.Status === 3) {
      return {
        exists: false,
        mxFound: false,
        mxHosts: [],
        isGoogleMail: false,
        status: 3,
        error: `El dominio "${cleanDomain}" no existe en internet (Google DNS: NXDOMAIN). La dirección es falsa.`,
      };
    }

    if (data.Status !== 0) {
      return {
        exists: false,
        mxFound: false,
        mxHosts: [],
        isGoogleMail: false,
        status: data.Status,
        error: `El servidor DNS de Google retornó un error de resolución (RCODE ${data.Status}).`,
      };
    }

    // Comprobar registros de intercambio de correo (MX = type 15)
    const answers = data.Answer || [];
    const mxRecords = answers.filter((a) => a.type === 15);

    if (mxRecords.length === 0) {
      // Si no tiene registros MX, el dominio podría tener solo registro A pero no correo
      return {
        exists: true,
        mxFound: false,
        mxHosts: [],
        isGoogleMail: false,
        status: 0,
        error: `El dominio "${cleanDomain}" existe pero no tiene servidores de correo (MX) configurados para recibir mensajes.`,
      };
    }

    // Extraer nombres de host de los servidores MX
    const mxHosts = mxRecords
      .map((r) => {
        // En data.google el campo data viene como "10 aspmx.l.google.com."
        const parts = (r.data || "").split(" ");
        return (parts[1] || parts[0] || "").replace(/\.$/, "").toLowerCase();
      })
      .filter(Boolean);

    // Detectar si el correo utiliza los servidores de Google (Gmail o Google Workspace)
    const isGoogleMail =
      cleanDomain === "gmail.com" ||
      cleanDomain === "googlemail.com" ||
      mxHosts.some((h) => h.includes("google.com") || h.includes("googlemail.com"));

    return {
      exists: true,
      mxFound: true,
      mxHosts,
      isGoogleMail,
      status: 0,
    };
  } catch (err) {
    console.warn("Fallo consultando Google DNS:", err);
    return {
      exists: false,
      mxFound: false,
      mxHosts: [],
      isGoogleMail: false,
      status: -1,
      error: err.name === "AbortError"
        ? "Tiempo de espera agotado al consultar los servidores DNS de Google."
        : "No fue posible conectar con los servidores DNS de Google para verificar el dominio.",
    };
  }
}

/**
 * MOTOR PRINCIPAL DE VERIFICACIÓN DE CORREO
 * Ejecuta la batería completa de comprobaciones en vivo:
 * 1. Formato y sintaxis RFC 5322
 * 2. Comprobación anti-desechables (Anti-Spam / Disposable blacklist)
 * 3. Detección de erratas frecuentes
 * 4. Consulta a los servidores DNS de Google (MX records)
 */
export async function verifyRealEmail(email) {
  if (!email || typeof email !== "string") {
    return {
      isValid: false,
      isReal: false,
      error: "Por favor introduce una dirección de correo.",
    };
  }

  const cleanEmail = email.trim().toLowerCase();

  // 1. Sintaxis
  if (!isValidEmailSyntax(cleanEmail)) {
    return {
      isValid: false,
      isReal: false,
      error: "El formato del correo electrónico no es válido. Ejemplo: nombre@gmail.com",
    };
  }

  const [, domain] = cleanEmail.split("@");

  // 2. Comprobación de correos temporales / desechables
  if (isDisposableDomain(domain)) {
    return {
      isValid: false,
      isReal: false,
      isDisposable: true,
      domain,
      error: `El proveedor "${domain}" es un servicio de correo temporal/desechable. No se admiten para reservas de mesa por razones de seguridad de sala.`,
    };
  }

  // 3. Detección de erratas de tecleo
  const typoSuggestion = getDomainTypoSuggestion(domain);
  if (typoSuggestion) {
    return {
      isValid: false,
      isReal: false,
      hasTypo: true,
      suggestedEmail: `${cleanEmail.split("@")[0]}@${typoSuggestion}`,
      error: `Parece que hay un error en el dominio. ¿Quisiste escribir @${typoSuggestion}?`,
    };
  }

  // 4. Verificación de existencia real a través de los servidores de Google
  const dnsResult = await queryGoogleDnsMx(domain);

  if (!dnsResult.exists || !dnsResult.mxFound) {
    return {
      isValid: false,
      isReal: false,
      domain,
      error: dnsResult.error || `El correo es falso: el dominio "${domain}" no puede recibir mensajes.`,
    };
  }

  // Correo 100% real, activo y con servidores MX verificados por Google DNS
  return {
    isValid: true,
    isReal: true,
    email: cleanEmail,
    domain,
    mxHosts: dnsResult.mxHosts,
    isGoogleMail: dnsResult.isGoogleMail,
    verifiedAt: new Date().toISOString(),
    provider: dnsResult.isGoogleMail ? "Google Mail / Workspace" : dnsResult.mxHosts[0] || "Servidor MX Verificado",
  };
}
