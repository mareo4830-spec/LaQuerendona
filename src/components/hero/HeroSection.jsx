import { Suspense, lazy } from "react";
import { FiArrowRight, FiArrowDown } from "react-icons/fi";

const CoffeeBeans3D = lazy(() => import("./CoffeeBeans3D"));

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-32 pb-20 md:pt-40 md:pb-28 flex flex-col justify-between overflow-hidden bg-[#f4f1ec]"
    >
      {/* 3D Organic Canvas Background (10% opacity, subtle mouse response) */}
      <Suspense fallback={null}>
        <CoffeeBeans3D />
      </Suspense>

      {/* Main Editorial Content Container */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 max-w-full overflow-hidden">
        {/* Top Technical Metadata Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-zinc-900/15 pb-4 mb-4 sm:mb-6 text-[10px] sm:text-[11px] font-mono tracking-[0.2em] sm:tracking-[0.25em] text-zinc-900/60">
          <div className="flex items-center gap-3">
            <span className="text-zinc-900 font-bold">[FOLIO 01]</span>
            <span className="truncate">GASTRONOMÍA DE ORIGEN</span>
          </div>
          <div className="mt-2 sm:mt-0 flex items-center gap-4 sm:gap-6">
            <span>HUELVA</span>
            <span>·</span>
            <span className="text-zinc-900 font-bold">RACIONES GENEROSAS</span>
          </div>
        </div>

        {/* Clear Brand Identity Eyebrow Chip */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/5 border border-zinc-900/15 mb-2 sm:mb-3">
          <span className="w-2 h-2 rounded-full bg-[#c44d2d]" />
          <span className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.25em] text-zinc-900 uppercase">
            Restaurante Colombiano · Huelva
          </span>
        </div>

        {/* CRYSTAL-CLEAR DISPLAY TITLE — Elegantly readable in Title Case across all screens */}
        <div className="w-full max-w-full my-1 sm:my-2">
          <h1 className="select-none">
            <span className="sr-only">La Querendona — Restaurante Colombiano en Huelva</span>
            <span className="block font-serif text-[clamp(2.75rem,10.5vw,9.5rem)] font-bold text-zinc-900 tracking-tight leading-[0.96]">
              La Querendona
            </span>
          </h1>
          <p className="font-mono text-[11px] sm:text-xs text-[#c44d2d] font-bold tracking-[0.22em] uppercase mt-1 sm:mt-2">
            Alta Cocina Criolla & Sabor Tradicional Campesino
          </p>
        </div>

        {/* Broken Grid: Irregular widths & overlapping content */}
        <div className="mt-6 sm:mt-10 lg:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Asymmetric Left Editorial Manifesto */}
          <div className="lg:col-span-7 lg:col-start-1 -mt-2 md:-mt-4">
            <div className="border-l-2 border-zinc-900 pl-6 py-2">
              <p className="font-serif text-xl sm:text-3xl md:text-4xl text-zinc-900 leading-[1.1] mb-4 sm:mb-6">
                La cara amable de Colombia servida en raciones de verdad. Sin atajos, sin artificios.
              </p>
              <p className="font-mono text-xs md:text-sm text-zinc-900/70 leading-relaxed max-w-xl">
                Cocinamos como en las casas campesinas de Antioquia, el Valle y el Altiplano: calderos de barro, sofrito despacito, arepas trilladas a mano y platos colmados para compartir y recordar.
              </p>
            </div>

            {/* Mobile Fast Action Buttons (< sm) */}
            <div className="flex sm:hidden flex-col gap-2.5 mt-6">
              <a
                href="#carta"
                className="btn-brutalist w-full justify-between"
              >
                <span>EXPLORAR LA CARTA (118 PLATOS)</span>
                <FiArrowRight className="w-4 h-4" />
              </a>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="#reservas"
                  className="btn-brutalist-outline text-center justify-center"
                >
                  <span>RESERVAR</span>
                </a>
                <a
                  href="tel:643931608"
                  className="btn-brutalist-outline text-center justify-center bg-stone-900 text-[#f7f4ee] border-stone-900"
                >
                  <span>LLAMAR SALA</span>
                </a>
              </div>
            </div>

            {/* Technical Specification Table */}
            <div className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 font-mono text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] uppercase border-t border-zinc-900/15 pt-5 sm:pt-6 text-zinc-900/80">
              <div>
                <span className="block text-zinc-900/40 mb-1">[LOCALIZACIÓN]</span>
                <span>C. Bonares, 5</span>
                <span className="block text-zinc-900/50">21007 Huelva</span>
              </div>
              <div>
                <span className="block text-zinc-900/40 mb-1">[CONTACTO]</span>
                <span className="text-zinc-900 font-bold">643 93 16 08</span>
                <span className="block text-zinc-900/50">Reservas directas</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="block text-zinc-900/40 mb-1">[ESTILO DE MESA]</span>
                <span>Ración Abundante</span>
                <span className="block text-zinc-900/50">Cocina Criolla</span>
              </div>
            </div>
          </div>

          {/* Asymmetric Right Actions & Solitary Photo Plate Frame (5 cols on desktop) */}
          <div className="lg:col-span-5 lg:col-start-8 flex flex-col gap-6 lg:-mt-10">
            {/* Visual Stamp Card (Sharp brutalist container with negative overlap) */}
            <div className="relative border border-zinc-900/20 bg-[#ebe6dd] p-6 lg:p-8">
              <div className="flex items-center justify-between text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-900/50 mb-4 pb-2 border-b border-zinc-900/10">
                <span>PLATO EMBLEMÁTICO</span>
                <span>[01 / 12]</span>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl text-zinc-900 mb-2">
                Bandeja Paisa Monumental
              </h3>
              <p className="font-mono text-xs text-zinc-900/70 mb-6 leading-relaxed">
                Nueve guarniciones en equilibrio campesino: frijoles cargamanto en salsa densa, chicharrón ondulado de corteza crujiente, carne molida en su jugo, chorizo campesino, tajada de plátano maduro, aguacate cremoso, huevo de corral y arepa de maíz blanco.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#carta"
                  className="btn-brutalist flex-1 text-center justify-center gap-2 inline-flex items-center"
                >
                  <span>EXPLORAR LA CARTA</span>
                  <FiArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#reservas"
                  className="btn-brutalist-outline flex-1 text-center justify-center gap-2 inline-flex items-center"
                >
                  <span>RESERVAR MESA</span>
                </a>
              </div>
            </div>

            {/* Quick editorial note */}
            <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-900/40 flex items-center justify-between px-2">
              <span>* SE RECOMIENDA RESERVA PREVIA</span>
              <span>TURNO ALMUERZO & CENA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Technical Border with Coordinates */}
      <div className="relative z-10 px-6 lg:px-12 mt-16 pt-4 border-t border-zinc-900/15 flex flex-wrap items-center justify-between font-mono text-[10px] tracking-[0.25em] text-zinc-900/50 uppercase">
        <div>EDICIÓN IMPRESA & GASTRONÓMICA · HUELVA © {new Date().getFullYear()}</div>
        <div className="flex items-center gap-2">
          <span>DESLIZA HACIA LA TRADICIÓN</span>
          <FiArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
