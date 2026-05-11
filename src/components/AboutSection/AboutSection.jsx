import "./AboutSection.css";

export default function AboutSection() {
  return (
    <section className="about-section">
      <div className="about-index">
        <div className="active-row">
          <span>1</span>
          <span className="line" />
          <span>About</span>
        </div>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>6</span>
        <span>7</span>
      </div>

      <div className="about-content">
        <h2>
          We craft work that
          <br />
          defines the now and
          <br />
          shapes what is next.
        </h2>

        <p>
          Driven by curiosity, not formula. We explore where creativity and
          technology collide — across brand, film, immersive spaces, and
          whatever medium the work demands next.
        </p>
      </div>
    </section>
  );
}