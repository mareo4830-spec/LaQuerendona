import OneSignal from "react-onesignal";

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ONESIGNAL WEB PUSH NOTIFICATIONS — LA QUERENDONA
 * ═══════════════════════════════════════════════════════════════════════════
 * Permite la recepción de alertas en tiempo real y notificaciones Web Push
 * nativas del sistema operativo, INCLUSO CUANDO LA WEB ESTÁ COMPLETAMENTE CERRADA.
 *
 * Arquitectura:
 * - OneSignal SDK v16 (react-onesignal)
 * - Service Worker en /OneSignalSDKWorker.js (alcance raíz)
 * - Segmentación por etiquetas (tag: role=admin) para alertas de mesa
 * - Disparo de notificaciones push vía OneSignal REST API cuando entra una reserva
 * ═══════════════════════════════════════════════════════════════════════════
 */

// Identificador de la aplicación en OneSignal (configurable vía .env o Vercel)
export const ONESIGNAL_APP_ID =
  import.meta.env.VITE_ONESIGNAL_APP_ID || "c559bece-3f9b-4e1b-85fa-laquerendona";

// Clave REST API de OneSignal (opcional en frontend, recomendada si se dispara directo)
export const ONESIGNAL_REST_API_KEY =
  import.meta.env.VITE_ONESIGNAL_REST_API_KEY || "";

let isInitialized = false;
let initPromise = null;

/**
 * Comprueba si OneSignal tiene configurado un App ID válido en las variables de entorno
 */
export function isOneSignalConfigured() {
  return (
    Boolean(import.meta.env.VITE_ONESIGNAL_APP_ID) &&
    import.meta.env.VITE_ONESIGNAL_APP_ID !== "your_onesignal_app_id_here"
  );
}

/**
 * Inicializa el SDK de OneSignal (idempotente: se ejecuta una sola vez)
 */
export async function initOneSignal() {
  if (typeof window === "undefined") return false;

  if (isInitialized) return true;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    try {
      const appId = import.meta.env.VITE_ONESIGNAL_APP_ID || ONESIGNAL_APP_ID;

      // Si no hay App ID real configurado, advertir en consola pero no romper la app
      if (!isOneSignalConfigured()) {
        console.info(
          "ℹ️ [OneSignal] VITE_ONESIGNAL_APP_ID no configurado en .env. Se usará el identificador de prueba o modo simulación."
        );
      }

      await OneSignal.init({
        appId: appId,
        allowLocalhostAsSecureOrigin: true,
        notifyButton: {
          enable: false, // Usamos nuestra propia UI artesanal de La Querendona
        },
        serviceWorkerPath: "/OneSignalSDKWorker.js",
        serviceWorkerParam: { scope: "/" },
      });

      isInitialized = true;
      console.log("✅ [OneSignal] Inicializado con éxito. Soporte de Web Push activo.");
      return true;
    } catch (error) {
      console.warn("⚠️ [OneSignal] Inicialización diferida o fallida:", error?.message || error);
      return false;
    }
  })();

  return initPromise;
}

/**
 * Solicita permisos de notificación Web Push al usuario / administrador
 */
export async function requestPushPermission() {
  try {
    await initOneSignal();

    if (OneSignal.Notifications?.requestPermission) {
      await OneSignal.Notifications.requestPermission();
      return isPushPermissionGranted();
    }

    if (typeof Notification !== "undefined") {
      const perm = await Notification.requestPermission();
      return perm === "granted";
    }

    return false;
  } catch (error) {
    console.warn("No se pudo solicitar permiso push de OneSignal:", error);
    return false;
  }
}

/**
 * Verifica si el usuario tiene los permisos push otorgados
 */
export function isPushPermissionGranted() {
  try {
    if (typeof OneSignal !== "undefined" && OneSignal.Notifications?.permission !== undefined) {
      return Boolean(OneSignal.Notifications.permission);
    }
    if (typeof Notification !== "undefined") {
      return Notification.permission === "granted";
    }
  } catch (e) {}
  return false;
}

/**
 * Asigna la etiqueta 'role: admin' al suscriptor actual en OneSignal
 * para que reciba notificaciones exclusivas de reservas
 */
export async function tagUserAsAdmin(isAdmin = true) {
  try {
    await initOneSignal();
    if (OneSignal.User?.addTag && OneSignal.User?.removeTag) {
      if (isAdmin) {
        await OneSignal.User.addTag("role", "admin");
        console.log("🔔 [OneSignal] Dispositivo etiquetado como 'admin' para alertas de sala.");
      } else {
        await OneSignal.User.removeTag("role");
      }
    }
  } catch (err) {
    console.warn("No se pudo etiquetar usuario en OneSignal:", err);
  }
}

/**
 * Envía una notificación Web Push a los administradores a través de OneSignal REST API.
 * Esto despierta el Service Worker del navegador aunque la pestaña o la web estén cerradas.
 */
export async function sendReservationPushNotification(reservation) {
  if (!reservation) return false;

  const appId = import.meta.env.VITE_ONESIGNAL_APP_ID || ONESIGNAL_APP_ID;
  const apiKey = import.meta.env.VITE_ONESIGNAL_REST_API_KEY;

  const title = `¡Nueva Reserva: ${reservation.name || "Cliente"}!`;
  const message = `${reservation.guests || 2} personas · ${reservation.time || "14:00"} h (${reservation.date || "Hoy"})`;
  const icon = "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/2effc510d_WhatsAppImage2026-09-07at004236.jpeg";

  // 1. Si tenemos la API Key de OneSignal, enviamos notificación Push remota oficial
  if (apiKey && isOneSignalConfigured()) {
    try {
      const response = await fetch("https://onesignal.com/api/v1/notifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Basic ${apiKey}`,
        },
        body: JSON.stringify({
          app_id: appId,
          headings: { es: title, en: title },
          contents: { es: message, en: message },
          filters: [
            { field: "tag", key: "role", relation: "=", value: "admin" }
          ],
          url: window.location.origin + "/admin",
          chrome_web_icon: icon,
          firefox_icon: icon,
        }),
      });

      if (response.ok) {
        console.log("📲 [OneSignal] Notificación push remota enviada con éxito a los administradores.");
        return true;
      }
    } catch (e) {
      console.warn("Error enviando push por OneSignal API:", e);
    }
  }

  // 2. Si no hay API key o falló la llamada remota, disparar vía Service Worker local
  try {
    if ("serviceWorker" in navigator) {
      const reg = await navigator.serviceWorker.ready;
      if (reg && reg.showNotification && Notification.permission === "granted") {
        await reg.showNotification(title, {
          body: message,
          icon: icon,
          badge: icon,
          data: { url: "/admin" },
          tag: "reserva-" + (reservation.id || Date.now()),
        });
        return true;
      }
    }
  } catch (e) {
    console.warn("Error mostrando notificación con Service Worker:", e);
  }

  // 3. Fallback de escritorio estándar si la ventana está abierta
  if (typeof Notification !== "undefined" && Notification.permission === "granted") {
    try {
      new Notification(title, { body: message, icon: icon });
      return true;
    } catch (e) {}
  }

  return false;
}

/**
 * Enviar una notificación push de prueba para verificar que el Service Worker y el dispositivo responden
 */
export async function sendTestPushNotification() {
  return sendReservationPushNotification({
    id: "test-onesignal-" + Date.now(),
    name: "Prueba OneSignal Web Push",
    guests: 4,
    time: "14:30",
    date: "Hoy",
    phone: "643 93 16 08",
  });
}
