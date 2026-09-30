import { useState, useEffect } from "react";
import { useReservations } from "../../hooks/useReservations";
import { sanitizeReservation } from "../../lib/security";
import {
  getStoredGoogleVerification,
  verifyEmailWithGoogle,
  clearGoogleVerification,
  checkSupabaseOAuthRedirect,
} from "../../lib/googleAuth";
import GoogleVerifyModal from "./GoogleVerifyModal";
import { FiArrowRight, FiCheck, FiShield, FiAlertCircle, FiBell } from "react-icons/fi";
import toast from "react-hot-toast";
import { requestPushPermission, isPushPermissionGranted } from "../../lib/onesignal";

// Icono vectorial oficial de Google
function GoogleIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}

const timeSlots = [
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "20:30", "21:00", "21:30", "22:00", "22:30",
];

export default function ReservationForm() {
  const { addReservation } = useReservations();
  const [submitted, setSubmitted] = useState(false);
  const [ticketData, setTicketData] = useState(null);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);

  // Estado de usuario verificado con Google
  const [googleUser, setGoogleUser] = useState(() => getStoredGoogleVerification());
  const [pushSubscribed, setPushSubscribed] = useState(() => isPushPermissionGranted());

  const [form, setForm] = useState({
    name: googleUser?.name || "",
    email: googleUser?.email || "",
    phone: "",
    date: "",
    time: "14:00",
    guests: 2,
    notes: "",
  });

  const today = new Date().toISOString().split("T")[0];

  // Comprobar si regresa de redirect de OAuth y escuchar eventos de verificación
  useEffect(() => {
    async function checkRedirect() {
      const user = await checkSupabaseOAuthRedirect();
      if (user) {
        setGoogleUser(user);
        setForm((prev) => ({
          ...prev,
          email: user.email,
          name: prev.name || user.name || "",
        }));
        toast.success(`Correo verificado por Google: ${user.email}`);
      }
    }
    checkRedirect();

    const handleGoogleCompleted = (e) => {
      if (e.detail && e.detail.verified) {
        setGoogleUser(e.detail);
        setForm((prev) => ({
          ...prev,
          email: e.detail.email,
          name: prev.name || e.detail.name || "",
        }));
        toast.success(`Correo verificado por Google: ${e.detail.email}`);
      }
    };

    window.addEventListener("laquerendona:google-auth-completed", handleGoogleCompleted);
    return () => {
      window.removeEventListener("laquerendona:google-auth-completed", handleGoogleCompleted);
    };
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleStartGoogleVerify = async () => {
    setVerifying(true);
    try {
      const result = await verifyEmailWithGoogle({
        email: form.email,
        name: form.name,
      });
      if (result?.user) {
        setGoogleUser(result.user);
        setForm((prev) => ({
          ...prev,
          email: result.user.email,
          name: prev.name || result.user.name || "",
        }));
        toast.success(`Identidad verificada: ${result.user.email}`);
      }
    } catch (err) {
      toast.error(err.message || "Error al verificar con Google.");
    } finally {
      setVerifying(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Comprobación de seguridad: Verificación obligatoria de Google
    if (!googleUser || !googleUser.email) {
      toast.error("Es obligatorio verificar tu correo con Google para evitar reservas falsas.");
      handleStartGoogleVerify();
      return;
    }

    if (!form.date) {
      toast.error("Por favor selecciona una fecha.");
      return;
    }

    const payloadToClean = {
      ...form,
      email: googleUser.email,
      google_verified: true,
      google_email: googleUser.email,
      google_id: googleUser.googleId,
      verified_at: new Date().toISOString(),
    };

    const cleanData = sanitizeReservation(payloadToClean);
    if (!cleanData || !cleanData.name || !cleanData.phone) {
      toast.error("Por favor completa el nombre y teléfono de contacto.");
      return;
    }

    setSending(true);

    try {
      await addReservation(cleanData);
      setTicketData({ ...cleanData, id: `LQ-${Math.floor(1000 + Math.random() * 9000)}` });
      setSubmitted(true);
      toast.success("Reserva verificada y registrada en el sistema de sala.", {
        style: {
          background: "#201915",
          color: "#f7f4ee",
          borderRadius: "12px",
          fontSize: "12px",
        },
      });
    } catch (err) {
      toast.error("Error al procesar la reserva. Inténtalo de nuevo.");
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="reservas" className="py-16 sm:py-28 md:py-36 px-4 sm:px-6 lg:px-12 bg-[#f4f1ec] border-t border-zinc-900/15">
      <div className="max-w-7xl mx-auto">
        {/* Section Index Header */}
        <div className="flex items-center gap-3 font-mono text-[10px] sm:text-[11px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-zinc-900/60 mb-4">
          <span className="w-6 sm:w-8 h-px bg-zinc-900/40" />
          <span>[SECCIÓN EDITORIAL 03]</span>
          <span>·</span>
          <span>SISTEMA DE SALA & RESERVAS VERIFICADAS</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left Column: Massive Serif & House Protocol */}
          <div className="lg:col-span-5">
            <h2 className="font-serif text-[clamp(2.25rem,6.5vw,5rem)] font-normal leading-[0.9] text-zinc-900 uppercase mb-6 sm:mb-8">
              Asegurar
              <br />
              <span className="italic font-light">Tu Mesa</span>
            </h2>

            <div className="space-y-6 font-mono text-xs text-zinc-900/70 border-l-2 border-zinc-900 pl-4 sm:pl-6 py-2">
              <p className="leading-relaxed">
                Nuestras raciones son abundantes y nuestros platos se preparan con caldos de lenta cocción. Para evitar mesas bloqueadas falsamente, cada reserva cuenta con verificación de identidad con Google.
              </p>
              <div className="border-t border-zinc-900/10 pt-4 space-y-2 text-[10px] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-zinc-900/60">
                <div>[DIRECCIÓN] C. Bonares, 5 · 21007 Huelva</div>
                <div>[TELÉFONO DE SALA] 643 93 16 08</div>
                <div>[TOLERANCIA] 15 minutos de cortesía</div>
                <div>[VERIFICACIÓN] Autenticación Google obligatoria</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form with Google Verification */}
          <div className="lg:col-span-7">
            {submitted && ticketData ? (
              /* Confirmation Ticket */
              <div className="border border-zinc-900/20 bg-[#ebe6dd] p-6 sm:p-10 md:p-12 animate-spring-in">
                <div className="flex items-center justify-between pb-4 border-b border-zinc-900/15 mb-6">
                  <span className="font-mono text-xs tracking-widest uppercase text-zinc-900/60">
                    VALE DE RESERVA CONFIRMADO
                  </span>
                  <span className="font-mono text-xs font-bold text-zinc-900">
                    {ticketData.id}
                  </span>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-mono font-bold mb-4">
                  <FiCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>CORREO VERIFICADO POR GOOGLE ({ticketData.email})</span>
                </div>

                <h3 className="font-serif text-3xl md:text-4xl text-zinc-900 mb-6">
                  Mesa asignada para {ticketData.name}
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-zinc-900/15 font-mono text-xs uppercase mb-8">
                  <div>
                    <span className="block text-zinc-900/40 text-[9px]">FECHA</span>
                    <span className="font-bold text-zinc-900">{ticketData.date}</span>
                  </div>
                  <div>
                    <span className="block text-zinc-900/40 text-[9px]">HORA</span>
                    <span className="font-bold text-zinc-900">{ticketData.time}</span>
                  </div>
                  <div>
                    <span className="block text-zinc-900/40 text-[9px]">COMENSALES</span>
                    <span className="font-bold text-zinc-900">{ticketData.guests} personas</span>
                  </div>
                  <div>
                    <span className="block text-zinc-900/40 text-[9px]">TELÉFONO</span>
                    <span className="font-bold text-zinc-900">{ticketData.phone}</span>
                  </div>
                </div>

                <p className="font-mono text-xs text-zinc-900/70 mb-6 leading-relaxed">
                  Te esperamos en C. Bonares, 5 (Huelva). Si necesitas modificar o cancelar la reserva, llámanos al 643 93 16 08 indicando tu código de reserva [{ticketData.id}].
                </p>

                {/* Notificaciones Web Push de confirmación de mesa */}
                {!pushSubscribed && (
                  <div className="mb-6 p-4 bg-white/80 border border-stone-300 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left shadow-xs">
                    <div className="flex items-start gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#c44d2d]/10 text-[#c44d2d] flex items-center justify-center shrink-0 mt-0.5">
                        <FiBell className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-stone-900 font-mono uppercase tracking-wider">
                          Avisos de sala en tu móvil
                        </p>
                        <p className="text-[11px] text-stone-600 font-mono mt-0.5">
                          Recibe un aviso al instante cuando confirmemos tu mesa, incluso con la web cerrada.
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={async () => {
                        const ok = await requestPushPermission();
                        if (ok) {
                          setPushSubscribed(true);
                          toast.success("¡Alertas push activadas para tu reserva!");
                        }
                      }}
                      className="shrink-0 py-1.5 px-3 rounded-lg bg-[#c44d2d] hover:bg-[#a83f23] text-white font-mono text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer text-center"
                    >
                      Activar Avisos
                    </button>
                  </div>
                )}

                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({
                      name: googleUser?.name || "",
                      email: googleUser?.email || "",
                      phone: "",
                      date: "",
                      time: "14:00",
                      guests: 2,
                      notes: "",
                    });
                  }}
                  className="btn-brutalist w-full justify-center inline-flex items-center gap-2"
                >
                  <span>REALIZAR OTRA RESERVA</span>
                  <FiArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              /* The Form */
              <form
                onSubmit={handleSubmit}
                className="border border-zinc-900/20 bg-[#ebe6dd] p-5 sm:p-8 md:p-12 space-y-6 sm:space-y-8"
              >
                <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-zinc-900/15 font-mono text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] text-zinc-900/60 uppercase">
                  <span>EXPEDICIÓN DE VALE DE SALA</span>
                  <span>HUELVA, COL</span>
                </div>

                {/* ─── TARJETA DE VERIFICACIÓN DE GOOGLE (ANTI-RESERVAS FALSAS) ─── */}
                <div className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                  googleUser
                    ? "bg-emerald-50/90 border-emerald-300 text-emerald-950 shadow-xs"
                    : "bg-white/90 border-stone-300 text-stone-900 shadow-sm"
                }`}>
                  {googleUser ? (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                          <FiCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs sm:text-sm text-emerald-950">
                              Correo Verificado por Google
                            </span>
                            <span className="text-[9px] font-mono uppercase bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded font-bold">
                              AUTÉNTICO
                            </span>
                          </div>
                          <span className="font-mono text-xs text-emerald-800 font-semibold block mt-0.5">
                            {googleUser.email}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          clearGoogleVerification();
                          setGoogleUser(null);
                          setForm((prev) => ({ ...prev, email: "" }));
                          toast.success("Verificación de Google reiniciada.");
                        }}
                        className="text-[11px] font-mono text-emerald-800 underline hover:text-emerald-950 self-start sm:self-auto cursor-pointer"
                      >
                        Cambiar cuenta
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <FiShield className="w-4 h-4 text-[#c44d2d]" />
                          <span className="font-serif font-bold text-sm text-stone-900">
                            Verificación de Correo con Google
                          </span>
                        </div>
                        <p className="font-mono text-[11px] text-stone-600 leading-relaxed max-w-md">
                          Para garantizar que no haya reservas falsas y asegurar tu mesa en sala, valida tu identidad con Google antes de reservar.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleStartGoogleVerify}
                        disabled={verifying}
                        className="px-4 py-2.5 rounded-xl bg-white border border-stone-300 hover:border-[#c44d2d] shadow-sm hover:shadow text-stone-800 text-xs font-semibold inline-flex items-center justify-center gap-2.5 transition-all cursor-pointer shrink-0 active:scale-[0.98]"
                      >
                        <GoogleIcon className="w-4 h-4" />
                        <span>{verifying ? "Verificando..." : "Verificar con Google"}</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Campos del Formulario */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <div>
                    <label htmlFor="res-name" className="label-technical">
                      [01] NOMBRE Y APELLIDOS *
                    </label>
                    <input
                      type="text"
                      id="res-name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Ej. Mateo Gómez"
                      className="input-brutalist"
                    />
                  </div>

                  <div>
                    <label htmlFor="res-phone" className="label-technical">
                      [02] TELÉFONO DE CONTACTO *
                    </label>
                    <input
                      type="tel"
                      id="res-phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      placeholder="+34 600 000 000"
                      className="input-brutalist"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <div>
                    <label htmlFor="res-email" className="label-technical flex items-center justify-between">
                      <span>[03] CORREO ELECTRÓNICO *</span>
                      {googleUser && (
                        <span className="text-[9px] font-mono text-emerald-700 font-bold uppercase inline-flex items-center gap-1">
                          <FiCheck className="w-3 h-3" /> Verificado por Google
                        </span>
                      )}
                    </label>
                    <input
                      type="email"
                      id="res-email"
                      name="email"
                      value={googleUser ? googleUser.email : form.email}
                      onChange={handleChange}
                      required
                      readOnly={Boolean(googleUser)}
                      placeholder={googleUser ? googleUser.email : "Verifica arriba con Google"}
                      className={`input-brutalist ${
                        googleUser
                          ? "bg-emerald-50/60 border-emerald-400 text-emerald-950 font-semibold cursor-not-allowed"
                          : ""
                      }`}
                    />
                  </div>

                  <div>
                    <label htmlFor="res-guests" className="label-technical">
                      [04] NÚMERO DE COMENSALES
                    </label>
                    <select
                      id="res-guests"
                      name="guests"
                      value={form.guests}
                      onChange={handleChange}
                      className="input-brutalist cursor-pointer bg-transparent"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <option key={n} value={n} className="bg-[#ebe6dd] text-zinc-900">
                          {n} {n === 1 ? "Comensal" : "Comensales"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <div>
                    <label htmlFor="res-date" className="label-technical">
                      [05] FECHA DE LA RESERVA *
                    </label>
                    <input
                      type="date"
                      id="res-date"
                      name="date"
                      min={today}
                      value={form.date}
                      onChange={handleChange}
                      required
                      className="input-brutalist cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="label-technical mb-2 block">
                      [06] FRANJA HORARIA *
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
                      {timeSlots.map((slot) => {
                        const isSelected = form.time === slot;
                        return (
                          <button
                            type="button"
                            key={slot}
                            onClick={() => setForm((prev) => ({ ...prev, time: slot }))}
                            className={`px-3 py-2 text-xs font-mono tracking-wider border transition-all cursor-pointer min-h-[38px] ${
                              isSelected
                                ? "bg-zinc-900 text-[#f4f1ec] border-zinc-900 font-bold"
                                : "bg-transparent text-zinc-900 border-zinc-900/30 hover:border-zinc-900"
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="res-notes" className="label-technical">
                    [07] PETICIONES ESPECIALES O ALERGIAS (OPCIONAL)
                  </label>
                  <input
                    type="text"
                    id="res-notes"
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    placeholder="Ej. Aniversario, trona infantil, alergia al marisco..."
                    className="input-brutalist"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="btn-brutalist w-full cursor-pointer disabled:opacity-50 inline-flex items-center justify-between"
                >
                  <span>{sending ? "REGISTRANDO RESERVA..." : "EMITIR RESERVA DE MESA"}</span>
                  <FiArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Verificación con Google */}
      <GoogleVerifyModal />
    </section>
  );
}
