// src/components/VerticalSliderSection/VerticalSliderSection.jsx

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import "./VerticalSliderSection.css";

import img1 from "../../assets/videos/img1.avif";
import img2 from "../../assets/videos/img2.avif";
import img3 from "../../assets/videos/img3.avif";
import img4 from "../../assets/videos/img4.avif";
import img5 from "../../assets/videos/img5.avif";
import img6 from "../../assets/videos/img6.avif";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    image: img1,
    name: "Human Form Study",
  },
  {
    image: img2,
    name: "Interior Light",
  },
  {
    image: img3,
    name: "Project 21",
  },
  {
    image: img4,
    name: "Shadow Portraits",
  },
  {
    image: img5,
    name: "Everyday Objects",
  },
  {
    image: img6,
    name: "Quiet Walk",
  },
];

const VerticalSliderSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    // LENIS
    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.08,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // ELEMENTS
    const spotlightSection =
      sectionRef.current.querySelector(".spotlight");

    const projectIndex =
      sectionRef.current.querySelector(".project-index h1");

    const projectImgs =
      sectionRef.current.querySelectorAll(".project-img");

    const projectImagesContainer =
      sectionRef.current.querySelector(".project-images");

    const projectNames =
      sectionRef.current.querySelectorAll(".project-names p");

    const projectNamesContainer =
      sectionRef.current.querySelector(".project-names");

    const totalProjectCount = projectNames.length;

    // DIMENSIONS
    const spotlightSectionHeight =
      spotlightSection.offsetHeight;

    const spotlightSectionPadding = parseFloat(
      getComputedStyle(spotlightSection).padding
    );

    const projectIndexHeight =
      projectIndex.offsetHeight;

    const containerHeight =
      projectNamesContainer.offsetHeight;

    const imagesHeight =
      projectImagesContainer.offsetHeight;

    // MOVEMENT DISTANCES
    const moveDistanceIndex =
      spotlightSectionHeight -
      spotlightSectionPadding * 2 -
      projectIndexHeight;

    const moveDistanceNames =
      spotlightSectionHeight -
      spotlightSectionPadding * 2 -
      containerHeight;

    const moveDistanceImages =
      window.innerHeight - imagesHeight;

    const imgActivationThreshold =
      window.innerHeight / 2;

    // SCROLLTRIGGER
    ScrollTrigger.create({
      trigger: ".spotlight",

      start: "top top",

      end: `+=${window.innerHeight * 5}px`,

      pin: true,
      pinSpacing: true,

      scrub: 1,

      onUpdate: (self) => {
        const progress = self.progress;

        // CURRENT INDEX
        const currentIndex = Math.min(
          Math.floor(progress * totalProjectCount) + 1,
          totalProjectCount
        );

        projectIndex.textContent = `${String(
          currentIndex
        ).padStart(2, "0")}/${String(
          totalProjectCount
        ).padStart(2, "0")}`;

        // INDEX MOVEMENT
        gsap.set(projectIndex, {
          y: progress * moveDistanceIndex,
        });

        // IMAGE COLUMN MOVEMENT
        gsap.set(projectImagesContainer, {
          y: progress * moveDistanceImages,
        });

        // IMAGE ACTIVATION
        projectImgs.forEach((img) => {
          const imgRect = img.getBoundingClientRect();

          const imgTop = imgRect.top;
          const imgBottom = imgRect.bottom;

          if (
            imgTop <= imgActivationThreshold &&
            imgBottom >= imgActivationThreshold
          ) {
            gsap.set(img, {
              opacity: 1,
            });
          } else {
            gsap.set(img, {
              opacity: 0.5,
            });
          }
        });

        // PROJECT NAMES
        projectNames.forEach((p, index) => {
          const startProgress =
            index / totalProjectCount;

          const endProgress =
            (index + 1) / totalProjectCount;

          const projectProgress = Math.max(
            0,
            Math.min(
              1,
              (progress - startProgress) /
                (endProgress - startProgress)
            )
          );

          // TEXT MOVEMENT
          gsap.set(p, {
            y: -projectProgress * moveDistanceNames,
          });

          // ACTIVE COLOR
          if (
            projectProgress > 0 &&
            projectProgress < 1
          ) {
            gsap.set(p, {
              color: "#fff",
            });
          } else {
            gsap.set(p, {
              color: "#4a4a4a",
            });
          }
        });
      },
    });

    // REFRESH
    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();

      ScrollTrigger.getAll().forEach((trigger) =>
        trigger.kill()
      );
    };
  }, []);

  return (
    <section
      className="vertical-slider-section"
      ref={sectionRef}
    >
      {/* INTRO */}
      <section className="intro">
        <p>A collection of selected works</p>
      </section>

      {/* SPOTLIGHT */}
      <section className="spotlight">
        {/* INDEX */}
        <div className="project-index">
          <h1>01/06</h1>
        </div>

        {/* IMAGES */}
        <div className="project-images">
          {projects.map((project, index) => (
            <div className="project-img" key={index}>
              <img
                src={project.image}
                alt={project.name}
              />
            </div>
          ))}
        </div>

        {/* NAMES */}
        <div className="project-names">
          {projects.map((project, index) => (
            <p key={index}>{project.name}</p>
          ))}
        </div>
      </section>

      {/* OUTRO */}
      <section className="outro">
        <p>Scroll complete</p>
      </section>
    </section>
  );
};

export default VerticalSliderSection;