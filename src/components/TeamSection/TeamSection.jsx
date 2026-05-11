import "./TeamSection.css";
import teamVideo from "../../assets/videos/video_1778480088758.mp4";

export default function TeamSection() {
  return (
    <section className="team-section">
      <video
        className="team-video"
        src={teamVideo}
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="team-overlay" />

      <div className="team-index">
        <span>1</span>
        <span>2</span>
        <span>3</span>

        <div className="active-row">
          <span>4</span>
          <span className="line" />
          <span>Our team</span>
        </div>

        <span>5</span>
        <span>6</span>
        <span>7</span>
      </div>

      <div className="team-content">
        <h2>
          Driven by
          <br />
          Creative
          <br />
          Curiosity
        </h2>
      </div>
    </section>
  );
}