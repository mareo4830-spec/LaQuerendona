import { Link, useLocation } from "react-router-dom";
import { FiBookOpen, FiCalendar, FiPhone, FiMapPin } from "react-icons/fi";
import { officialRestaurantInfo } from "../../data/officialMenu";

export default function MobileBottomNav() {
  const location = useLocation();
  const isCartaPage = location.pathname === "/carta" || location.pathname === "/menu";
  const isAdmin = location.pathname.startsWith("/admin");

  // No mostrar en panel de administración para dejar el espacio de trabajo limpio
  if (isAdmin) return null;

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    "La Querendona, Calle Bonares 5, 21007 Huelva"
  )}`;

  return (
    <nav
      aria-label="Navegación rápida móvil"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#fdfcfa]/95 backdrop-blur-lg border-t border-stone-200/90 shadow-[0_-4px_20px_rgba(26,23,21,0.08)] px-2 py-1.5 transition-all"
    >
      <div className="max-w-md mx-auto grid grid-cols-4 gap-1 items-center">
        {/* Carta Digital */}
        {isCartaPage ? (
          <Link
            to="/"
            className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-stone-700 active:scale-95 transition-transform"
          >
            <span className="w-5 h-5 flex items-center justify-center mb-0.5">
              <span className="w-2 h-2 rounded-full bg-stone-900" />
            </span>
            <span className="font-mono text-[10px] tracking-wider uppercase font-semibold text-stone-900">
              Inicio
            </span>
          </Link>
        ) : (
          <Link
            to="/carta"
            className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-stone-700 active:scale-95 transition-transform"
          >
            <FiBookOpen className="w-5 h-5 mb-0.5 text-[#c44d2d]" />
            <span className="font-mono text-[10px] tracking-wider uppercase font-semibold text-stone-900">
              Carta (118)
            </span>
          </Link>
        )}

        {/* Reservar Mesa */}
        <a
          href={isCartaPage ? "/#reservas" : "#reservas"}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-stone-700 active:scale-95 transition-transform"
        >
          <FiCalendar className="w-5 h-5 mb-0.5 text-stone-800" />
          <span className="font-mono text-[10px] tracking-wider uppercase font-semibold text-stone-800">
            Reservar
          </span>
        </a>

        {/* Llamada Directa */}
        <a
          href={`tel:${officialRestaurantInfo.phone}`}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-stone-900 text-[#f7f4ee] shadow-sm active:scale-95 transition-transform"
        >
          <FiPhone className="w-4 h-4 mb-0.5" />
          <span className="font-mono text-[10px] tracking-wider uppercase font-bold">
            Llamar
          </span>
        </a>

        {/* Cómo Llegar (Google Maps) */}
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-stone-700 active:scale-95 transition-transform"
        >
          <FiMapPin className="w-5 h-5 mb-0.5 text-stone-800" />
          <span className="font-mono text-[10px] tracking-wider uppercase font-semibold text-stone-800">
            Ubicación
          </span>
        </a>
      </div>
    </nav>
  );
}
