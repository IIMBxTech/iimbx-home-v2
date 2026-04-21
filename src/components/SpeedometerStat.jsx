import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const SpeedometerStat = ({ stat, isVisible }) => {
  const needleRef = useRef(null);
  const containerRef = useRef(null);
  const infoRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let tl;
    if (isVisible && !isRevealed) {
      tl = gsap.timeline({
        onComplete: () => {
          setIsRevealed(true);
          startCountUp();
        }
      });

      tl.fromTo(needleRef.current, 
        { rotation: -90, svgOrigin: "100 100" }, 
        { 
          rotation: 90, 
          duration: 1.6, 
          ease: 'expo.inOut',
          delay: 0.1
        }
      );

      tl.to(containerRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.4,
        ease: 'power2.inOut'
      }, "-=0.3");
    } else if (!isVisible) {
      // Complete Reset when scrolled out of view
      setIsRevealed(false);
      setDisplayValue(0);
      gsap.set(needleRef.current, { clearProps: "all" });
      gsap.set(containerRef.current, { clearProps: "all" });
      if (infoRef.current) gsap.set(infoRef.current, { clearProps: "all" });
    }

    return () => {
      if (tl) tl.kill();
    };
  }, [isVisible, isRevealed, stat.value]); 

  const startCountUp = () => {
    const obj = { val: 0 };
    gsap.to(obj, {
      val: stat.value,
      duration: 1.5,
      ease: 'power3.out',
      onUpdate: () => setDisplayValue(Math.floor(obj.val))
    });

    if (infoRef.current) {
      gsap.fromTo(infoRef.current, 
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.5)' }
      );
    }
  };

  const formatDisplay = (val) => {
    if (stat.value >= 1000000) {
      const millions = val / 1000000;
      return `${millions % 1 === 0 ? millions.toFixed(0) : millions.toFixed(1)}M${stat.suffix}`;
    }
    return `${val}${stat.suffix}`;
  };

  const gradientId = `grad-${stat.color.substring(1)}-${Math.random().toString(36).substr(2, 5)}`;

  return (
    <div className="premium-stat-card speedometer-card" style={{ '--stat-color': stat.color }}>
      <div className="stat-glare" />
      
      {!isRevealed ? (
        <div ref={containerRef} className="speedometer-container" style={{ opacity: isVisible ? 1 : 0 }}>
          <svg viewBox="0 0 200 120" className="speedometer-svg" style={{ overflow: 'visible' }}>
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--border)" stopOpacity="0.4" />
                <stop offset="100%" stopColor={stat.color} />
              </linearGradient>
              <filter id="needle-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Inactive Track Background */}
            <path 
              d="M 20 100 A 80 80 0 0 1 180 100" 
              fill="none" 
              stroke="var(--bg-card)" 
              strokeWidth="16" 
              strokeLinecap="round" 
            />

            {/* Glowing Active Track */}
            <path 
              d="M 20 100 A 80 80 0 0 1 180 100" 
              fill="none" 
              stroke={`url(#${gradientId})`} 
              strokeWidth="16" 
              strokeLinecap="round" 
            />

            {/* Premium Tick Marks */}
            {[...Array(11)].map((_, i) => {
              const angle = -180 + (i * 18);
              const r1 = 58;
              const r2 = 68;
              const x1 = 100 + r1 * Math.cos((angle * Math.PI) / 180);
              const y1 = 100 + r1 * Math.sin((angle * Math.PI) / 180);
              const x2 = 100 + r2 * Math.cos((angle * Math.PI) / 180);
              const y2 = 100 + r2 * Math.sin((angle * Math.PI) / 180);
              const isMajor = i % 5 === 0;
              return (
                <line 
                  key={i} 
                  x1={x1} y1={y1} x2={x2} y2={y2} 
                  stroke={isMajor ? "#080824" : "#A0A0B0"} 
                  strokeWidth={isMajor ? "2.5" : "1.5"} 
                  strokeLinecap="round"
                  opacity={isMajor ? "0.6" : "0.3"}
                />
              );
            })}

            {/* Precision Needle Graphic */}
            <g ref={needleRef}>
              {/* Tapered Polygon Needle */}
              <polygon 
                points="96,100 104,100 100,20" 
                fill={stat.color} 
                filter="url(#needle-glow)"
              />
              {/* Central Hub Layering */}
              <circle cx="100" cy="100" r="10" fill="#fff" shapeRendering="geometricPrecision" />
              <circle cx="100" cy="100" r="10" fill="transparent" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
              <circle cx="100" cy="100" r="4.5" fill={stat.color} />
            </g>
          </svg>
          <div className="speedometer-loading" style={{ color: stat.color, filter: 'brightness(0.7)' }}>
            Processing Impact...
          </div>
        </div>
      ) : (
        <div ref={infoRef} className="stat-content-wrapper">
          <div className="stat-icon-premium" style={{ color: stat.color }}>{stat.icon}</div>
          <div className="stat-number-premium">{formatDisplay(displayValue)}</div>
          <div className="stat-label-premium">{stat.label}</div>
        </div>
      )}
    </div>
  );
};

export default SpeedometerStat;
