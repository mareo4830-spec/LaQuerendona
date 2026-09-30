import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiSettings, FiMenu, FiX, FiArrowUpRight, FiArrowRight } from "react-icons/fi";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { num: "01", label: "CARTA", href: "#carta" },
    { num: "02", label: "LA TRADICIÓN", href: "#tradicion" },
    { num: "03", label: "RESERVAS", href: "#reservas" },
    { num: "04", label: "CONTACTO", href: "#contacto" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#f4f1ec]/95 backdrop-blur-md border-b border-zinc-900/20"
          : "bg-transparent border-b border-zinc-900/15"
      }`}
    >
      {/* Top Editorial Folio Line (hidden on smallest screens) */}
      <div className="hidden lg:flex items-center justify-between px-6 lg:px-12 py-1.5 text-[10px] font-mono tracking-[0.25em] text-zinc-900/70 border-b border-zinc-900/10">
        <div>
          <span>VOL. 01 / EDICIÓN HUELVA</span>
          <span className="mx-3 opacity-30">|</span>
          <span>COCINA TRADICIONAL & RACIONES GENEROSAS</span>
        </div>
        <div className="flex items-center gap-6">
          <span>COORD: 37°15&apos;N 6°57&apos;W</span>
          <span className="opacity-30">|</span>
          <span className="text-zinc-900 font-bold">TEL: 643 93 16 08</span>
        </div>
      </div>

      {/* Main Asymmetric Masthead Bar */}
      <div className="px-4 sm:px-6 lg:px-12 py-3.5 sm:py-4 flex items-center justify-between">
        {/* Brand Lockup */}
        <Link
          to="/"
          className="group flex items-center gap-2.5 sm:gap-3 text-zinc-900 transition-all duration-200"
          aria-label="La Querendona - Restaurante Colombiano"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-zinc-900 text-[#f7f4ee] flex items-center justify-center font-serif font-bold text-base sm:text-lg shadow-sm group-hover:bg-[#c44d2d] transition-colors shrink-0">
            Q
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 leading-none">
              La Querendona
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.24em] text-[#c44d2d] font-bold uppercase leading-tight mt-0.5">
              Restaurante Colombiano
            </span>
          </div>
        </Link>

        {/* Asymmetric Technical Nav Links */}
        <nav className="hidden lg:flex items-center gap-8 text-[11px] font-mono tracking-[0.2em]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group flex items-center gap-1.5 py-1 text-zinc-900/70 hover:text-zinc-900 transition-colors"
            >
              <span className="text-[9px] text-zinc-900/40 group-hover:text-zinc-900">
                [{link.num}]
              </span>
              <span className="relative">
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-zinc-900 transition-all duration-300 group-hover:w-full" />
              </span>
            </a>
          ))}
        </nav>

        {/* Action buttons & Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/admin"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-mono tracking-widest text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-200 transition-colors"
            title="Panel de administración de carta y sala"
          >
            <FiSettings className="w-3.5 h-3.5" />
            <span>ADMIN</span>
          </Link>

          <Link
            to="/carta"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-xl border border-emerald-800/30 bg-emerald-50 text-emerald-900 text-[10px] font-mono tracking-[0.2em] uppercase hover:bg-emerald-900 hover:text-[#f4f1ec] transition-all duration-200 shadow-sm"
            title="Carta digital para clientes con NFC o móvil"
          >
            <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-pulse" />
            <span>CARTA NFC</span>
            <FiArrowUpRight className="w-3 h-3" />
          </Link>

          <a
            href="#reservas"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-zinc-900 bg-zinc-900 text-[#f4f1ec] text-[10px] font-mono tracking-[0.2em] uppercase hover:bg-[#382b24] transition-all duration-200 shadow-sm"
          >
            <span>RESERVAR</span>
            <FiArrowRight className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-900 hover:bg-zinc-200/50 rounded-lg transition-colors flex items-center justify-center"
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Luxury Mobile Slide-Over Sheet */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-[#f4f1ec]/98 backdrop-blur-xl flex flex-col justify-between p-6 overflow-y-auto animate-spring-in">
          {/* Top Sheet Header */}
          <div className="flex items-center justify-between pb-4 border-b border-zinc-900/15">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 text-[#f7f4ee] flex items-center justify-center font-serif font-bold text-xl shadow-sm shrink-0">
                Q
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-zinc-900 block leading-tight">
                  La Querendona
                </span>
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#c44d2d] font-bold block">
                  Restaurante Colombiano · Huelva
                </span>
              </div>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-10 h-10 rounded-full border border-zinc-900/20 bg-[#ebe6dd] flex items-center justify-center text-zinc-900 cursor-pointer active:scale-90 transition-transform"
              aria-label="Cerrar menú"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="py-8 space-y-4">
            <span className="block font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-900/40 pb-1">
              [DIRECTORIO DE SALA]
            </span>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="group flex items-baseline justify-between py-2 border-b border-zinc-900/10 active:opacity-70 transition-opacity"
              >
                <span className="font-serif text-3xl text-zinc-900 group-hover:text-[#c44d2d] transition-colors">
                  {link.label}
                </span>
                <span className="font-mono text-xs text-zinc-900/40">
                  [{link.num}]
                </span>
              </a>
            ))}

            <Link
              to="/carta"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-4 rounded-2xl border-2 border-emerald-800/40 bg-emerald-50 text-emerald-950 font-mono text-xs uppercase tracking-widest mt-6 shadow-sm"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 bg-emerald-600 animate-pulse rounded-full" />
                <span className="font-bold">CARTA DIGITAL NFC COMPLETA (118)</span>
              </div>
              <FiArrowUpRight className="w-4 h-4 text-emerald-800" />
            </Link>
          </div>

          {/* Bottom Dossier & Action Callouts */}
          <div className="space-y-4 pt-4 border-t border-zinc-900/15 font-mono text-xs">
            <div className="grid grid-cols-2 gap-3 text-[11px] text-zinc-900/70">
              <div className="p-3 bg-[#ebe6dd] border border-zinc-900/10 rounded-xl">
                <span className="block text-[9px] text-zinc-900/40 uppercase tracking-widest mb-1">
                  [SALA &amp; RESERVAS]
                </span>
                <a href="tel:643931608" className="font-bold text-zinc-900 text-xs">
                  643 93 16 08
                </a>
              </div>
              <div className="p-3 bg-[#ebe6dd] border border-zinc-900/10 rounded-xl">
                <span className="block text-[9px] text-zinc-900/40 uppercase tracking-widest mb-1">
                  [LOCALIZACIÓN]
                </span>
                <span className="font-bold text-zinc-900 text-xs">
                  C. Bonares, 5 · Huelva
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <a
                href="#reservas"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 py-3.5 bg-zinc-900 text-[#f4f1ec] text-center font-mono text-xs uppercase tracking-[0.2em] rounded-xl flex items-center justify-center gap-2 font-bold shadow-md"
              >
                <span>RESERVAR MESA</span>
                <FiArrowRight className="w-4 h-4" />
              </a>

              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3.5 bg-[#ebe6dd] border border-zinc-900/20 text-zinc-800 rounded-xl flex items-center justify-center"
                title="Panel de administración"
              >
                <FiSettings className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
