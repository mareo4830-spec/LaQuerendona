import { useState, useEffect, useCallback } from "react";
import {
  fetchSupabaseReservations,
  insertSupabaseReservation,
  updateSupabaseReservationStatus,
  subscribeToReservationsRealtime,
  isSupabaseConfigured,
} from "../lib/supabase";
import { sanitizeReservation } from "../lib/security";

const LOCAL_RESERVATIONS_KEY = "laquerendona_reservations";

const initialSampleReservations = [
  {
    id: "res-101",
    name: "Carolina Restrepo",
    email: "carolina.restrepo@gmail.com",
    phone: "+34 612 34 56 78",
    date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    time: "14:30",
    guests: 4,
    notes: "Mesa cerca de la ventana, celebración familiar.",
    status: "confirmed",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "res-102",
    name: "Alejandro Gómez",
    email: "agomez@hotmail.com",
    phone: "+34 689 45 23 11",
    date: new Date(Date.now() + 172800000).toISOString().split("T")[0],
    time: "21:30",
    guests: 2,
    notes: "Cena romántica de aniversario.",
    status: "pending",
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: "res-103",
    name: "Valentina Muñoz",
    email: "valen.munoz@outlook.es",
    phone: "+34 654 87 99 20",
    date: new Date().toISOString().split("T")[0],
    time: "20:30",
    guests: 6,
    notes: "Cumpleaños, llevaremos tarta propia.",
    status: "confirmed",
    createdAt: new Date(Date.now() - 14400000).toISOString(),
  },
];

function getLocalReservations() {
  try {
    const stored = localStorage.getItem(LOCAL_RESERVATIONS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Error leyendo reservas desde localStorage", e);
  }
  return initialSampleReservations;
}

function saveLocalReservations(res) {
  try {
    localStorage.setItem(LOCAL_RESERVATIONS_KEY, JSON.stringify(res));
  } catch (e) {
    console.error("Error guardando reservas en localStorage", e);
  }
}

export function useReservations() {
  const [reservations, setReservations] = useState(() => getLocalReservations());
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [error, setError] = useState(null);

  // Carga inicial y suscripción Realtime (WebSockets / BroadcastChannel)
  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      if (isSupabaseConfigured) {
        try {
          const supabaseData = await fetchSupabaseReservations();
          if (isMounted && supabaseData && supabaseData.length > 0) {
            setReservations(supabaseData);
            saveLocalReservations(supabaseData);
          }
        } catch (err) {
          console.warn("Supabase load error:", err);
          if (isMounted) setError(err.message);
        } finally {
          if (isMounted) setLoading(false);
        }
      } else {
        setReservations(getLocalReservations());
        setLoading(false);
      }
    }

    loadData();

    // Suscripción Realtime a nuevas reservas o cambios de estado
    const unsubscribe = subscribeToReservationsRealtime(
      (newRes) => {
        if (!isMounted) return;
        const clean = sanitizeReservation(newRes);
        if (!clean) return;

        setReservations((prev) => {
          // Prevenir duplicados si ya existe
          const exists = prev.some((r) => r.id === clean.id);
          if (exists) return prev;
          const updated = [clean, ...prev];
          saveLocalReservations(updated);
          return updated;
        });
      },
      (updatedRes) => {
        if (!isMounted) return;
        const clean = sanitizeReservation(updatedRes);
        if (!clean) return;

        setReservations((prev) => {
          const updated = prev.map((r) => (r.id === clean.id ? { ...r, ...clean } : r));
          saveLocalReservations(updated);
          return updated;
        });
      }
    );

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const addReservation = useCallback(async (rawReservation) => {
    const clean = sanitizeReservation(rawReservation);
    if (!clean) throw new Error("Datos de reserva inválidos.");

    // Asignar ID temporal si no viene de backend
    const clientRes = {
      ...clean,
      id: clean.id || "res-" + Date.now(),
      status: "pending",
      createdAt: clean.createdAt || new Date().toISOString(),
    };

    // Actualización optimista local
    setReservations((prev) => {
      const updated = [clientRes, ...prev];
      saveLocalReservations(updated);
      return updated;
    });

    // Guardar en Supabase si está activo
    if (isSupabaseConfigured) {
      try {
        const saved = await insertSupabaseReservation(clean);
        if (saved && saved.id) {
          setReservations((prev) => {
            const updated = prev.map((r) => (r.id === clientRes.id ? saved : r));
            saveLocalReservations(updated);
            return updated;
          });
          return saved;
        }
      } catch (err) {
        console.warn("Fallo al guardar en Supabase, conservando copia local:", err);
      }
    }

    return clientRes;
  }, []);

  const updateReservationStatus = useCallback(async (id, status) => {
    if (!["pending", "confirmed", "cancelled"].includes(status)) {
      throw new Error("Estado no válido");
    }

    // Actualización inmediata en estado local
    setReservations((prev) => {
      const updated = prev.map((r) => (r.id === id ? { ...r, status } : r));
      saveLocalReservations(updated);
      return updated;
    });

    // Sincronizar con Supabase
    if (isSupabaseConfigured) {
      try {
        await updateSupabaseReservationStatus(id, status);
      } catch (err) {
        console.warn("Error al actualizar en Supabase:", err);
      }
    }
  }, []);

  return { reservations, loading, error, addReservation, updateReservationStatus };
}
