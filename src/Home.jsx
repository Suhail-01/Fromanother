import React, { useRef, useEffect, useState } from 'react';
import video1 from './assets/video1.webm';
import './home.scss';

const Home = () => {
  const bgVideoRef = useRef(null);
  const thumbVideoRef = useRef(null);
  const [scrollStage, setScrollStage] = useState('hero');
  const [activeListIndex, setActiveListIndex] = useState(-1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cycleIndex, setCycleIndex] = useState(0);

  // Loader 1 states (Beige screen)
  const [isLoading1, setIsLoading1] = useState(true);
  const [isLoader1Hiding, setIsLoader1Hiding] = useState(false);
  
  // Loader 2 states (Black screen with cards)
  const [isLoading2, setIsLoading2] = useState(true);
  const [isLoader2Hiding, setIsLoader2Hiding] = useState(false);

  const CYCLING_WORDS = ['STUDIO', 'COLLECTIVE', 'AGENCY'];



  useEffect(() => {
    // Stage 1 (Beige) slides up at 2.5s
    const timer1 = setTimeout(() => setIsLoader1Hiding(true), 2500);
    // Stage 1 is removed from DOM at 3.3s
    const timer2 = setTimeout(() => setIsLoading1(false), 3300);
    
    // Stage 2 (Black) slides up at 7.5s (after cards and text animate)
    const timer3 = setTimeout(() => setIsLoader2Hiding(true), 7500);
    // Stage 2 is removed from DOM at 8.3s
    const timer4 = setTimeout(() => setIsLoading2(false), 8300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  useEffect(() => {
    // Make sure videos play muted autoplay
    if (bgVideoRef.current) {
      bgVideoRef.current.play().catch(() => { });
    }
    if (thumbVideoRef.current) {
      thumbVideoRef.current.play().catch(() => { });
    }
  }, []);

  // Cycling word: STUDIO → COLLECTIVE → AGENCY → repeat
  // Starts after 2s so page-load animation finishes first
  useEffect(() => {
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setCycleIndex(i => (i + 1) % 3);
      }, 3500);
      return () => clearInterval(interval);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;

      if (y < vh * 0.3) {
        setScrollStage('hero');
      } else if (y >= vh * 0.3 && y < vh * 1.1) {
        setScrollStage('about');
      } else {
        setScrollStage('purple');
      }

      // Check list items for brightness
      const items = document.querySelectorAll('.home-services-list li');
      let currentActive = -1;
      const triggerPoint = window.innerHeight * 0.65; // Brighten when it crosses 65% of screen height
      
      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        if (rect.top < triggerPoint) {
          currentActive = index;
        }
      });
      setActiveListIndex(currentActive);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* ── Stage 2 Loader (Black screen, slides up at 7.5s) ── */}
      {isLoading2 && (
        <div className={`page-loader-2 ${isLoader2Hiding ? 'page-loader-2--hiding' : ''}`}>
          <div className="page-loader-2__cards">
            <div className="pl2-card pl2-card--1"><img src="https://i.pinimg.com/736x/5b/19/17/5b19170e19c06d97a77db197af8bc719.jpg" alt="card 1" /></div>
            <div className="pl2-card pl2-card--2"><img src="https://i.pinimg.com/736x/e3/6a/00/e36a009c0b99b0ada7646c09a4a3ff6b.jpg" alt="card 2" /></div>
            <div className="pl2-card pl2-card--3"><img src="https://i.pinimg.com/736x/10/38/1d/10381dc52753a2cc15f076ab99429444.jpg" alt="card 3" /></div>
            <div className="pl2-card pl2-card--4"><img src="https://i.pinimg.com/1200x/4b/64/30/4b64308b7d449b2760b0bb35ad37585f.jpg" alt="card 4" /></div>
          </div>
          <h2 className="page-loader-2__text">Designing duo</h2>
        </div>
      )}

      {/* ── Stage 1 Loader (Beige screen, slides up at 2.5s) ── */}
      {isLoading1 && (
        <div className={`page-loader ${isLoader1Hiding ? 'page-loader--hiding' : ''}`}>
          <div className="page-loader__content">
            <div className="page-loader__text">Loading</div>
            <div className="page-loader__bar">
              <div className="page-loader__bar-fill" />
            </div>
          </div>
        </div>
      )}
      
      {/* ── Main Homepage (Hero animations start when Loader 2 slides up) ── */}
      <div className={`home-page ${scrollStage} ${isLoader2Hiding || !isLoading2 ? 'home-page--loaded' : ''}`}>
      {/* ── Background video ─────────────────────── */}
      <video
        ref={bgVideoRef}
        className="home-bg-video"
        src={video1}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* ── Gradient overlay ─────────────────────── */}
      <div className="home-overlay" />

      {/* ── Navigation ───────────────────────────── */}
      <nav className="home-nav">
        <button className="home-nav__menu" id="home-menu-btn" onClick={() => setMenuOpen(true)}>
          <span className="home-nav__menu-icon">
            <span /><span /><span />
          </span>
          Menu
        </button>

        <a href="/" className="home-nav__logo">
          from<em>another</em>
        </a>

        <a href="#chat" className="home-nav__cta" id="home-cta-btn">
          Let's chat&nbsp;<span className="home-nav__arrow">→</span>
        </a>
      </nav>

      {/* ── Menu Overlay ─────────────────────────── */}
      <div className={`menu-overlay ${menuOpen ? 'menu-overlay--open' : ''}`} aria-hidden={!menuOpen}>
        {/* Overlay nav bar */}
        <div className="menu-overlay__nav">
          <button className="menu-overlay__close" onClick={() => setMenuOpen(false)}>
            <span className="menu-overlay__close-icon">✕</span> Close
          </button>
          <a href="/" className="menu-overlay__logo">from<em>another</em></a>
          <a href="#chat" className="menu-overlay__cta">Let's chat&nbsp;<span>→</span></a>
        </div>

        {/* Main nav links */}
        <nav className="menu-overlay__links" aria-label="Site navigation">
          <a href="/" className="menu-overlay__link" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#work" className="menu-overlay__link" onClick={() => setMenuOpen(false)}>Work</a>
          <a href="#lab" className="menu-overlay__link" onClick={() => setMenuOpen(false)}>Lab</a>
        </nav>

        {/* Contact footer */}
        <div className="menu-overlay__footer">
          <span className="menu-overlay__contact-label">Contact us</span>
          <a href="mailto:firstcontact@fromanother.love" className="menu-overlay__email">
            firstcontact@fromanother.love
          </a>
        </div>
      </div>

      {/* ── Hero content ─────────────────────────── */}
      <main className="home-hero">

        {/* Since 2020 — left side */}
        <p className="home-since" id="home-since-label">
          <em>Since 2020</em>
        </p>

        <div className="home-hero-center">

          {/* Headline — lang selector is anchored inside, right of text */}
          <h1 className="home-headline">

            {/* Language selector — sits to the right of "WE ARE AN" */}
            <div className="home-lang" id="home-lang-selector">
              <button className="home-lang__btn home-lang__btn--active">VN</button>
              <span className="home-lang__sep">|</span>
              <button className="home-lang__btn">CN</button>
              <span className="home-lang__sep">|</span>
              <button className="home-lang__btn">FR</button>
            </div>

            <span className="home-headline__line">WE ARE AN</span>
            <span className="home-headline__line">ARTIST — LED</span>
            <span className="home-headline__line home-headline__line--video">
              CREATIVE

              <span className="home-headline__thumb" aria-hidden="true">
                <video
                  ref={thumbVideoRef}
                  src="https://jasminegunarto.com/wp-content/uploads/2026/02/jgunarto_demoreel_compressed_1.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </span>
            </span>
            {/* Cycling word line — STUDIO / COLLECTIVE / AGENCY */}
            <span className="home-headline__line home-headline__line--cycle">
              <span key={cycleIndex} className="home-headline__cycling">
                {CYCLING_WORDS[cycleIndex]}
              </span>
            </span>

          </h1>

        </div>

      </main>

      {/* ── Scroll indicator ──────────────────────── */}
      <div className="home-scroll" id="home-scroll-indicator" aria-label="Scroll down">
        <div className="home-scroll__circle" />
        <div className="home-scroll__line" />
      </div>

      {/* ── About Section ─────────────────────────── */}
      <section className="home-about">


        <div className="home-about-content">
          <h2>We craft work that<br />defines the now and<br />shapes what is next.</h2>
          <p>
            Driven by curiosity, not formula. We explore where creativity and technology collide —
            across brand, film, immersive spaces, and whatever medium the work demands next.
          </p>
        </div>
      </section>

      {/* ── Services Section (The Third Page) ──────── */}
      <section className="home-services">


        <div className="home-services-content">
          <div className="home-services-list">
            
            {/* Group 01 */}
            <div className="service-group">
              <div className="row-label-container">
                <div className={`row-label ${activeListIndex >= 0 && activeListIndex <= 3 ? 'bright' : ''}`}>
                  <span className="num">01</span>
                  <span className="label">Direction</span>
                </div>
              </div>
              <ul>
                <li className={activeListIndex >= 0 ? 'bright' : ''}>Art Direction</li>
                <li className={activeListIndex >= 1 ? 'bright' : ''}>Design Concept</li>
                <li className={activeListIndex >= 2 ? 'bright' : ''}>Commercials &amp; CGI</li>
                <li className={activeListIndex >= 3 ? 'bright' : ''}>Brand Identity</li>
              </ul>
            </div>

            {/* Group 02 */}
            <div className="service-group">
              <div className="row-label-container">
                <div className={`row-label ${activeListIndex >= 4 && activeListIndex <= 6 ? 'bright' : ''}`}>
                  <span className="num">02</span>
                  <span className="label">Digital</span>
                </div>
              </div>
              <ul>
                <li className={activeListIndex >= 4 ? 'bright' : ''}>Web Experience</li>
                <li className={activeListIndex >= 5 ? 'bright' : ''}>Social Media</li>
                <li className={activeListIndex >= 6 ? 'bright' : ''}>Asset Production</li>
              </ul>
            </div>

            {/* Group 03 */}
            <div className="service-group">
              <div className="row-label-container">
                <div className={`row-label ${activeListIndex >= 7 && activeListIndex <= 10 ? 'bright' : ''}`}>
                  <span className="num">03</span>
                  <span className="label">Offline</span>
                </div>
              </div>
              <ul>
                <li className={activeListIndex >= 7 ? 'bright' : ''}>Immersive Event</li>
                <li className={activeListIndex >= 8 ? 'bright' : ''}>Interactive Art</li>
                <li className={activeListIndex >= 9 ? 'bright' : ''}>OOH/Billboard</li>
                <li className={activeListIndex >= 10 ? 'bright' : ''}>Print Ads</li>
              </ul>
            </div>

          </div>
        </div>
      </section>



      </div>
    </>
  );
};

export default Home;
