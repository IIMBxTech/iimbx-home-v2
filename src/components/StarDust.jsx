import React, { useEffect, useRef } from 'react';

const StarDust = () => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();

    const createParticle = (x, y, isBurst = false) => {
      const size = isBurst ? Math.random() * 4 + 2 : Math.random() * 2 + 1;
      const speedX = isBurst ? (Math.random() - 0.5) * 10 : (Math.random() - 0.5) * 2;
      const speedY = isBurst ? (Math.random() - 0.5) * 10 : (Math.random() - 0.5) * 2;
      
      return {
        x,
        y,
        size,
        speedX,
        speedY,
        life: 1,
        decay: isBurst ? 0.02 : 0.03,
        color: '#FFD700' // Bright Yellow
      };
    };

    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      for (let i = 0; i < 3; i++) {
        particles.current.push(createParticle(e.clientX, e.clientY));
      }
    };

    const handleClick = (e) => {
      for (let i = 0; i < 30; i++) {
        particles.current.push(createParticle(e.clientX, e.clientY, true));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.current.length; i++) {
        const p = particles.current[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.life -= p.decay;

        if (p.life <= 0) {
          particles.current.splice(i, 1);
          i--;
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 215, 0, ${p.life})`;
        ctx.fill();
        
        // Add a small glow for "Star Dust" feel
        ctx.shadowBlur = 5;
        ctx.shadowColor = '#FFD700';
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleClick);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleClick);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 999,
      }}
    />
  );
};

export default StarDust;
