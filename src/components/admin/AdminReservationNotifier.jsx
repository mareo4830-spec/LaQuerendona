import { useState, useEffect, useRef, useCallback } from "react";
import { verifyAdminSession } from "../../lib/security";
import { subscribeToReservationsRealtime, dispatchLocalReservationEvent } from "../../lib/supabase";
import {
  FiBell,
  FiBellOff,
  FiCheck,
  FiX,
  FiCalendar,
  FiClock,
  FiUsers,
  FiPhone,
  FiChevronRight,
  FiVolume2,
  FiVolumeX,
  FiSmartphone,
  FiSend,
  FiRadio,
} from "react-icons/fi";
import toast from "react-hot-toast";
import {
  isPushPermissionGranted,
  requestPushPermission,
  tagUserAsAdmin,
  sendReservationPushNotification,
  sendTestPushNotification,
  isOneSignalConfigured,
} from "../../lib/onesignal";

/**
 * SISTEMA DE NOTIFICACIONES DE RESERVA EN TIEMPO REAL PARA ADMINISTRADORES
 * Directrices de Ciberseguridad OWASP y Claude-Code-CyberSecurity-Skill:
 * - A01: Broken Access Control: Este componente se ejecuta y expone datos EXCLUSIVAMENTE
 *   a usuarios con sesión administrativa válida (verifyAdminSession() === true).
 * - Notificaciones acústicas generadas con Web Audio API (sin dependencias externas ni riesgo de inyección).
 * - Compatibilidad con Web Notifications API (alertas de escritorio del sistema operativo).
 * - Sincronización en tiempo real vía WebSockets de Supabase y canal local BroadcastChannel.
 */

// Generador de sonido de campana de sala de alta gama con Web Audio API
function playConciergeChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const now = ctx.currentTime;

    // Tono 1: D5 (587.33 Hz)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(587.33, now);
    gain1.gain.setValueAtTime(0.25, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 1.2);

    // Tono 2: A5 (880 Hz) - Entrada suave armónica a los 120ms
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(880, now + 0.12);
    gain2.gain.setValueAtTime(0.001, now);
    gain2.gain.setValueAtTime(0.3, now + 0.12);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.12);
    osc2.stop(now + 1.5);
  } catch (e) {
    console.warn("No se pudo reproducir el timbre de sala:", e);
  }
}

