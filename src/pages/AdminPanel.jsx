import { useState, useMemo, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useMenuItems } from "../hooks/useMenuItems";
import { useReservations } from "../hooks/useReservations";
import { officialCategories } from "../data/officialMenu";
import { isSupabaseConfigured } from "../lib/supabase";
import AdminReservationNotifier from "../components/admin/AdminReservationNotifier";
import {
  destroyAdminSession,
  sanitizeString,
  sanitizePrice,
  sanitizeImageUrl,
  validateImageFile,
} from "../lib/security";
import toast from "react-hot-toast";

// Iconografía vectorial profesional (sin emojis)
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiRefreshCw,
  FiDownload,
  FiUpload,
  FiSearch,
  FiCalendar,
  FiCheck,
  FiX,
  FiExternalLink,
  FiGrid,
  FiList,
  FiStar,
  FiLogOut,
  FiImage,
  FiAlertCircle,
  FiCheckCircle,
} from "react-icons/fi";

const EMPTY_FORM = {
  name: "",
  description: "",
  price: "",
  category: "ALMUERZOS",
  image: "",
  available: true,
  is_featured: false,
  order: 0,
};

// Galería curada con fotos auténticas de La Querendona
const CURATED_GALLERY = [
  { label: "Bandeja Paisa 3 Pisos", url: "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/3c7b64082_WhatsAppImage2026-09-07at020526.jpeg" },
  { label: "Desayuno Querendón", url: "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/a3828e07b_Producto1200x1200cartadigital.png" },
  { label: "Chuleta Valluna", url: "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/5ba078e62_WhatsAppImage2026-09-07at020822.jpeg" },
  { label: "Sancocho Bifásico", url: "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/d346f1ebc_WhatsAppImage2026-09-07at021021.jpeg" },
  { label: "Arepa Querendona", url: "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/50ca735e5_WhatsAppImage2026-09-07at022830.jpeg" },
  { label: "Salchipapa Querendón", url: "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/222d431d0_WhatsAppImage2026-09-07at022513.jpeg" },
  { label: "Hamburguesa Volcán", url: "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/1b9201f9b_WhatsAppImage2026-09-07at023532.jpeg" },
  { label: "Picada Montañera", url: "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/a3dfaa27e_WhatsAppImage2026-09-07at024016.jpeg" },
  { label: "Empanadas Caseras", url: "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/d0bf595f5_WhatsAppImage2026-09-07at022046.jpeg" },
  { label: "Jugo Natural de Fruta", url: "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/30d220421_WhatsAppImage2026-09-07at024905.jpeg" },
  { label: "Cazuela de Mariscos", url: "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/f3b83984d_WhatsAppImage2026-09-07at021535.jpeg" },
  { label: "Arepas Montañeras", url: "https://base44.app/api/apps/6a8c330bcd84138e5647a264/files/mp/public/6a8c330bcd84138e5647a264/b0b5be829_WhatsAppImage2026-09-07at021319.jpeg" },
];

