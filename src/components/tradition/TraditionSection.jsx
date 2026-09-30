import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const layers = [
  {
    num: "01",
    phase: "BASE & CALDERO",
    title: "Frijoles Cargamanto & Hogao de Finca",
    subtitle: "Doce horas a fuego lento en olla de barro",
    description:
      "El cimiento de la cocina andina. Frijol rojo cocido lentamente con sofrito de tomate chonto madurado en mata, cebolla junca picada finamente y comino entero machacado en mortero de piedra.",
    spec: "COCCIÓN: 12 HORAS · DENSIDAD: ESPESA · OLLA DE BARRO",
    visualColor: "#54331a",
    tag: "CALDO DE ORIGEN",
    initialY: 40,
  },
  {
    num: "02",
    phase: "CRUJIDO & BRASA",
    title: "Chicharrón Ondulado & Chorizo Casero",
    subtitle: "Corteza de burbujas quebradizas al punto de sal",
    description:
      "Tocino de panceta con corte de acordeón, curado en sal marina y escaldado antes de pasar a la manteca limpia para abrir la corteza en cientos de perlas doradas y crujientes.",
    spec: "TEXTURA: CRAPITANTE · SAL DE MANANTIAL · CORTE ONDULADO",
    visualColor: "#8b3a1e",
    tag: "EL CRUJIDO",
    initialY: 50,
  },
  {
    num: "03",
    phase: "EL GRANO BLANCO",
    title: "Arroz Graneado & Arepa de Maíz Trillado",
    subtitle: "Masa pura de maíz molido a mano, sin harina refinada",
    description:
      "Arroz suelto y brillante, cocinado con ajo frito y cilantro. Al lado, la clásica arepa paisa, redonda y humeante, asada en tiesto de barro sin aditivos ni conservantes.",
    spec: "MAÍZ 100% CRIOLLO · TIEMPO EN PLANCHA: 10 MIN · SIN MEZCLAS",
    visualColor: "#c68a3e",
    tag: "MAÍZ & TIERRA",
    initialY: 45,
  },
  {
    num: "04",
    phase: "CREMOSIDAD & YEMA",
    title: "Aguacate Madurado en Rama & Huevo de Corral",
    subtitle: "Puntilla tostada y yema densa que amalgama cada bocado",
    description:
      "Aguacate criollo de piel fina y textura sedosa que se corta como mantequilla. El huevo, de gallina libre, frito en aceite virgen para conseguir el borde tostado de puntilla.",
    spec: "PUNTILLA CRUJIENTE · YEMA TEMPERADA · AGUACATE MANTECOSO",
    visualColor: "#3e5c38",
    tag: "EL EQUILIBRIO",
    initialY: 55,
  },
  {
    num: "05",
    phase: "EL REMATE DULCE Y BRAVO",
    title: "Tajadas de Maduro & Ají Casero de Frasco",
    subtitle: "El contraste de la fructosa caramelizada y el pique fresco",
    description:
      "Plátano macho con piel negra madurado al calor andino, cortado en láminas diagonales que se doran en su propio azúcar. Como contrapunto: ají de cilantro, cebolla y vinagre de caña.",
    spec: "CARAMELIZACIÓN NATURAL · AJÍ FERMENTADO · PICANTE EQUILIBRADO",
    visualColor: "#b8533d",
    tag: "CONTRASTE FINAL",
    initialY: 50,
  },
];

