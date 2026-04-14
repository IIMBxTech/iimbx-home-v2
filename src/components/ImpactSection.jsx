import { useEffect, useRef, useState } from 'react';

const STATS = [
  { icon: '🎓', value: 1200000, suffix: '+', label: 'Global Learners', display: '1.2M+', color: '#00E5FF' },
  { icon: '🌍', value: 190, suffix: '', label: 'Countries Reached', display: '190', color: '#0066FF' },
  { icon: '📚', value: 40, suffix: '+', label: 'Expert Courses', display: '40+', color: '#B01116' },
  { icon: '⭐', value: 10, suffix: '+', label: 'Years of Excellence', display: '10+', color: '#FFD700' },
];

const useCountUp = (target, isVisible, duration = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const start = Date.now();
    const step = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(target * eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isVisible, target, duration]);

  return count;
};

const StatCard = ({ stat, isVisible }) => {
  const count = useCountUp(stat.value, isVisible, 2200);

  const display = () => {
    if (stat.value >= 1000000) return `${(count / 1000000).toFixed(1)}M+`;
    return `${count}${stat.suffix}`;
  };

  return (
    <div className="stat-card" style={{ '--glow-color': stat.color }}>
      <div className="stat-icon" style={{ color: stat.color }}>{stat.icon}</div>
      <div className="stat-number">{display()}</div>
      <div className="stat-label">{stat.label}</div>
    </div>
  );
};

const ImpactSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="impact-section" ref={sectionRef} id="impact">
      <div className="impact-header">
        <span className="section-tag">Our Impact</span>
        <h2 className="impact-title">
          Transforming Education<br />
          <span style={{ color: 'var(--accent-cyan)' }}>At Global Scale</span>
        </h2>
        <p className="impact-subtitle">
          Since 2014, IIMBx has pioneered digital management education, reaching over a million learners across nearly every nation on earth.
        </p>
      </div>

      <div className="stats-grid">
        {STATS.map((stat) => (
          <StatCard key={stat.label} stat={stat} isVisible={isVisible} />
        ))}
      </div>
    </section>
  );
};

export default ImpactSection;
