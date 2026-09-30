import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, isFirebaseConfigured } from "../lib/firebase";
import {
  checkLoginAttempts,
  recordFailedLogin,
  resetLoginAttempts,
  createAdminSession,
  sanitizeString,
} from "../lib/security";
import { FiShield, FiLock, FiInfo, FiArrowLeft, FiArrowRight } from "react-icons/fi";
import toast from "react-hot-toast";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(isFirebaseConfigured ? "" : "admin@laquerendona.com");
  const [password, setPassword] = useState(isFirebaseConfigured ? "" : "admin123");
  const [loading, setLoading] = useState(false);
  const [securityStatus, setSecurityStatus] = useState(() => checkLoginAttempts());

  useEffect(() => {
    setSecurityStatus(checkLoginAttempts());
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Verify rate limit
    const check = checkLoginAttempts();
    if (!check.allowed) {
      toast.error(
        `Acceso bloqueado por seguridad. Demasiados intentos fallidos. Espere ${check.waitSeconds} segundos.`,
        { duration: 5000 }
      );
      setSecurityStatus(check);
      return;
    }

    setLoading(true);

    try {
      const cleanEmail = sanitizeString(email, 100);

      if (isFirebaseConfigured && auth) {
        await signInWithEmailAndPassword(auth, cleanEmail, password);
        createAdminSession(cleanEmail);
      } else {
        // Local mode authentication
        if (password.length < 4) {
          recordFailedLogin();
          setSecurityStatus(checkLoginAttempts());
          toast.error("La clave debe tener al menos 4 caracteres.");
          setLoading(false);
          return;
        }
        createAdminSession(cleanEmail || "admin@laquerendona.com");
      }

      resetLoginAttempts();
      toast.success("Acceso concedido al panel de administración.");
      navigate("/admin/panel");
    } catch (err) {
      const updatedStatus = recordFailedLogin();
      setSecurityStatus(updatedStatus);

      if (!updatedStatus.allowed) {
        toast.error(
          `Bloqueo temporal por protección de fuerza bruta (${updatedStatus.waitSeconds}s).`,
          { duration: 6000 }
        );
      } else {
        toast.error(
          `Credenciales no válidas. Intentos restantes antes del bloqueo: ${updatedStatus.remaining}`
        );
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f4ee] text-[#1a1715] flex items-center justify-center px-4 py-16 selection:bg-[#201915] selection:text-[#f7f4ee]">
      <div className="w-full max-w-md bg-[#fdfcfa] border border-stone-200/80 rounded-3xl p-8 sm:p-10 shadow-[0_8px_30px_rgba(32,25,21,0.06)] animate-spring-in">
        
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 transition-colors mb-6 group"
        >
          <FiArrowLeft className="transition-transform group-hover:-translate-x-0.5" />
          <span>Volver a La Querendona</span>
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-stone-100 text-stone-700 border border-stone-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>SISTEMA DE SALA</span>
            </span>
            <span className="text-[11px] font-mono text-stone-500 uppercase">
              {isFirebaseConfigured ? "Firebase Cloud" : "Almacenamiento Seguro"}
            </span>
          </div>

          <h1 className="font-serif text-3xl font-bold text-stone-900 tracking-tight">
            Acceso al Panel
          </h1>
          <p className="text-xs text-stone-600 mt-2 leading-relaxed">
            Gestión interna de productos, precios, disponibilidad de sala y reservas.
          </p>
        </div>

        {/* Security Alert if locked */}
        {!securityStatus.allowed && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
            <p className="font-bold flex items-center gap-1.5">
              <FiLock className="w-3.5 h-3.5" />
              <span>Bloqueo de seguridad preventivo</span>
            </p>
            <p className="mt-1 text-rose-700">
              Por protección contra intentos automatizados, debe esperar {securityStatus.waitSeconds} segundos.
            </p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="admin-email" className="label-refined">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="admin-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="admin@laquerendona.com"
              className="input-refined"
              disabled={loading || !securityStatus.allowed}
            />
          </div>

          <div>
            <label htmlFor="admin-password" className="label-refined">
              Contraseña
            </label>
            <input
              type="password"
              id="admin-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="input-refined font-mono"
              disabled={loading || !securityStatus.allowed}
            />
          </div>

          {/* Preset demo credentials notice */}
          {!isFirebaseConfigured && (
            <div className="p-3.5 rounded-xl bg-stone-100 border border-stone-200 text-[11px] text-stone-800 flex items-start gap-2.5">
              <FiInfo className="w-4 h-4 text-stone-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block text-stone-900">Credenciales asignadas:</span>
                <span className="block mt-0.5 text-stone-600 font-mono text-[10px]">
                  admin@laquerendona.com · admin123
                </span>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !securityStatus.allowed}
            className="w-full btn-primary py-3 text-sm font-semibold rounded-xl inline-flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Verificando credenciales...</span>
              </span>
            ) : (
              <>
                <span>Iniciar Sesión</span>
                <FiArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-stone-200/60 text-center">
          <p className="text-[10px] text-stone-400 font-mono flex items-center justify-center gap-1.5 uppercase tracking-wider">
            <FiShield className="w-3 h-3 text-stone-400" />
            <span>OWASP Sanitize &amp; Rate-Limiting Activo</span>
          </p>
        </div>
      </div>
    </div>
  );
}
