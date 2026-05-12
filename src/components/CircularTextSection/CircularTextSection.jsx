// src/components/CircularTextSection/CircularTextSection.jsx

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./CircularTextSection.css";

gsap.registerPlugin(ScrollTrigger);

const items = [
  "Lunar Horizon Lounge",
  "Martian Red Quarters",
  "Orbit Oasis Chamber",
  "Neon Nexus Home",
  "Quantum Quiet Quarters",
  "Galactic Gateway Studio",
  "Starlight Sky Suite",
  "Void Vector Villa",
  "Cosmic Cove Nook",
  "Satellite Space Site",
  "Plasma Peak Penthouse",
  "Asteroid Alley Loft",
  "Celestial City Condo",
  "Pulsar Point Pavilion",
  "Gravity Garden Suite",
  "Interstellar Ivy Inn",
  "Nebula Nest Nook",
  "Exoplanet Escape Estate",
  "Meteorite Mansion Den",
  "Black Hole Bungalow",
  "Warp World Workshop",
  "Photon Particle Pod",
  "Event Horizon Home",
  "Solar Flare Studio",
  "Quantum Leap Lounge",
  "Supernova Sun Suite",
  "Eclipse Edge Enclave",
  "Galaxy Garden Gazebo",
  "Time Traveler Terrace",
  "Orbital Observatory Outpost",
  "Gravity Grove Grotto",
  "Cosmos Cottage Core",
  "Space-Time Spiral Studio",
  "Alien Array Atrium",
  "Dimensional Dome Dwelling",
  "Vortex Valley Villa",
  "Starship Station Studio",
  "Quantum Quasar Quarters",
  "Planetary Plaza Penthouse",
  "Rocket Range Room",
  "Spectrum Spire Space",
  "Terraforming Tower Terrace",
  "Universe Utopia Unit",
  "Void Vista View",
  "Wormhole Wall Window",
  "Xenon Xeriscape Xanadu",
  "Yield Yacht Yard",
  "Zenith Zone Zephyr",
  "Alpha Aurora Atrium",
  "Beta Bridge Bastion",
  "Gamma Garden Gateway",
  "Delta Dome Den",
  "Epsilon Echo Estate",
  "Zeta Zenith Zone",
  "Eta Echo Enclave",
  "Theta Theater Thicket",
  "Iota Island Inn",
  "Kappa Keep Kiosk",
  "Lambda Loft Lounge",
];

export default function CircularTextSection() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const galleryRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const gallery = galleryRef.current;

    if (!section || !container || !gallery) return;

    gallery.innerHTML = "";

    const numberOfItems = items.length;

    // FIXED ARC VALUES
    const arcSpread = Math.PI * 1;

    const radius = 1540;

    let centerX = -850;

    let centerY = window.innerHeight / 2;

    const baseAngle = -Math.PI * 0.2;

    const angleIncrement =
      arcSpread / (numberOfItems - 1);

    const createdItems = [];

    items.forEach((name, index) => {
      const item = document.createElement("div");

      item.className = "item";

      const p = document.createElement("p");

      const count = document.createElement("span");

      p.textContent = name;

      count.textContent = `(${index + 1})`;

      p.appendChild(count);

      item.appendChild(p);

      gallery.appendChild(item);

      createdItems.push(item);
    });

    function positionItems(scrollOffset = 0) {
      createdItems.forEach((item, index) => {
        const angle =
          baseAngle +
          index * angleIncrement +
          scrollOffset;

        const x =
          centerX + radius * Math.cos(angle);

        const y =
          centerY + radius * Math.sin(angle);

        const rotation =
          (angle * 180) / Math.PI;

        gsap.set(item, {
          x,
          y,
          rotation,
        });
      });
    }

    positionItems(0);

    const trigger = ScrollTrigger.create({
      trigger: section,

      start: "top top",

      end: "+=3500",

      pin: container,

      pinSpacing: true,

      scrub: 1,

      anticipatePin: 1,

      invalidateOnRefresh: true,

      onUpdate(self) {
        // FIXED SMOOTH SCROLL OFFSET
        const scrollAmount =
          -self.progress * 1.6;

        positionItems(scrollAmount);
      },
    });

    function handleResize() {
      centerY = window.innerHeight / 2;

      const scrollAmount =
        -trigger.progress * 0.9;

      positionItems(scrollAmount);

      ScrollTrigger.refresh();
    }

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );

      trigger.kill();

      createdItems.forEach((item) =>
        item.remove()
      );
    };
  }, []);

  return (
    <section
      className="circular-text-section"
      ref={sectionRef}
    >
      <div
        className="container"
        ref={containerRef}
      >
        <div
          className="gallery"
          ref={galleryRef}
        ></div>
      </div>
    </section>
  );
}