export default function AdminPanel() {
  const navigate = useNavigate();
  const {
    items,
    loading: menuLoading,
    addItem,
    updateItem,
    deleteItem,
    toggleAvailability,
    resetToOfficialMenu,
    exportMenu,
    importMenu,
  } = useMenuItems();

  const { reservations, loading: resLoading, updateReservationStatus } = useReservations();

  // Estados de navegación e interfaz
  const [activeTab, setActiveTab] = useState("menu"); // "menu" | "reservations"
  const [viewMode, setViewMode] = useState("cards"); // "cards" | "table"
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("TODOS");
  const [statusFilter, setStatusFilter] = useState("ALL"); // "ALL" | "AVAILABLE" | "OUT_OF_STOCK"
  const [highlightedReservationId, setHighlightedReservationId] = useState(null);

  const handleSelectReservation = (id) => {
    setActiveTab("reservations");
    setHighlightedReservationId(id);
    setTimeout(() => {
      setHighlightedReservationId(null);
    }, 6000);
  };

  // Modal de Crear / Editar
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [photoTab, setPhotoTab] = useState("gallery"); // "gallery" | "upload" | "url"
  const [isProcessingPhoto, setIsProcessingPhoto] = useState(false);

  // Modal de Confirmación de Borrado
  const [itemToDelete, setItemToDelete] = useState(null);

  // Modal de Restauración Oficial
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  // Edición rápida de precio en línea
  const [inlinePriceId, setInlinePriceId] = useState(null);
  const [inlinePriceVal, setInlinePriceVal] = useState("");

  const fileInputRef = useRef(null);
  const jsonInputRef = useRef(null);

  // Estadísticas del menú
  const stats = useMemo(() => {
    const total = items.length;
    const available = items.filter((i) => i.available).length;
    const outOfStock = total - available;
    const featured = items.filter((i) => i.is_featured).length;
    const catCounts = {
      DESAYUNOS: items.filter((i) => i.category === "DESAYUNOS").length,
      ALMUERZOS: items.filter((i) => i.category === "ALMUERZOS").length,
      CENAS: items.filter((i) => i.category === "CENAS").length,
      BEBIDAS: items.filter((i) => i.category === "BEBIDAS").length,
    };
    return { total, available, outOfStock, featured, catCounts };
  }, [items]);

  // Filtrado de productos
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchCat =
        selectedCategory === "TODOS" ||
        item.category?.toUpperCase() === selectedCategory.toUpperCase();

      const matchSearch =
        !searchQuery ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchStatus =
        statusFilter === "ALL" ||
        (statusFilter === "AVAILABLE" && item.available) ||
        (statusFilter === "OUT_OF_STOCK" && !item.available);

      return matchCat && matchSearch && matchStatus;
    });
  }, [items, selectedCategory, searchQuery, statusFilter]);

  // CERRAR SESIÓN
  const handleLogout = async () => {
    try {
      destroyAdminSession();
      if (auth) await signOut(auth);
    } catch (e) {
      console.warn("Sign out notice:", e);
    }
    toast.success("Sesión finalizada");
    navigate("/admin");
  };

  // ABRIR FORMULARIO PARA CREAR
  const handleOpenCreate = () => {
    setEditingItemId(null);
    setFormData({
      ...EMPTY_FORM,
      category: selectedCategory !== "TODOS" ? selectedCategory : "ALMUERZOS",
      image: CURATED_GALLERY[0].url,
    });
    setPhotoTab("gallery");
    setIsModalOpen(true);
  };

  // ABRIR FORMULARIO PARA EDITAR
  const handleOpenEdit = (item) => {
    setEditingItemId(item.id);
    setFormData({
      name: item.name || "",
      description: item.description || "",
      price: item.price !== undefined ? item.price.toString() : "",
      category: item.category || "ALMUERZOS",
      image: item.image || "",
      available: item.available !== false,
      is_featured: Boolean(item.is_featured),
      order: item.order || 0,
    });
    setPhotoTab(item.image?.startsWith("data:") ? "upload" : "gallery");
    setIsModalOpen(true);
  };

  // GUARDAR PRODUCTO (AÑADIR O ACTUALIZAR) CON SANITIZACIÓN OWASP
  const handleSubmitProduct = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("El nombre del plato es obligatorio.");
      return;
    }

    const parsedPrice = parseFloat(formData.price);
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      toast.error("El precio debe ser un número válido mayor o igual a 0.");
      return;
    }

    try {
      const cleanData = {
        name: sanitizeString(formData.name, 100),
        description: sanitizeString(formData.description, 500),
        price: sanitizePrice(parsedPrice),
        category: sanitizeString(formData.category, 50),
        image: sanitizeImageUrl(formData.image),
        available: Boolean(formData.available),
        is_featured: Boolean(formData.is_featured),
      };

      if (editingItemId) {
        await updateItem(editingItemId, cleanData);
        toast.success(`Plato "${cleanData.name}" actualizado.`);
      } else {
        await addItem(cleanData);
        toast.success(`Plato "${cleanData.name}" añadido a la carta.`);
      }
      setIsModalOpen(false);
      setEditingItemId(null);
      setFormData(EMPTY_FORM);
    } catch (err) {
      toast.error("Error al procesar el plato.");
      console.error(err);
    }
  };

  // TOGGLE RÁPIDO DE DISPONIBILIDAD (1 CLIC)
  const handleFastToggle = async (item, e) => {
    e.stopPropagation();
    try {
      const newStatus = await toggleAvailability(item.id);
      toast.success(
        newStatus
          ? `"${item.name}" marcado como Disponible`
          : `"${item.name}" marcado como Agotado`,
        {
          duration: 2000,
          style: {
            background: newStatus ? "#14532d" : "#7f1d1d",
            color: "#fff",
            borderRadius: "8px",
            fontSize: "12px",
            fontWeight: "500",
          },
        }
      );
    } catch {
      toast.error("No se pudo actualizar el estado.");
    }
  };

  // ELIMINAR PRODUCTO (CONFIRMACIÓN MODAL)
  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      await deleteItem(itemToDelete.id);
      toast.success(`"${itemToDelete.name}" retirado de la carta.`);
      setItemToDelete(null);
    } catch {
      toast.error("Error al eliminar el plato.");
    }
  };

  // SUBIDA Y COMPRESIÓN DE FOTO LOCAL (OWASP + WEBP/JPEG)
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateImageFile(file);
    if (!validation.valid) {
      toast.error(validation.error);
      return;
    }

    setIsProcessingPhoto(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          const maxDim = 900;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxDim) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            }
          } else {
            if (height > maxDim) {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          const compressed = canvas.toDataURL("image/jpeg", 0.82);
          setFormData((prev) => ({ ...prev, image: compressed }));
          toast.success("Fotografía procesada y optimizada.");
        } catch (err) {
          console.error("Error en canvas:", err);
          setFormData((prev) => ({ ...prev, image: event.target.result }));
        } finally {
          setIsProcessingPhoto(false);
        }
      };
      img.onerror = () => {
        toast.error("No se pudo leer la imagen.");
        setIsProcessingPhoto(false);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  // RESTABLECER CARTA OFICIAL COMPLETA (118 PLATOS)
  const handleResetMenu = async () => {
    setIsResetting(true);
    try {
      await resetToOfficialMenu();
      toast.success("Carta oficial restablecida con los 118 productos originales.");
      setIsResetConfirmOpen(false);
    } catch {
      toast.error("Error al restablecer la carta.");
    } finally {
      setIsResetting(false);
    }
  };

  // IMPORTAR ARCHIVO JSON
  const handleImportJson = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        importMenu(parsed);
        toast.success(`Copia de respaldo importada (${parsed.length} platos).`);
      } catch {
        toast.error("El archivo JSON no tiene un formato válido.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  // EDICIÓN RÁPIDA DE PRECIO EN LÍNEA
  const handleSaveInlinePrice = async (itemId) => {
    const p = parseFloat(inlinePriceVal);
    if (!isNaN(p) && p >= 0) {
      await updateItem(itemId, { price: p });
      toast.success("Precio modificado.");
    }
    setInlinePriceId(null);
  };

  return (
    <div className="min-h-screen bg-[#f7f4ee] text-[#1a1715] selection:bg-[#201915] selection:text-[#f7f4ee]">
      
      {/* ─── BARRA SUPERIOR DE ADMINISTRACIÓN ─── */}
      <header className="sticky top-0 z-30 bg-[#fdfcfa]/95 backdrop-blur-md border-b border-stone-200/80 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Logo y título */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 group">
              <span className="w-8 h-8 rounded-lg bg-[#201915] text-[#f7f4ee] flex items-center justify-center font-serif font-bold text-lg group-hover:bg-[#c44d2d] transition-colors">
                Q
              </span>
              <div>
                <span className="font-serif font-bold text-base text-stone-900 leading-tight block">
                  La Querendona
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500">
                  Panel de Gestión &amp; Sala
                </span>
              </div>
            </Link>
          </div>

          {/* Botones de acción directa y Notificador en Tiempo Real */}
          <div className="flex items-center flex-wrap gap-2">
            {/* NOTIFICADOR DE RESERVAS EN TIEMPO REAL (SOLO ADMIN) */}
            <AdminReservationNotifier
              onSelectReservation={handleSelectReservation}
              onConfirmReservation={(id) => {
                updateReservationStatus(id, "confirmed");
                toast.success("Reserva confirmada en sala.");
              }}
            />

            <Link
              to="/carta"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-xs py-2 px-3.5 inline-flex items-center gap-1.5"
              title="Abre la carta digital en una pestaña nueva"
            >
              <span>Ver Carta Clientes</span>
              <FiExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={() => setIsResetConfirmOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 active:scale-[0.98] transition-all cursor-pointer"
              title="Restaura los 118 platos auténticos de la carta original"
            >
              <FiRefreshCw className="w-3 h-3" />
              <span>Restablecer Carta (118)</span>
            </button>

            <button
              onClick={exportMenu}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-200 active:scale-[0.98] transition-all cursor-pointer"
              title="Descargar copia de seguridad en JSON"
            >
              <FiDownload className="w-3 h-3" />
              <span>Exportar</span>
            </button>

            <button
              onClick={() => jsonInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-200 active:scale-[0.98] transition-all cursor-pointer"
              title="Subir archivo JSON de respaldo"
            >
              <FiUpload className="w-3 h-3" />
              <span>Importar</span>
            </button>
            <input
              type="file"
              ref={jsonInputRef}
              onChange={handleImportJson}
              accept=".json"
              className="hidden"
            />

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1 text-xs text-rose-700 hover:bg-rose-50 border border-rose-200/60 py-2 px-3 rounded-xl ml-1 transition-colors"
            >
              <FiLogOut className="w-3.5 h-3.5" />
              <span>Salir</span>
            </button>
          </div>
        </div>
      </header>

      {/* ─── ESPACIO PRINCIPAL ─── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        
        {/* Estadísticas en Tarjetas Rápidas */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-[#fdfcfa] border border-stone-200/80 shadow-sm">
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
              Total Platos
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-bold font-serif text-stone-900">{stats.total}</span>
              <span className="text-xs text-stone-500">en carta</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#fdfcfa] border border-stone-200/80 shadow-sm">
            <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider block">
              Disponibles Hoy
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-bold font-serif text-emerald-700">{stats.available}</span>
              <span className="text-xs text-emerald-600">servicios activos</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#fdfcfa] border border-stone-200/80 shadow-sm">
            <span className="text-[11px] font-semibold text-rose-700 uppercase tracking-wider block">
              Agotados
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-bold font-serif text-rose-700">{stats.outOfStock}</span>
              <span className="text-xs text-rose-600">para hoy</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#fdfcfa] border border-stone-200/80 shadow-sm">
            <span className="text-[11px] font-semibold text-[#c44d2d] uppercase tracking-wider block">
              Especialidades
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-bold font-serif text-[#c44d2d]">{stats.featured}</span>
              <span className="text-xs text-stone-500">destacados</span>
            </div>
          </div>
        </div>

        {/* Pestañas Principales: Carta vs Reservas */}
        <div className="flex items-center gap-2 border-b border-stone-200 pb-4 mb-6">
          <button
            onClick={() => setActiveTab("menu")}
            className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "menu"
                ? "bg-[#201915] text-[#f7f4ee] shadow-sm"
                : "bg-transparent text-stone-600 hover:text-stone-900 hover:bg-stone-200/50"
            }`}
          >
            <span>Carta Gastronómica</span>
            <span className="text-xs opacity-75 font-mono">({items.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("reservations")}
            className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "reservations"
                ? "bg-[#201915] text-[#f7f4ee] shadow-sm"
                : "bg-transparent text-stone-600 hover:text-stone-900 hover:bg-stone-200/50"
            }`}
          >
            <FiCalendar className="w-3.5 h-3.5" />
            <span>Reservas de Mesa</span>
            <span className="text-xs opacity-75 font-mono">({reservations.length})</span>
          </button>
        </div>

        {/* ══════════════════════════════════════════════════
            PESTAÑA 1: CARTA GASTRONÓMICA
            ══════════════════════════════════════════════════ */}
        {activeTab === "menu" && (
          <div>
            {/* Barra de Filtros, Búsqueda y Botón + Crear */}
            <div className="bg-[#fdfcfa] border border-stone-200/80 rounded-2xl p-4 sm:p-5 mb-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                {/* Buscador en tiempo real */}
                <div className="relative flex-1">
                  <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar producto por nombre o descripción..."
                    className="w-full bg-[#f7f4ee] border border-stone-200 rounded-xl pl-10 pr-10 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#c44d2d]/30 focus:border-[#c44d2d] transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 font-semibold"
                    >
                      Limpiar
                    </button>
                  )}
                </div>

                {/* Filtro de disponibilidad y vista */}
                <div className="flex items-center gap-2 flex-wrap">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-[#f7f4ee] border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold text-stone-700 focus:outline-none"
                  >
                    <option value="ALL">Todos los estados</option>
                    <option value="AVAILABLE">Solo Disponibles</option>
                    <option value="OUT_OF_STOCK">Solo Agotados</option>
                  </select>

                  {/* Toggle Vista Cuadrícula / Tabla */}
                  <div className="flex items-center bg-[#f7f4ee] border border-stone-200 rounded-xl p-0.5">
                    <button
                      onClick={() => setViewMode("cards")}
                      className={`p-2 rounded-lg text-xs font-semibold transition-all ${
                        viewMode === "cards"
                          ? "bg-white text-stone-900 shadow-sm"
                          : "text-stone-500 hover:text-stone-900"
                      }`}
                      title="Vista en tarjetas"
                    >
                      <FiGrid className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setViewMode("table")}
                      className={`p-2 rounded-lg text-xs font-semibold transition-all ${
                        viewMode === "table"
                          ? "bg-white text-stone-900 shadow-sm"
                          : "text-stone-500 hover:text-stone-900"
                      }`}
                      title="Vista en tabla"
                    >
                      <FiList className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* BOTÓN + AÑADIR PLATO NUEVO */}
                  <button
                    onClick={handleOpenCreate}
                    className="btn-accent text-sm py-2 px-4 shadow-md font-semibold inline-flex items-center gap-1.5"
                  >
                    <FiPlus className="w-4 h-4" />
                    <span>Añadir Plato</span>
                  </button>
                </div>
              </div>

              {/* Pestañas de Categoría */}
              <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-stone-100">
                <button
                  onClick={() => setSelectedCategory("TODOS")}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    selectedCategory === "TODOS"
                      ? "bg-[#201915] text-[#f7f4ee] shadow-sm font-semibold"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  Todos ({items.length})
                </button>

                {officialCategories.map((c) => {
                  const count = stats.catCounts[c.id] || 0;
                  const isSelected = selectedCategory === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCategory(c.id)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#c44d2d] text-white shadow-sm font-semibold"
                          : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                      }`}
                    >
                      {c.name} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Contador de resultados */}
            <div className="flex items-center justify-between mb-4 px-1 text-xs text-stone-500">
              <span>
                Mostrando <strong className="text-stone-800">{filteredItems.length}</strong> de{" "}
                {items.length} platos en carta
              </span>
              <span className="hidden sm:inline text-stone-400">
                Pulse el interruptor de estado para cambiar disponibilidad con un toque.
              </span>
            </div>

            {/* Estado de carga */}
            {menuLoading && (
              <div className="py-24 text-center">
                <div className="w-8 h-8 border-2 border-[#c44d2d]/30 border-t-[#c44d2d] rounded-full animate-spin mx-auto mb-3" />
                <p className="text-xs font-mono text-stone-500 uppercase tracking-widest">
                  Cargando catálogo...
                </p>
              </div>
            )}

            {/* VISTA 1: TARJETAS VISUALES CON FOTO */}
            {!menuLoading && viewMode === "cards" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className={`card-dish group ${
                      !item.available ? "opacity-75 bg-stone-50/60" : ""
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
                            Sin Imagen
                          </span>
                        </div>
                      )}

                      {/* Badge de Categoría */}
                      <span className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-md text-white text-[10px] font-medium px-2.5 py-0.5 rounded-full">
                        {item.category}
                      </span>

                      {/* Badge Especialidad */}
                      {item.is_featured && (
                        <span className="absolute top-2.5 right-2.5 bg-[#d99b26] text-stone-900 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                          <FiStar className="w-2.5 h-2.5 fill-current" />
                          <span>Especial</span>
                        </span>
                      )}

                      {/* Botón rápido de disponibilidad */}
                      <button
                        onClick={(e) => handleFastToggle(item, e)}
                        className={`absolute bottom-2.5 right-2.5 px-3 py-1 rounded-full text-[11px] font-semibold shadow-md cursor-pointer transition-all active:scale-95 flex items-center gap-1.5 ${
                          item.available
                            ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                            : "bg-rose-600 hover:bg-rose-700 text-white"
                        }`}
                        title="Cambiar disponibilidad"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${item.available ? "bg-emerald-200" : "bg-rose-200"}`} />
                        <span>{item.available ? "Disponible" : "Agotado"}</span>
                      </button>
                    </div>

                    {/* Contenido del plato */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <h3 className="font-serif font-bold text-base text-stone-900 leading-snug line-clamp-1 group-hover:text-[#c44d2d] transition-colors">
                            {item.name}
                          </h3>
                        </div>

                        {item.description ? (
                          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-3">
                            {item.description}
                          </p>
                        ) : (
                          <p className="text-xs italic text-stone-400 mb-3">
                            Receta tradicional de La Querendona.
                          </p>
                        )}
                      </div>

                      {/* Barra de Precio & Acciones Rápidas */}
                      <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                        
                        {/* Precio editable con 1 toque */}
                        <div>
                          {inlinePriceId === item.id ? (
                            <div className="flex items-center gap-1">
                              <input
                                type="number"
                                step="0.10"
                                value={inlinePriceVal}
                                onChange={(e) => setInlinePriceVal(e.target.value)}
                                autoFocus
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") handleSaveInlinePrice(item.id);
                                  if (e.key === "Escape") setInlinePriceId(null);
                                }}
                                onBlur={() => handleSaveInlinePrice(item.id)}
                                className="w-16 px-1.5 py-0.5 text-sm font-bold border border-stone-300 rounded font-mono"
                              />
                              <span className="text-xs text-stone-500">€</span>
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                setInlinePriceId(item.id);
                                setInlinePriceVal(item.price.toString());
                              }}
                              className="font-serif text-lg font-bold text-stone-900 hover:text-[#c44d2d] transition-colors inline-flex items-center gap-1"
                              title="Tocar para editar precio"
                            >
                              <span>{typeof item.price === "number" ? item.price.toFixed(2) : item.price} €</span>
                              <FiEdit2 className="w-3 h-3 text-stone-400" />
                            </button>
                          )}
                        </div>

                        {/* Botones Editar y Eliminar */}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleOpenEdit(item)}
                            className="p-1.5 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer inline-flex items-center gap-1 text-xs"
                            title="Editar plato"
                          >
                            <FiEdit2 className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Editar</span>
                          </button>

                          <button
                            onClick={() => setItemToDelete(item)}
                            className="p-1.5 rounded-lg text-rose-600 hover:text-rose-800 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Eliminar plato"
                          >
                            <FiTrash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* VISTA 2: TABLA COMPACTA */}
            {!menuLoading && viewMode === "table" && (
              <div className="bg-[#fdfcfa] border border-stone-200/80 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-stone-100/70 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="py-3 px-4">Foto</th>
                        <th className="py-3 px-4">Nombre del Plato</th>
                        <th className="py-3 px-4">Categoría</th>
                        <th className="py-3 px-4">Precio</th>
                        <th className="py-3 px-4">Disponibilidad</th>
                        <th className="py-3 px-4 text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {filteredItems.map((item) => (
                        <tr key={item.id} className="hover:bg-stone-50 transition-colors">
                          <td className="py-2.5 px-4 w-12">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-10 h-10 rounded-lg object-cover"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center text-stone-400">
                                <FiImage className="w-4 h-4" />
                              </div>
                            )}
                          </td>
                          <td className="py-2.5 px-4">
                            <span className="font-semibold text-stone-900 block">{item.name}</span>
                            <span className="text-[11px] text-stone-500 line-clamp-1 max-w-md">
                              {item.description || "Receta tradicional"}
                            </span>
                          </td>
                          <td className="py-2.5 px-4">
                            <span className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 text-[10px] font-medium">
                              {item.category}
                            </span>
                          </td>
                          <td className="py-2.5 px-4 font-mono font-bold text-sm text-stone-900">
                            {typeof item.price === "number" ? item.price.toFixed(2) : item.price} €
                          </td>
                          <td className="py-2.5 px-4">
                            <button
                              onClick={(e) => handleFastToggle(item, e)}
                              className={`px-3 py-1 rounded-full text-[11px] font-semibold cursor-pointer transition-all active:scale-95 inline-flex items-center gap-1.5 ${
                                item.available
                                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100"
                                  : "bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100"
                              }`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${item.available ? "bg-emerald-500" : "bg-rose-500"}`} />
                              <span>{item.available ? "Disponible" : "Agotado"}</span>
                            </button>
                          </td>
                          <td className="py-2.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => handleOpenEdit(item)}
                                className="px-2.5 py-1 rounded-lg text-xs font-medium text-stone-700 hover:bg-stone-200 transition-colors cursor-pointer inline-flex items-center gap-1"
                              >
                                <FiEdit2 className="w-3 h-3" />
                                <span>Editar</span>
                              </button>
                              <button
                                onClick={() => setItemToDelete(item)}
                                className="p-1 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                              >
                                <FiTrash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Estado Vacío */}
            {!menuLoading && filteredItems.length === 0 && (
              <div className="text-center py-20 bg-[#fdfcfa] border border-stone-200/80 rounded-2xl p-8">
                <FiAlertCircle className="w-10 h-10 text-stone-400 mx-auto mb-2" />
                <h3 className="font-serif text-lg font-bold text-stone-800 mb-1">
                  No se encontraron productos
                </h3>
                <p className="text-xs text-stone-500 mb-4 max-w-sm mx-auto">
                  Ajuste los términos de búsqueda o modifique los filtros activos.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("TODOS");
                    setStatusFilter("ALL");
                  }}
                  className="btn-secondary text-xs"
                >
                  Restablecer filtros
                </button>
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════════
            PESTAÑA 2: GESTIÓN DE RESERVAS DE MESA
            ══════════════════════════════════════════════════ */}
        {activeTab === "reservations" && (
          <div className="bg-[#fdfcfa] border border-stone-200/80 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-stone-100">
              <div>
                <h2 className="font-serif text-2xl font-bold text-stone-900">
                  Solicitudes de Reserva
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  Listado cronológico de comensales que solicitan mesa a través del portal.
                </p>
              </div>

              {/* Estado de sincronización en tiempo real (Supabase / Local) */}
              <div className="flex items-center gap-2">
                {isSupabaseConfigured ? (
                  <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-300 px-3 py-1 rounded-full inline-flex items-center gap-1.5 font-bold shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Supabase Realtime Activo
                  </span>
                ) : (
                  <span
                    className="text-[11px] font-mono text-stone-700 bg-stone-100 border border-stone-300 px-3 py-1 rounded-full inline-flex items-center gap-1.5 font-bold"
                    title="Para activar base de datos PostgreSQL remota, añade VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en tu .env"
                  >
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    Canal Local Reactivo
                  </span>
                )}
              </div>
            </div>

            {resLoading ? (
              <div className="py-12 text-center text-xs font-mono text-stone-400">
                Cargando datos de reservas...
              </div>
            ) : reservations.length === 0 ? (
              <div className="text-center py-16 text-stone-500">
                <FiCalendar className="w-10 h-10 text-stone-300 mx-auto mb-2 stroke-1" />
                <p className="text-sm font-medium">No hay reservas registradas en este momento.</p>
                <p className="text-xs text-stone-400 mt-1">
                  Las solicitudes enviadas desde la web principal se sincronizarán aquí.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-stone-100">
                {reservations.map((res) => {
                  const isHighlighted = res.id === highlightedReservationId;
                  return (
                    <div
                      key={res.id}
                      id={`reservation-${res.id}`}
                      className={`py-4 px-3 rounded-2xl transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        isHighlighted
                          ? "bg-amber-100/80 border-2 border-[#c44d2d] shadow-lg scale-[1.01]"
                          : "hover:bg-stone-50/70"
                      }`}
                    >
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-stone-900 text-sm">{res.name}</span>
                          <span className="text-xs text-stone-500">· {res.phone}</span>
                          <span className="text-xs text-stone-400">({res.guests} comensales)</span>

                          {res.google_verified ? (
                            <span
                              className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold text-emerald-800 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded-full shadow-xs"
                              title={`Correo verificado vía Google ID: ${res.google_email || res.email}`}
                            >
                              <svg className="w-2.5 h-2.5" viewBox="0 0 24 24">
                                <path fill="#EA4335" d="M12 5c1.56 0 2.96.54 4.07 1.59l3.05-3.05C17.27 1.79 14.84 1 12 1 7.42 1 3.5 3.58 1.63 7.34l3.71 2.88C6.22 7.18 8.86 5 12 5z" />
                                <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58l3.71 2.88c2.16-1.99 3.71-4.94 3.71-8.7z" />
                                <path fill="#FBBC05" d="M5.34 14.78c-.23-.68-.36-1.41-.36-2.18s.13-1.5.36-2.18L1.63 7.54C.59 9.61 0 11.97 0 14.4s.59 4.79 1.63 6.86l3.71-2.88z" />
                                <path fill="#34A853" d="M12 23c3.24 0 5.96-1.07 7.95-2.91l-3.71-2.88c-1.08.72-2.45 1.16-4.24 1.16-3.14 0-5.78-2.18-6.66-5.22L1.63 16.03C3.5 19.79 7.42 22.38 12 22.38z" />
                              </svg>
                              <span>Google Verificado</span>
                            </span>
                          ) : (
                            <span className="text-[10px] font-mono text-stone-400 bg-stone-100 border border-stone-200 px-1.5 py-0.5 rounded">
                              Sin verificación
                            </span>
                          )}

                          {isHighlighted && (
                            <span className="text-[10px] font-mono text-[#c44d2d] font-bold bg-white border border-[#c44d2d]/30 px-2 py-0.5 rounded-full shadow-xs">
                              NUEVA
                            </span>
                          )}
                        </div>
                      <p className="text-xs text-stone-600 mt-1">
                        Fecha: <strong>{res.date}</strong> a las <strong>{res.time}</strong>
                        {(res.google_email || res.email) && (
                          <span className="text-stone-500 ml-2 font-mono text-[11px]">
                            · {res.google_email || res.email}
                          </span>
                        )}
                      </p>
                      {res.notes && (
                        <p className="text-xs text-stone-500 italic mt-0.5">Nota: {res.notes}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          res.status === "confirmed"
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : res.status === "cancelled"
                            ? "bg-rose-50 text-rose-800 border border-rose-200"
                            : "bg-amber-50 text-amber-800 border border-amber-200"
                        }`}
                      >
                        {res.status === "confirmed"
                          ? "Confirmada"
                          : res.status === "cancelled"
                          ? "Cancelada"
                          : "Pendiente"}
                      </span>

                      {res.status !== "confirmed" && (
                        <button
                          onClick={() => updateReservationStatus(res.id, "confirmed")}
                          className="px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer inline-flex items-center gap-1"
                        >
                          <FiCheck className="w-3 h-3" />
                          <span>Confirmar</span>
                        </button>
                      )}

                      {res.status !== "cancelled" && (
                        <button
                          onClick={() => updateReservationStatus(res.id, "cancelled")}
                          className="px-3 py-1 rounded-lg text-xs font-semibold bg-stone-200 text-stone-700 hover:bg-stone-300 cursor-pointer inline-flex items-center gap-1"
                        >
                          <FiX className="w-3 h-3" />
                          <span>Descartar</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          </div>
        )}
      </main>

      {/* ─── MODAL: AÑADIR O EDITAR PLATO ─── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div
            className="w-full max-w-2xl bg-[#fdfcfa] border border-stone-200 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl animate-spring-in my-auto max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cabecera del Modal */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-200/80 mb-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-stone-900">
                  {editingItemId ? "Editar Plato" : "Nuevo Producto en Carta"}
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Los cambios se reflejarán inmediatamente en la carta digital.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-colors"
                aria-label="Cerrar modal"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitProduct} className="space-y-5">
              
              {/* Nombre y Precio */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className="sm:col-span-8">
                  <label className="label-refined">Nombre del Plato *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="Ej. Bandeja Paisa Tradicional"
                    className="input-refined text-base font-medium"
                  />
                </div>

                <div className="sm:col-span-4">
                  <label className="label-refined">Precio (€) *</label>
                  <input
                    type="number"
                    step="0.05"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    placeholder="14.50"
                    className="input-refined text-base font-bold font-mono"
                  />
                </div>
              </div>

              {/* Categoría */}
              <div>
                <label className="label-refined">Categoría *</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {officialCategories.map((c) => {
                    const isSelected = formData.category === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, category: c.id })}
                        className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#201915] text-[#f7f4ee] border-[#201915] shadow-sm"
                            : "bg-[#f7f4ee] text-stone-700 border-stone-200 hover:border-stone-300"
                        }`}
                      >
                        {c.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Descripción */}
              <div>
                <label className="label-refined">Descripción &amp; Ingredientes</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detalle ingredientes, guarniciones y preparación campesina..."
                  className="input-refined text-xs leading-relaxed resize-none"
                />
              </div>

              {/* Selector de Foto */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="label-refined mb-0">Fotografía del Producto</label>
                  
                  {/* Pestañas de selector */}
                  <div className="flex items-center bg-stone-100 rounded-lg p-0.5 text-[11px] font-semibold">
                    <button
                      type="button"
                      onClick={() => setPhotoTab("gallery")}
                      className={`px-2.5 py-1 rounded-md transition-all ${
                        photoTab === "gallery" ? "bg-white text-stone-900 shadow-sm" : "text-stone-500"
                      }`}
                    >
                      Galería Oficial
                    </button>
                    <button
                      type="button"
                      onClick={() => setPhotoTab("upload")}
                      className={`px-2.5 py-1 rounded-md transition-all ${
                        photoTab === "upload" ? "bg-white text-stone-900 shadow-sm" : "text-stone-500"
                      }`}
                    >
                      Subir Imagen
                    </button>
                    <button
                      type="button"
                      onClick={() => setPhotoTab("url")}
                      className={`px-2.5 py-1 rounded-md transition-all ${
                        photoTab === "url" ? "bg-white text-stone-900 shadow-sm" : "text-stone-500"
                      }`}
                    >
                      Enlace URL
                    </button>
                  </div>
                </div>

                {/* Opción 1: Galería Oficial */}
                {photoTab === "gallery" && (
                  <div className="p-3 bg-[#f7f4ee] border border-stone-200 rounded-2xl">
                    <span className="text-[11px] text-stone-500 block mb-2 font-medium">
                      Seleccione una fotografía de la carta oficial:
                    </span>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-40 overflow-y-auto p-1">
                      {CURATED_GALLERY.map((g, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setFormData({ ...formData, image: g.url })}
                          className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                            formData.image === g.url
                              ? "border-[#c44d2d] scale-105 shadow-md"
                              : "border-transparent opacity-80 hover:opacity-100"
                          }`}
                          title={g.label}
                        >
                          <img src={g.url} alt={g.label} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Opción 2: Subir archivo */}
                {photoTab === "upload" && (
                  <div className="p-4 bg-[#f7f4ee] border border-dashed border-stone-300 rounded-2xl text-center">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handlePhotoUpload}
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isProcessingPhoto}
                      className="btn-secondary text-xs py-2 px-4 mb-1 inline-flex items-center gap-1.5"
                    >
                      <FiUpload className="w-3.5 h-3.5" />
                      <span>{isProcessingPhoto ? "Optimizando imagen..." : "Examinar archivo local"}</span>
                    </button>
                    <p className="text-[10px] text-stone-500">
                      Archivos JPG, PNG o WebP (máx. 6MB).
                    </p>
                  </div>
                )}

                {/* Opción 3: Enlace URL */}
                {photoTab === "url" && (
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://..."
                    className="input-refined text-xs"
                  />
                )}

                {/* Previsualización */}
                {formData.image && (
                  <div className="mt-3 flex items-center gap-3 p-2 bg-stone-50 rounded-xl border border-stone-200">
                    <img
                      src={formData.image}
                      alt="Vista previa"
                      className="w-14 h-14 rounded-lg object-cover"
                    />
                    <div className="flex-1 text-xs">
                      <span className="font-semibold text-stone-800 block">Fotografía seleccionada</span>
                      <span className="text-[11px] text-stone-500 truncate block max-w-sm">
                        {formData.image.slice(0, 45)}...
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, image: "" })}
                      className="text-xs text-rose-600 hover:text-rose-800 px-2 py-1 font-medium"
                    >
                      Quitar
                    </button>
                  </div>
                )}
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <label className="flex items-center gap-3 p-3 rounded-xl bg-[#f7f4ee] border border-stone-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.available}
                    onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                    className="w-4 h-4 rounded text-[#c44d2d] focus:ring-[#c44d2d]"
                  />
                  <div>
                    <span className="text-xs font-bold text-stone-900 block">Disponible en sala</span>
                    <span className="text-[11px] text-stone-500">Activo para pedidos y consulta</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl bg-[#f7f4ee] border border-stone-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-stone-900 block">Plato especial</span>
                    <span className="text-[11px] text-stone-500">Destacar en recomendaciones</span>
                  </div>
                </label>
              </div>

              {/* Botones de acción */}
              <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-secondary text-sm"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn-accent text-sm font-semibold px-6 shadow-md"
                >
                  {editingItemId ? "Actualizar Plato" : "Añadir a la Carta"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL: CONFIRMACIÓN DE ELIMINACIÓN ─── */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#fdfcfa] border border-stone-200 rounded-3xl p-6 shadow-2xl animate-spring-in text-center">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3 border border-rose-200">
              <FiTrash2 className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900 mb-1">
              ¿Eliminar plato de la carta?
            </h3>
            <p className="text-xs text-stone-600 mb-4">
              Se eliminará <strong>&quot;{itemToDelete.name}&quot;</strong> del catálogo activo. Podrá recuperarse con la opción de restablecer carta.
            </p>

            {itemToDelete.image && (
              <img
                src={itemToDelete.image}
                alt={itemToDelete.name}
                className="w-24 h-24 rounded-xl object-cover mx-auto mb-4 border border-stone-200"
              />
            )}

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setItemToDelete(null)}
                className="btn-secondary text-xs px-4 py-2"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs shadow-md active:scale-95 transition-all cursor-pointer"
              >
                Confirmar Eliminación
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL: RESTABLECER CARTA OFICIAL ─── */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#fdfcfa] border border-stone-200 rounded-3xl p-6 shadow-2xl animate-spring-in text-center">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center mx-auto mb-3 border border-amber-200">
              <FiRefreshCw className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900 mb-1">
              ¿Restablecer Carta Oficial?
            </h3>
            <p className="text-xs text-stone-600 mb-6 leading-relaxed">
              Esta acción recargará los <strong>118 productos auténticos</strong> de La Querendona con sus precios, descripciones y fotografías originales.
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setIsResetConfirmOpen(false)}
                disabled={isResetting}
                className="btn-secondary text-xs px-4 py-2"
              >
                Cancelar
              </button>
              <button
                onClick={handleResetMenu}
                disabled={isResetting}
                className="px-5 py-2 rounded-xl bg-[#c44d2d] hover:bg-[#aa3e22] text-white font-semibold text-xs shadow-md active:scale-95 transition-all cursor-pointer"
              >
                {isResetting ? "Restableciendo catálogo..." : "Cargar 118 Platos"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
