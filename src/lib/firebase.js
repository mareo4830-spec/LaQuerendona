import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;

// Check if valid Firebase configuration is provided
export const isFirebaseConfigured = Boolean(
  apiKey &&
  apiKey !== "tu-api-key" &&
  apiKey !== "your-api-key" &&
  !apiKey.includes("undefined") &&
  projectId &&
  projectId !== "tu-project-id" &&
  !projectId.includes("undefined")
);

let app = null;
let db = null;
let auth = null;

if (isFirebaseConfigured) {
  try {
    const firebaseConfig = {
      apiKey,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
    };
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    db = getFirestore(app);
    auth = getAuth(app);
  } catch (err) {
    console.warn("Error initializing Firebase. Running in local fallback mode:", err);
  }
} else {
  console.info("Firebase credentials not provided or incomplete. La Querendona is running in local mode.");
}

export { app, db, auth };
