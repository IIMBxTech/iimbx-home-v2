import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import logo from './assets/logo.mp4';

import ParticleField from './components/ParticleField';
import CustomCursor from './components/CustomCursor';
import HeroSection from './components/HeroSection';
import ImpactSection from './components/ImpactSection';
import PlatformsSection from './components/PlatformsSection';
import CatalogueSection from './components/CatalogueSection';
import TestimonialsSection from './components/TestimonialsSection';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-logo">
      <video autoPlay loop muted playsInline>
        <source src={logo} type="video/mp4" />
      </video>
    </div>
    <ul className="navbar-links">
      <li><a href="#hero">Home</a></li>
      <li><a href="#impact">Impact</a></li>
      <li><a href="#platforms">Platforms</a></li>
      <li><a href="#catalogue">Courses</a></li>
      <li><a href="#testimonials">Testimonials</a></li>
    </ul>
    <button className="navbar-cta">Explore Now</button>
  </nav>
);

const Footer = () => (
  <footer>
    <div className="footer">
      <div>
        <div className="footer-brand">
          IIMBx <span>Digital Learning Foundation</span>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.4rem' }}>
          A Section 8 Non-Profit Organization | Est. 2014
        </p>
      </div>
      <p className="footer-copy">
        © 2025 IIMBx Digital Learning Foundation · IIM Bangalore
      </p>
    </div>
    <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(0,229,255,0.15), transparent)', maxWidth: '1500px', margin: '0 auto' }} />
  </footer>
);

const ScrollProgress = () => {
  const barRef = useRef(null);

  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? scrolled / total : 0;
      if (barRef.current) {
        barRef.current.style.width = `${progress * 100}%`;
      }
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return <div className="scroll-progress" ref={barRef} />;
};

function App() {
  useEffect(() => {
    // Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // Scroll-triggered fade-in for cards/items in each section
    const animateItems = (selector, trigger) => {
      const items = document.querySelectorAll(selector);
      if (!items.length) return;
      gsap.fromTo(items,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger,
            start: 'top 75%',
            toggleActions: 'play none none none',
          }
        }
      );
    };

    // Wait for DOM to settle, then apply animations
    setTimeout(() => {
      animateItems('.stat-card', '.impact-section');
      animateItems('.platform-card', '.platforms-section');
      animateItems('.flip-card', '.catalogue-section');
    }, 300);

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <ParticleField />

      <div className="site-wrapper">
        <Navbar />

        <main>
          <HeroSection />

          <div className="section-divider" />
          <ImpactSection />

          <div className="section-divider" />
          <PlatformsSection />

          <div className="section-divider" />
          <CatalogueSection />

          <div className="section-divider" />
          <TestimonialsSection />
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;
