import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiX } from "react-icons/fi";
import { useMenuItems } from "../../hooks/useMenuItems";
import { officialCategories, officialRestaurantInfo } from "../../data/officialMenu";
import MenuItem from "./MenuItem";

export default function MenuSection() {
  const { items, loading, error } = useMenuItems();
  const [activeCategory, setActiveCategory] = useState("TODOS");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = useMemo(() => {
    return [
      { id: "TODOS", label: "Toda la Carta" },
      ...officialCategories.map((c) => ({ id: c.id, label: c.label || c.name }))
    ];
  }, []);

  const filteredItems = useMemo(() => {
    if (activeCategory === "TODOS") return items.filter((i) => i.available);
    return items.filter(
      (i) => i.category?.toUpperCase() === activeCategory.toUpperCase() && i.available
    );
  }, [items, activeCategory]);

  const getWhatsAppOrderUrl = (item) => {
    const text = encodeURIComponent(
      `¡Hola La Querendona! Quisiera pedir: *${item.name}* (${typeof item.price === "number" ? item.price.toFixed(2) : item.price}€).`
    );
    return `https://wa.me/34${officialRestaurantInfo.whatsapp}?text=${text}`;
  };

  return (
    <section id="carta" className="py-24 md:py-32 px-4 sm:px-6 lg:px-12 bg-[#f7f4ee] border-t border-stone-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Cabecera Editorial */}
        <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-[#c44d2d] uppercase mb-3 font-semibold">
          <span className="w-6 h-px bg-[#c44d2d]" />
          <span>[SECCIÓN GASTRONÓMICA]</span>
          <span>·</span>
          <span>RESTAURANTE LA QUERENDONA · HUELVA</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12 border-b border-stone-200 pb-8">
          <div className="lg:col-span-8">
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-stone-900 tracking-tight leading-[0.95]">
              Sabores &amp; Raciones
              <br />
              <span className="italic font-normal text-[#c44d2d]">Campesinas</span>
            </h2>
          </div>
          <div className="lg:col-span-4 text-sm text-stone-600 leading-relaxed border-l-2 border-stone-200 pl-6">
            Recetas tradicionales colombianas preparadas al instante en Huelva. Cortes caseros, sazón lenta y porciones que colman la mesa.
          </div>
        </div>

        {/* Pestañas de Categoría & Acceso a Carta Completa */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-12 border-b border-stone-200 pb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`text-xs font-semibold px-4 py-2.5 rounded-full transition-all cursor-pointer whitespace-nowrap shrink-0 min-h-[40px] flex items-center ${
                    isActive
                      ? "bg-[#201915] text-[#f7f4ee] shadow-sm font-bold"
                      : "bg-[#fdfcfa] text-stone-700 border border-stone-200 hover:border-stone-400"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <Link
            to="/carta"
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold text-[#c44d2d] bg-[#c44d2d]/10 hover:bg-[#c44d2d]/20 transition-colors shrink-0 min-h-[40px]"
          >
            <span>Ver Carta Completa ({items.length} platos)</span>
            <FiArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-xs font-mono text-stone-500">
            <div className="w-8 h-8 border-2 border-[#c44d2d]/30 border-t-[#c44d2d] rounded-full animate-spin mb-3" />
            <span>[CARGANDO CARTA GASTRONÓMICA...]</span>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="text-center py-12 border border-stone-200 rounded-2xl p-6 bg-[#fdfcfa] my-6">
            <p className="text-xs font-mono text-stone-500 uppercase">{error}</p>
          </div>
        )}

        {/* Grilla de Platos */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.slice(0, 18).map((item, i) => (
              <MenuItem
                key={item.id}
                item={item}
                index={i}
                onSelect={(selected) => setSelectedProduct(selected)}
              />
            ))}
          </div>
        )}

        {/* Botón Ver Más Platos */}
        {!loading && filteredItems.length > 18 && (
          <div className="mt-12 text-center">
            <Link
              to="/carta"
              className="btn-primary text-sm py-3 px-8 rounded-2xl shadow-md inline-flex items-center gap-2"
            >
              <span>Explorar los {items.length} platos de la carta digital</span>
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>

      {/* Modal de Detalle */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="w-full max-w-lg bg-[#fdfcfa] border border-stone-200 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl animate-spring-in max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedProduct.image && (
              <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-stone-100 overflow-hidden shrink-0">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 text-white hover:bg-black flex items-center justify-center cursor-pointer transition-colors z-10"
                  aria-label="Cerrar ventana"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="p-5 sm:p-6 overflow-y-auto flex-1">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 leading-tight">
                  {selectedProduct.name}
                </h3>
                <span className="text-xl sm:text-2xl font-serif font-bold text-[#c44d2d] shrink-0">
                  {typeof selectedProduct.price === "number"
                    ? selectedProduct.price.toFixed(2)
                    : selectedProduct.price} €
                </span>
              </div>

              {selectedProduct.description && (
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6 bg-stone-50 p-3.5 sm:p-4 rounded-xl border border-stone-100">
                  {selectedProduct.description}
                </p>
              )}

              <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
                <a
                  href={getWhatsAppOrderUrl(selectedProduct)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 btn-accent py-3 text-sm font-semibold rounded-xl text-center justify-center min-h-[46px]"
                >
                  <span>Pedir por WhatsApp</span>
                </a>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="w-full sm:w-auto btn-secondary py-3 text-sm rounded-xl px-5 min-h-[46px]"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
