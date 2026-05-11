import { useEffect } from "react";
import "./SliderSection.css";
import { slides } from "../../data/slides";
import { initSlider } from "./sliderLogic";

export default function SliderSection() {
  useEffect(() => {
    let cleanup;

    initSlider().then((fn) => {
      cleanup = fn;
    });

    return () => {
      if (typeof cleanup === "function") {
        cleanup();
      }
    };
  }, []);

  return (
    <section className="slider-section">
      <div className="slider">
        <div className="slide-content">
          <div className="slide-title">
            <h1>{slides[0].title}</h1>
          </div>

          <div className="slide-description">
            <p>{slides[0].description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}