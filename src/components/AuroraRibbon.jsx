import React, { useEffect, useRef } from 'react';

const AuroraRibbon = () => {
  const canvasRef = useRef(null);
  const points = useRef([]);
  const pulses = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });
  const lastMouse = useRef({ x: 0, y: 0 });
  const frame = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();

    const handleMouseMove = (e) => {
      lastMouse.current = { ...mouse.current };
      mouse.current = { x: e.clientX, y: e.clientY };
      
      points.current.push({ 
        x: mouse.current.x, 
        y: mouse.current.y, 
        age: 0,
        vx: (mouse.current.x - lastMouse.current.x) * 0.05,
        vy: (mouse.current.y - lastMouse.current.y) * 0.05,
        seed: Math.random() * 100
      });

      if (points.current.length > 50) {
        points.current.shift();
      }
    };

    const handleClick = (e) => {
      pulses.current.push({
        x: e.clientX,
        y: e.clientY,
        r: 0,
        alpha: 0.8,
        maxR: 200
      });
    };

    const drawPlasmaPath = (pointsArray, widthMultiplier, alphaMultiplier, shadowBlurValue) => {
      if (pointsArray.length < 3) return;

      ctx.beginPath();
      ctx.moveTo(pointsArray[0].x, pointsArray[0].y);

      // Store a temporary gradient for this layer
      const grad = ctx.createLinearGradient(
        pointsArray[0].x, pointsArray[0].y, 
        pointsArray[pointsArray.length - 1].x, pointsArray[pointsArray.length - 1].y
      );
      
      // concept colors: Electric Blue -> Deep Violet -> soft IIMB Red
      grad.addColorStop(0, `rgba(0, 204, 255, 0)`);
      grad.addColorStop(0.5, `rgba(0, 75, 152, ${0.8 * alphaMultiplier})`);
      grad.addColorStop(0.8, `rgba(138, 43, 226, ${0.6 * alphaMultiplier})`);
      grad.addColorStop(1, `rgba(176, 17, 22, ${0.4 * alphaMultiplier})`);

      ctx.strokeStyle = grad;
      ctx.shadowBlur = shadowBlurValue;
      ctx.shadowColor = 'rgba(0, 75, 152, 0.4)';

      for (let i = 1; i < pointsArray.length; i++) {
        const p = pointsArray[i];
        
        // Add "Liquid" Wiggle
        const wiggleX = Math.sin(frame.current * 0.1 + p.seed) * 2;
        const wiggleY = Math.cos(frame.current * 0.1 + p.seed) * 2;
        
        const xc = (p.x + wiggleX + pointsArray[i - 1].x) / 2;
        const yc = (p.y + wiggleY + pointsArray[i - 1].y) / 2;
        
        ctx.lineWidth = (i / pointsArray.length) * widthMultiplier;
        ctx.quadraticCurveTo(p.x + wiggleX, p.y + wiggleY, xc, yc);
      }
      ctx.stroke();
    };

    const animate = () => {
      frame.current++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update points physics
      points.current.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.age++;
      });

      // Layered Rendering for "Concept Image" Glow
      // 1. Outer Bloom (Thick & Soft)
      drawPlasmaPath(points.current, 50, 0.15, 40);
      
      // 2. Inner Neon (Medium & Vibrant)
      drawPlasmaPath(points.current, 15, 0.4, 15);
      
      // 3. Bright Core (Sharp & Electric)
      drawPlasmaPath(points.current, 4, 1, 5);

      // Supernova 2.0 (Luminous Wave)
      for (let i = 0; i < pulses.current.length; i++) {
        const pulse = pulses.current[i];
        pulse.r += 8;
        pulse.alpha -= 0.015;

        if (pulse.alpha <= 0) {
          pulses.current.splice(i, 1);
          i--;
          continue;
        }

        ctx.shadowBlur = 30;
        ctx.shadowColor = 'rgba(0, 204, 255, 0.3)';
        ctx.beginPath();
        ctx.arc(pulse.x, pulse.y, pulse.r, 0, Math.PI * 2);
        
        const pulseGrad = ctx.createRadialGradient(pulse.x, pulse.y, pulse.r * 0.8, pulse.x, pulse.y, pulse.r);
        pulseGrad.addColorStop(0, 'rgba(0, 75, 152, 0)');
        pulseGrad.addColorStop(0.5, `rgba(138, 43, 226, ${pulse.alpha * 0.2})`);
        pulseGrad.addColorStop(1, `rgba(0, 204, 255, ${pulse.alpha})`);
        
        ctx.strokeStyle = pulseGrad;
        ctx.lineWidth = 15 * pulse.alpha;
        ctx.stroke();
      }

      ctx.shadowBlur = 0;
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
        mixBlendMode: 'normal'
      }}
    />
  );
};

export default AuroraRibbon;
