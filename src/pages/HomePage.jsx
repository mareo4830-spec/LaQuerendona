import HeroSection from "../components/hero/HeroSection";
import TraditionSection from "../components/tradition/TraditionSection";
import MenuSection from "../components/menu/MenuSection";
import ReservationForm from "../components/reservation/ReservationForm";
import AboutSection from "../components/about/AboutSection";

export default function HomePage() {
  return (
    <main className="relative bg-[#f4f1ec] text-zinc-900 overflow-hidden">
      <HeroSection />
      <TraditionSection />
      <MenuSection />
      <ReservationForm />
      <AboutSection />
    </main>
  );
}
