import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "../lib/firebase";
import { initialMenuItems, seedMenuItems } from "../lib/seed";
import { sanitizeString, sanitizePrice, sanitizeImageUrl } from "../lib/security";

const LOCAL_STORAGE_KEY = "laquerendona_menu_items_v2";

function getLocalItems() {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Si tiene los 118 productos o una cantidad razonable
      if (Array.isArray(parsed) && parsed.length >= 20) {
        return parsed;
      }
    }
  } catch (e) {
    console.error("Error leyendo menú de localStorage", e);
  }
  // Si no hay datos o eran los 10 de prueba antiguos, guardar los 118 oficiales
  saveLocalItems(initialMenuItems);
  return initialMenuItems;
}

function saveLocalItems(items) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error("Error guardando menú en localStorage", e);
  }
}

export function useMenuItems() {
  const [items, setItems] = useState(() => getLocalItems());
  const [loading, setLoading] = useState(isFirebaseConfigured && Boolean(db));
  const [error, setError] = useState(null);

  useEffect(() => {
    // Si Firebase no está configurado o no hay instancia db, usar datos locales
    if (!isFirebaseConfigured || !db) {
      const local = getLocalItems();
      setItems(local);
      setLoading(false);
      return;
    }

    // Auto-seed si está vacío
    seedMenuItems().catch((err) => console.warn("Seed check error:", err));

    let unsubscribe = () => {};
    try {
      const q = query(collection(db, "menuItems"), orderBy("order", "asc"));
      unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          if (snapshot.empty) {
            setItems(getLocalItems());
          } else {
            const data = snapshot.docs.map((d) => ({
              id: d.id,
              ...d.data(),
            }));
            setItems(data);
            saveLocalItems(data);
          }
          setLoading(false);
        },
        (err) => {
          console.warn("Firestore menu snapshot warning:", err);
          setItems(getLocalItems());
          setError(err.message);
          setLoading(false);
        }
      );
    } catch (err) {
      console.warn("Failed to subscribe to Firestore:", err);
      setItems(getLocalItems());
      setLoading(false);
    }

    return () => unsubscribe();
  }, []);

  // SANITIZED ADD ITEM
  const addItem = async (item) => {
    const cleanItem = {
      name: sanitizeString(item.name, 100),
      description: sanitizeString(item.description, 500),
      price: sanitizePrice(item.price),
      category: sanitizeString(item.category, 50) || "ALMUERZOS",
      image: sanitizeImageUrl(item.image),
      available: item.available !== false,
      order: typeof item.order === "number" ? item.order : items.length + 1,
      is_featured: Boolean(item.is_featured),
      allergens: Array.isArray(item.allergens) ? item.allergens.map(a => sanitizeString(a, 50)) : [],
      tags: Array.isArray(item.tags) ? item.tags.map(t => sanitizeString(t, 50)) : ["Casero"],
    };

    if (isFirebaseConfigured && db) {
      try {
        const docRef = await addDoc(collection(db, "menuItems"), cleanItem);
        const savedItem = { ...cleanItem, id: docRef.id };
        const updated = [...items, savedItem];
        setItems(updated);
        saveLocalItems(updated);
        return savedItem;
      } catch (err) {
        console.warn("Failed to add to Firestore, saving locally:", err);
      }
    }

    const newItem = {
      ...cleanItem,
      id: "prod_" + Date.now().toString(36) + "_" + Math.random().toString(36).substring(2, 6),
    };
    const updated = [newItem, ...items];
    setItems(updated);
    saveLocalItems(updated);
    return newItem;
  };

  // SANITIZED UPDATE ITEM
  const updateItem = async (id, updates) => {
    const cleanUpdates = {};
    if (updates.name !== undefined) cleanUpdates.name = sanitizeString(updates.name, 100);
    if (updates.description !== undefined) cleanUpdates.description = sanitizeString(updates.description, 500);
    if (updates.price !== undefined) cleanUpdates.price = sanitizePrice(updates.price);
    if (updates.category !== undefined) cleanUpdates.category = sanitizeString(updates.category, 50);
    if (updates.image !== undefined) cleanUpdates.image = sanitizeImageUrl(updates.image);
    if (updates.available !== undefined) cleanUpdates.available = Boolean(updates.available);
    if (updates.order !== undefined) cleanUpdates.order = Number(updates.order) || 0;
    if (updates.is_featured !== undefined) cleanUpdates.is_featured = Boolean(updates.is_featured);
    if (updates.allergens !== undefined) {
      cleanUpdates.allergens = Array.isArray(updates.allergens) ? updates.allergens.map(a => sanitizeString(a, 50)) : [];
    }
    if (updates.tags !== undefined) {
      cleanUpdates.tags = Array.isArray(updates.tags) ? updates.tags.map(t => sanitizeString(t, 50)) : [];
    }

    if (isFirebaseConfigured && db) {
      try {
        const itemRef = doc(db, "menuItems", id);
        await updateDoc(itemRef, cleanUpdates);
      } catch (err) {
        console.warn("Failed to update Firestore, updating locally:", err);
      }
    }

    const updated = items.map((i) => (i.id === id ? { ...i, ...cleanUpdates } : i));
    setItems(updated);
    saveLocalItems(updated);
  };

  // FAST 1-CLICK AVAILABILITY TOGGLE
  const toggleAvailability = async (id) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;
    const newStatus = !item.available;
    await updateItem(id, { available: newStatus });
    return newStatus;
  };

  // DELETE ITEM
  const deleteItem = async (id) => {
    if (isFirebaseConfigured && db) {
      try {
        await deleteDoc(doc(db, "menuItems", id));
      } catch (err) {
        console.warn("Failed to delete from Firestore, deleting locally:", err);
      }
    }

    const updated = items.filter((i) => i.id !== id);
    setItems(updated);
    saveLocalItems(updated);
  };

  // RESTORE OFFICIAL MENU (118 DISHES)
  const resetToOfficialMenu = async () => {
    if (isFirebaseConfigured && db) {
      try {
        await seedMenuItems(true);
      } catch (err) {
        console.warn("Error re-seeding firestore:", err);
      }
    }
    setItems(initialMenuItems);
    saveLocalItems(initialMenuItems);
    return initialMenuItems;
  };

  // EXPORT MENU AS JSON
  const exportMenu = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(items, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `carta_la_querendona_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // IMPORT MENU FROM JSON
  const importMenu = (importedItems) => {
    if (!Array.isArray(importedItems) || importedItems.length === 0) {
      throw new Error("El archivo no contiene una lista de platos válida.");
    }
    const cleanItems = importedItems.map((item, idx) => ({
      id: item.id || "imp_" + idx + "_" + Date.now(),
      name: sanitizeString(item.name || "Sin nombre", 100),
      description: sanitizeString(item.description || "", 500),
      price: sanitizePrice(item.price || 0),
      category: sanitizeString(item.category || "ALMUERZOS", 50),
      image: sanitizeImageUrl(item.image || item.photo_url || ""),
      available: item.available !== false,
      order: typeof item.order === "number" ? item.order : idx,
      is_featured: Boolean(item.is_featured),
      allergens: Array.isArray(item.allergens) ? item.allergens : [],
      tags: Array.isArray(item.tags) ? item.tags : ["Casero"],
    }));

    setItems(cleanItems);
    saveLocalItems(cleanItems);
    return cleanItems;
  };

  return {
    items,
    loading,
    error,
    addItem,
    updateItem,
    deleteItem,
    toggleAvailability,
    resetToOfficialMenu,
    exportMenu,
    importMenu,
  };
}