function LayerCard({ layer, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: layer.initialY, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: "transform, opacity" }}
      className={`relative mb-16 md:mb-24 ${
        index % 2 === 0
          ? "lg:ml-0 lg:mr-auto lg:w-[66vw]"
          : "lg:ml-auto lg:mr-0 lg:w-[63vw]"
      }`}
    >
      <div className="border border-zinc-900/25 bg-[#ebe6dd] p-5 sm:p-8 md:p-12 relative overflow-hidden transition-all duration-300 hover:border-zinc-900">
        {/* Technical Top Bar */}
        <div className="flex items-center justify-between font-mono text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] uppercase pb-3 sm:pb-4 mb-4 sm:mb-6 border-b border-zinc-900/15 text-zinc-900/60">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="bg-zinc-900 text-[#f4f1ec] px-2 py-0.5 font-bold">
              CAPA [{layer.num} / 05]
            </span>
            <span className="hidden sm:inline">{layer.phase}</span>
          </div>
          <span className="font-bold text-zinc-900">[{layer.tag}]</span>
        </div>

        {/* Content Layout with broken grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-8">
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] text-zinc-900/50 uppercase block mb-1">
              {layer.subtitle}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-zinc-900 mb-3 sm:mb-4 leading-tight">
              {layer.title}
            </h3>
            <p className="font-mono text-xs sm:text-sm text-zinc-900/75 leading-relaxed mb-4 sm:mb-6">
              {layer.description}
            </p>

            <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] text-zinc-900/50 uppercase pt-3 sm:pt-4 border-t border-zinc-900/10">
              {layer.spec}
            </div>
          </div>

          {/* Visual abstract graphic plate swatch / Stamp */}
          <div className="md:col-span-4 flex flex-col justify-between h-full border-t md:border-t-0 md:border-l border-zinc-900/10 pt-4 md:pt-0 md:pl-6">
            <div className="w-full h-28 sm:h-32 md:h-auto md:aspect-square border border-zinc-900/30 p-3 flex flex-col justify-between relative bg-[#f4f1ec]">
              <div className="flex justify-between font-mono text-[9px] text-zinc-900/40">
                <span>ESTRUCTURA</span>
                <span>+{layer.num}</span>
              </div>
              <div
                className="w-full h-10 sm:h-12 border border-zinc-900/20 flex items-center justify-center font-serif italic text-xs font-semibold"
                style={{ backgroundColor: layer.visualColor, color: "#f4f1ec" }}
              >
                Capa Nº {layer.num}
              </div>
              <div className="text-[8px] font-mono text-zinc-900/50 tracking-widest text-center uppercase">
                RACIÓN TRADICIONAL
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TraditionSection() {
  const containerRef = useRef(null);
  const [activeMobileLayer, setActiveMobileLayer] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const titleParallax = useTransform(scrollYProgress, [0, 1], [-20, 40]);

  return (
    <section
      id="tradicion"
      ref={containerRef}
      className="relative py-16 sm:py-28 md:py-36 px-4 sm:px-6 lg:px-12 bg-[#f4f1ec] overflow-hidden border-t border-zinc-900/15"
    >
      {/* Editorial Section Header */}
      <div className="max-w-7xl mx-auto mb-10 md:mb-32">
        <div className="flex items-center gap-3 font-mono text-[10px] sm:text-[11px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-zinc-900/60 mb-4">
          <span className="w-6 sm:w-8 h-px bg-zinc-900/40" />
          <span>[SECUENCIA EDITORIAL 02]</span>
          <span>·</span>
          <span>ANATOMÍA DEL PLATO</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-end">
          <motion.div style={{ y: titleParallax }} className="lg:col-span-8">
            <h2 className="font-serif text-[clamp(2.25rem,6.5vw,5rem)] font-normal leading-[0.9] text-zinc-900 uppercase">
              La Construcción
              <br />
              <span className="italic font-light">de la Tradición</span>
            </h2>
          </motion.div>
          <div className="lg:col-span-4 font-mono text-xs text-zinc-900/70 leading-relaxed pb-2 border-l-2 border-zinc-900/20 pl-4 sm:pl-6">
            Una ración colombiana auténtica no se improvisa: se levanta capa a capa con tiempos estrictos, fuego paciente y proporciones heredadas de generaciones campesinas.
          </div>
        </div>
      </div>

      {/* MOBILE INTERACTIVE EXPLORER (< md) */}
      <div className="md:hidden max-w-xl mx-auto mb-12">
        {/* Layer Selectors Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 scrollbar-none mb-4 -mx-4 px-4">
          {layers.map((l, idx) => (
            <button
              key={l.num}
              onClick={() => setActiveMobileLayer(idx)}
              className={`px-3 py-2 rounded-xl font-mono text-[10px] uppercase tracking-wider shrink-0 transition-all min-h-[38px] ${
                activeMobileLayer === idx
                  ? "bg-zinc-900 text-[#f4f1ec] font-bold shadow-sm"
                  : "bg-[#ebe6dd] text-zinc-900/70 border border-zinc-900/15"
              }`}
            >
              <span>{l.num} · {l.tag}</span>
            </button>
          ))}
        </div>

        {/* Active Mobile Layer Card */}
        <div className="border border-zinc-900/25 bg-[#ebe6dd] p-5 relative overflow-hidden rounded-2xl shadow-sm min-h-[290px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={layers[activeMobileLayer].num}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center justify-between font-mono text-[9px] tracking-widest uppercase pb-3 mb-3 border-b border-zinc-900/15 text-zinc-900/60">
                <span className="bg-zinc-900 text-[#f4f1ec] px-2 py-0.5 font-bold rounded">
                  CAPA [{layers[activeMobileLayer].num} / 05]
                </span>
                <span className="font-bold text-zinc-900">[{layers[activeMobileLayer].phase}]</span>
              </div>

              <span className="font-mono text-[10px] tracking-wider text-zinc-900/50 uppercase block mb-1">
                {layers[activeMobileLayer].subtitle}
              </span>
              <h3 className="font-serif text-2xl text-zinc-900 mb-3 leading-tight">
                {layers[activeMobileLayer].title}
              </h3>
              <p className="font-mono text-xs text-zinc-900/75 leading-relaxed mb-4">
                {layers[activeMobileLayer].description}
              </p>

              <div className="font-mono text-[9px] tracking-wider text-zinc-900/50 uppercase pt-3 border-t border-zinc-900/10 mb-4">
                {layers[activeMobileLayer].spec}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Layer navigation buttons */}
          <div className="flex items-center justify-between pt-2 border-t border-zinc-900/15 mt-auto">
            <button
              onClick={() => setActiveMobileLayer((prev) => (prev > 0 ? prev - 1 : layers.length - 1))}
              className="p-2 px-3 rounded-lg bg-zinc-900/10 text-zinc-900 text-xs font-mono inline-flex items-center gap-1 active:scale-95 transition-transform"
            >
              <FiChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>
            <span className="font-mono text-[10px] text-zinc-900/40">
              {activeMobileLayer + 1} de {layers.length}
            </span>
            <button
              onClick={() => setActiveMobileLayer((prev) => (prev < layers.length - 1 ? prev + 1 : 0))}
              className="p-2 px-3 rounded-lg bg-zinc-900 text-[#f4f1ec] text-xs font-mono inline-flex items-center gap-1 active:scale-95 transition-transform"
            >
              <span>Siguiente</span>
              <FiChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* DESKTOP PARALLAX LAYERS CONTAINER (>= md) */}
      <div className="hidden md:block max-w-7xl mx-auto relative">
        {/* Background Vertical Guide Lines (Editorial aesthetic) */}
        <div className="absolute top-0 bottom-0 left-1/4 w-px bg-zinc-900/5 pointer-events-none hidden lg:block" />
        <div className="absolute top-0 bottom-0 left-3/4 w-px bg-zinc-900/5 pointer-events-none hidden lg:block" />

        {layers.map((layer, index) => (
          <LayerCard key={layer.num} layer={layer} index={index} />
        ))}
      </div>

      {/* Closing Assembly Statement */}
      <div className="mt-12 sm:mt-20 text-center border-t border-zinc-900/15 pt-8 sm:pt-12 max-w-2xl mx-auto">
        <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-zinc-900/40 block mb-2 sm:mb-3">
          [RESULTADO EN MESA]
        </span>
        <p className="font-serif text-xl sm:text-2xl md:text-3xl text-zinc-900 italic leading-snug">
          &ldquo;En La Querendona ningún comensal se levanta con hambre. Servimos con el corazón y la abundancia de nuestra tierra.&rdquo;
        </p>
      </div>
    </section>
  );
}
