import React, { useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Hospital, Cpu, Plane, Wallet, ArrowRight, Activity, Brain, Navigation, TrendingUp } from 'lucide-react';
import logo from './assets/logo.mp4';
import StarDust from './components/StarDust';

const PROGRAMS = [
  {
    id: 1,
    name: "Hospital Management Programme",
    icon: Hospital,
    subIcon: Activity,
    color: "#B01116",
    glow: "rgba(176, 17, 22, 0.4)"
  },
  {
    id: 2,
    name: "Artificial Intelligence for Managers Programme",
    icon: Cpu,
    subIcon: Brain,
    color: "#004B98",
    glow: "rgba(0, 75, 152, 0.4)"
  },
  {
    id: 3,
    name: "Airlines Management Programme",
    icon: Plane,
    subIcon: Navigation,
    color: "#B01116",
    glow: "rgba(176, 17, 22, 0.4)"
  },
  {
    id: 4,
    name: "FinTech Certificate Programme for Young Professionals",
    icon: Wallet,
    subIcon: TrendingUp,
    color: "#004B98",
    glow: "rgba(0, 75, 152, 0.4)"
  }
];

const AuroraBackground = ({ activeColor }) => {
  const { scrollYProgress } = useScroll();
  
  const blob1Color = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["rgba(255, 255, 255, 0)", activeColor || "rgba(176, 17, 22, 0.4)"]
  );

  return (
    <div className="aurora-container">
      <div className="aurora-grid"></div>
      <motion.div 
        className="aurora-layer"
        style={{ background: blob1Color }}
      >
        <div className="aurora-blob" style={{ 
          width: '80vw', height: '80vh', top: '10%', left: '10%', 
          background: `radial-gradient(circle, ${activeColor || 'var(--color-primary)'} 0%, transparent 70%)`,
          opacity: 0.4
        }}></div>
      </motion.div>
    </div>
  );
};

const ProgramCard = ({ program, isTop }) => {
  const Icon = program.icon;
  const SubIcon = program.subIcon;

  return (
    <motion.div
      layout
      initial={{ y: 100, opacity: 0, scale: 0.8, rotate: -5 }}
      animate={{ 
        y: 0, 
        opacity: 1, 
        scale: 1, 
        rotate: 0,
        zIndex: isTop ? 10 : 1,
        transition: { type: "spring", stiffness: 100, damping: 15 }
      }}
      exit={{ y: -100, opacity: 0, scale: 0.8, rotate: 5 }}
      className="program-card"
    >
      <div>
        <div className="card-icon-container" style={{ background: `${program.color}15`, color: program.color }}>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Icon size={80} strokeWidth={1.2} />
          </motion.div>
          <motion.div
            style={{ position: 'absolute', top: -15, right: -15 }}
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <SubIcon size={40} color={program.color} />
          </motion.div>
        </div>
        <h3 className="card-title">{program.name}</h3>
      </div>
      
      <motion.button 
        className="know-more-btn"
        whileHover={{ x: 5, backgroundColor: program.color }}
        style={{ backgroundColor: '#0a0a0a' }}
      >
        Know More <ArrowRight size={18} />
      </motion.button>
    </motion.div>
  );
};

const ScrollProgressRing = () => {
  const { scrollYProgress } = useScroll();
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  
  const dashoffset = useTransform(scrollYProgress, [0, 1], [circumference, 0]);
  const springOffset = useSpring(dashoffset, { stiffness: 100, damping: 30 });

  return (
    <div className="progress-ring-container">
      <svg width="60" height="60" className="progress-ring-svg">
        <circle
          className="progress-ring-bg"
          cx="30"
          cy="30"
          r={radius}
        />
        <motion.circle
          className="progress-ring-circle"
          cx="30"
          cy="30"
          r={radius}
          strokeDasharray={circumference}
          style={{ strokeDashoffset: springOffset }}
          strokeLinecap="round"
        />
      </svg>
      <motion.div style={{ position: 'absolute', fontSize: '10px', fontWeight: 800 }}>
        {useTransform(scrollYProgress, (p) => `${Math.round(p * 100)}%`)}
      </motion.div>
    </div>
  );
};

const ProgramShowcase = ({ onActiveChange }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % PROGRAMS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    onActiveChange(PROGRAMS[index].glow);
  }, [index, onActiveChange]);

  return (
    <div className="showcase-container">
      <AnimatePresence mode="wait">
        <ProgramCard 
          key={PROGRAMS[index].id} 
          program={PROGRAMS[index]} 
          isTop={true} 
        />
      </AnimatePresence>
    </div>
  );
};

const Navbar = () => {
  return (
    <nav className="nav-v2">
      <div className="logo-v2">
        <video autoPlay loop muted playsInline>
          <source src={logo} type="video/mp4" />
        </video>
      </div>
    </nav>
  );
};

const Hero = ({ onActiveProgramChange }) => {
  const title = "IIMBx Digital Learning Foundation";
  const words = title.split(" ");

  return (
    <section className="hero-v2">
      <div className="hero-left">
        <motion.h1 
          className="hero-title-v2"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {words.map((word, i) => (
            <motion.div key={i} style={{ display: 'inline-block', overflow: 'hidden', paddingRight: '0.3em' }}>
              <motion.span 
                variants={{
                  hidden: { opacity: 0, y: 40, filter: 'blur(15px)' },
                  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', damping: 20 } }
                }}
                style={{ display: 'inline-block' }}
              >
                {word}
              </motion.span>
            </motion.div>
          ))}
        </motion.h1>
        
        <motion.p 
          className="hero-subtitle-v2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          Advancing the frontier of digital education through 
          pioneering pedagogical frameworks and technological excellence.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 1.5 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            style={{
              background: 'var(--color-primary)',
              color: 'white',
              border: 'none',
              padding: '1.2rem 2.8rem',
              borderRadius: '100px',
              fontSize: '1.1rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 20px 40px rgba(176, 17, 22, 0.2)'
            }}
          >
            Explore Ecosystem
          </motion.button>
        </motion.div>
      </div>

      <div className="hero-right">
        <ProgramShowcase onActiveChange={onActiveProgramChange} />
      </div>
    </section>
  );
};

function App() {
  const [activeGlow, setActiveGlow] = useState("rgba(176, 17, 22, 0.4)");

  return (
    <div className="app-v2">
      <StarDust />
      <AuroraBackground activeColor={activeGlow} />
      
      <Navbar />
      <Hero onActiveProgramChange={setActiveGlow} />
      <ScrollProgressRing />
      
      <div style={{ height: '150vh' }}></div>
    </div>
  );
}

export default App;
