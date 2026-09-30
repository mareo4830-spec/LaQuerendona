import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useMenuItems } from "../hooks/useMenuItems";
import { officialCategories, officialRestaurantInfo } from "../data/officialMenu";
import GrainOverlay from "../components/ui/GrainOverlay";
import {
  FiPhone,
  FiMessageCircle,
  FiSearch,
  FiX,
  FiCheck,
  FiStar,
  FiImage,
  FiArrowRight,
  FiCalendar,
} from "react-icons/fi";

export default function PublicMenuPage() {
  const { items, loading, error } = useMenuItems();
  const [activeCategory, setActiveCategory] = useState("TODOS");
  const [searchQuery, setSearchQuery] = useState("");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Platos filtrados
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchCat =
        activeCategory === "TODOS" ||
        item.category?.toUpperCase() === activeCategory.toUpperCase();
      const matchSearch =
        !searchQuery ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchAvail = !onlyAvailable || item.available;
      return matchCat && matchSearch && matchAvail;
    });
  }, [items, activeCategory, searchQuery, onlyAvailable]);

  // Mensaje para pedir por WhatsApp
  const getWhatsAppOrderUrl = (item) => {
    const text = encodeURIComponent(
      `Hola La Querendona. Deseo solicitar: ${item.name} (${typeof item.price === "number" ? item.price.toFixed(2) : item.price}€).`
    );
    return `https://wa.me/34${officialRestaurantInfo.whatsapp}?text=${text}`;
  };

  return (
    <div className="min-h-screen bg-[#f7f4ee] text-[#1a1715] selection:bg-[#201915] selection:text-[#f7f4ee] pb-24">
      <GrainOverlay />

      {/* ─── BARRA DE ESTADO SUPERIOR CONECTADA NFC ─── */}
      <header className="sticky top-0 z-40 bg-[#fdfcfa]/95 backdrop-blur-md border-b border-stone-200/80 px-4 sm:px-8 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="font-semibold text-stone-800 tracking-wider text-[10px] sm:text-[11px] uppercase font-mono truncate">
              <span className="hidden sm:inline">Carta Digital en Sala · </span>Mesa Conectada NFC
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link
              to="/"
              className="text-stone-600 hover:text-stone-900 font-medium transition-colors hidden sm:inline"
            >
              ← Portada
            </Link>
            <a
              href={`tel:${officialRestaurantInfo.phone}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#201915] text-[#f7f4ee] font-medium text-xs hover:bg-[#382b24] transition-colors min-h-[36px]"
            >
              <FiPhone className="w-3 h-3" />
              <span className="hidden xs:inline">Llamar</span>
              <span className="hidden md:inline"> al Restaurante</span>
            </a>
          </div>
        </div>
      </header>

      {/* ─── CABECERA DE LA CARTA ─── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-6 sm:pt-12 pb-6 border-b border-stone-200/80">
        <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-[#c44d2d] uppercase tracking-wider mb-2 font-semibold">
          <span>RESTAURANTE LA QUERENDONA</span>
          <span>·</span>
          <span>CALLE BONARES, 5 · HUELVA</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-stone-900 font-bold tracking-tight mb-3">
          Carta Gastronómica
        </h1>

        <p className="text-xs sm:text-base text-stone-600 max-w-2xl leading-relaxed">
          Auténtica cocina tradicional colombiana en Huelva. Desayunos campesinos, especialidades de caldero, picadas y bebidas naturales preparadas al momento.
        </p>

        {/* Buscador & Controles */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por plato o ingrediente..."
              className="input-refined pl-10 pr-16 text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 font-semibold p-1"
              >
                Limpiar
              </button>
            )}
          </div>

          <button
            onClick={() => setOnlyAvailable(!onlyAvailable)}
            className={`px-4 py-2.5 rounded-xl border font-semibold transition-all cursor-pointer inline-flex items-center justify-center gap-1.5 shrink-0 min-h-[44px] text-xs ${
              onlyAvailable
                ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                : "bg-[#fdfcfa] text-stone-700 border-stone-300 hover:border-stone-400"
            }`}
          >
            {onlyAvailable && <FiCheck className="w-3.5 h-3.5" />}
            <span>{onlyAvailable ? "Solo Disponibles" : "Toda la Carta"}</span>
          </button>
        </div>

        {/* Pestañas de Categoría */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          <button
            onClick={() => setActiveCategory("TODOS")}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 min-h-[40px] ${
              activeCategory === "TODOS"
                ? "bg-[#201915] text-[#f7f4ee] shadow-sm font-bold"
                : "bg-[#fdfcfa] text-stone-600 border border-stone-200/80 hover:bg-stone-100"
            }`}
          >
            <span>Toda la Carta</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                activeCategory === "TODOS" ? "bg-white/20 text-white" : "bg-stone-200 text-stone-700"
              }`}
            >
              {items.length}
            </span>
          </button>

          {officialCategories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            const count = items.filter((i) => i.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  isSelected
                    ? "bg-[#c44d2d] text-white shadow-sm font-bold"
                    : "bg-[#fdfcfa] text-stone-600 border border-stone-200/80 hover:bg-stone-100"
                }`}
              >
                <span>{cat.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? "bg-white/25 text-white" : "bg-stone-200 text-stone-700"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── GRILLA DE PLATOS ─── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-8">
        
        {/* Loading */}
        {loading && (
          <div className="py-24 text-center">
            <div className="w-8 h-8 border-2 border-[#c44d2d]/30 border-t-[#c44d2d] rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs font-mono text-stone-500 uppercase tracking-widest">
              Sincronizando carta con sala...
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="p-6 rounded-2xl bg-stone-100 border border-stone-200 text-center my-8">
            <p className="text-xs font-bold text-stone-800 uppercase">Modo Local Activo</p>
            <p className="text-xs text-stone-600 mt-1">
              Catálogo sincronizado desde almacenamiento local de La Querendona.
            </p>
          </div>
        )}

        {/* Lista de Platos */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredItems.map((item) => (
              <article
                key={item.id}
                onClick={() => setSelectedProduct(item)}
                className={`card-dish group cursor-pointer ${
                  !item.available ? "opacity-75 bg-stone-100/60" : ""
                }`}
              >
                {/* Imagen del plato */}
                <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-stone-400 bg-stone-100">
                      <FiImage className="w-8 h-8 mb-1 stroke-1" />
                      <span className="text-[10px] font-mono uppercase tracking-wider">
                        La Querendona
                      </span>
                    </div>
                  )}

                  {/* Badge de Categoría */}
                  <span className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-md text-white text-[10px] font-medium px-2.5 py-0.5 rounded-full">
                    {item.category}
                  </span>

                  {/* Badge de Recomendado */}
                  {item.is_featured && (
                    <span className="absolute top-2.5 right-2.5 bg-[#d99b26] text-stone-900 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                      <FiStar className="w-2.5 h-2.5 fill-current" />
                      <span>Especialidad</span>
                    </span>
                  )}

                  {/* Estado de disponibilidad */}
                  {!item.available && (
                    <div className="absolute inset-0 bg-stone-900/65 backdrop-blur-[2px] flex items-center justify-center">
                      <span className="bg-rose-600 text-white font-bold text-xs uppercase px-3 py-1 rounded-full shadow-md">
                        Agotado Hoy
                      </span>
                    </div>
                  )}
                </div>

                {/* Información */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="font-serif font-bold text-lg text-stone-900 group-hover:text-[#c44d2d] transition-colors leading-snug line-clamp-1">
                      {item.name}
                    </h2>
                    
                    {item.description ? (
                      <p className="text-xs text-stone-600 mt-1.5 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    ) : (
                      <p className="text-xs italic text-stone-400 mt-1.5">
                        Especialidad tradicional de La Querendona.
                      </p>
                    )}
                  </div>

                  <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold font-serif text-stone-900">
                        {typeof item.price === "number" ? item.price.toFixed(2) : item.price} €
                      </span>
                      <span className="text-[10px] text-stone-400 font-mono ml-1">IVA inc.</span>
                    </div>

                    <span className="text-xs font-semibold text-[#c44d2d] group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                      <span>Consultar</span>
                      <FiArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Sin resultados */}
        {!loading && filteredItems.length === 0 && (
          <div className="text-center py-20 bg-[#fdfcfa] border border-stone-200/80 rounded-2xl p-8">
            <h3 className="font-serif text-xl font-bold text-stone-900 mb-1">
              No se encontraron coincidencias
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              Intente con otro término o seleccione una categoría diferente.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("TODOS");
                setOnlyAvailable(false);
              }}
              className="btn-secondary text-xs"
            >
              Mostrar todos los platos
            </button>
          </div>
        )}
      </main>

      {/* ─── MODAL DETALLE DE PLATO ─── */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="w-full max-w-lg bg-[#fdfcfa] border border-stone-200 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl animate-spring-in max-h-[92vh] flex flex-col my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Foto grande del plato */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-stone-100 overflow-hidden shrink-0">
              {selectedProduct.image ? (
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-stone-400 bg-stone-100">
                  <FiImage className="w-12 h-12 stroke-1 mb-2" />
                  <span className="text-xs font-mono uppercase tracking-wider">
                    La Querendona Huelva
                  </span>
                </div>
              )}

              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 text-white hover:bg-black flex items-center justify-center transition-colors z-10 cursor-pointer"
                aria-label="Cerrar ventana"
              >
                <FiX className="w-4 h-4" />
              </button>

              <span className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-full">
                {selectedProduct.category}
              </span>
            </div>

            {/* Contenido detallado con scroll en móviles */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-1">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 leading-tight">
                  {selectedProduct.name}
                </h3>
                <div className="text-right shrink-0">
                  <span className="text-xl sm:text-2xl font-serif font-bold text-[#c44d2d]">
                    {typeof selectedProduct.price === "number"
                      ? selectedProduct.price.toFixed(2)
                      : selectedProduct.price}{" "}
                    €
                  </span>
                  <span className="block text-[10px] text-stone-400 font-mono">IVA Incluido</span>
                </div>
              </div>

              {selectedProduct.description ? (
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mt-3 mb-6 bg-stone-50 p-4 rounded-xl border border-stone-100">
                  {selectedProduct.description}
                </p>
              ) : (
                <p className="text-xs italic text-stone-400 my-4">
                  Receta tradicional elaborada en los fogones de La Querendona en Huelva.
                </p>
              )}

              {/* Acciones directas: WhatsApp o Llamar */}
              <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
                <a
                  href={getWhatsAppOrderUrl(selectedProduct)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm shadow-md active:scale-95 transition-all text-center min-h-[46px]"
                >
                  <FiMessageCircle className="w-4 h-4" />
                  <span>Pedir por WhatsApp</span>
                </a>

                <a
                  href={`tel:${officialRestaurantInfo.phone}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-sm active:scale-95 transition-all min-h-[46px]"
                >
                  <FiPhone className="w-4 h-4" />
                  <span>Llamar</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── BARRA FLOTANTE MÓVIL INFERIOR PARA SALA (NFC/MESA) ─── */}
      <nav aria-label="Acciones rápidas de sala" className="sm:hidden fixed bottom-0 left-0 right-0 p-3 bg-[#fdfcfa]/95 backdrop-blur-md border-t border-stone-200 z-30 flex items-center justify-between gap-3 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
        <Link
          to="/"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-stone-100 text-stone-800 text-xs font-semibold"
        >
          <span>Portada Web</span>
        </Link>
        <a
          href={`tel:${officialRestaurantInfo.phone}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#201915] text-[#f7f4ee] text-xs font-semibold"
        >
          <FiPhone className="w-3.5 h-3.5" />
          <span>Llamar al Camarero</span>
        </a>
      </nav>
    </div>
  );
}
