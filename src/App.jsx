import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, isFirebaseConfigured } from "./lib/firebase";
import { verifyAdminSession } from "./lib/security";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import MobileBottomNav from "./components/layout/MobileBottomNav";
import GrainOverlay from "./components/ui/GrainOverlay";

import HomePage from "./pages/HomePage";
import PublicMenuPage from "./pages/PublicMenuPage";

const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));

function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Check secure admin session
    const isSessionValid = verifyAdminSession();
    if (isSessionValid) {
      setUser({ email: "admin@laquerendona.com", isLocal: true });
      setChecking(false);
      return;
    }

    // Check Firebase auth if configured
    if (isFirebaseConfigured && auth) {
      try {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
          if (u) {
            setUser(u);
          } else {
            setUser(null);
          }
          setChecking(false);
        });
        return () => unsubscribe();
      } catch (e) {
        console.warn("Auth listener error:", e);
        setChecking(false);
      }
    } else {
      setChecking(false);
    }
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen bg-bone flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-terracotta/30 border-t-terracotta rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
      <GrainOverlay />

      <Routes>
        {/* Public routes */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <HomePage />
              <Footer />
            </>
          }
        />
        <Route path="/carta" element={<PublicMenuPage />} />
        <Route path="/menu" element={<PublicMenuPage />} />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <Suspense
              fallback={
                <div className="min-h-screen bg-[#f7f4ee] flex items-center justify-center">
                  <div className="w-8 h-8 border-3 border-[#c44d2d]/30 border-t-[#c44d2d] rounded-full animate-spin" />
                </div>
              }
            >
              <AdminLogin />
            </Suspense>
          }
        />
        <Route
          path="/admin/panel"
          element={
            <ProtectedRoute>
              <Suspense
                fallback={
                  <div className="min-h-screen bg-[#f7f4ee] flex items-center justify-center">
                    <div className="w-8 h-8 border-3 border-[#c44d2d]/30 border-t-[#c44d2d] rounded-full animate-spin" />
                  </div>
                }
              >
                <AdminPanel />
              </Suspense>
            </ProtectedRoute>
          }
        />
      </Routes>
      <MobileBottomNav />
    </BrowserRouter>
  );
}
