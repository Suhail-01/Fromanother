import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ServicesSection.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const services = [
  "Art Direction",
  "Design Concept",
  "Commercials & CGI",
  "Brand Identity",
  "Web Experience",
  "Social Media",
  "Asset Production",
  "Immersive Event",
];

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const listRef = useRef(null);

  useGSAP(
    () => {
      const lines = gsap.utils.toArray(".service-title");

      gsap.set(lines, {
        yPercent: 35,
        opacity: 0.25,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=220%",
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(listRef.current, {
        yPercent: -34,
        ease: "none",
      });

      lines.forEach((line, index) => {
        tl.to(
          line,
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.35,
            ease: "power2.out",
          },
          index * 0.09
        );

        tl.to(
          line,
          {
            opacity: index < 4 ? 1 : 0.32,
            duration: 0.35,
            ease: "none",
          },
          index * 0.09 + 0.25
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="services-section">
      <div className="services-index">
        <span>1</span>

        <div className="active-row">
          <span>2</span>
          <span className="line" />
          <span>What we do</span>
        </div>

        <span>3</span>
        <span>4</span>
        <span>5</span>
        <span>7</span>
      </div>

      <div className="services-meta">
        <span>01</span>
        <span>Direction</span>
        <span>02</span>
        <span>Digital</span>
        <span>03</span>
        <span>Offline</span>
      </div>

      <div className="services-content">
        <div ref={listRef} className="services-list">
          {services.map((item) => (
            <div className="service-mask" key={item}>
              <h2 className="service-title">{item}</h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}