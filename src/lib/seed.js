import { collection, addDoc, getDocs, query, writeBatch, doc } from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import { officialProducts } from "../data/officialMenu";

export const initialMenuItems = officialProducts;

export async function seedMenuItems(force = false) {
  if (!isFirebaseConfigured || !db) {
    return;
  }

  try {
    const q = query(collection(db, "menuItems"));
    const snapshot = await getDocs(q);

    // Solo sembrar si está vacío o si force === true
    if (snapshot.empty || force) {
      console.log(`Sembrando carta gastronómica oficial de La Querendona (${initialMenuItems.length} productos)...`);
      
      // Batch write in chunks of 450 (Firestore limit is 500 per batch)
      const chunkSize = 400;
      for (let i = 0; i < initialMenuItems.length; i += chunkSize) {
        const batch = writeBatch(db);
        const chunk = initialMenuItems.slice(i, i + chunkSize);
        
        for (const item of chunk) {
          const docRef = doc(collection(db, "menuItems"), item.id);
          batch.set(docRef, item);
        }
        await batch.commit();
      }
      console.log("Carta oficial de La Querendona sembrada exitosamente en Firestore.");
    }
  } catch (err) {
    console.warn("Aviso en la sincronización de base de datos:", err);
  }
}
