import dynamic from "next/dynamic";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";

const FeaturedWorksSection = dynamic(() => import("@/components/FeaturedWorksSection"));
const AboutSection = dynamic(() => import("@/components/AboutSection"));
const ServicesSection = dynamic(() => import("@/components/ServicesSection"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center">
      <NavBar />
      <HeroSection />
      <FeaturedWorksSection />
      <AboutSection />
      <ServicesSection />
      <Footer />
    </main>
  );
}
