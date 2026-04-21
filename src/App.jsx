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
        © 2026 IIMBx Digital Learning Foundation · IIM Bangalore
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

    // High-End Scrubbed 3D Scroll Animation
    const animate3DCards = (selector, trigger) => {
      const items = gsap.utils.toArray(selector);
      if (!items.length) return;
      
      gsap.set(trigger, { perspective: 2000 });
      
      items.forEach((item) => {
        gsap.fromTo(item,
          { 
            y: 120, 
            z: -150,
            rotationX: -20, 
            opacity: 0,
            scale: 0.9,
            filter: 'blur(20px)'
          },
          {
            y: 0,
            z: 0,
            rotationX: 0,
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            scrollTrigger: {
              trigger: item,
              start: 'top 95%',
              end: 'top 65%',
              scrub: 1.5,
              onLeave: () => gsap.set(item, { clearProps: 'transform,filter' }) // Restore CSS hovers
            }
          }
        );
      });
    };

    // Scrubbed 3D Text Reveal for Headlines
    const animateHeadlines = (selector) => {
      const elements = gsap.utils.toArray(selector);
      elements.forEach((el) => {
        gsap.set(el.parentElement, { perspective: 1000 });
        gsap.fromTo(el, 
          { y: 80, rotationX: -50, opacity: 0, filter: 'blur(15px)' },
          { 
            y: 0, rotationX: 0, opacity: 1, filter: 'blur(0px)',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              end: 'top 65%',
              scrub: 1.2
            }
          }
        );
      });
    };

    // Wait for DOM to settle, then apply 3D animations
    setTimeout(() => {
      animate3DCards('.premium-stat-card', '.impact-section');
      animate3DCards('.platform-card', '.platforms-section');
      // For catalogue flip cards, animate an inner wrapper or scale them so it doesn't break the native flip
      animate3DCards('.flip-card', '.catalogue-section');
      
      // Testimonials Marquee specific 3D entrance
      gsap.set('.testimonials-section', { perspective: 1500 });
      gsap.fromTo('.marquee-wrapper',
        { y: 60, z: -100, rotationX: -10, opacity: 0 },
        { 
          y: 0, z: 0, rotationX: 0, opacity: 1, 
          duration: 1.4, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.testimonials-section',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Apply to all major section titles
      animateHeadlines('.impact-title, .platforms-title, .catalogue-title, .testimonials-title');
      
      ScrollTrigger.refresh();
    }, 400);

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
          <PlatformsSection />
          <CatalogueSection />
          <TestimonialsSection />
        </main>

        <div className="section-divider" />
        <Footer />
      </div>
    </>
  );
}

export default App;
