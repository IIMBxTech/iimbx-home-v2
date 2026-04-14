import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROGRAMMES = [
  {
    id: 0,
    label: 'Executive Programme',
    title: 'Hospital Management',
    desc: 'A rigorous professional certificate for healthcare administrators navigating the complexities of modern hospital management.',
    icon: '🏥',
    color: '#B01116',
    glow: 'rgba(176,17,22,0.35)',
    bg: 'rgba(176,17,22,0.1)',
  },
  {
    id: 1,
    label: 'Technology & AI',
    title: 'AI for Managers',
    desc: 'Empower yourself with AI literacy and strategic frameworks to lead your organization through the intelligence revolution.',
    icon: '🤖',
    color: '#0066FF',
    glow: 'rgba(0,102,255,0.35)',
    bg: 'rgba(0,102,255,0.1)',
  },
  {
    id: 2,
    label: 'Industry Programme',
    title: 'Airlines Management',
    desc: 'A specialized programme designed for professionals in the aviation sector, covering operations, strategy, and leadership.',
    icon: '✈️',
    color: '#00E5FF',
    glow: 'rgba(0,229,255,0.35)',
    bg: 'rgba(0,229,255,0.08)',
  },
  {
    id: 3,
    label: 'Finance & Technology',
    title: 'FinTech Certificate',
    desc: 'Navigate the intersection of finance and technology. Designed for young professionals ready to lead in the digital economy.',
    icon: '💸',
    color: '#FFD700',
    glow: 'rgba(255,215,0,0.3)',
    bg: 'rgba(255,215,0,0.08)',
  },
];

const HeroSection = () => {
  const [active, setActive] = useState(0);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const sectionRef = useRef(null);

  const getCardClass = (i) => {
    const total = PROGRAMMES.length;
    const diff = (i - active + total) % total;
    if (diff === 0) return 'active';
    if (diff === 1) return 'next';
    if (diff === total - 1) return 'prev';
    return 'hidden';
  };

  // Auto-cycle cards
  useEffect(() => {
    const timer = setInterval(() => setActive(p => (p + 1) % PROGRAMMES.length), 3500);
    return () => clearInterval(timer);
  }, []);

  // GSAP entrance animation
  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;
    const words = title.querySelectorAll('.word');

    const tl = gsap.timeline({ delay: 0.3 });
    tl.to(words, {
      y: 0,
      duration: 1,
      stagger: 0.08,
      ease: 'power4.out',
    })
    .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
    .to(buttonsRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5');

    gsap.set(subtitleRef.current, { y: 20 });
    gsap.set(buttonsRef.current, { y: 20 });
  }, []);

  const titleWords = ['IIMBx', 'Digital', 'Learning', 'Foundation'];

  return (
    <section className="hero-section" ref={sectionRef} id="hero">
      {/* LEFT */}
      <div className="hero-left">
        <p className="hero-eyebrow">IIM Bangalore Digital Initiative — Est. 2014</p>

        <h1 className="hero-title" ref={titleRef}>
          {titleWords.map((w, i) => (
            <span key={i} className="word-wrap">
              <span className={`word ${i === 1 || i === 2 ? 'highlight' : ''}`}>{w}</span>
            </span>
          ))}
        </h1>

        <p className="hero-subtitle" ref={subtitleRef}>
          Advancing the frontier of global education through pioneering pedagogy, transformative technology, and world-class management expertise from IIM Bangalore.
        </p>

        <div className="hero-buttons" ref={buttonsRef}>
          <button className="btn-primary">Explore Programmes →</button>
          <button className="btn-ghost">Learn Our Story</button>
        </div>
      </div>

      {/* RIGHT — 3D Programme Cards */}
      <div className="hero-right">
        <div className="programme-stack">
          {PROGRAMMES.map((prog, i) => {
            const cardClass = getCardClass(i);
            return (
              <div
                key={prog.id}
                className={`programme-card-3d ${cardClass}`}
                onClick={() => setActive(i)}
                style={cardClass === 'active' ? {
                  boxShadow: `0 0 0 1px ${prog.color}40, 0 20px 60px rgba(0,0,0,0.6), 0 0 80px -20px ${prog.glow}`
                } : {}}
              >
                <div
                  className="card-3d-icon"
                  style={{ background: prog.bg }}
                >
                  <span style={{ fontSize: '2rem', filter: `drop-shadow(0 0 12px ${prog.color})` }}>
                    {prog.icon}
                  </span>
                </div>
                <p className="card-3d-label" style={{ color: prog.color }}>{prog.label}</p>
                <h3 className="card-3d-title">{prog.title}</h3>
                <p className="card-3d-desc">{prog.desc}</p>
                <a href="#" className="card-3d-cta" style={{ color: prog.color }}>
                  Know More <span>→</span>
                </a>
              </div>
            );
          })}
        </div>
        <div className="card-nav-dots">
          {PROGRAMMES.map((_, i) => (
            <div
              key={i}
              className={`dot ${i === active ? 'active' : ''}`}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
