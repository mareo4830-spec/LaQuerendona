import { Link } from "react-router-dom";
import { FiArrowUpRight, FiArrowRight } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-[#f4f1ec] pt-24 pb-12 px-6 lg:px-12 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto">
        {/* Massive Serif Footer Masthead */}
        <div className="pb-16 border-b border-[#f4f1ec]/15">
          <div className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#c44d2d] mb-4 font-bold">
            <span className="w-2 h-2 rounded-full bg-[#c44d2d]" />
            <span>RESTAURANTE COLOMBIANO · HUELVA</span>
          </div>
          <h2 className="font-serif text-[clamp(2.75rem,8vw,7.5rem)] font-bold leading-[0.95] text-[#f4f1ec] tracking-tight">
            La Querendona
          </h2>
          <p className="font-mono text-xs md:text-sm text-[#f4f1ec]/70 mt-4 tracking-widest uppercase">
            Auténtica Cocina Campesina & Raciones Generosas · C. Bonares, 5 · 21007 Huelva · Tel. 643 93 16 08
          </p>
        </div>

        {/* 4-Column Technical Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16 border-b border-[#f4f1ec]/15 font-mono text-xs">
          <div>
            <span className="block text-[10px] text-[#f4f1ec]/40 tracking-[0.25em] uppercase mb-4">
              [01 / SALA]
            </span>
            <ul className="space-y-2 text-[#f4f1ec]/80 uppercase text-[11px] tracking-wider">
              <li>
                <Link to="/carta" className="text-emerald-400 hover:text-emerald-300 transition-colors font-bold inline-flex items-center gap-1">
                  <span>Carta Digital NFC Mesa</span>
                  <FiArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
              <li><a href="#carta" className="hover:text-[#f4f1ec] transition-colors">La Carta de Platos</a></li>
              <li><a href="#tradicion" className="hover:text-[#f4f1ec] transition-colors">Construcción Criolla</a></li>
              <li><a href="#reservas" className="hover:text-[#f4f1ec] transition-colors">Reservar una Mesa</a></li>
              <li><a href="#contacto" className="hover:text-[#f4f1ec] transition-colors">Localización y Horarios</a></li>
            </ul>
          </div>

          <div>
            <span className="block text-[10px] text-[#f4f1ec]/40 tracking-[0.25em] uppercase mb-4">
              [02 / LOCALIZACIÓN]
            </span>
            <div className="text-[#f4f1ec]/80 space-y-1">
              <p className="font-bold text-[#f4f1ec]">C. Bonares, 5</p>
              <p>21007 Huelva</p>
              <p>Andalucía, España</p>
              <p className="text-[#f4f1ec]/50 text-[10px] pt-2">GPS: 37.2614° N, 6.9447° W</p>
            </div>
          </div>

          <div>
            <span className="block text-[10px] text-[#f4f1ec]/40 tracking-[0.25em] uppercase mb-4">
              [03 / ATENCIÓN]
            </span>
            <div className="text-[#f4f1ec]/80 space-y-1">
              <p className="font-bold text-[#f4f1ec]">TEL: 643 93 16 08</p>
              <p>Reservas telefónicas</p>
              <p>Consultas de alérgenos</p>
              <p className="text-[#f4f1ec]/50 text-[10px] pt-2">Servicio en sala y take-away</p>
            </div>
          </div>

          <div>
            <span className="block text-[10px] text-[#f4f1ec]/40 tracking-[0.25em] uppercase mb-4">
              [04 / GESTIÓN]
            </span>
            <div className="space-y-3">
              <p className="text-[#f4f1ec]/70 text-[11px] leading-relaxed">
                Panel exclusivo de sala para gestión de reservas y carta en tiempo real.
              </p>
              <Link
                to="/admin"
                className="inline-flex items-center gap-1.5 border border-[#f4f1ec]/30 px-3 py-1.5 text-[10px] tracking-widest text-[#f4f1ec] hover:border-[#f4f1ec] hover:bg-[#f4f1ec] hover:text-zinc-900 transition-all uppercase"
              >
                <span>ACCESO ADMINISTRACIÓN</span>
                <FiArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Imprint */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between font-mono text-[10px] tracking-[0.25em] uppercase text-[#f4f1ec]/40">
          <div>
            LA QUERENDONA RESTAURANTE © {new Date().getFullYear()} · HUELVA, ESPAÑA
          </div>
          <div className="mt-3 sm:mt-0">
            DISEÑO EDITORIAL & BRUTALISTA · SIN PLANTILLAS
          </div>
        </div>
      </div>
    </footer>
  );
}
