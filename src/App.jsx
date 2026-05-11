import Navbar from "./components/Navbar/Navbar";
import HomeHero from "./components/HomeHero/HomeHero";
import AboutSection from "./components/AboutSection/AboutSection";
import ServicesSection from "./components/ServicesSection/ServicesSection";
import SliderSection from "./components/SliderSection/SliderSection";
import TeamSection from "./components/TeamSection/TeamSection";
import "./App.css";

export default function App() {
  return (
    <>
      <div className="site-video-bg">
        <video
          src="/src/assets/videos/video_1778480088758.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>

      <div className="site-color-overlay" />

      <HomeHero />
      <AboutSection />
      <ServicesSection />
      <SliderSection />
      <TeamSection />
    </>
  );
}