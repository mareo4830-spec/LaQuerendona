import { FiStar, FiArrowRight } from "react-icons/fi";

export default function MenuItem({ item, index, onSelect }) {
  const isFeature = item.is_featured || index === 0;

  return (
    <article
      onClick={() => onSelect && onSelect(item)}
      className={`group rounded-2xl border border-stone-200/90 bg-[#fdfcfa] p-4 sm:p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-[0_8px_24px_rgba(32,25,21,0.08)] hover:border-stone-300 active:scale-[0.99] relative cursor-pointer ${
        isFeature ? "md:col-span-2 bg-gradient-to-br from-[#fdfcfa] to-[#f7f3ec]" : ""
      }`}
    >
      <div>
        {/* Foto si está disponible */}
        {item.image && (
          <div className="relative aspect-[16/10] sm:aspect-[2/1] rounded-xl overflow-hidden mb-4 bg-stone-100">
            <img
              src={item.image}
              alt={item.name}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <span className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
              {item.category}
            </span>
            {item.is_featured && (
              <span className="absolute top-2.5 right-2.5 bg-amber-500 text-stone-900 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm inline-flex items-center gap-1">
                <FiStar className="w-3 h-3 fill-current" />
                <span>Recomendado</span>
              </span>
            )}
          </div>
        )}

        {/* Metadatos superiores */}
        <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 uppercase pb-2 mb-2 border-b border-stone-100">
          <span>{item.category}</span>
          <span className="font-semibold text-stone-800">
            {item.available ? "Disponible en sala" : "Agotado hoy"}
          </span>
        </div>

        {/* Dish Title */}
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 group-hover:text-[#c44d2d] transition-colors leading-snug mb-2">
          {item.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
          {item.description || "Receta tradicional de los fogones campesinos de Colombia elaborada en Huelva."}
        </p>
      </div>

      {/* Bottom Price & Callout */}
      <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
        <div>
          <span className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
            {typeof item.price === "number" ? item.price.toFixed(2) : item.price} €
          </span>
          <span className="text-[10px] uppercase font-mono text-stone-400 ml-1.5">
            IVA Inc.
          </span>
        </div>

        <span className="text-xs font-semibold text-[#c44d2d] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1.5">
          <span>Pedir / Ver</span>
          <FiArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </article>
  );
}
