import { createClient } from "@supabase/supabase-js";
import { sanitizeReservation } from "./security";

/**
 * CLIENTE SEGURO DE SUPABASE — LA QUERENDONA
 * Basado en las directrices de ciberseguridad OWASP y Claude-Code-CyberSecurity-Skill:
 * - Uso exclusivo de ANON KEY en frontend (nunca expone SERVICE_ROLE_KEY).
 * - Protección RLS (Row Level Security) obligatoria en base de datos.
 * - Validación y sanitización estricta de payloads antes de la inserción.
 * - Canal de eventos en tiempo real con WebSockets (Supabase Realtime)
 * - Fallback automático a BroadcastChannel para desarrollo local y pruebas multiventana.
 */

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith("https://") &&
  supabaseAnonKey.length > 20 &&
  !supabaseUrl.includes("your-project-id")
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
      realtime: {
        params: {
          eventsPerSecond: 10,
        },
      },
    })
  : null;

if (!isSupabaseConfigured) {
  console.info(
    "Supabase no configurado en .env. La Querendona está operando con almacenamiento local reactivo y BroadcastChannel para alertas en tiempo real."
  );
}

// Canal local reactivo entre pestañas (para modo local y testing instantáneo)
const LOCAL_CHANNEL_NAME = "laquerendona_reservations_realtime";
let localBroadcastChannel = null;

try {
  if (typeof window !== "undefined" && "BroadcastChannel" in window) {
    localBroadcastChannel = new BroadcastChannel(LOCAL_CHANNEL_NAME);
  }
} catch (e) {
  console.warn("BroadcastChannel no soportado en este navegador.", e);
}

/**
 * Emite una notificación local inmediata entre pestañas cuando se crea una reserva
 */
export function dispatchLocalReservationEvent(reservation) {
  const clean = sanitizeReservation(reservation);
  if (!clean) return;

  if (localBroadcastChannel) {
    try {
      localBroadcastChannel.postMessage({
        type: "NEW_RESERVATION",
        reservation: clean,
        timestamp: Date.now(),
      });
    } catch (e) {
      console.warn("Error enviando mensaje por BroadcastChannel:", e);
    }
  }

  // Evento local custom para la misma ventana
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("laquerendona:new-reservation", { detail: clean })
    );
  }
}

/**
 * Obtener reservas de Supabase (o null si no está configurado)
 */
export async function fetchSupabaseReservations() {
  if (!isSupabaseConfigured || !supabase) return null;

  try {
    const { data, error } = await supabase
      .from("reservations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("Supabase fetch warning:", error.message);
      return null;
    }
    return data || [];
  } catch (err) {
    console.error("Error al consultar reservas en Supabase:", err);
    return null;
  }
}

/**
 * Insertar nueva reserva en Supabase con sanitización previa
 */
export async function insertSupabaseReservation(rawReservation) {
  const clean = sanitizeReservation(rawReservation);
  if (!clean) throw new Error("Datos de reserva inválidos.");

  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("reservations")
      .insert([
        {
          name: clean.name,
          email: clean.email,
          phone: clean.phone,
          date: clean.date,
          time: clean.time,
          guests: clean.guests,
          notes: clean.notes,
          status: "pending",
          google_verified: Boolean(clean.google_verified),
          google_email: clean.google_email || clean.email,
          google_id: clean.google_id || "",
          verified_at: clean.verified_at || new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.warn("Error insertando en Supabase, aplicando fallback local:", error.message);
      throw error;
    }

    // Emitir también localmente para respuesta instantánea
    dispatchLocalReservationEvent(data || clean);
    return data;
  }

  // Fallback local
  dispatchLocalReservationEvent(clean);
  return clean;
}

/**
 * Actualizar estado de una reserva en Supabase
 */
export async function updateSupabaseReservationStatus(id, status) {
  if (!["pending", "confirmed", "cancelled"].includes(status)) {
    throw new Error("Estado no válido");
  }

  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("reservations")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  return { id, status };
}

/**
 * Suscripción en Tiempo Real para el Panel de Administración
 * Escucha WebSocket de Supabase y mensajes de BroadcastChannel local
 */
export function subscribeToReservationsRealtime(onNewReservation, onStatusChange) {
  let supabaseChannel = null;

  // 1. Suscripción a Supabase Realtime si está activo
  if (isSupabaseConfigured && supabase) {
    try {
      supabaseChannel = supabase
        .channel("admin-reservations-feed")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "reservations",
          },
          (payload) => {
            const clean = sanitizeReservation(payload.new);
            if (clean && typeof onNewReservation === "function") {
              onNewReservation(clean);
            }
          }
        )
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "reservations",
          },
          (payload) => {
            const clean = sanitizeReservation(payload.new);
            if (clean && typeof onStatusChange === "function") {
              onStatusChange(clean);
            }
          }
        )
        .subscribe();
    } catch (e) {
      console.warn("Error iniciando canal Realtime de Supabase:", e);
    }
  }

  // 2. Suscripción local (BroadcastChannel y CustomEvent)
  const handleBroadcastMessage = (event) => {
    if (event.data?.type === "NEW_RESERVATION" && event.data.reservation) {
      if (typeof onNewReservation === "function") {
        onNewReservation(event.data.reservation);
      }
    }
  };

  const handleCustomEvent = (e) => {
    if (e.detail && typeof onNewReservation === "function") {
      onNewReservation(e.detail);
    }
  };

  if (localBroadcastChannel) {
    localBroadcastChannel.addEventListener("message", handleBroadcastMessage);
  }

  if (typeof window !== "undefined") {
    window.addEventListener("laquerendona:new-reservation", handleCustomEvent);
  }

  // Función de desuscripción y limpieza
  return () => {
    if (supabaseChannel && supabase) {
      supabase.removeChannel(supabaseChannel);
    }
    if (localBroadcastChannel) {
      localBroadcastChannel.removeEventListener("message", handleBroadcastMessage);
    }
    if (typeof window !== "undefined") {
      window.removeEventListener("laquerendona:new-reservation", handleCustomEvent);
    }
  };
}
