import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import FeaturedWorksSection from "@/components/FeaturedWorksSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import Footer from "@/components/Footer";
import PreloaderWrapper from "@/components/PreloaderWrapper";

export default function Home() {
  return (
    <PreloaderWrapper>
      <main className="w-full min-h-screen flex flex-col items-center">
        <NavBar />
        <HeroSection />
        <FeaturedWorksSection />
        <AboutSection />
        <ServicesSection />
        <Footer />
      </main>
    </PreloaderWrapper>
  );
}
