import { useEffect, useRef, useState } from 'react';
import SpeedometerStat from './SpeedometerStat';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { icon: '🎓', value: 2500000, suffix: '+', label: 'Global Learners', color: '#B01116' },
  { icon: '🌍', value: 50, suffix: '+', label: 'Countries Reached', color: '#0044CC' },
  { icon: '📚', value: 70, suffix: '+', label: 'Expert Courses', color: '#FFB300' },
  { icon: '⭐', value: 10, suffix: '+', label: 'Years of Excellence', color: '#00C853' },
];

const ImpactSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      onEnter: () => setIsVisible(true),
      onLeaveBack: () => setIsVisible(false) // Reset when scrolled all the way back up
    });
    return () => trigger.kill();
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
          <SpeedometerStat key={stat.label} stat={stat} isVisible={isVisible} />
        ))}
      </div>
    </section>
  );
};

export default ImpactSection;
