export default function AboutSection() {
  return (
    <section id="contacto" className="py-16 sm:py-28 md:py-36 px-4 sm:px-6 lg:px-12 bg-[#f4f1ec] border-t border-zinc-900/15">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 font-mono text-[10px] sm:text-[11px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-zinc-900/60 mb-4">
          <span className="w-6 sm:w-8 h-px bg-zinc-900/40" />
          <span>[SECCIÓN EDITORIAL 04]</span>
          <span>·</span>
          <span>EL MANIFIESTO & LOCALIZACIÓN</span>
        </div>

        {/* Big Statement Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-12 sm:mb-20">
          <div className="lg:col-span-8">
            <h2 className="font-serif text-[clamp(2rem,6vw,4.5rem)] font-normal leading-[0.92] text-zinc-900 uppercase">
              La Querendona:
              <br />
              <span className="italic font-light">Amor por la Cocina de Casa</span>
            </h2>
          </div>

          <div className="lg:col-span-4 font-mono text-xs text-zinc-900/75 leading-relaxed border-l border-zinc-900/20 pl-6 space-y-4">
            <p>
              &ldquo;Querendona&rdquo; es como se le llama con cariño a la persona o la tierra que acoge a todos con calidez y generosidad.
            </p>
            <p>
              Abrimos nuestras puertas en Huelva para ofrecer una embajada auténtica del sabor colombiano: raciones abundantes, caldos sustanciosos hechos desde temprano y la sonrisa hospitalaria que caracteriza a nuestro pueblo.
            </p>
          </div>
        </div>

        {/* Broken Grid: The 3 Editorial Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-20">
          <div className="border border-zinc-900/20 bg-[#ebe6dd] p-5 sm:p-8">
            <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-900/40 mb-3 sm:mb-4">
              [PILAR 01]
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-zinc-900 mb-2 sm:mb-3">
              Raciones Generosas
            </h3>
            <p className="font-mono text-xs text-zinc-900/70 leading-relaxed">
              En Colombia la comida es abundancia y fiesta. Nuestras bandejas, cazuelas y sancochos se sirven en porciones completas que satisfacen al apetito más exigente.
            </p>
          </div>

          <div className="border border-zinc-900/20 bg-[#ebe6dd] p-5 sm:p-8 md:-mt-6">
            <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-900/40 mb-3 sm:mb-4">
              [PILAR 02]
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-zinc-900 mb-2 sm:mb-3">
              Sazón Criolla Pura
            </h3>
            <p className="font-mono text-xs text-zinc-900/70 leading-relaxed">
              Respetamos los ingredientes que dan alma a nuestros platos: guascas campesinas, plátano macho verde y maduro, maíz trillado, yuca fresca y el sofrito tradicional.
            </p>
          </div>

          <div className="border border-zinc-900/20 bg-[#ebe6dd] p-5 sm:p-8">
            <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-900/40 mb-3 sm:mb-4">
              [PILAR 03]
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-zinc-900 mb-2 sm:mb-3">
              Hospitalidad en Huelva
            </h3>
            <p className="font-mono text-xs text-zinc-900/70 leading-relaxed">
              Ubicados en la Calle Bonares, brindamos un espacio cálido, familiar y cercano para compartir sobremesas largas y celebraciones inolvidables.
            </p>
          </div>
        </div>

        {/* Technical Location & Hours Slate */}
        <div className="border border-zinc-900/20 bg-[#ebe6dd] p-5 sm:p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 font-mono text-xs uppercase">
            <div>
              <span className="block text-[10px] text-zinc-900/40 tracking-[0.25em] mb-2">
                [DIRECCIÓN EXACTA]
              </span>
              <p className="font-bold text-zinc-900 text-sm">C. Bonares, 5</p>
              <p className="text-zinc-900/70">21007 Huelva, España</p>
              <p className="text-zinc-900/40 text-[10px] mt-1">Barrio de las Colonias</p>
            </div>

            <div>
              <span className="block text-[10px] text-zinc-900/40 tracking-[0.25em] mb-2">
                [CONTACTO TELEFÓNICO]
              </span>
              <p className="font-bold text-zinc-900 text-sm">643 93 16 08</p>
              <p className="text-zinc-900/70">Atención telefónica de sala</p>
              <p className="text-zinc-900/40 text-[10px] mt-1">Llamadas y WhatsApp</p>
            </div>

            <div>
              <span className="block text-[10px] text-zinc-900/40 tracking-[0.25em] mb-2">
                [HORARIO DE COCINA]
              </span>
              <p className="text-zinc-900 font-bold">Martes a Domingo</p>
              <p className="text-zinc-900/70">12:30 — 16:30 h</p>
              <p className="text-zinc-900/70">20:00 — 23:30 h</p>
              <p className="text-zinc-900/40 text-[10px]">Lunes: Descanso del personal</p>
            </div>

            <div>
              <span className="block text-[10px] text-zinc-900/40 tracking-[0.25em] mb-2">
                [TICKET PROMEDIO]
              </span>
              <p className="font-bold text-zinc-900 text-sm">12 — 20 € / persona</p>
              <p className="text-zinc-900/70">Raciones generosas</p>
              <p className="text-zinc-900/40 text-[10px] mt-1">Opciones para llevar disponibles</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
