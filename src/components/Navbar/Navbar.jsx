import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="site-nav">
      <button className="nav-menu" type="button">
        <span>☰</span>
        <span>Menu</span>
      </button>

      <a href="/" className="nav-logo">
        fromanother
      </a>

      <a href="#contact" className="nav-chat">
        Let’s chat →
      </a>
    </nav>
  );
}