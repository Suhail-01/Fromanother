import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./HomeHero.css";

gsap.registerPlugin(useGSAP);

const words = ["AGENCY", "STUDIO", "COLLECTIVE"];

export default function HomeHero() {
  const heroRef = useRef(null);
  const wordRef = useRef(null);

  useGSAP(
    () => {
      let index = 0;

      gsap.from(".hero-line", {
        yPercent: 110,
        opacity: 0,
        duration: 1.25,
        stagger: 0.12,
        ease: "power4.out",
      });

      const changeWord = () => {
        if (!wordRef.current) return;

        gsap.to(wordRef.current, {
          yPercent: -100,
          opacity: 0,
          duration: 0.45,
          ease: "power3.inOut",
          onComplete: () => {
            index = (index + 1) % words.length;
            wordRef.current.textContent = words[index];

            gsap.fromTo(
              wordRef.current,
              { yPercent: 100, opacity: 0 },
              {
                yPercent: 0,
                opacity: 1,
                duration: 0.65,
                ease: "power3.out",
              }
            );
          },
        });
      };

      const interval = setInterval(changeWord, 1800);

      return () => clearInterval(interval);
    },
    { scope: heroRef }
  );

  return (
    <section ref={heroRef} className="home-hero">
      <div className="languages">
        <span>VN</span>
        <span>CN</span>
        <span>FR</span>
      </div>

      <p className="since">Since 2020</p>

      <div className="hero-content">
        <h1>
          <span className="hero-mask">
            <span className="hero-line">WE ARE AN</span>
          </span>

          <span className="hero-mask">
            <span className="hero-line">ARTIST — LED</span>
          </span>

          <span className="hero-mask">
            <span className="hero-line">CREATIVE</span>
          </span>

          <span className="hero-mask">
            <span className="hero-line changing-word" ref={wordRef}>
              AGENCY
            </span>
          </span>
        </h1>
      </div>
    </section>
  );
}