export default function AdminReservationNotifier({ onSelectReservation, onConfirmReservation }) {
  // Verificación estricta de sesión de administrador (OWASP A01)
  const isAuthorized = verifyAdminSession();

  const [activeAlert, setActiveAlert] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(() => {
    return localStorage.getItem("laquerendona_admin_sound") !== "false";
  });
  const [desktopNotifAllowed, setDesktopNotifAllowed] = useState(() => {
    return typeof Notification !== "undefined" && Notification.permission === "granted";
  });
  const [pushEnabled, setPushEnabled] = useState(() => isPushPermissionGranted());
  const [pushLoading, setPushLoading] = useState(false);
  const [pushTesting, setPushTesting] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [recentAlerts, setRecentAlerts] = useState([]);

  const autoDismissTimer = useRef(null);

  // Etiquetar automáticamente como 'admin' en OneSignal al entrar al panel
  useEffect(() => {
    if (isAuthorized) {
      tagUserAsAdmin(true);
      setPushEnabled(isPushPermissionGranted());
    }
  }, [isAuthorized]);

  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      localStorage.setItem("laquerendona_admin_sound", String(next));
      if (next) playConciergeChime();
      return next;
    });
  };

  const handleActivatePush = async () => {
    setPushLoading(true);
    const granted = await requestPushPermission();
    if (granted) {
      await tagUserAsAdmin(true);
      setPushEnabled(true);
      setDesktopNotifAllowed(true);
      toast.success("¡Web Push OneSignal activado! Recibirás alertas con la web cerrada.");
    } else {
      toast.error("Permiso de notificaciones push denegado o bloqueado.");
    }
    setPushLoading(false);
  };

  const handleTestPushClosed = async () => {
    setPushTesting(true);
    toast("Minimiza o sal de la web ahora: la alerta push llegará en 3 segundos...", {
      icon: "📲",
      duration: 4500,
    });
    setTimeout(async () => {
      await sendTestPushNotification();
      setPushTesting(false);
    }, 3000);
  };

  const requestDesktopPermission = async () => {
    if (typeof Notification === "undefined") return;
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        setDesktopNotifAllowed(true);
        new Notification("La Querendona — Sistema de Sala", {
          body: "Alertas de reservas activadas para este dispositivo.",
          icon: "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/2effc510d_WhatsAppImage2026-09-07at004236.jpeg",
        });
      }
    } catch (e) {
      console.warn("Permiso de notificaciones denegado:", e);
    }
  };

  const handleIncomingReservation = useCallback(
    (reservation) => {
      if (!reservation) return;

      // Sonido de alerta
      if (soundEnabled) {
        playConciergeChime();
      }

      // Notificación Web Push a través de OneSignal / Service Worker (funciona con la web cerrada o en segundo plano)
      sendReservationPushNotification(reservation).catch(() => {});

      // Notificación de escritorio local si la pestaña está oculta
      if (desktopNotifAllowed && document.visibilityState !== "visible") {
        try {
          new Notification(`¡Nueva Reserva: ${reservation.name}!`, {
            body: `${reservation.guests} personas · ${reservation.time} (${reservation.date})`,
            icon: "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/2effc510d_WhatsAppImage2026-09-07at004236.jpeg",
          });
        } catch (e) {}
      }

      // Mostrar alerta flotante
      setActiveAlert(reservation);
      setUnreadCount((c) => c + 1);
      setRecentAlerts((prev) => [reservation, ...prev.slice(0, 9)]);

      // Auto-ocultar alerta emergente a los 12 segundos
      if (autoDismissTimer.current) clearTimeout(autoDismissTimer.current);
      autoDismissTimer.current = setTimeout(() => {
        setActiveAlert(null);
      }, 12000);
    },
    [soundEnabled, desktopNotifAllowed]
  );

  // Suscripción Realtime (exclusiva para administradores)
  useEffect(() => {
    if (!isAuthorized) return;

    const unsubscribe = subscribeToReservationsRealtime(
      (newRes) => {
        handleIncomingReservation(newRes);
      },
      (updatedRes) => {
        // Actualizar alertas recientes si cambian de estado
        setRecentAlerts((prev) =>
          prev.map((r) => (r.id === updatedRes.id ? { ...r, ...updatedRes } : r))
        );
      }
    );

    return () => {
      unsubscribe();
      if (autoDismissTimer.current) clearTimeout(autoDismissTimer.current);
    };
  }, [isAuthorized, handleIncomingReservation]);

  // Si no está autorizado como administrador, no renderizar nada
  if (!isAuthorized) {
    return null;
  }

  // Disparar reserva simulada de prueba para verificar alertas en vivo
  const handleSimulateTest = () => {
    const sampleNames = ["Sofía Cardona", "Mateo Jaramillo", "Isabela Montoya", "Camilo Echeverry"];
    const randomName = sampleNames[Math.floor(Math.random() * sampleNames.length)];
    const sampleEmail = `${randomName.toLowerCase().replace(" ", ".")}@gmail.com`;
    const testRes = {
      id: "test-" + Date.now(),
      name: randomName,
      phone: "+34 6" + Math.floor(10000000 + Math.random() * 90000000),
      email: sampleEmail,
      google_verified: true,
      google_email: sampleEmail,
      google_id: "google-test-sub-" + Date.now(),
      verified_at: new Date().toISOString(),
      date: new Date().toISOString().split("T")[0],
      time: "14:30",
      guests: Math.floor(2 + Math.random() * 5),
      notes: "Mesa reservada en simulación con verificación Google activa.",
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    dispatchLocalReservationEvent(testRes);
  };

  return (
    <>
      {/* ─── BOTÓN DE CONTROL DE ALERTAS EN LA CABECERA DEL ADMIN ─── */}
      <div className="flex items-center gap-1.5 bg-[#ebe6dd] border border-stone-300 rounded-xl px-2 py-1 shadow-sm">
        {/* Toggle de Sonido */}
        <button
          onClick={toggleSound}
          className={`p-1.5 rounded-lg text-xs transition-colors flex items-center gap-1 cursor-pointer ${
            soundEnabled
              ? "text-emerald-800 hover:bg-emerald-100/60"
              : "text-stone-400 hover:bg-stone-200"
          }`}
          title={soundEnabled ? "Timbre de sala activado" : "Timbre silenciado"}
        >
          {soundEnabled ? <FiVolume2 className="w-3.5 h-3.5" /> : <FiVolumeX className="w-3.5 h-3.5" />}
        </button>

        {/* Campana y Contador de Notificaciones */}
        <button
          onClick={() => {
            setIsPanelOpen(!isPanelOpen);
            setUnreadCount(0);
          }}
          className="relative p-1.5 rounded-lg text-stone-700 hover:text-stone-900 hover:bg-stone-200/70 transition-colors flex items-center gap-1 cursor-pointer"
          title="Ver alertas de reservas en tiempo real"
        >
          <FiBell className="w-3.5 h-3.5 text-stone-800" />
          <span className="text-[10px] font-mono font-bold">Alertas</span>
          {unreadCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-[#c44d2d] text-white text-[9px] font-bold flex items-center justify-center animate-pulse">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Botón de prueba rápida */}
        <button
          onClick={handleSimulateTest}
          className="px-2 py-1 rounded-lg text-[10px] font-mono tracking-wider uppercase bg-stone-900 text-[#f7f4ee] hover:bg-[#c44d2d] transition-colors cursor-pointer hidden sm:inline-block"
          title="Simular una reserva en tiempo real para verificar sonido y alertas"
        >
          Test Alerta
        </button>
      </div>

      {/* ─── BANNER FLOTANTE EMERGENTE DE NUEVA RESERVA ─── */}
      {activeAlert && (
        <div className="fixed top-4 right-4 z-50 max-w-sm sm:max-w-md w-full animate-spring-in">
          <div className="bg-[#18181b] border-2 border-[#c44d2d] text-[#f4f1ec] rounded-2xl p-4 shadow-2xl backdrop-blur-xl">
            {/* Header del Toast */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#c44d2d] font-bold">
                  NUEVA RESERVA EN TIEMPO REAL
                </span>
              </div>
              <button
                onClick={() => setActiveAlert(null)}
                className="p-1 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Cerrar notificación"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>

            {/* Datos del Comensal */}
            <div className="space-y-1 mb-3">
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-serif text-lg font-bold text-white tracking-tight">
                  {activeAlert.name}
                </h4>
                {activeAlert.google_verified && (
                  <span
                    className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded-full shrink-0"
                    title="Identidad y correo comprobados por Google Account"
                  >
                    <svg className="w-2.5 h-2.5" viewBox="0 0 24 24">
                      <path fill="#EA4335" d="M12 5c1.56 0 2.96.54 4.07 1.59l3.05-3.05C17.27 1.79 14.84 1 12 1 7.42 1 3.5 3.58 1.63 7.34l3.71 2.88C6.22 7.18 8.86 5 12 5z" />
                      <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58l3.71 2.88c2.16-1.99 3.71-4.94 3.71-8.7z" />
                      <path fill="#FBBC05" d="M5.34 14.78c-.23-.68-.36-1.41-.36-2.18s.13-1.5.36-2.18L1.63 7.54C.59 9.61 0 11.97 0 14.4s.59 4.79 1.63 6.86l3.71-2.88z" />
                      <path fill="#34A853" d="M12 23c3.24 0 5.96-1.07 7.95-2.91l-3.71-2.88c-1.08.72-2.45 1.16-4.24 1.16-3.14 0-5.78-2.18-6.66-5.22L1.63 16.03C3.5 19.79 7.42 22.38 12 22.38z" />
                    </svg>
                    <span>Google Verificado</span>
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/75 font-mono">
                <span className="inline-flex items-center gap-1">
                  <FiUsers className="w-3 h-3 text-amber-400" />
                  {activeAlert.guests} personas
                </span>
                <span className="inline-flex items-center gap-1">
                  <FiClock className="w-3 h-3 text-emerald-400" />
                  {activeAlert.time} h
                </span>
                <span className="inline-flex items-center gap-1">
                  <FiCalendar className="w-3 h-3 text-blue-400" />
                  {activeAlert.date}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-mono">
                {activeAlert.phone && (
                  <a
                    href={`tel:${activeAlert.phone}`}
                    className="inline-flex items-center gap-1 text-[#d99b26] hover:underline"
                  >
                    <FiPhone className="w-3 h-3" />
                    <span>{activeAlert.phone}</span>
                  </a>
                )}
                {(activeAlert.google_email || activeAlert.email) && (
                  <span className="text-white/60 text-[11px] truncate max-w-[200px]">
                    {activeAlert.google_email || activeAlert.email}
                  </span>
                )}
              </div>

              {activeAlert.notes && (
                <p className="text-xs text-white/60 italic pt-1 border-t border-white/5">
                  &ldquo;{activeAlert.notes}&rdquo;
                </p>
              )}
            </div>

            {/* Botones de Acción Inmediata */}
            <div className="flex items-center gap-2 pt-1 border-t border-white/10">
              {onConfirmReservation && (
                <button
                  onClick={() => {
                    onConfirmReservation(activeAlert.id);
                    setActiveAlert(null);
                  }}
                  className="flex-1 py-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold inline-flex items-center justify-center gap-1 shadow-sm transition-colors cursor-pointer"
                >
                  <FiCheck className="w-3.5 h-3.5" />
                  <span>Confirmar Mesa</span>
                </button>
              )}

              <button
                onClick={() => {
                  if (onSelectReservation) onSelectReservation(activeAlert.id);
                  setActiveAlert(null);
                }}
                className="py-1.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono inline-flex items-center justify-center gap-1 transition-colors cursor-pointer"
              >
                <span>Ver Fila</span>
                <FiChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── PANEL LATERAL DESPLEGABLE DE HISTORIAL DE ALERTAS EN VIVO ─── */}
      {isPanelOpen && (
        <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-[#fdfcfa] border-l border-stone-200 shadow-2xl p-6 flex flex-col justify-between animate-drawer-in">
          <div>
            {/* Header del Panel */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-4">
              <div className="flex items-center gap-2">
                <FiBell className="w-4 h-4 text-[#c44d2d]" />
                <h3 className="font-serif font-bold text-stone-900 text-base">
                  Alertas en Tiempo Real
                </h3>
              </div>
              <button
                onClick={() => setIsPanelOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 transition-colors"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>

            {/* Ajustes Rápidos & OneSignal Web Push */}
            <div className="space-y-3 mb-4 p-3.5 rounded-2xl bg-[#f7f4ee] border border-stone-200 text-xs shadow-sm">
              {/* Sección OneSignal Web Push (Web Cerrada) */}
              <div className="p-2.5 rounded-xl bg-white border border-stone-200/80 shadow-xs">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <FiSmartphone className="w-4 h-4 text-[#c44d2d]" />
                    <span className="font-bold text-stone-900 text-xs">OneSignal Web Push</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full font-mono text-[9px] font-bold uppercase tracking-wider ${
                      pushEnabled
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        : "bg-amber-100 text-amber-800 border border-amber-300"
                    }`}
                  >
                    {pushEnabled ? "Activo (Web Cerrada)" : "No configurado"}
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 leading-tight mb-2">
                  Recibe avisos de reservas en tu móvil y ordenador aunque tengas el navegador cerrado o en segundo plano.
                </p>
                <div className="flex items-center gap-2">
                  {!pushEnabled ? (
                    <button
                      onClick={handleActivatePush}
                      disabled={pushLoading}
                      className="flex-1 py-1 px-2.5 rounded-lg bg-[#c44d2d] hover:bg-[#a83f23] text-white font-mono text-[10px] font-bold tracking-wide uppercase transition-colors cursor-pointer shadow-xs disabled:opacity-50"
                    >
                      {pushLoading ? "Solicitando..." : "Activar Web Push"}
                    </button>
                  ) : (
                    <button
                      onClick={handleTestPushClosed}
                      disabled={pushTesting}
                      className="flex-1 py-1 px-2 rounded-lg bg-stone-900 hover:bg-[#c44d2d] text-white font-mono text-[10px] tracking-wider uppercase transition-colors cursor-pointer inline-flex items-center justify-center gap-1 shadow-xs disabled:opacity-50"
                      title="Pulsa, minimiza la ventana y comprueba que llega la notificación del sistema operativo"
                    >
                      <FiSend className="w-3 h-3" />
                      <span>{pushTesting ? "Enviando en 3s..." : "Probar con Web Cerrada"}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Ajuste de Sonido */}
              <div className="flex items-center justify-between px-1">
                <span className="font-medium text-stone-700">Timbre acústico de sala:</span>
                <button
                  onClick={toggleSound}
                  className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-bold ${
                    soundEnabled ? "bg-emerald-100 text-emerald-800" : "bg-stone-200 text-stone-600"
                  }`}
                >
                  {soundEnabled ? "ACTIVO" : "SILENCIADO"}
                </button>
              </div>

              {/* Permiso de escritorio */}
              <div className="flex items-center justify-between px-1 pt-1 border-t border-stone-200/60">
                <span className="font-medium text-stone-700">Alertas de Escritorio:</span>
                {desktopNotifAllowed ? (
                  <span className="text-[10px] font-mono text-emerald-700 font-bold">PERMITIDAS</span>
                ) : (
                  <button
                    onClick={requestDesktopPermission}
                    className="text-[10px] font-mono text-[#c44d2d] underline font-bold"
                  >
                    Permitir
                  </button>
                )}
              </div>
            </div>

            {/* Lista de Alertas Recientes */}
            <div className="space-y-2.5 overflow-y-auto max-h-[60vh] pr-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block mb-1">
                Últimas Solicitudes Recibidas
              </span>

              {recentAlerts.length === 0 ? (
                <div className="text-center py-8 text-stone-400 text-xs">
                  <FiCalendar className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  <p>No hay alertas recientes en esta sesión.</p>
                  <button
                    onClick={handleSimulateTest}
                    className="mt-3 px-3 py-1.5 rounded-lg bg-stone-900 text-white text-[11px] font-mono"
                  >
                    Lanzar Reserva de Prueba
                  </button>
                </div>
              ) : (
                recentAlerts.map((r, i) => (
                  <div
                    key={r.id || i}
                    className="p-3 rounded-xl border border-stone-200 bg-white hover:border-[#c44d2d]/50 transition-all text-xs"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-stone-900">{r.name}</span>
                        {r.google_verified && (
                          <span
                            className="inline-flex items-center gap-0.5 text-[9px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded font-semibold"
                            title="Cuenta Google verificada"
                          >
                            <svg className="w-2 h-2" viewBox="0 0 24 24">
                              <path fill="#EA4335" d="M12 5c1.56 0 2.96.54 4.07 1.59l3.05-3.05C17.27 1.79 14.84 1 12 1 7.42 1 3.5 3.58 1.63 7.34l3.71 2.88C6.22 7.18 8.86 5 12 5z" />
                              <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58l3.71 2.88c2.16-1.99 3.71-4.94 3.71-8.7z" />
                              <path fill="#FBBC05" d="M5.34 14.78c-.23-.68-.36-1.41-.36-2.18s.13-1.5.36-2.18L1.63 7.54C.59 9.61 0 11.97 0 14.4s.59 4.79 1.63 6.86l3.71-2.88z" />
                              <path fill="#34A853" d="M12 23c3.24 0 5.96-1.07 7.95-2.91l-3.71-2.88c-1.08.72-2.45 1.16-4.24 1.16-3.14 0-5.78-2.18-6.66-5.22L1.63 16.03C3.5 19.79 7.42 22.38 12 22.38z" />
                            </svg>
                            <span>Google</span>
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                        {r.time} h
                      </span>
                    </div>
                    <div className="text-[11px] text-stone-500 font-mono flex items-center justify-between">
                      <span>{r.guests} personas · {r.date}</span>
                      <span className="text-stone-400">{r.phone}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Footer del Panel */}
          <div className="pt-4 border-t border-stone-200">
            <button
              onClick={handleSimulateTest}
              className="w-full py-2 px-3 rounded-xl bg-stone-900 text-[#f7f4ee] text-xs font-mono tracking-wider uppercase hover:bg-[#c44d2d] transition-colors"
            >
              Simular Reserva de Prueba
            </button>
          </div>
        </div>
      )}
    </>
  );
}
